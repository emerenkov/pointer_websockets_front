
export default class Tools {
  public canvas;
  public ctx;
  constructor(canvas: {
      toDataURL(type?: string, quality?: any): string;
      onmousemove: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
      onmousedown: (e: { pageX: number; pageY: number; target: { offsetLeft: number; offsetTop: number; }; }) => void;
      onmouseup: (e: Event ) => void;
      // onmouseup: null | number;
      // onmousedown: null | EventTarget;
      // onmousemove: null | EventTarget;
      new(): HTMLCanvasElement; getContext?: any; prototype?: HTMLCanvasElement;
  }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.destroyEvents()
    console.log(this.ctx)
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
