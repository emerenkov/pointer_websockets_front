import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect";
import axios from "axios";

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const usernameRef = useRef(null);
  const [modal, setModal] = useState(true);
  const params = useParams()

  useEffect(()=> {
    canvasState.setCanvas(canvasRef.current);
    // @ts-ignore
    let ctx = canvasRef.current.getContext('2d')
    axios.get(`http://localhost:5001/image?id=${params.id}`)
      .then(respons => {
        const img = new Image();
        img.src = respons.data;
        console.log(respons.data)
        img.onload = () => {
          // @ts-ignore
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          // @ts-ignore
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

        }
      })
  }, []);

  useEffect(()=> {
    if (canvasState.username) {
      const socket = new WebSocket('ws://localhost:5001/')
      // @ts-ignore
      canvasState.setSocket(socket)
      // @ts-ignore
      canvasState.setSessionId(params.id)
      // @ts-ignore
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: 'connection',
        }))
      }
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data)
        switch (msg.method) {
          case 'connection':
            console.log(`User name ${msg.username} connected`)
            break
          case 'draw':
            drawHandler(msg)
            break
        }
      }
    }
  }, [canvasState.username]);

  const drawHandler = (msg:any) => {
    const figure = msg.figure;
    const ctx = canvasRef.current?.getContext('2d');
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y)
        break
      case 'rect':
        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
        break
      case 'finish':
        // @ts-ignore
        ctx.beginPath()
        break
    }
  }

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current?.toDataURL())
    axios.post(`http://localhost:5001/image?id=${params.id}`, {img: canvasRef.current?.toDataURL()})
      .then(res => console.log(res.data))
  }

  const connectHandler = () => {
    // @ts-ignore
    canvasState.setUserName(usernameRef.current?.value)
    setModal(false)
  }


  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> connectHandler()}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400} />
    </div>
  );
});

export default Canvas;
