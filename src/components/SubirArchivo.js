import CryptoJS from "crypto-js";
import React, { useState } from "react";
import Message from "./Message";

const SubirArchivo = ({ myKey }) => {
  const [fileContent, setFileContent] = useState("");
  const [resForFile, setResForFile] = useState("");
  const [keyOk, setKeyOk] = useState(true);

  const handleUploadFiles = (e) => {
    //console.log(e.target.files[0]);
    const firstFile = e.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = function (event) {
      let fileContents = event.target.result;
      //console.log(fileContents);

      setFileContent(cifrar(fileContents, myKey));
    };

    fileReader.readAsText(firstFile);
  };

  const cifrar = (texto, key) => {
    var textoCifrado = CryptoJS.AES.encrypt(texto, key).toString();
    return textoCifrado;
  };

  const descifrar = (texto, key) => {
    var bytes = CryptoJS.AES.decrypt(texto, key);
    var textoDescifrado = bytes.toString(CryptoJS.enc.Utf8);
    return textoDescifrado;
  };

  const descrypt = (e) => {
    var key = document.getElementById("mi-llave-for-file").value;

    if (key !== myKey) {
      setKeyOk(false);
      setTimeout(() => {
        setKeyOk(true);
        return;
      }, 2500);
    } else {
      setResForFile(descifrar(fileContent, key));
      //console.log(key);
      //console.log(resForFile);
    }
  };

  return (
    <div>
      <h2>Cifrador de archivos</h2>
      <input onChange={handleUploadFiles} type="file" name="archivo" />

      {!fileContent ? (
        <p>Sin archivos</p>
      ) : (
        <div>
          <textarea cols="20" rows="10">
            {fileContent}
          </textarea>
          <input
            name="text"
            id="mi-llave-for-file"
            type="password"
            placeholder="Ingresa la llave secreta para descifrar el mensaje"
          />
          <input onClick={descrypt} type="submit" value="Descifrar" />
          {keyOk ? "" : <Message msg="Llave incorrecta" bgColor="#dc3545" />}
          {!resForFile ? (
            ""
          ) : (
            <>
              <br />
              <p>Has Ingresado la llave correcta</p>
              <textarea cols="20" rows="10">
                {resForFile}
              </textarea>
              <br />
              <br />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubirArchivo;
