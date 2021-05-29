import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {updateShape} from '../redux/actions'

const SizePicker = (props) => {
  const dispatch = useDispatch();
  const sizeArray = ["15","35","55","65"];
  const color = useSelector(state => state.color);
  const shape = useSelector(state => state.shape);

  // Update Shape (State)
  const update = (event) => {
    const allSizes = document.querySelectorAll('.size-picker-option');
    allSizes.forEach((size) => {
      size.style.backgroundColor="white"
    })
    event.currentTarget.style.backgroundColor=color;
    dispatch(updateShape(event.currentTarget.getAttribute('data-size')));
  }

  // Update Color or Size Option
  useEffect(() => {
    // MAKE SURE INITIAL SIZE MATCHES AT LEAST ONE SIZE PICKER
    const options = document.querySelectorAll(`.size-picker-option`);
    const optionsArray = [...options];
    const currentBrush = optionsArray.filter(brush => brush.getAttribute('data-size')===shape);
    if (currentBrush.length!==0){
      currentBrush[0].style.backgroundColor=color;
    }
  }, [color, shape])

  return (
    <div className="size-picker-div">
      {sizeArray.map((size) => {
        return <div
          key={size}
          style={{width: `${size}px`, height: `${size}px`, backgroundColor: 'white' }}
          className="size-picker-option"
          data-size={size}
          onClick={update}>
        </div>
      })}
    </div>
  )
}

export default SizePicker;