import React from "react";
import { Box } from "@mui/system";
import UploadProvider from "./context/UploadContext/UploadContext";
import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./BrowserRouter";

const router = createRoutes();

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
                <RouterProvider router={router} />
            </UploadProvider>
        </Box>
    );
}

export default App;
