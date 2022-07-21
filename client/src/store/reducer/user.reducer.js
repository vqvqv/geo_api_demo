

const reducer = (state = null, action)=>{
    switch(action.type){
        case 'setAuth':
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default reducer;