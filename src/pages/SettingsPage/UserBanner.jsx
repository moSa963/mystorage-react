import React from "react";
import { Box } from "@mui/system";
import { LinearProgress, Typography } from "@mui/material";
import { BASE_URL } from "../../http/Request";
import { updateUser } from "../../http/Data";
import { StyledFillInput, StyledImg } from "../../components/StyledComponents";


const UserBanner = ({ user })=>{
    const [processing, setProcessing] = React.useState(false);

    const handleImageChange = (event)=>{
        if (!processing){
            updateImage(event.currentTarget.files[0], setProcessing);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
        }}>
            {processing && <LinearProgress sx={{position: 'absolute', inset: "0 0 0"}}/>}

            <Box sx={{ position: 'relative', display: 'flex', aspectRatio: "1", maxWidth: 100, height: 'fit-content', justifyContent: 'center', }} >
                <StyledImg src={BASE_URL + 'api/image/user/' + user.username} />
                <StyledFillInput type="file" accept="image/*" onChange={handleImageChange}/>
            </Box>
            <Box sx={{flex: 1, pl: 3}}>
                <Typography>{user.first_name + " " + user.last_name}</Typography>
                <Typography variant="caption">{user.username}</Typography>
            </Box>
        </Box>
    );
}


const updateImage = async (img, setProcessing) => {
    setProcessing(true);
    
    const res = await updateUser(img);

    if (res.ok){
        window.location.reload();
    }
}


export default UserBanner;