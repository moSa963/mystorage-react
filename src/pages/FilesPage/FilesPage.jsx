import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LayoutToolBar from "../../components/AppBar/LayoutToolBar";
import FilesContainer from "../../components/Files/FilesContainer";
import { PageRoot } from "../../components/StyledComponents";
import { useNavigate, useParams } from "react-router-dom";
import GroupList from "../../components/Groups/GroupList";
import { loadGroups } from "../../components/Groups/GroupsContainer";
import ToolsBar from "./ToolsBar";

const FilesPage = () => {
    const [groups, setGroups] = React.useState([]);
    const [files, setFiles] = React.useState({ files:[], directories:[], parent:null, group:null });
    const [filter, setFilter] = React.useState(null);
    const [toolBarOpen, setToolBarOpen] = React.useState(false);
    const [layoutOptions, setLayoutOptions] = React.useState({ sortBy: "name", orderBy: "az", size: "medium" });
    const { group, ...rest } = useParams();
    const path = rest["*"] === undefined ? null : "root" + (rest["*"] === "" ? "" : "/" + rest["*"]);
    const nav = useNavigate();

    React.useEffect(()=>{
        loadGroups(setGroups, ()=>{}, nav);
    }, [nav]);

    const handleToolBarChange = (key, value) => {
        layoutOptions[key] = value;
        setLayoutOptions({ ...layoutOptions });
    }

    const handleGroupOpen = (group) => {
        setFiles({ files:[], directories:[], parent:null, group:null });
        nav('/files/' + group.id + "/root");
    }

    return (
        <PageRoot>

            <ToolsBar 
                group={group}
                path={path}
                onLayoutBar={() => setToolBarOpen(v => !v)}
                setFiles={setFiles}
                setFilter={setFilter}
            />

            <Divider sx={{ mb: 1 }} orientation="horizontal" flexItem />

            <Box sx={{ display: 'flex', flex: 1, }}>

                { path && <FilesContainer filter={filter} layoutOptions={layoutOptions} setData={setFiles} data={files} /> }

                { !path && <GroupList filter={filter} onGroupDoubleClick={handleGroupOpen} groups={groups} /> }

                <LayoutToolBar value={layoutOptions} onChange={handleToolBarChange} open={toolBarOpen} />

            </Box>
        </PageRoot>
    );
}


export default FilesPage;