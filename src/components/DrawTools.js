
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import BrushIcon from '@material-ui/icons/Brush';
import UndoIcon from '@material-ui/icons/Undo';
import ClearIcon from '@material-ui/icons/Clear';
import ColorPicker from './ColorPicker'
import SizePicker from './SizePicker'
import { ReactComponent as Eraser } from '../icons/eraser.svg';
import {useDispatch, useSelector} from 'react-redux';
import {updateTypeDraw} from '../redux/actions'
import React, { useEffect } from 'react';

const DrawTools = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const iconWidth = "40px";

  const iconSize = {
    width: iconWidth,
    height: iconWidth,
  }

  useEffect(()=> {
    console.log('state - ', state);
  }, [state])

  return (
    <div className="draw-tools-div">
      <ColorPicker  iconWidth={iconWidth} />
      <FormatColorFillIcon style={iconSize} onClick={() => { dispatch(updateTypeDraw("fill")) }}/>
      <BrushIcon style={iconSize} onClick={() => { dispatch(updateTypeDraw("draw")) }}/>
      <SizePicker/>
      <Eraser  style={iconSize} onClick={() => { dispatch(updateTypeDraw("erase")) }}/>
      <UndoIcon style={iconSize} onClick={() => { dispatch(updateTypeDraw("undo")) }}/>
      <ClearIcon style={iconSize} onClick={() => { dispatch(updateTypeDraw("clear")) }}/>
    </div>
  )
}

export default DrawTools;
