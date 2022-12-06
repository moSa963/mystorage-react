import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import HorizontalList from '../../components/HorizontalList';
import { praseTime } from '../../utilities';
import FileIcon from "../../components/Files/FileIcon";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tool from '../../components/Tool';


const Banner = ({ file, group_id, onClick, tools })=>{
    
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
            <Box sx={{ position: 'relative', display: 'flex', aspectRatio: "1", maxWidth: 100, height: 'fit-content', justifyContent: 'center'}} >
                <FileIcon file={file} group_id={group_id} type="file" />
            </Box>
            <Box sx={{flex: 1, pl: 3, flexWrap: 'wrap', minWidth: 100}}>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    <Typography>Name: {file.name}</Typography>
                    <Box sx={{flexGrow: 1}} />
                    <Typography variant="caption">created: {praseTime(file.created_at)}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    <Typography>Extension: {file.extension}</Typography>
                    <Box sx={{flexGrow: 1}} />
                    <Typography variant="caption">updated: {praseTime(file.updated_at)}</Typography>
                </Box>
                <Typography >Size: {file.size}</Typography>
                <Typography >Mime Type: {file.mime_type}</Typography>
                <Typography >Owner: {file?.user?.username}</Typography>

                <HorizontalList flex={1} >
                    <Tool name="Delete group" Icon={RemoveCircleOutlineIcon} tools={tools} onClick={onClick} />
                    <Tool name="Download" Icon={ArrowCircleDownIcon} tools={tools} onClick={onClick} />
                    <Tool name="Delete" Icon={RemoveCircleOutlineIcon} tools={tools} onClick={onClick}/>
                </HorizontalList>
            </Box>
            
        </Box>
    );
}



export default Banner;