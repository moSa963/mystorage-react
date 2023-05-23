import React from "react";
import { Box } from "@mui/system";
import UploadProvider from "./context/UploadContext/UploadContext";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage";
import ShowGroupPage from "./pages/ShowGroupPage/ShowGroupPage";
import BinPage from "./pages/BinPage/BinPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ShowFilePage from "./pages/ShowFilePage/ShowFilePage";
import GroupsPage from "./pages/GroupsPage";
import FilesPage from "./pages/FilesPage/FilesPage";


const App = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
            }}
        >
            <UploadProvider>
                <Routes>
                    <Route path="/" element={<ProtectedRoute Element={HomePage} />} >
                        <Route index element={<Navigate replace to="/files/root" />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="groups" element={<GroupsPage />} />
                        <Route path="bin" element={<BinPage />} />
                        <Route path="notifications" element={<NotificationsPage />} />
                        <Route path="group/:id" element={<ShowGroupPage />} />
                        <Route path="file/:group_id/:file_id" element={<ShowFilePage />} />
                        <Route path="files" element={<FilesPage />}>
                            <Route path=":group/root/*" element={<FilesPage />} />
                            <Route path="root/*" element={<FilesPage />} />
                        </Route>
                    </Route>
                    <Route path="login" element={<ProtectedRoute guest Element={RegisterPage} />} />
                    <Route path="register" element={<ProtectedRoute guest Element={RegisterPage} />} />
                    <Route path="verify" element={<ProtectedRoute guest unverified Element={VerifyEmailPage} />} />
                    <Route path="error/:code/:text" element={<ErrorPage />} />
                    <Route path="*" element={<Navigate replace to="/error/404/PAGE NOT FOUND" />} />
                </Routes>
            </UploadProvider>
        </Box>
    );
}

export default App;
