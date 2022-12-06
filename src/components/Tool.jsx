import { Divider, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";


const Tool = ({ name, Icon, onClick, tools, transform, type, onChange })=>{

    return (
        <React.Fragment>
            {
                tools.find(v => v === name) &&
                <Box onClick={() => onClick(name)} sx={{ minWidth:'fit-content' }}>
                    <Divider sx={{m: 1}} orientation="vertical" flexItem />
                    <IconButton onClick={(e) => e.currentTarget.children[1].click()} sx={{ transform: transform }} size="medium" title={name}>
                        <Icon />
                        <input style={{ display: "none" }} type={type} onChange={onChange} multiple />
                    </IconButton>
                </Box>
            }
        </React.Fragment>
    );
};


export default Tool;