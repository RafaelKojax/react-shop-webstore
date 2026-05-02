import React, { useState, useCallback } from "react";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useAppDispatch } from "../store";
import { setCredentials } from "../store/slices/auth-slice";

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!identifier || !password) {
            toast.warning("Preencha todos os campos.");
            return;
        }

        setLoading(true);
        try {
            const response = await api.post("/auth/local", { identifier, password });
            dispatch(setCredentials({ user: response.data.user, token: response.data.jwt }));
            toast.success(`Acesso autorizado! Bem-vindo, ${response.data.user.username}.`);
            navigate("/");
        } catch (error) {
            toast.error("Credenciais inválidas. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }, [identifier, password, dispatch, navigate]);

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                        Acesso ao Sistema
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal" required fullWidth label="Usuário ou Email" autoFocus
                            value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                        />
                        <TextField
                            margin="normal" required fullWidth label="Senha" type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit" fullWidth variant="contained" disabled={loading}
                            sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
                        >
                            {loading ? "Autenticando..." : "Entrar"}
                        </Button>   
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}