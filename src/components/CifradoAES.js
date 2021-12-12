import React, { useState } from "react";
import CryptoJS from "crypto-js";

const initialForm = {
  text: "",
};

const CifradoAES = () => {
  const [form, setForm] = useState(initialForm);

  const [message, setMessage] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const cifrar = (texto) => {
    var textoCifrado = CryptoJS.AES.encrypt(
      texto,
      "@bryan.Galicia23"
    ).toString();
    return textoCifrado;
  };

  const descifrar = (texto, key) => {
    var bytes = CryptoJS.AES.decrypt(texto, key);
    var textoDescifrado = bytes.toString(CryptoJS.enc.Utf8);
    return textoDescifrado;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let messageToCrypt = e.target.text.value;
    console.log(e.target.text.value);

    if (!form.text) {
      alert("No has ingresado ningún mensaje");
      return;
    } else {
      setMessage(cifrar(messageToCrypt));
      console.log(message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const descrypt = (e) => {
    var key = document.getElementById("mi-llave").value;
    setRespuesta(descifrar(message, key));
    console.log(key);
    console.log(message);
    console.log(respuesta);
  };
  return (
    <div style={{ width: "90vw" }}>
      <h1>Algoritmo de cifrado AES</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="20"
          rows="5"
          placeholder="Introduce tu mensaje para cifrarlo"
          onChange={handleChange}
          value={form.text}
        ></textarea>
        <input type="submit" value="Cifrar" />
      </form>
      <div>
        {message ? (
          <div>
            <p>Tu mensaje ha sido cifrado {message}</p>
            <input
              id="mi-llave"
              type="password"
              placeholder="Ingresa la llave secreta para descifrar el mensaje"
            />
            <input onClick={descrypt} type="submit" value="Descifrar" />
          </div>
        ) : (
          <p>
            Ingresa un mensaje secreto para poder cifrarlo con el algoritmo AES
          </p>
        )}
      </div>
      {respuesta && message ? (
        <div>
          <p>Este es el mensaje secreto:</p>
          {respuesta}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CifradoAES;
