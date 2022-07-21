import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './Components/LoginForm';
import LocationSearch from './Components/LocationSearch';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./store/actions"
import axios from "axios";
import Cookies from 'js-cookie';

function App() {

  const state = useSelector(state=>state);
  const dispatch = useDispatch();

  const { setAuthentication } = bindActionCreators(actionCreators, dispatch);

  useEffect(()=>{
    isAuth();
  }, []);

  const isAuth = async ()=>{
    try{
      const resp = await axios.get('http://localhost:3000/user/is_auth', { withCredentials: true });
      setAuthentication(true);
    }
    catch(err){
      setAuthentication(false);
    }
  }

  return (
    <main className="main" id="main">
      {(state.auth === null ? '' : ( state.auth && Cookies.get('auth') == "true" ? <LocationSearch /> : <LoginForm state={state.user} />)) }
    </main>
  )
}

export default App
