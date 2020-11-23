import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./EditarAtividade.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { api } from "../../services/api.js";

export function EditarAtividade() {
  const [nome, setNome] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [pontuacaoMax, setPontuacaoMax] = useState("");
  const [status, setStatus] = useState("Aguardando");
  const [tipo, setTipo] = useState("Prova");
  const [descricao, setDescricao] = useState("");
  const [notaFinal, setNotaFinal] = useState("");
  const [arquivo, setArquivo] = useState("");
  const { atividadeID } = useParams();

  const history = useHistory();

  useEffect(() => {
    api
      .get("atividades/" + atividadeID, {
        params: {
          nome,
          dataEntrega,
          pontuacaoMax,
          status,
          tipo,
          descricao,
          notaFinal,
          arquivo,
        },
      })
      .then((response) => {
        setNome(response.data.nome);
        setDataEntrega(response.data.dataEntrega);
        setPontuacaoMax(response.data.pontuacaoMax);
        setStatus(response.data.status);
        setTipo(response.data.tipo);
        setDescricao(response.data.descricao);
        setNotaFinal(response.data.notaFinal);
        setArquivo(response.data.arquivo);
      });
  }, []);

  function submitEditarAtividade(event) {
    event.preventDefault();

    console.log(
      nome,
      dataEntrega,
      pontuacaoMax,
      status,
      tipo,
      descricao,
      notaFinal,
      arquivo
    );

    api
      .put("atividades/" + atividadeID, {
        nome,
        dataEntrega,
        pontuacaoMax,
        status,
        tipo,
        descricao,
        notaFinal,
        arquivo,
      })
      .then((response) => {
        console.log(response.data);
        history.push("/atividades/view/:" + atividadeID); //falta redux
      });
  }

  return (
    <div className="blocoEditarAtividade">
      <form onSubmit={submitEditarAtividade}>
        <div className="boxEditarAtividade">
          <div className="headerEditarAtividade">
            <h2 className="tituloEditarAtividade">Editar Atividade</h2>
            <FiCheckSquare size={40} color="black" />
          </div>
          <input
            type="text"
            id="editarNomeAtividade"
            className="inputsEditarAtividade"
            placeholder="Digite nome da atividade"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          ></input>
          <input
            type="text"
            id="editarDataEntregaAtividade"
            className="inputsEditarAtividade"
            placeholder="Digite data de entrega da atividade"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
          ></input>
          <input
            type="text"
            id="editarPontuacaoMaxAtividade"
            className="inputsEditarAtividade"
            placeholder="Digite pontuação máxima da atividade"
            value={pontuacaoMax}
            onChange={(e) => setPontuacaoMax(e.target.value)}
          ></input>

          <select
            name="status"
            className="editarStatusTipo"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Em andamento" id="editarStatusAtividadeAguardando">
              Aguardando
            </option>
            <option value="Concluida" id="editarStatusAtividadeConcluida">
              Concluída
            </option>
          </select>

          <select
            name="tipo"
            className="editarStatusTipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="Prova" id="editarTipoProvaAtividade">
              Prova
            </option>
            <option value="Trabalho" id="editarTipoTrabalhoAtividade">
              Trabalho
            </option>
          </select>

          <input
            type="text"
            id="editraDescricaoAtividade"
            className="inputsEditarAtividade"
            placeholder="Digite descrição da atividade"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></input>

          <input
            type="text"
            id="editarNotaFinalAtividade"
            className="inputsEditarAtividade"
            placeholder="Digite nota final da atividade"
            value={notaFinal}
            onChange={(e) => setNotaFinal(e.target.value)}
          ></input>

          <input
            type="text"
            id="editarArquivoAtividade"
            className="inputsEditarAtividade"
            placeholder="Insira arquivo da atividade"
            value={arquivo}
            onChange={(e) => setArquivo(e.target.value)}
          ></input>

          <button type="submit" id="btnSalvarEdicaoAtividade">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
