import React from 'react';
import DrawTools from '../components/DrawTools'
import Canvas from '../components/Canvas'
import '../stylesheets/Draw.css'

const DrawPage = (props) => {

  return (
    <div className="page-draw">
      <h1> Draw The Shoe </h1>
      <DrawTools/>
      <Canvas/>
    </div>
    
  )
}

export default DrawPage