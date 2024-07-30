import Tools from "./Tools";

export default class Brush extends Tools {
  public mouseDown = false;

  constructor(canvas: {
    onmousemove: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
    onmousedown: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
    onmouseup: (e: Event ) => void;
    new(): HTMLCanvasElement; getContext?: any; prototype?: HTMLCanvasElement;
    toDataURL(type?: string, quality?: any): string;
  }) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e: Event) {
    this.mouseDown = false;
  }

  mouseDownHandler(e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }}) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)

  }

  mouseMoveHandler(e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; };}) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x: number, y: number) {

    this.ctx.lineTo(x, y);

    this.ctx.stroke();
    console.log('draw brush')
  }

}
