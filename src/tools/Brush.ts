import Tools from "./Tools";

export default class Brush extends Tools {
  public mouseDown = false;

  constructor(canvas: {
    onmousemove: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
    onmousedown: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
    onmouseup: (e: Event ) => void;
    new(): HTMLCanvasElement; getContext?: any; prototype?: HTMLCanvasElement;
    toDataURL(type?: string, quality?: any): string;
  }, socket:any, id:any) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e: Event) {
    this.mouseDown = false;
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'finish',
      }
    }))
  }

  mouseDownHandler(e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }}) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)

  }

  mouseMoveHandler(e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; };}) {
    if (this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'brush',
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
        }
      }))
    }
  }

  static draw(ctx: any, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke()
  }

}
