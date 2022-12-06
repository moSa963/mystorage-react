import React from 'react';
import HorizontalList from '../../components/HorizontalList';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import DialogCard from '../../components/DialogCard';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Tool from '../../components/Tool';
import { deleteGroup, sendGroupRequest, updateGroup } from '../../http/Data';

const ToolsBar = ({ tools = [], group, setGroup, setMessage, nav }) => {
    const [dialog, setDialogCard] = React.useState(null);

    const handleAction = (action) => {
        switch (action) {
            case 'Files': nav('/files/' + group.id + '/root'); return;
            case 'Rename': handleRename(group, setGroup, setDialogCard, setMessage); return;
            case 'Delete': handleDelete(group, nav, setDialogCard, setMessage); return;
            case 'Invite': handleInvite(group, setDialogCard, setMessage); return;
            default: return;
        }
    }

    const handleDialogClose = async (ok, input) => {
        ok && await dialog.action(input);
        setDialogCard(null);
    }

    return (
        <React.Fragment>
            {dialog && <DialogCard message={dialog?.message} onClose={handleDialogClose} open={dialog} withInput={dialog?.with_input} />}

            <HorizontalList>
                <Tool name="Files" Icon={OpenInBrowserIcon} tools={tools} onClick={handleAction} />
                <Tool name="Delete" Icon={RemoveCircleOutlineIcon} tools={tools} onClick={handleAction} />
                <Tool name="Rename" Icon={DriveFileRenameOutlineIcon} tools={tools} onClick={handleAction} />
                <Tool name="Invite" Icon={PermIdentityIcon} tools={tools} onClick={handleAction} />
            </HorizontalList>
        </React.Fragment>
    );
}


const handleDelete = (group, nav, setDialogCard, setMessage) => {
    setDialogCard({
        message: `Do you want to delete this group?`,
        action: async () => {
            const res = await deleteGroup(group.id);

            if (res.ok) {
                nav('/groups');
                return;
            }

            const js = await res.json();
            setMessage(js.message);
        },
    });
}

const handleRename = (group, setGroup, setDialogCard, setMessage) => {
    setDialogCard({
        message: `New name...`,
        with_input: true,
        action: async (input) => {
            const res = await updateGroup(group.id, input);

            if (res.ok) {
                setGroup({ ...group, name: input });
                setMessage(`group has been renamed sucessfully.`);
                return;
            }

            const js = await res.json();
            setMessage(js.message);
        },
    });
}



const handleInvite = (group, setDialogCard, setMessage) => {
    setDialogCard({
        message: `Invite a user...`,
        with_input: true,
        action: async (input) => {
            const res = await sendGroupRequest(input, group.id, true);
            if (res.ok) {
                setMessage(`${input} has been invited sucessfully.`);
                return;
            }

            const js = await res.json();
            setMessage(js.message);
        },
    });
}


export default ToolsBar;