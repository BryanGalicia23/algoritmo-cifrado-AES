import "./App.css";
import "./Formulario.css";
import CifradoAES from "./components/CifradoAES";
import SubirArchivo from "./components/SubirArchivo";
import React, { useState } from "react";
import Message from "./components/Message";

const initialForm = {
  text: "",
};

const initialConfirm = {
  text: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [confirm, setConfirm] = useState(initialConfirm);
  const [myKey, setMyKey] = useState("");
  const [isOk, setIsOk] = useState(true);
  const [messageError, setMessageError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let regexKey =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{12,}$/;

    if (!form.text) {
      setMessageError("No has ingresado la llave");
      setIsOk(false);
      setTimeout(() => {
        setIsOk(true);
        return;
      }, 2500);
    } else if (!regexKey.test(form.text.trim())) {
      setMessageError("La llave no cumple con los requisitos");
      setIsOk(false);
      setTimeout(() => {
        setIsOk(true);
        return;
      }, 2500);
    } else if (form.text.trim() !== confirm.text.trim()) {
      setMessageError("La confirmación no coincide");
      setIsOk(false);
      setTimeout(() => {
        setIsOk(true);
        return;
      }, 2500);
    } else {
      setMyKey(form.text.trim());
    }
    console.log(regexKey.test(form.text.trim()));
    console.log(form.text.trim());
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const confirmHandleChange = (e) => {
    setConfirm({
      ...confirm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
      {!myKey ? (
        <div>
          <img
            style={{
              width: "180px",
              height: "180px",
              paddingTop: "1rem",
            }}
            src="https://images.vexels.com/media/users/3/132073/isolated/preview/5ded0426191618e9b7d33842d55e783c-icono-de-circulo-de-seguridad.png"
            alt="Seguridad"
          />
          <h2>Algoritmo de cifrado AES</h2>
          <p>
            Bienvenido@, para iniciar con las pruebas, por favor ingresa una
            llave con las siguientes características
          </p>
          <ul style={{ fontSize: "14px", listStyle: "none" }}>
            <li>- Mínimo 12 caracteres</li>
            <li>- Al menos una letra mayúscula</li>
            <li>- Al menos una letra minúscula</li>
            <li>- Al menos un dígito</li>
            <li>- Al menos un caracter especial</li>
            <li>- Sin espacios en blanco</li>
          </ul>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                name="text"
                type="password"
                placeholder="Ingresa tu llave para decifrar los mensajes"
                value={form.text}
                onChange={handleChange}
              />
              <input
                name="text"
                type="password"
                placeholder="Por favor, confirme su llave"
                value={confirm.text}
                onChange={confirmHandleChange}
              />
            </div>
            {isOk ? "" : <Message msg={messageError} bgColor="#dc3545" />}
            <input type="submit" value="Enviar" />
          </form>
        </div>
      ) : (
        <div>
          <CifradoAES myKey={myKey} />
          <hr />
          <SubirArchivo myKey={myKey} />
        </div>
      )}
    </div>
  );
}

export default App;
