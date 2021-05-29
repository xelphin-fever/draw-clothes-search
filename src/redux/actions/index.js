
export const updateColor = (color) => {
  return {
    type: "UPDATE_COLOR",
    payload: {color: color}
  }
}

export const updateShape = (shape) => {
  return {
    type: "UPDATE_SHAPE",
    payload: {shape: shape}
  }
}

export const updateTypeDraw = (type) => {
  return {
    type: "UPDATE_DRAW",
    payload: {type: type}
  }
}