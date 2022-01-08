import React, { useState } from "react";
import CryptoJS from "crypto-js";
import Message from "./Message";

const initialForm = {
  text: "",
};

const CifradoAES = ({ myKey }) => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [keyOk, setKeyOk] = useState(true);

  const cifrar = (texto, key) => {
    var textoCifrado = CryptoJS.AES.encrypt(texto, key).toString();
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
    //console.log(e.target.text.value);

    if (!form.text) {
      alert("No has ingresado ningún mensaje");
      return;
    } else {
      setMessage(cifrar(messageToCrypt, myKey));
      setForm(initialForm);
      //console.log(message);
      //console.log(myKey);
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
    if (key !== myKey) {
      setKeyOk(false);
      setTimeout(() => {
        setKeyOk(true);
        return;
      }, 2500);
    } else {
      setRespuesta(descifrar(message, key));
      //console.log(key);
      //console.log(message);
      //console.log(respuesta);
    }
  };

  return (
    <div>
      <h2>Cifrador de texto</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="20"
          rows="3"
          placeholder="Introduce tu mensaje para cifrarlo"
          onChange={handleChange}
          value={form.text}
        ></textarea>
        <input type="submit" value="Cifrar" />
      </form>
      <div>
        {message ? (
          <div>
            <textarea cols="20" rows="5">
              {message}
            </textarea>
            <input
              id="mi-llave"
              type="password"
              placeholder="Ingresa la llave secreta para descifrar el mensaje"
            />
            <input onClick={descrypt} type="submit" value="Descifrar" />
            {keyOk ? "" : <Message msg="Llave incorrecta" bgColor="#dc3545" />}
          </div>
        ) : (
          <p>
            Ingresa un mensaje secreto para poder cifrarlo con el algoritmo AES
          </p>
        )}
      </div>
      {respuesta && message ? (
        <div>
          <p>Mensaje secreto:</p>
          {respuesta}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CifradoAES;
