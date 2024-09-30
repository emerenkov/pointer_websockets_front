import Tools from "./Tools";

export default class Line extends Tools {
  constructor(canvas: {
    onmousemove: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
    onmousedown: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
    onmouseup: (e: Event ) => void;
    new(): HTMLCanvasElement; getContext?: any; prototype?: HTMLCanvasElement;
    toDataURL(type?: string, quality?: any): string;
  }) {
    super(canvas);
    this.listen()
    // @ts-ignore
    this.name = 'Line'
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  // @ts-ignore
  mouseDownHandler(e) {
    // @ts-ignore
    this.mouseDown = true
    // @ts-ignore
    this.currentX = e.pageX-e.target.offsetLeft
    // @ts-ignore
    this.currentY = e.pageY-e.target.offsetTop
    this.ctx.beginPath()
    // @ts-ignore
    this.ctx.moveTo(this.currentX, this.currentY )
    // @ts-ignore
    this.saved = this.canvas.toDataURL()
  }
  // @ts-ignore
  mouseUpHandler(e) {
    // @ts-ignore
    this.mouseDown = false
  }
  // @ts-ignore
  mouseMoveHandler(e) {
    // @ts-ignore
    if (this.mouseDown) {
      this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
    }
  }

// @ts-ignore
  draw(x,y) {
    const img = new Image()
    // @ts-ignore
    img.src = this.saved
    img.onload = async function () {
      // @ts-ignore
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
      // @ts-ignore
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      // @ts-ignore
      this.ctx.beginPath()
      // @ts-ignore
      this.ctx.moveTo(this.currentX, this.currentY )
      // @ts-ignore
      this.ctx.lineTo(x, y)
      // @ts-ignore
      this.ctx.stroke()
    }.bind(this)

  }
}
