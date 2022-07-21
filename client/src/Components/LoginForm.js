import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/actions"
import Cookies from 'js-cookie';


axios.defaults.withCredentials = true;

function LoginForm(props) {

  const [userData, setUserData] = useState({username: "", password: ""});
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useDispatch();
  const { setAuthentication, setPage } = bindActionCreators(actionCreators, dispatch);

  useEffect(() =>{
  }, [errMsg]);

  const submitHandle = (e) => {
    e.preventDefault();
    setErrMsg('Connecting...');
    Login(userData);
  };

  const Login = async (userData)=>{
    axios({
      url: "http://localhost:3000/user/login",
      method: "POST",
      data: userData,
    })
      .then((res) => {
        setErrMsg('Logged in');
        Cookies.set('auth', true ,{path:'/'});
        setAuthentication(true);
        window.location.reload();
       })
      .catch((err) => { 
        switch(err.response.status){
          case 403:
            setErrMsg('Login failed - internal server error');
            break;
          case 401:
            setErrMsg('Login failed - wrong credentials');
            break;
        }
      });
  }

  const keyDownHandle = (e)=>{
    if(e.keyCode === 13){
      submitHandle(e);
    }
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{"borderRadius": "1rem"}}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">{errMsg}</p>

                  <div className="form-outline form-white mb-4">
                    <input type="username" id="username" className="form-control form-control-lg" value={userData.username} onChange={(e) => {setUserData({...userData, username: e.target.value});setErrMsg('')}}  />
                    <label className="form-label" htmlFor="username">Username</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="password" id="password" className="form-control form-control-lg" value={userData.password} onKeyDown={(e)=>{keyDownHandle(e)}} onChange={(e) => {setUserData({...userData, password: e.target.value});setErrMsg('')}} />
                    <label className="form-label" htmlFor="password">Password</label>
                  </div>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={submitHandle}>Login</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
