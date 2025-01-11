import './App.css';
import api from './api/axiosConfig.js';
import { useState, useEffect } from 'react';
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import BasicTable from './components/pracownicy/PracownicyList.js';

function App() {
  const [pracownicy, setPracownicy] = useState([]);

  const getPracownicy = async () => {
    try {
      const response = await api.get("/admin/pracownicy/list");
      console.log(response.data);
      setPracownicy(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPracownicy();
  }, []);

  return (
    <div className="App" style={styles.appContainer}>
      <div style={styles.tableContainer}>
        <h2 style={styles.heading}>Lista Pracowników</h2>
        <BasicTable pracownicyList={pracownicy} />
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  tableContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    width: "100%",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default App;
