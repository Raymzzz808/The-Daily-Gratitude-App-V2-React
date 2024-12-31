import React from "react";
import { StrictMode } from "react";

import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);


// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);