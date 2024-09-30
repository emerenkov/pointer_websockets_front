import Tools from "./Tools";

export default class Circle extends Tools {
  public mouseDown = false;
  public startX: any;
  public startY: any;
  public saved: any;
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
  }

  mouseDownHandler(e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }}) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;

    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; };}) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      let width = currentX - this.startX;
      let height = currentY - this.startY;
      let r = Math.sqrt(width**2 + height**2)
      this.draw(this.startX, this.startY, r);
    }
  }

  draw(x: number, y: number, r: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      // @ts-ignore
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // @ts-ignore
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

}
