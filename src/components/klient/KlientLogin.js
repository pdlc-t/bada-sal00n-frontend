import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const rawCredentials = `${username}:${password}`;
    const encodedCredentials = window.btoa(rawCredentials);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "GET",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (response.ok) {
        setMessage("Logowanie powiodło się!");
        sessionStorage.setItem("authHeader", `Basic ${encodedCredentials}`);

        if (username === "user") {
          sessionStorage.setItem("role", "user");
          navigate("/client");
        } else if (username === "admin") {
          sessionStorage.setItem("role", "admin");
          navigate("/admin");
        }
      } else if (response.status === 401) {
        setMessage("Błędna nazwa użytkownika lub hasło.");
      } else {
        setMessage("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
      }
    } catch (error) {
      setMessage("Nie udało się połączyć z serwerem.");
      console.error("Błąd:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "#f9f9f9",
        border: "2px solid #008080",
        boxShadow: 24,
        borderRadius: "10px",
        p: 4,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Logowanie
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          label="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#008080",
            color: "#fff",
            textTransform: "uppercase",
            fontWeight: "bold",
            '&:hover': { backgroundColor: "#005959" },
          }}
        >
          Zaloguj się
        </Button>
      </form>

      {message && (
        <Typography
          sx={{
            mt: 2,
            color: message.includes("powiodło") ? "green" : "red",
            textAlign: "center",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Login;
