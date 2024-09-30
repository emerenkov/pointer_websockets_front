import Tool from "./Tools";
import Brush from "./Brush";

export default class Eraser extends Brush {
  // @ts-ignore
  constructor(canvas) {
    super(canvas);
  }

// @ts-ignore
  draw(x, y) {
    this.ctx.strokeStyle = "white"
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }
}