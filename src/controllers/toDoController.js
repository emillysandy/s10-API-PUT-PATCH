const tarefasJson = require("../models/tarefas.json");
// const fs = require("fs");

const getAll = (req, res) => {
    res.status(200).send(tarefasJson);
};

const getById = (req, res) => {
    const idRequirido = req.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    res.status(200).send(tarefaFiltrada)
}

const createTask = (req, res) => {
    const descricaoRequirida = req.body.descricao
    const nomeColaboradorRequirido = req.body.nomeColaborador

    const novaTarefa = {
        id: Math.random().toString(32).substr(2, 9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricaoRequirida,
        nomeColaborador: nomeColaboradorRequirido
    }

    tarefasJson.push(novaTarefa)
    res.status(200).send(novaTarefa)

}

const deleteTask = (req, res) => {
    const idRequirido = req.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)
    res.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        tarefasJson
    }]);
}

const replaceTask = (req, res)=>{
    let requestedId = req.params.id;
    let taskFromBody = req.body;

    let filteredTask = tarefasJson.find(task=> task.id == requestedId);

    let updatedTask = {
        "id": filteredTask.id,
        "dataInclusao": taskFromBody.dataInclusao,
        "concluido": taskFromBody.concluido,
        "descricao": taskFromBody.descricao,
        "nomeColaborador": taskFromBody.nomeColaborador
    }
    let indice = tarefasJson.indexOf(filteredTask);
    tarefasJson.splice(indice, 1, updatedTask);

    res.status(200).send({"message": "Tarefa substituída com sucesso", updatedTask})
};
const updateDescription = (req,res) =>{
    //pegar os dados da requisição
    let requestedId = req.params.id;
    let newDescription = req.body.descricao;
    //achar o item da lista que tem o mesmo id
    let filteredTask = tarefasJson.find(task=> task.id == requestedId);
    
    filteredTask.descricao = newDescription;

    res.status(200).send({"message": "Descrição atualizada com sucesso", filteredTask})
};

const updateAnything = (req, res) => {
    let requestedId = req.params.id;
    let updatedTask = req.body;
    let filteredTask = tarefasJson.find(task=> task.id == requestedId);

    let keyList = Object.keys(updatedTask);
    keyList.forEach((key)=>{
        filteredTask[key] = updatedTask[key];
    });
    res.status(200).send({"mensagem": "Tarefa atualizada com sucesso.", filteredTask});
};




module.exports = {
    getAll,
    getById,
    createTask,
    deleteTask,
    replaceTask,
    updateDescription,
    updateAnything
}