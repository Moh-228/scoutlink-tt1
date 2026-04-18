"use client";

import { useState } from "react";
import styles from "./login.module.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>login</h1>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          {/*<span>👤</span>*/}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        {/*<span>👁️</span>*/}
        </div>

        <label className={styles.remember}>
          <input type="checkbox" /> Recordar usuario
        </label>

        <button className={styles.button}>Iniciar Sesión</button>

        <p className={styles.link}>Olvidé mi contraseña</p>
        <p className={styles.link}>
          ¿No tienes cuenta? <span>Regístrate</span>
        </p>
      </div>
    </div>
  );
}