import { Divider, IconButton, LinearProgress, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SearchBar from "../../components/SearchBar";
import HorizontalList from "../../components/HorizontalList";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestoreIcon from '@mui/icons-material/Restore';
import { PageRoot } from '../../components/StyledComponents';
import FilesTable from "../../components/Files/FilesTable";
import DialogCard from "../../components/DialogCard";
import { useNavigate } from "react-router-dom";
import { handleDelete, handleDeleteAll, handleRestore, loadFiles } from "./actions";


const BinPage = () => {
    const [files, setFiles] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [processing, setProcessing] = React.useState(false);
    const [dialog, setDialogCard] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    const [filter, setFilter] = React.useState(null);
    const nav = useNavigate();

    React.useEffect(() => {
        loadFiles(setFiles, setProcessing, nav);
    }, [nav]);

    const handleAction = (action) => {
        switch (action) {
            case 'Delete': handleDelete(selected.item, setFiles, setDialogCard, setMessage); return; 
            case 'Restore': handleRestore(selected.item, setFiles, setDialogCard, setMessage); return;
            case 'DeleteAll': handleDeleteAll(setFiles, setDialogCard, setMessage); return;
            default: return;
        }
    }

    const handleDialogClose = async (ok, input) => {
        ok && await dialog.action(input);
        setDialogCard(null);
    }

    return (
        <PageRoot>
            {processing && <LinearProgress sx={{ position: 'absolute', inset: "0 0 0" }} />}

            <Snackbar open={Boolean(message)} onClose={() => setMessage(null)} message={message} />

            {dialog && <DialogCard message={dialog?.message} onClose={handleDialogClose} open={dialog} withInput={dialog?.with_input} />}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <HorizontalList flex={1}>
                    {
                        selected ?
                            <>
                                <IconButton onClick={()=>handleAction("Delete")} sx={{ height: "fit-content" }} size="medium" title="Delete"><RemoveCircleOutlineIcon /></IconButton>
                                <Divider sx={{ m: 1 }} orientation="vertical" flexItem />
                                <IconButton onClick={()=>handleAction("Restore")} sx={{ height: "fit-content" }} size="medium" title="Restore"><RestoreIcon /></IconButton>
                            </>
                            : <IconButton onClick={()=>handleAction("DeleteAll")} sx={{ height: "fit-content" }} size="medium" title="Delete All"><DeleteOutlineIcon /></IconButton>
                    }
                </HorizontalList>
                <SearchBar onChange={setFilter} />
            </Box>

            <Divider sx={{ mb: 1 }} orientation="horizontal" flexItem />
            
            <FilesTable filter={filter} bin files={files} selected={selected} setSelected={setSelected} />
        </PageRoot>
    );
}




export default BinPage;