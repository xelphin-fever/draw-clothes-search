
const colorReducer = (state="black", action) => {
  switch (action.type){
    case "UPDATE_COLOR":
      return action.payload.color;
    default:
      return state;
  }
}

export default colorReducer;