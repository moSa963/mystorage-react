import { Box, styled } from "@mui/system";
import Dashboard from "@mui/icons-material/DashboardOutlined";
import Settings from "@mui/icons-material/SettingsOutlined";
import Group from "@mui/icons-material/GroupOutlined";
import Delete from "@mui/icons-material/DeleteOutline";
import React from "react";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";


const Root = styled(Box)(({theme})=>({
    height: '100%',
    overflow: 'hidden',
    direction: 'rtl',
    "&>*":{
        direction: 'ltr',
    },
    ":hover":{
        overflow: 'auto',        
    },
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.dark,
    transition: "max-width 300ms",
}));

const AppMenu = ({ open })=>{
    const location = useLocation();
    const selected = React.useMemo(() => {
        switch(location.pathname.split('/')[1]){
            case 'files' : return 0;
            case 'groups' : return 1;
            case 'bin' : return 2;
            case 'notifications' : return 3;
            case 'settings' : return 4;
            default: return 0;
        }
    }, [location]);

    return (
        <Root sx={{ maxWidth: open ? 250 : 0, }}>
            <Box sx={{ backgroundColor: 'background.default', }}>
                <MenuItem Icon={<Dashboard />} title="Files" index={0} selected={selected} to="/files/root" />
                <MenuItem Icon={<Group />} title="Groups" index={1} selected={selected} to="/groups" />
                <MenuItem Icon={<Delete />} title="Bin" index={2} selected={selected} to="/bin" />
                <MenuItem Icon={<NotificationsNoneIcon />} title="Notifications" index={3} selected={selected} to="/notifications" />
                <MenuItem Icon={<Settings />} title="Settings" index={4} selected={selected} to="/settings" />
            </Box>
        </Root>
    );
}

export default AppMenu;