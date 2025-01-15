import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importujemy useNavigate

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Tworzymy instancję navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Tworzenie ciągu w formacie username:password
    const rawCredentials = `${username}:${password}`;

    // Kodowanie ciągu na Base64
    const encodedCredentials = window.btoa(rawCredentials);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "GET",
        headers: {
          "Authorization": `Basic ${encodedCredentials}`, // Poprawnie zakodowany nagłówek
        },
      });

      if (response.ok) {
        // Logowanie udane
        setMessage("Logowanie powiodło się!");

        // Zapisz nagłówek Authorization w sessionStorage
        sessionStorage.setItem("authHeader", `Basic ${encodedCredentials}`);

        // Sprawdzenie roli na podstawie username
        if (username === "user") {
          // Ustawienie roli 'user' w sessionStorage
          sessionStorage.setItem("role", "user");
          // Przekierowanie na stronę klienta
          navigate("/client");
        } else if (username === "admin") {
          // Ustawienie roli 'admin' w sessionStorage
          sessionStorage.setItem("role", "admin");
          // Przekierowanie na stronę admina
          navigate("/admin");
        }

      } else if (response.status === 401) {
        // Nieautoryzowane
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
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Zaloguj się
        </button>
      </form>
      {message && (
        <div style={{ marginTop: "20px", color: message.includes("powiodło") ? "green" : "red" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
