import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header.jsx";
import Footer from "./components/custom/Footer.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx";

const Layout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <div className="flex-1">
      <Outlet />
    </div>
    <Footer />
    <Toaster />
  </div>
);

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <App /> },
        { path: "/create-trip", element: <CreateTrip /> },
        { path: "/view-trip/:tripId", element: <ViewTrip /> },
        { path: "/my-trip", element: <MyTrips /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
