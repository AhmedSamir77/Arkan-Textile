import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LayOut from "./Pages/LayOut/LayOut";
import NotFound from "./Pages/NotFound/NotFound";
import About from "./Pages/About/About";
import Users from "./Pages/Users/Users";
import Sizes from "./Pages/Sizes/Sizes";
import Products from "./Pages/Products/Products";
import Languages from "./Pages/Languages/Languages";
import Colors from "./Pages/Colors/Colors";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Categories from "./Pages/Categories/Categories";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },

        { path: "about", element: <About /> },
        {
          path: "users",
          element: (
            <ProtectedRoute>
              {" "}
              <Users />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "sizes",
          element: (
            <ProtectedRoute>
              {" "}
              <Sizes />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "languages",
          element: (
            <ProtectedRoute>
              {" "}
              <Languages />
            </ProtectedRoute>
          ),
        },
        {
          path: "colors",
          element: (
            <ProtectedRoute>
              {" "}
              <Colors />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "contactUs",
          element: (
            <ProtectedRoute>
              {" "}
              <ContactUs />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
