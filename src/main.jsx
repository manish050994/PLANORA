import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CreateTrip from "./create-trip/index.jsx";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/ui/custom/Header.jsx";
import { Toaster } from "sonner";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={createBrowserRouter(
        [
          {
            element: <Layout />,
            children: [
              {
                path: "/",
                element: <App />,
              },
              {
                path: "create-trip",
                element: <CreateTrip />,
              },
            ],
          },
        ],
        { basename: import.meta.env.BASE_URL }
      )}
    />
  </StrictMode>
);
