import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/actions"


function Pagination(props) {

    const itemsOnPage = props.itemsOnPage;
    const dispatch = useDispatch();
  
    const { setPage } = bindActionCreators(actionCreators, dispatch);

    const createPagination = ()=>{
        let pageCnt = 1;
        let pages = [];
        props.searchData.map((element, index)=>{
            if(typeof pages[pageCnt] === 'undefined'){
                pages[pageCnt] = [];
            }
            if((index+1) % itemsOnPage === 0){
                pages[pageCnt].push(element);
                if(index != 0){
                    pageCnt++;
                }
            }
            else{
                pages[pageCnt].push(element);
            }
            return element;
        });
        return pages;
    }
    createPagination();

    return (
        <React.Fragment>
        <tr>
            <td colSpan="5" style={{textAlign:"right"}}>
                {createPagination().map((page, index)=>{
                    return <Button onClick={()=>{setPage(index)}} className="pageBtn" key={"p"+index} style={{"margin": "5px", "padding": "5px", "fontSize": "20px"}}>{index}</Button>
                })}
            </td>
        </tr>
        </React.Fragment>
    )
}

export default Pagination
