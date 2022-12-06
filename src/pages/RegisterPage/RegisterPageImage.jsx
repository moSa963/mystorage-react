import { Box } from "@mui/system";
import React from "react";
import TextSnippet from "@mui/icons-material/TextSnippet";
import Folder from "@mui/icons-material/Folder";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ImageIcon from '@mui/icons-material/Image';
import Icon from "./Icon";



const PageImage = ()=>{


    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Icon shadow={7} translateX="40px" translateY="40px" hoverShadow={1}>
                <TextSnippet sx={{ width: '100%', height: '100%', }} />
            </Icon>
            <Icon shadow={2} translateX="50px" translateY="-50px" hoverShadow={10}>
                <Folder sx={{ width: '100%', height: '100%', }} />
            </Icon>
            <Icon shadow={2} translateX="-50px" translateY="50px" hoverShadow={10}>
                <AudiotrackIcon sx={{ width: '100%', height: '100%', }} />
            </Icon>
            <Icon shadow={8} translateX="-40px" translateY="-40px" hoverShadow={1}>
                <ImageIcon sx={{ width: '100%', height: '100%', }} />
            </Icon>
        </Box>
    );
};


export default PageImage;