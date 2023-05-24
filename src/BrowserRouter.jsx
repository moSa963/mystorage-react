import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage";
import ErrorPage from "./pages/ErrorPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import GroupsPage from "./pages/GroupsPage";
import BinPage from "./pages/BinPage/BinPage";
import NotificationsPage from "./pages/NotificationsPage";
import ShowGroupPage from "./pages/ShowGroupPage/ShowGroupPage";
import ShowFilePage from "./pages/ShowFilePage/ShowFilePage";
import FilesPage from "./pages/FilesPage/FilesPage";

export const createRoutes = () => createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <ProtectedRoute Element={HomePage} />,
        children: [
            {
                index: true,
                element: <Navigate replace to="/files/root" />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
            {
                path: "groups",
                element: <GroupsPage />,
            },
            {
                path: "bin",
                element: <BinPage />,
            },
            {
                path: "notifications",
                element: <NotificationsPage />,
            },
            {
                path: "group/:id",
                element: <ShowGroupPage />,
            },
            {
                path: "file/:group_id/:file_id",
                element: <ShowFilePage />,
            },
            {
                path: "files",
                element: <FilesPage />,
                children: [
                    {
                        path: ":group/root/*",
                        element: <FilesPage />,
                    },
                    {
                        path: "root/*",
                        element: <FilesPage />,
                    },
                ],
            },
        ],
    },
    {
        path: "login",
        errorElement: <ErrorPage />,
        element: <ProtectedRoute guest Element={RegisterPage} />,
    },
    {
        path: "register",
        errorElement: <ErrorPage />,
        element: <ProtectedRoute guest Element={RegisterPage} />,
    },
    {
        path: "verify",
        errorElement: <ErrorPage />,
        element: <ProtectedRoute guest unverified Element={VerifyEmailPage} />,
    },
    {
        path: "error/:status/:statusText",
        element: <ErrorPage />,
    },
]);