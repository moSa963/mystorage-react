import React from "react";
import { Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import { Link } from "react-router-dom";



const MenuItem = ({  onClick, Icon, title, index, selected, to })=>{

    return (
        <Link to={to}>
            <Box onClick={onClick} title={title}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    backgroundColor: index === selected ? "background.default" : "primary.dark",
                    ":hover":{
                        backgroundColor: theme => alpha(theme.palette.background.paper, index === selected ? 0 : 0.5),
                    },
                    transition: "border-radius 100ms ease-in-out",
                    padding: 2,
                    borderBottomRightRadius: index === selected - 1 ? 40 : 0,
                    borderTopRightRadius: index === selected + 1 ? 40 : 0,
            }}>
                {Icon}
                <Typography sx={{
                    marginLeft: 2,
                    display:{xs: 'none',sm: 'none',md: 'flex',},
                }}>
                    {title}
                </Typography>
            </Box>
        </Link>
    );
}




export default MenuItem;