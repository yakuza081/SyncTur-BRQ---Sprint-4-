"use strict";
let inputNome = document.querySelector(".nome");
let inputStatus = document.getElementsByName("status");
let inputData = document.querySelector(".data");
let inputTextArea = document.querySelector(".descricaoArea");
let novosCards = [];
let btnCadastro = document.querySelector(".cadastro");
class Card {
    constructor(_nome, _descricao, _data, _status, _id) {
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }
    get Nome() {
        return this.nome;
    }
    set Nome(value) {
        this.nome = value;
    }
    get Descricao() {
        return this.descricao;
    }
    set Descricao(value) {
        this.descricao = value;
    }
    get Data() {
        return this.data;
    }
    set Data(value) {
        this.data = value;
    }
    get Status() {
        return this.status;
    }
    set Status(value) {
        this.status = value;
    }
    get Id() {
        return this.id;
    }
    set Id(value) {
        this.id = value;
    }
}
function obterCardsApi() {
    fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes')
        .then(resposta => resposta.json())
        .then((dados) => {
        return dados.map(dadosCard => {
            return new Card(dadosCard.nome, dadosCard.descricao, dadosCard.data, dadosCard.status, dadosCard.id);
        });
    })
        .then(dadosNovosCards => {
        injetarDados(dadosNovosCards);
        novosCards = dadosNovosCards;
        console.log(novosCards);
    });
}
function criarCards() {
    inputNome.value;
    validacaoStatus(inputStatus);
    inputData.value;
    inputTextArea.value;
    let novoCard = new Card(inputNome.value, inputTextArea.value, inputData.value, validacaoStatus(inputStatus), criarId());
    novosCards.push(novoCard);
    // console.log(novosCards);
    injetarDados(novosCards);
}
function criarId() {
    let maiorId = 0;
    novosCards.map((dadoId, index) => {
        if (Number(dadoId.Id) > maiorId) {
            maiorId = Number(dadoId.Id);
        }
    });
    maiorId++;
    return maiorId.toString();
}
btnCadastro.addEventListener('click', () => {
    criarCards();
});
function validacaoStatus(status) {
    status = inputStatus;
    for (let i = 0; i < status.length; i++) {
        if (status[i].checked) {
            if (status[i].value == 'true') {
                status = true;
            }
            else {
                status = false;
            }
        }
    }
    return status;
}
function dataTexto(data) {
    let newDate = new Date(data);
    let dataString;
    dataString = (Number(newDate.getDate()).toString() + "/" + (newDate.getMonth() + 1).toString() + "/" + newDate.getFullYear().toString());
    return dataString;
}
function injetarDados(arrayNovosCards) {
    let cardNovo = document.querySelector('.cardAPI');
    cardNovo.innerHTML = '';
    for (let i = 0; i < arrayNovosCards.length; i++) {
        cardNovo.innerHTML += `<div class="container">
        <h2 class="nomeAPI">${arrayNovosCards[i].nome} </h2>
        <p class="txtAPI">${arrayNovosCards[i].descricao}</p>
        <p class="txtData">Data: ${dataTexto(arrayNovosCards[i].data)} </p>
        <button type="submit" class="editar" id="editar${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="editar(${arrayNovosCards[i].id})" >Editar</button>
        <button type="submit" class="excluir" id="excluir${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="excluir(${arrayNovosCards[i].id})">Excluir</button>
    </div>`;
    }
    // console.log(dataTexto(arrayNovosCards[0].data));
}
function editar(id) {
    let indice;
    indice = selecionarCardId(id);
    inputNome.value = novosCards[indice].Nome;
    inputData.value = inversaoData(novosCards[indice].Data);
    inputTextArea.value = novosCards[indice].Descricao;
    console.log(novosCards[indice].Status);
    inputStatus.value = novosCards[indice].Status;
    excluir(id);
    injetarDados(novosCards);
}
function inversaoData(data) {
    let newDate = new Date(data);
    let dataString;
    dataString = (Number(newDate.getFullYear()).toString() + "-"
        + (newDate.getMonth() + 1).toString() + "-"
        + newDate.getDate().toString());
    return dataString;
}
function excluir(id) {
    let indice;
    indice = selecionarCardId(id);
    novosCards.splice(indice, 1);
    injetarDados(novosCards);
}
function selecionarCardId(id) {
    let indice = 0;
    for (let i = 0; i < novosCards.length; i++) {
        if (novosCards[i].Id == id) {
            indice = i;
        }
    }
    console.log(indice);
    return indice;
}
window.onload = () => {
    obterCardsApi();
};
// arrayNovosCards.map((x: any)=>console.log(x)
// )
