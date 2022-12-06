import React from "react";
import { Box } from "@mui/system";
import { Input } from "@mui/material";

const CharInput = ({ onChange, disabled})=>{
    const [value, setValue] = React.useState("");
    const [selected, setSelected] = React.useState(false);

    const handleTextChange = (event) =>{
        var value = event.currentTarget.value;
        value = value.length > 0 ? value.charAt(value.length - 1) : "";
        value = value === " " ? "" : value;
        setValue(value);
        onChange(value);
    }
    
    return (
        <Box  sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding:{ xs: 0.3, sm: 1, },
        }}>
            <Box sx={{
                position: 'relative',
                display: 'block',
                width: '100%',
                paddingTop: '100%',
                backgroundColor: 'background.default',
                boxShadow: theme => theme.shadows[selected ? 5 : 0],
                transition: '300ms ease-in-out',
            }}>
                <Input sx={{
                    position: 'absolute',
                    inset: "0 0 0 0",
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    fontSize: { xs: 35 , sm: 55, },
                    "& > *": { textAlign: 'center', }
                }} 
                    disabled={disabled}
                    onFocus={()=>setSelected(true)}
                    onBlur={()=>setSelected(false)}
                    value={value}
                    onChange={handleTextChange}
                />
            </Box>
        </Box>
    );
}



export default CharInput;