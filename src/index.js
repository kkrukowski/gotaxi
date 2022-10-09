import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Provide Redux store to React
import { store } from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <div className="absolute bg-cover h-full w-full bg-[url('https://i.imgur.com/WgW280A.jpeg')]">
      <p> </p>
    </div>
    <App />
  </Provider>
);