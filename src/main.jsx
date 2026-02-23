import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CreateTrip from "./create-trip/index.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/ui/custom/Header.jsx";
//import { Toaster } from "@/components/ui/sonner";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "create-trip",
//     element: <CreateTrip />,
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    {/* <RouterProvider router={router} basename="/PLANORA" /> */}
    <RouterProvider
      router={createBrowserRouter(
        [
          {
            path: "/",
            element: <App />,
          },
          {
            path: "create-trip",
            element: <CreateTrip />,
          },
        ],
        { basename: import.meta.env.BASE_URL }
      )}
    />
  </StrictMode>
);
