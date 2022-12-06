import { Box } from "@mui/system";
import React from "react";


const Icon = ({ children, translateX, translateY, shadow = 0, hoverShadow = 0 })=>{

    return (
        <Box sx={{
            position: 'absolute', 
            display: 'flex',
            borderRadius: '50%',
            width: 75,
            transition: '500ms ease-in-out',
            padding: 2,
            height: 75,
            boxShadow: theme=>theme.shadows[shadow],
            backgroundColor: 'background.paper', 
            transform: `translate(${translateX}, ${translateY})`,
            ":hover":{
                boxShadow: theme=>theme.shadows[hoverShadow],
            }
        }}>
            {children}
        </Box>
    );
};



export default Icon;