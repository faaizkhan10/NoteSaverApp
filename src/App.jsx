import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { store } from "./store";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/pastes",
    element: (
      <ProtectedRoute>
        <div>
          <Navbar />
          <Paste />
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <ProtectedRoute>
        <div>
          <Navbar />
          <ViewPaste />
        </div>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </div>
    </Provider>
  );
}

export default App;
