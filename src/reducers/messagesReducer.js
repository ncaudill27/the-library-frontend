const initialState = {
  message: ''
}

export default messagesReducer = (state = initialState, action) => {
  
  switch(action.type) {

    case "FLASH_MESSAGE":
      return {...state, message: action.message};

    case "REMOVE_FLASH":
      return {...state, message: ''};
    
    default: 
      return state;
  }
}