import Tools from "./Tools";

export default class Rect extends Tools {
  public mouseDown = false;
  public startX: any;
  public startY: any;
  public width: any;
  public height: any;
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
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'rect',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
        color: this.ctx.fillStyle,
      }
    }))
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
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      // @ts-ignore
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // @ts-ignore
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  static staticDraw(ctx:any, x: number, y: number, w: number, h: number, color:any) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  }

}
