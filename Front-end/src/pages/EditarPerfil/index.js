import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FiCheckSquare, FiCornerDownLeft } from "react-icons/fi";
import styles from "./editarperfil.css";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../services/api.js";

export function EditarPerfil() {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const usuario =
    useSelector((state) => state?.usuario) ||
    JSON.parse(localStorage.getItem("USUARIO"));

  useEffect(() => {
  
  }, []);

  function submitEditarPerfil(event) {
    event.preventDefault();
    console.log(usuario);
    api
  
      .put("/editperfil/" +usuario, {
        nome,
        curso,
        usuario: usuario.usuario,
        senha: usuario.senha,
      })
      .then((response) => {
        dispatch({
          type: "atualizarUsuario",
          payload: response.data,
        });

        history.push("/perfil");
      });
  }

function toPerfil(){
history.push("/perfil");

}

  return (
    <div className="blocoEditarPerfil">
      <form onSubmit={submitEditarPerfil}>
        <div className="boxEditarPerfil">
          <div className="headerEditarPerfil">

          <FiCornerDownLeft
           id="voltarPerfil"
           onClick={toPerfil}
           size={40}
           color="black"
           />

            <h1 id="tituloEditarPerfil">Editar Perfil</h1>
            <FiCheckSquare size={45} color="black" />
          </div>

          <input
            id="editarNomeCompleto"
            className="inputsEditarPerfil"
            placeholder="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          ></input>

          <input
            id="editarNomeCurso"
            className="inputsEditarPerfil"
            placeholder="Nome do Curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          ></input>

          <button type="submit" id="btnSalvarEdicaoPerfil">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
