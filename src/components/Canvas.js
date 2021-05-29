// https://www.youtube.com/watch?v=FLESHMJ-bI0
import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import footImage from '../images/woman-foot-rise-outline.png'
import {updateTypeDraw} from '../redux/actions'


const Canvas = () => {
  const dispatch = useDispatch();

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const color = useSelector(state => state.color);
  const shape = useSelector(state => state.shape);
  const type = useSelector(state => state.typeDraw);

  // undo
  const [restoreArray, setRestoreArray] = useState([]);
  const [restoreIndex, setRestoreIndex] = useState(-1);
  const restoreIndexRef = useRef(restoreIndex);
  const restoreArrayRef = useRef(restoreArray);

  useEffect(() => {
    console.log('mounting canvas');
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth*2;
    canvas.height = window.innerHeight*2;
    canvas.style.width = `${window.innerWidth*(1/2)}px`;
    canvas.style.height = `${window.innerHeight*(3/4)}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = String(color);
    context.lineWidth = Number(shape);
    
    contextRef.current = context;
  }, []);


  // Color Change
  useEffect(() => {
    contextRef.current.strokeStyle =  String(color);
  }, [color]);

  // Shape Change
  useEffect(() => {
    contextRef.current.lineWidth =  Number(shape);
  }, [shape]);

  // Type Change 
  useEffect(() => {
    if (type==="clear"){
      clear();
    } else if (type ==="erase") {
      contextRef.current.globalCompositeOperation = 'destination-out';
    } else if (type ==="draw") {
      contextRef.current.globalCompositeOperation = 'source-over';
    } else if (type ==="undo") {
      undoLast();
    }
  }, [type]);

  
  const undoLast = () => {
    console.log('undoLast  restoreArray: ', restoreArray);
    console.log('undoLast  restoreIndex: ', restoreIndex);
    if (restoreIndex === -1){
      console.log('below I call clearing');
      clear();
      dispatch(updateTypeDraw("draw"));
      return
    }
    setRestoreIndex(restoreIndex-1);
    let copyArray = [...restoreArray];
    copyArray.pop();
    setRestoreArray(copyArray);
    contextRef.current.putImageData(restoreArray[restoreIndex],0,0);
    dispatch(updateTypeDraw("draw"));
  }

  const clear = () => {
    console.log("clearing");
    contextRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
    dispatch(updateTypeDraw("draw"));

    // for undo
    setRestoreArray([]);
    setRestoreIndex(-1);
  }



  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX/ (1/2) , offsetY/ (3/4));
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    // for undo
    const currentDrawing = contextRef.current.getImageData(0,0,canvasRef.current.width,canvasRef.current.height)
    let arrayCopy = [ ...restoreArray, currentDrawing];
    setRestoreArray(arrayCopy);
    setRestoreIndex(restoreIndex+1);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || (type!=="draw" && type!=="erase")) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX/ (1/2), offsetY/ (3/4));
    contextRef.current.stroke();
  };

  return (
    <div className="canvas-div">
        <canvas
          className="canvas"
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref = {canvasRef}
        />
        <img className="canvas-image" src={footImage} alt="foot" style={{height: `${window.innerHeight*(3/4)}px`}}/>
    </div>
    
  )
}

export default Canvas;