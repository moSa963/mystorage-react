import { Collapse, Divider, IconButton, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import MinimizeIcon from '@mui/icons-material/Minimize';
import { List } from "@mui/material";
import UploadItem from "./UploadItem";

const Card = styled('div')(({ theme }) => ({
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 300,
    zIndex: 5000,
    right: 0,
    bottom: 0,
    border: '1px solid ' + theme.palette.divider,
    backgroundColor: theme.palette.background.default,
    pointerEvents: 'all',
    color: theme.palette.text.primary,
}));

const UploadCard = ({ setUploaded, files, setFiles }) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (file) => {
        setFiles(f => f.filter(e => e !== file));
    }

    return (
            <Card>
                <Box sx={{ display: 'flex', alignItems: 'center', pr: 1, pl: 1 }}>
                    <IconButton onClick={() => setOpen(!open)} size="small"><MinimizeIcon /></IconButton>
                    <Typography flex={1} align="center">Uploading</Typography>
                </Box>

                <Divider />

                <Collapse in={open}>
                    <List sx={{ maxHeight: 400, overflow: 'auto', "::-webkit-scrollbar":{ display: 'none' } }}>
                        {
                            files.map(e => (
                                <UploadItem key={e.id} file={e} onClose={handleClose} onFinshed={(f, e) => !e && f && setUploaded(fs => [...fs, f])}/>
                            ))
                        }
                    </List>
                </Collapse>
            </Card>
    );
}

export default UploadCard;