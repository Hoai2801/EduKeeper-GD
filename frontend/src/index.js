import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Toaster
                toastOptions={{
                    duration: 2000,
                }}
                position="top-right"
                reverseOrder={false}
            />
        </BrowserRouter>
    </React.StrictMode>
);