import { Icon, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { uploadFile } from "../../http/Data";
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const UploadItem = ({ file, onClose, onFinshed }) => {
    const [ajax, setAjax] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [error, setError] = React.useState(null);

    
    React.useEffect(() => {
        if (ajax) return;

        const a = uploadFile(file,
            (e) => setProgress((e.loaded / e.total) * 100),
            (e) => onFinshed(e?.data, null),
            (e) => setError(e)
        );

        setAjax(a);

        return () => {
            ajax?.abort();
        }
    }, [onClose, ajax, file, onFinshed]);

    const handleCancel = () => {
        ajax && ajax.abort();
        onClose && onClose(file);
    }

    return (
        <Stack direction="row" spacing={0.5} sx={{ ":hover": { bgcolor: t => t.palette.action.hover }, p: 0.5, alignItems: "center" }}>
            <Icon>
                { ajax && ajax.status === ajax.DONE ? <FileDownloadDoneIcon /> : <UploadFileIcon /> }
            </Icon>

            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                <Typography variant="caption" noWrap>{file.name}</Typography>

                {progress > 0 && progress < 100 && <LinearProgress variant="determinate" value={progress} />}

                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    {error && <IconButton color="error" title={error} sx={{ width: 15, height: 15 }}><ErrorOutlineIcon sx={{ width: 15, height: 15 }} /></IconButton>}
                    {ajax && <IconButton onClick={handleCancel} title="Cancel" sx={{ width: 15, height: 15 }}><CloseIcon sx={{ width: 15, height: 15 }} /></IconButton>}
                </Box>
            </Box>
        </Stack>
    );
}


export default UploadItem;