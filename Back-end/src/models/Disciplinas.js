const mongoose = require("mongoose");
const normalize = require("normalize-mongoose");

const disciplinasSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    maxLength: 30,
  },
  periodo: {
    type: String,
    required: true,
    maxLength: 3,
  },
  horario: {
    type: String,
    maxLength: 5,
  },
  local: {
    type: String,
    maxLength: 30,
  },
  professor: {
    type: String,
    maxLength: 30,
  },
  material: {
    type: String,
    maxLength: 200,
  },
  status: {
    type: String,
    required: true,
  },

  idUsuario: {
    type: mongoose.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  },
});

function validarDisciplinas(disciplina) {
  const schema = joi.object({
    nomeDisciplina: joi.string().alphanum().required(),
    periodo: joi.string().required(),
    horario: joi.string(),
    local: joi.string(),
    nomeProfessor: joi.string(),
  });

  return schema.validate(usuario);
}

disciplinasSchema.plugin(normalize);

module.exports = mongoose.model("Disciplinas", disciplinasSchema);
