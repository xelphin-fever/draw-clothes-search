import { combineReducers } from "redux";

import colorReducer from './Color'
import shapeReducer from './Shape'
import typeDrawReducer from './TypeDraw';

const allReducers = combineReducers({
  color: colorReducer,
  shape: shapeReducer,
  typeDraw: typeDrawReducer,
});

export default allReducers;