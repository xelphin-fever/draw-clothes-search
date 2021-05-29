
const shapeReducer = (state="15", action) => {
  switch (action.type){
    case "UPDATE_SHAPE":
      return action.payload.shape;
    default:
      return state;
  }
}

export default shapeReducer;