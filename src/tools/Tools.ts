
export default class Tools {
  public canvas;
  public ctx;
  public socket;
  public id;


  constructor(canvas: {
      toDataURL(type?: string, quality?: any): string;
      onmousemove: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
      onmousedown: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
      onmouseup: (e: Event ) => void;
      new(): HTMLCanvasElement; getContext?: any; prototype?: HTMLCanvasElement;
  }, socket: any, id:any) {
    this.socket = socket;
    this.id = id;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.destroyEvents()
  }
  // @ts-ignore
  set fillColor(color) {
    this.ctx.fillStyle = color
  }

  // @ts-ignore
  set strokeColor(color) {
    this.ctx.strokeStyle = color
  }

  // @ts-ignore
  set lineWidth(wigth) {
    this.ctx.lineWidth = wigth
  }

  destroyEvents() {
    // @ts-ignore
    this.canvas.onmousemove = null;
    // @ts-ignore
    this.canvas.onmousedown = null;
    // @ts-ignore
    this.canvas.onmouseup = null;
  }
}
