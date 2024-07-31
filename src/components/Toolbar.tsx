import React from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";

const Toolbar = () => {
  return (
    <div className="toolbar">

      <button className="toolbar__btn brush"
              onClick={() => toolState.setTool(new Brush(
        // @ts-ignore
                canvasState.canvas
      ))} />
      <button className="toolbar__btn rect"
              onClick={() => toolState.setTool(new Rect(
                // @ts-ignore
                canvasState.canvas
              ))}
      />
      <button className="toolbar__btn circle"
              onClick={() => toolState.setTool(new Circle(
                // @ts-ignore
                canvasState.canvas
              ))}
      />
      <button className="toolbar__btn eraser" />
      <button className="toolbar__btn line" />
      <input style={{marginLeft: 10}} type="color" />
      <button className="toolbar__btn undo" />
      <button className="toolbar__btn redo" />
      <button className="toolbar__btn save" />
    </div>
  );
};

export default Toolbar;
