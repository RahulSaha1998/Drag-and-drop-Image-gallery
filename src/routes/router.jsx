import { createBrowserRouter } from "react-router-dom";
import NotFound404 from "../pages/NotFound404";

import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
    ,
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);
export default router