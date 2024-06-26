import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../features/auth/login/LoginPage";
import RegisterPage from "../features/auth/register/RegisterPage";
import SourcesPage from "../pages/SourcesPage";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>
        },
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/register",
            element: <RegisterPage/>
        },
        {
            path: "/sources",
            element: <SourcesPage/>
        }
    ]
);

export default router;