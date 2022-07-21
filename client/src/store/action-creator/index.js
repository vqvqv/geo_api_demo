export const setAuthentication = (value)=>{
    return (dispatch)=>{
        dispatch({
            type: "setAuth",
            payload: value
        })
    }
}
export const getAuthentication = (value)=>{
    return (dispatch)=>{
        dispatch({
            type: "getAuth",
            payload: value
        })
    }
}

export const setPage = (value)=>{
    return (dispatch)=>{
        dispatch({
            type: "setPage",
            payload: value
        })
    }
}
export const getPage = (value)=>{
    return (dispatch)=>{
        dispatch({
            type: "getPage",
            payload: value
        })
    }
}