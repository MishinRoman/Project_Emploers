import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { Paths } from "./paths"
import Login from "./pages/login"
import Register from "./pages/register"
import { ConfigProvider, theme } from "antd"
import Layout from "./componets/layout"
import { Auth } from "./features/auth/auth"
import { Employees } from "./pages/employees"
import { AddEmployee } from "./pages/add-employee"
import { Status } from "./pages/status"
import { Employee } from "./pages/employee"
import { EditEmployee } from "./pages/edit-employee"

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },

  {
    path: Paths.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
])
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
