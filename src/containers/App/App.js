//@flow
import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import "open-sans-fontface/open-sans.css";
import "material-design-icons/iconfont/material-icons.css";
import Content from "../../components/content/Content";
import ActionBar from "../../components/actionBar/ActionBar";
import Menu from "../../components/menu/Menu";
import "./App.css";

injectTapEventPlugin(); // Required by Material-UI

function App() {
  return (
    <div className="App">
      <ActionBar />
      <div className="Main">
        <Menu />
        <Content />
      </div>
    </div>
  );
}

export default App;
