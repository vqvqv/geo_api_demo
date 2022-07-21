

const reducer = (state = null, action)=>{
    switch(action.type){
        case 'setPage':
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default reducer;