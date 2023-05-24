import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useParams, useRouteError } from "react-router-dom";



const ErrorPage = () => {
    const param = useParams();
    const error = useRouteError();

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', }}>
            <Typography variant="h5">{param?.status || error?.status}</Typography>
            <Typography variant="h4">{param?.statusText || error?.statusText}</Typography>
        </Box>
    );
}


export default ErrorPage;