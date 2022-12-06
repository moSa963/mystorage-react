import { Divider, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import React from "react";
import PageImage from "./RegisterPageImage";


const PageContainer = ({ selectedIndex, children, index })=>{
    

    return (
        <Box sx={{
            position: 'absolute',
            display: 'flex',
            inset: '0 0 0 0',
            width: '100%',
            height: '100%',
            color: 'text.primary',
            backgroundColor: theme=>alpha(theme.palette.background.paper, 0.5),
            transform: `translateX(${(selectedIndex - index) * -50}%) scale(${index === selectedIndex ? 1 : 0.5})`,
            transition: '500ms ease-in-out',
            zIndex: index === selectedIndex ? 5 : 1,
            opacity: selectedIndex === index ? 1 : 0,
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'flex-end'}} >
                <Box sx={{flex: 1, display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3">My Storage</Typography>
                </Box>
                <PageImage />
            </Box>
            <Divider sx={{m: 1}} flexItem orientation="vertical" />
            <Box sx={{display: 'flex', flex: 1.5, p: 5, minWidth: { xs: '100%', sm: 0 }, }} >
                {children}
            </Box>
        </Box>
    )
}


export default PageContainer;