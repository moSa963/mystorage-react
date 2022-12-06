import React from "react";
import { Box } from "@mui/system";
import { Paper, Typography, LinearProgress, Button, Alert } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { hideEmail } from "../../utilities";
import { updateEmailCode, verifieEmail } from "../../http/Auth";
import CharInput from "./CharInput";


const VerifyEmailPage = () => {
    const [auth] = useAuth();
    const [code, setCode] = React.useState(["", "", "", "", "", ""]);
    const [progressing, setProgressing] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleChange = (index, value)=>{
        code[index] = value;
        setCode([...code]);
    }

    React.useEffect(()=>{
        if (!progressing && code.find((e) => e === "") === undefined){
            verifie(code.join(''), setProgressing, setCode, setError);
        }
    }, [code, progressing]);

    return (
        <Paper sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: 800,
            maxHeight: '100%',
            overflow: 'auto',
            padding: 2,
        }}>
            {progressing && <LinearProgress color="secondary" sx={{ position: 'absolute', width: '100%', inset: "0 0 0", }}/>}

            {error && <Alert variant="outlined" severity={error.severity}>{error.message}</Alert>}

            <Typography color="secondary" width="100%" variant="h5" align="center" mb={4}>Hello {auth.user.first_name + " " + auth.user.last_name} </Typography>

            <Typography mb={2} >We have sent you a code to this email: <strong>{hideEmail(auth.user.email)}</strong> </Typography>

            <Typography >Please enter the code to verify your email:</Typography>

            <Box sx={{ display: 'flex', width: '100%', }}>
                {[0, 1, 2, 3, 4, 5].map(n => <CharInput key={n} disabled={progressing} onChange={(v)=>handleChange(n, v)} />)}
            </Box>

            <Button onClick={() => !progressing && handleUpdate(setProgressing, setError)} disabled={progressing} color="secondary" sx={{ width: 'fit-content', marginLeft: 'auto',}}>
                Resend the code?
            </Button>
        </Paper>
    );
}

const verifie = async (code, setProgressing, setCode, setError) => {

    setProgressing(true);
    const res = await verifieEmail();

    if (res.ok){
        window.location.reload();
        return;
    }
    
    setCode(['', '', '', '', '', '']);

    setProgressing(false);

    const js = await res.json();

    setError({message: js.message, severity: 'error'});
}


const handleUpdate = async (setProgressing, setError) => {
    setProgressing(true);

    const res = await updateEmailCode();

    setProgressing(false);

    if (res.ok){
        setError({message: 'We sent you a new code.', severity: 'success'});
        return;
    }

    const js = await res.json();
    setError({ message: js.message, severity: 'error' });
}

export default VerifyEmailPage;