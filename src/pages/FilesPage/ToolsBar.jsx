import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LocationBar from "../../components/LocationBar";
import SearchBar from "../../components/SearchBar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import { useLocation, useNavigate } from "react-router-dom";


const ToolsBar = ({ group, path, setFiles, setFilter, onLayoutBar }) => {
    const location = useLocation();
    const nav = useNavigate();


    const handleGroupsClicked = () => {
        if (location.pathname !== "/files") {
            nav('/files');
        }
    }

    const handleLocationChanged = (loc) => {
        nav(location.pathname.split('root')[0] + loc);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <IconButton sx={{ height: 'fit-content' }} onClick={handleGroupsClicked} size="small" title="Groups">
                <GroupsIcon />
            </IconButton>
            <LocationBar onLocationChanged={handleLocationChanged}
                group_id={group}
                location={path}
                onLoaded={setFiles} />
            <SearchBar onChange={setFilter}/>
            <IconButton sx={{ height: 'fit-content' }} onClick={onLayoutBar} size="small">
                <MoreVertIcon />
            </IconButton>
        </Box>
    );
}




export default ToolsBar;