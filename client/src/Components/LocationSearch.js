import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from './Pagination';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/actions"
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import moment from "moment";
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

function LocationSearch(props){

    const [searchInput, setSearchInput] = useState({ip: '', city: '', country: ''});
    const [updateInput, setUpdateInput] = useState({ip: '', city: '', country: ''});
    const [sort, setSort] = useState({sip: 1, scity: 1, scountry: 1, screatedAt: 1});
    const [addInput, setAddInput] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [beingEdited, setBeingEdited] = useState(null);
    const trElement = useRef([]);
    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    const { setPage } = bindActionCreators(actionCreators, dispatch);
    
    const itemsOnPage = 4;

    useEffect(()=>{
        if(!isLoaded){
            document.body.style.backgroundColor = "#495057";
            searchLocation();
            setIsLoaded(true);
        }
    });

    const searchLocation = async ()=>{
        setBeingEdited(false);
        if(Cookies.get('auth') == "false"){
            window.location.reload();
        }
        try{
            const res = await axios.get('http://localhost:3000/location/get', { params: {...searchInput, ...sort} });
            if(res.status === 200){
                setSearchData((elements)=>{
                    return res.data;
                });
                setPage(1);
            }
        }
        catch(err){
            if(typeof err.response !== 'undefined'){
                switch(err.response.status){
                    case 403:
                        window.location.reload();
                        break;
                    default:
                        alert("Server problems");
                        break;
                }
            }
        }

    }

    const addLocation = async ()=>{
        try{
            const res = await axios.post('http://localhost:3000/location/add', {data: {ip: addInput}});
            if(res.status === 200){
                searchLocation();
            }
        }
        catch(err) {
            if(typeof err.response !== 'undefined'){
                switch(err.response.status){
                    case 403:
                        window.location.reload();
                        break;
                    default:
                        alert("Server problems");
                        break;
                }
            }
        }

    }

    const deleteLocation = async(id)=>{
        try{
            const res = await axios.delete('http://localhost:3000/location/delete', {data : {data: {id: id}}});
            if(res.status === 200){
                searchLocation();
            }
        }
        catch(err) {
            if(typeof err.response !== 'undefined'){
                switch(err.response.status){
                    case 403:
                        window.location.reload();
                        break;
                    default:
                        alert("Server problems");
                        break;
                }
            }
        }
    }

    const updateLocation = async(id)=>{
        try {
            const res = await axios.put('http://localhost:3000/location/update', {id: id, data: updateInput});
            if(res.status === 200){
                searchLocation();
            }
        }
        catch(err) {
            if(typeof err.response !== 'undefined'){
                switch(err.response.status){
                    case 403:
                        window.location.reload();
                        break;
                    default:
                        alert("Server problems");
                        break;
                }
            }
        }


    }

    const beingEditedHandler = (id, data)=>{
        setUpdateInput({id: id, ip: (data.ip === 'undefined' ? '' : data.ip), city: (data.city === 'undefined' ? '' : data.city), country: (data.country === 'undefined' ? '' : data.country)});
        setBeingEdited((elements)=>{ 
            return id;
        });
    }

    const logout = ()=>{
        Cookies.set('auth', false ,{path:'/'});
        window.location.reload();
    }

    return (
        <section id="searchPanel">
            <Button variant="secondary" onClick={logout}>LOGOUT</Button>
            <Container style={{"paddingTop":"5%"}}>
                <Row>
                    <Col>
                        <h3 style={{"color": "white", "textAlign": "center"}}>Locations - Search / Add / Update / Remove</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <td colSpan="3">
                                        <div className="d-grid gap-2"><Form.Control onChange={(e)=>{setAddInput(e.target.value)}} placeholder="Enter IP address or URI" type="text" value={addInput}></Form.Control></div>
                                    </td>
                                    <td colSpan="2">
                                        <div className="d-grid gap-2"><Button onClick={()=>{addLocation()}} variant="success">Add IP</Button></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th onClick={()=>{setSort({...sort, sip: (sort.sip == 1 ? -1 : 1)})}}>IP {( sort.sip == 1 ? <BsFillArrowUpSquareFill /> : <BsFillArrowDownSquareFill />)}</th>
                                    <th onClick={()=>{setSort({...sort, scity: (sort.scity == 1 ? -1 : 1)})}}>City {( sort.scity == 1 ? <BsFillArrowUpSquareFill /> : <BsFillArrowDownSquareFill />)}</th>
                                    <th onClick={()=>{setSort({...sort, scountry: (sort.scountry == 1 ? -1 : 1)})}}>Country {( sort.scountry == 1 ? <BsFillArrowUpSquareFill /> : <BsFillArrowDownSquareFill />)}</th>
                                    <th onClick={()=>{setSort({...sort, screatedAt: (sort.screatedAt == 1 ? -1 : 1)})}}>createdAt {( sort.screatedAt == 1 ? <BsFillArrowUpSquareFill /> : <BsFillArrowDownSquareFill />)}</th>
                                    <th>Action</th>
                                </tr>
                                <tr>
                                    <td><Form.Control type="text" placeholder="Enter IP" value={searchInput.ip} onChange={(e)=>{setSearchInput({...searchInput, ip: e.target.value})}} /></td>
                                    <td><Form.Control type="text" placeholder="Enter City" value={searchInput.city}  onChange={(e)=>{setSearchInput({...searchInput, city: e.target.value})}} /></td>
                                    <td><Form.Control type="text" placeholder="Enter Country" value={searchInput.country}  onChange={(e)=>{setSearchInput({...searchInput, country: e.target.value})}} /></td>
                                    <td></td>
                                    <td><div className="d-grid gap-2"><Button size="md" onClick={()=>{searchLocation()}}>Search</Button></div></td>
                                </tr>
                            </thead>
                            <tbody>
                                {(searchData.length > 0 ? searchData.map((data, index)=>{
                                  if(index < state.page*itemsOnPage && index > (state.page*itemsOnPage-itemsOnPage-1)){
                                        return  <tr key={data["_id"]} ref={el => trElement.current[data["_id"]] = el}>
                                        <td>{(beingEdited !== data["_id"] ? <div>{data.ip}</div> : <Form.Control defaultValue={data.ip} onChange={(e)=>{setUpdateInput({...updateInput, ip: e.target.value})}} />)}</td>
                                        <td>{(beingEdited !== data["_id"] ? <div>{data.city}</div> : <Form.Control defaultValue={data.city} onChange={(e)=>{setUpdateInput({...updateInput, city: e.target.value})}} />)}</td>
                                        <td>{(beingEdited !== data["_id"] ? <div>{data.country}</div> : <Form.Control defaultValue={data.country} onChange={(e)=>{setUpdateInput({...updateInput, country: e.target.value})}} />)}</td>
                                        <td><div>{moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div></td>
                                        <td>
                                            <div className="d-grid gap-2"><Button onClick={()=>{deleteLocation(data["_id"])}} variant="danger">Remove</Button></div>
                                            <br></br>
                                            {(beingEdited !== data["_id"] ? <div className="d-grid gap-2"><Button onClick={()=>{beingEditedHandler(data["_id"], data)}} variant="secondary">Edit</Button></div> : <div className="d-grid gap-2"><Button onClick={()=>{updateLocation(data["_id"])}} variant="warning">Update</Button></div>) }
                                        </td>
                                    </tr>
                                  }

                                }): <tr><td colSpan="5">No results</td></tr>)}
                                <Pagination itemsOnPage={itemsOnPage} searchData={searchData}></Pagination>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default LocationSearch;