let inputNome = document.querySelector(".nome") as HTMLInputElement;
let inputStatus = document.getElementsByName("status") as any;
let inputData = document.querySelector(".data") as HTMLInputElement;
let inputTextArea = document.querySelector(".descricaoArea") as HTMLInputElement;
let novosCards: Array<Card> = []
let btnCadastro = document.querySelector(".cadastro") as HTMLButtonElement

class Card {
    private nome: string;
    private descricao: string;
    private data: string;
    private status: Boolean;
    private id: string;

    public get Nome(): string {
        return this.nome;
    }
    public set Nome(value: string) {
        this.nome = value;
    }

    public get Descricao(): string {
        return this.descricao;
    }
    public set Descricao(value: string) {
        this.descricao = value;
    }

    public get Data(): string {
        return this.data;
    }
    public set Data(value: string) {
        this.data = value;
    }

    public get Status(): Boolean {
        return this.status;
    }
    public set Status(value: Boolean) {
        this.status = value;
    }

    public get Id(): string {
        return this.id;
    }
    public set Id(value: string) {
        this.id = value;
    }

    constructor(_nome:string, _descricao:string, _data: string, _status: Boolean, _id: string ){
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }

}

interface ApiTipagem{
    nome: string;
    descricao: string;
    data: string;
    status: Boolean;
    id: string;
}

function obterCardsApi():void{
    fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes')
    .then(resposta=>resposta.json())
    .then((dados:ApiTipagem [])=>{
        return dados.map(dadosCard=>{            
            return new Card(
                dadosCard.nome,
                dadosCard.descricao,
                dadosCard.data,
                dadosCard.status,
                dadosCard.id
            )
        })
    })
    .then(dadosNovosCards => {
        injetarDados(dadosNovosCards)
        novosCards = dadosNovosCards;
        console.log(novosCards);
    })
    
}

function criarCards() {
    inputNome.value;
    validacaoStatus (inputStatus);
    inputData.value;
    inputTextArea.value;
    let novoCard = new Card(inputNome.value, inputTextArea.value, inputData.value, validacaoStatus(inputStatus),criarId())
    novosCards.push(novoCard);
    // console.log(novosCards);
    injetarDados(novosCards)
}

function criarId() {
    let maiorId:number = 0
    novosCards.map((dadoId, index)=>{
        if (Number(dadoId.Id) > maiorId) {
            maiorId = Number(dadoId.Id)
        }
    })
    maiorId ++
    return maiorId.toString()
    
}

btnCadastro.addEventListener('click', () => {
    criarCards() 
})

function validacaoStatus(status:any){
    status = inputStatus;
    for (let i = 0; i < status.length; i++) {
      if (status[i].checked) {
        if (status[i].value == 'true') {
            status = true
        } else {
            status = false
        }
      }
    }
    return status
}

function dataTexto(data:string):string{
    let newDate = new Date(data)
    let dataString:string;
    dataString=(Number(newDate.getDate()).toString()+"/"+(newDate.getMonth()+1).toString()+"/"+newDate.getFullYear().toString())
    return dataString
}

function injetarDados(arrayNovosCards:any){
    let cardNovo = document.querySelector('.cardAPI') as HTMLElement
    cardNovo.innerHTML = ''

    for (let i = 0; i < arrayNovosCards.length; i++) {
        cardNovo.innerHTML += `<div class="container">
        <h2 class="nomeAPI">${arrayNovosCards[i].nome} </h2>
        <p class="txtAPI">${arrayNovosCards[i].descricao}</p>
        <p class="txtData">Data: ${dataTexto (arrayNovosCards[i].data)} </p>
        <button type="submit" class="editar" id="editar${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="editar(${arrayNovosCards[i].id})" >Editar</button>
        <button type="submit" class="excluir" id="excluir${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="excluir(${arrayNovosCards[i].id})">Excluir</button>
    </div>`
    }
    // console.log(dataTexto(arrayNovosCards[0].data));
}

function editar(id:string) {
    let indice:number
    indice = selecionarCardId(id)
    inputNome.value = novosCards[indice].Nome;
    inputData.value =  inversaoData(novosCards[indice].Data);
    inputTextArea.value = novosCards[indice].Descricao;
    console.log(novosCards[indice].Status);
    

    inputStatus.value = novosCards[indice].Status;
    excluir(id)
    injetarDados(novosCards);

}


function inversaoData(data:string):string{
    let newDate = new Date(data)
    let dataString:string;
    dataString=(Number(newDate.getFullYear()).toString()+"-"
            +(newDate.getMonth()+1).toString()+"-"
            +newDate.getDate().toString())
    return dataString
}

function excluir(id:string) {
    let indice:number
    indice = selecionarCardId(id)
    novosCards.splice(indice, 1)
    injetarDados(novosCards);

}


function selecionarCardId(id:string):number {
    let indice:number = 0
    for (let i = 0 ; i < novosCards.length; i++) {
        if (novosCards[i].Id == id) {
            indice = i
        }   
    } 
    console.log(indice);
    return indice
    
}

window.onload = () => {
    obterCardsApi();
};

// arrayNovosCards.map((x: any)=>console.log(x)
// )