import {makeAutoObservable} from "mobx";

class CanvasState {
  canvas = null;
  socket = null;
  sessionId = null;
  undoList = [];
  redoList = [];
  username = '';

  constructor() {
    makeAutoObservable(this)
  }

  setSocket(socket: string) {
    // @ts-ignore
    this.socket = socket
  }

  setSessionId(id: string) {
    // @ts-ignore
    this.sessionId = id
  }

  setUserName(username: string) {
    this.username = username
  }

  setCanvas(canvas: any) {
    this.canvas = canvas;
  }

  pushToUndo(data:any) {
    // @ts-ignore
    this.undoList.push(data)
  }

  pushToRedo(data:any) {
    // @ts-ignore
    this.redoList.push(data)
  }

  undo () {
    // @ts-ignore
    let ctx = this.canvas.getContext('2d')
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();
      // @ts-ignore
      this.redoList.push(this.canvas.toDataURL())
      let img = new Image();
      // @ts-ignore
      img.src = dataUrl
      img.onload = () => {
        // @ts-ignore
        ctx.clearRect(0 , 0, this.canvas.width, this.canvas.height)
        // @ts-ignore
        ctx.drawImage(img, 0 , 0, this.canvas.width, this.canvas.height)
      }
    } else {
      // @ts-ignore
      ctx.clearRect(0 , 0, this.canvas.width, this.canvas.height)
    }
  }

  redo() {
    // @ts-ignore
    let ctx = this.canvas.getContext('2d')
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();
      // @ts-ignore
      this.undoList.push(this.canvas.toDataURL())
      let img = new Image();
      // @ts-ignore
      img.src = dataUrl
      img.onload = () => {
        // @ts-ignore
        ctx.clearRect(0 , 0, this.canvas.width, this.canvas.height)
        // @ts-ignore
        ctx.drawImage(img, 0 , 0, this.canvas.width, this.canvas.height)
      }
    }
  }
}
export default new CanvasState();

