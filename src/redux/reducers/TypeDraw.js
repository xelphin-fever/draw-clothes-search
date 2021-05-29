
const typeDrawReducer = (state="draw", action) => {
  switch (action.type){
    case "UPDATE_DRAW":
      return action.payload.type;
    default:
      return state;
  }
}

export default typeDrawReducer;