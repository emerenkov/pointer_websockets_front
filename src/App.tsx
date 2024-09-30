import React from 'react';
import './styles/app.scss';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";

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
    <div className="App">
      <Toolbar/>
      <SettingBar/>
      <Canvas/>
    </div>
  );
}

export default App;
