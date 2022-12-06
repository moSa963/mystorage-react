import React from 'react';
import { Grid, InputLabel, LinearProgress, Snackbar, Switch, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getGroup, updateGroup } from '../../http/Data';
import { useAuth } from '../../context/AuthContext';
import { praseTime } from '../../utilities';
import { BASE_URL } from '../../http/Request';
import { PageRoot, StyledFillInput, StyledImg } from '../../components/StyledComponents';
import GroupMembersList from '../../components/GroupMembers/GroupMembersList';
import { useNavigate, useParams } from "react-router-dom";
import ToolsBar from './ToolsBar';


const ShowGroupPage = () => {
    const [group, setGroup] = React.useState(null);
    const [processing, setProcessing] = React.useState(true);
    const [message, setMessage] = React.useState(null);
    const [members, setMembers] = React.useState([]);
    const [auth] = useAuth();
    const params = useParams();
    const nav = useNavigate();

    const owner = Boolean(group && auth?.user && group.user_id === auth.user.id);

    React.useEffect(() => {
        loadGroup(params.id, setGroup, setMembers, nav, setProcessing);
    }, [nav, params.id]);

    const handleImageChange = (event) => {
        !processing && updateImage(group, setProcessing, event.currentTarget.files[0]);
    }


    return (
        <PageRoot>
            <Snackbar open={Boolean(message)} onClose={() => setMessage(null)} message={message} />

            {processing && <LinearProgress sx={{ position: 'absolute', inset: "0 0 0" }} />}

            {
                group &&
                <React.Fragment>
                    <Grid container columns={2}>
                        <Grid item xs={2} md={1} sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ position: 'relative', width: 75, display: "block" }} >
                                <StyledImg  src={BASE_URL + 'api/image/group/' + group?.id} />
                                {owner && <StyledFillInput type="file" onChange={handleImageChange} accept="image/*" />}
                            </Box>
                            <Typography >{group?.name}</Typography>
                        </Grid>
                        <Grid item xs={2} md={1}>
                            <Typography>@{group?.user?.username}</Typography>
                            <Typography>created: {praseTime(group?.created_at)}</Typography>
                            <InputLabel sx={{ display: "inline" }}>Private: </InputLabel>
                            <Switch  disabled={Boolean(!owner || group?.is_master)} checked={Boolean(group?.private)} onChange={() => handlePrivate(group, setGroup)} />
                        </Grid>
                        <Grid item xs={2}>
                            <ToolsBar group={group} setGroup={setGroup} setMessage={setMessage} tools={getToolsOptions(owner, group)} nav={nav} />
                        </Grid>
                    </Grid>

                    <GroupMembersList users={members} isOwner={owner} group={group} setUsers={setMembers} setMessage={setMessage} />
                </React.Fragment>
            }
        </PageRoot>
    );
}


const loadGroup = async (id, setGroup, setMembers, nav, setProcessing) => {
    setProcessing(true);

    const res = await getGroup(id);
    const js = await res.json();

    if (res.ok) {
        setGroup(js.data.group);
        setMembers(js.data.members);
        setProcessing(false);
        return;
    }

    nav('/error/' + res.status + '/' + res.statusText);
}

const updateImage = async (group, setProcessing, image) => {
    setProcessing(true);
    const res = await updateGroup(group.id, null, null, image);
    if (res.ok) {
        window.location.reload();
    }
}

const handlePrivate = async (group, setGroup) => {
    const res = await updateGroup(group.id, null, !group?.private);

    if (res.ok) {
        setGroup(g => ({ ...g, private: !group?.private }));
        return;
    }
}


const getToolsOptions = (owner, group) => {
    if (!owner) {
        return ["Files"];
    }

    if (group?.is_master) {
        return ["Files", "Rename"];
    }

    return ["Files", "Delete", "Rename", "Invite", "Private"];
}

export default ShowGroupPage;