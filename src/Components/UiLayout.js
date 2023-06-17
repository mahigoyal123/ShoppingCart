import React from "react";
import "../Styles/UiLayout.css";
import Header from "./Header";
import MainContainer from "./MainContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Body";
import Cart from "./Cart";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <><Header /><Body /></>,
  },
  {
    path: "cart",
    element: <><Header /><Cart /></>,
  },
]);

const UiLayout = () => {
  return (
    <div className="trs-layout-container">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default UiLayout;
