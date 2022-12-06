import React from "react";
import { Box } from "@mui/system";
import { Button, Divider, Switch, Typography } from "@mui/material";
import { useThemeMode } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../http/Auth";
import { PageRoot } from "../../components/StyledComponents";
import UserBanner from "./UserBanner";

const SettingsPage = () => {
    const [themeMode, setThemeMode] = useThemeMode();
    const [{ user }] = useAuth();

    const handleLogout = ()=>{
        logout()
        .then(js=>{
            window.location.reload();
        });
    }

    return (
        <PageRoot>
            <UserBanner user={user}/>
            <Divider flexItem sx={{m: 3}}/>
            <Box sx={{display: 'flex', alignItems: 'center', mt: 3, mb: 3}}>
                <Typography>DarkMode</Typography>
                <Switch checked={themeMode === 'dark'}
                    onChange={(e)=>setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}/>
            </Box>
            <Box sx={{flexGrow: 1}} />
            <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
        </PageRoot>
    );
}


export default SettingsPage;