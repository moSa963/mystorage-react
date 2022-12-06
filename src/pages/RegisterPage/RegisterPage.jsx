import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LoginPage from "../RegisterPage/LoginPage";
import SigInPage from "../RegisterPage/SignInPage";
import PageContainer from "./PageContainer";



const RegisterPage = () => {
    const [selectedTab, setSelectedTab] = React.useState(1);
    const [processing, setProcessing] = React.useState(false);

    const handleStartProcessing = ()=>{
        setProcessing(true);
    }

    const handleEndProcessing = ()=>{
        setProcessing(false);
    }

    return (
        <React.Fragment>
            <Tabs textColor="secondary" indicatorColor="secondary" variant="scrollable" value={selectedTab}
                onChange={(e, v)=>setSelectedTab(v)}>
                <Tab disabled={processing} label="Sign in" value={0} />
                <Tab disabled={processing} label="Login" value={1} />
            </Tabs>
            <Box sx={{ width: '100%', maxWidth: 900, height: '85%', position: 'relative', overflow: 'visible'}}>
                <PageContainer selectedIndex={selectedTab} index={0} >
                    <SigInPage disabled={selectedTab !== 0} onStart={handleStartProcessing} onEnd={handleEndProcessing}/>
                </PageContainer>
                <PageContainer selectedIndex={selectedTab} index={1} >
                    <LoginPage disabled={selectedTab !== 1} onStart={handleStartProcessing} onEnd={handleEndProcessing}/>
                </PageContainer>
            </Box>
        </React.Fragment>
    );
}


export default RegisterPage;