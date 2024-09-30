import React from 'react';
import './styles/app.scss';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

interface ICh {
  data: number
  // children?: JSX.Element|JSX.Element[];
  children?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

function App() {
  const data = 6;

  const fn = (data: number) => {
    return {data, id: 4, name: "Kont"}
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/:id' element={
            <>
              <Toolbar/>
              <SettingBar/>
              <Canvas/>
            </>
          } />
          <Route path="*" element={<Navigate to={`f${(+new Date).toString(16)}`} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
