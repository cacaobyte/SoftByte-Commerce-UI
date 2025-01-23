import React from "react";
import { registerRootComponent } from "expo";
import Page from "./src/app/page";

const App = () => {
  return <Page />;
};

// Registra el componente raíz para Expo
registerRootComponent(App);

export default App;
