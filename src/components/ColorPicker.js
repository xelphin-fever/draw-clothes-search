import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import {useSelector, useDispatch} from 'react-redux'
import {updateColor} from '../redux/actions'


const ColorPicker = (props) => {

  let [showPicker, setShowPicker] = useState(false);
  const color = useSelector(state => state.color);
  const dispatch = useDispatch();

  const circleColor = {
    backgroundColor: color,
    width: props.iconWidth,
    height: props.iconWidth,
  }

  const togglePicker = ()=> {
    setShowPicker(!showPicker);
  }

  const handleChangeComplete = (colorPicked) => {
    dispatch(updateColor(colorPicked.hex));
  }

  return (
    <div className="color-picker-div">
      <div className="color-picker-circle" style={circleColor} onClick={togglePicker} ></div>
      { showPicker === true 
        ? <div className="color-picker">
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        : null
      }
    </div>
  )
}

export default ColorPicker;