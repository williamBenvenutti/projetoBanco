var saldoConta = 1200;
var opSelecionada;
var valorRecebido;
var valorRecebidoConvertido
var valorDepositoDois;
var saldoEmConta = saldoConta.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
var listaExtrato = [];
var mostraExt;
var nomeUsuario = "";
var urlParams = new URLSearchParams(window.location.search);
var nomeFinal = urlParams.get("nomeUsuario")
var time = new Date();
var hora = time.getHours();
var horario = '';

mostraHorario();
document.getElementById("saldoConta").innerHTML = `<h2>${saldoEmConta}</h2>`;
document.getElementById("nomeUser").innerHTML = `<h2>${nomeFinal}</h2>`;


// Mostra a mensagem conforme o horário local
function mostraHorario(){
    if (hora >= 6 && hora < 12){
        var horario = 'Bom Dia,';
    }else if (hora >= 12 && hora <=17){
        var horario = 'Boa Tarde,';
    }else{
        var horario = 'Boa Noite,';
    }
    document.getElementById("hora").innerHTML = `<p>${horario}</p>`;
}

// Função para redirecionar para outra página clicando no botão
function redirecionar(){
    nomeUsuario = document.getElementById("cpfInput").value;
    window.location.href = `home.html?nomeUsuario=${nomeUsuario}`;
};


// Adiciona o campo de input do saque ao clicar no botão
function adicionarInputSaque(){
    if (opSelecionada == "deposito"){ //Verifica se o input de deposito esta sendo exibido
        document.getElementById("inputDeposito").innerHTML = ""; 
        document.getElementById("btnEnviar").innerHTML = "";
    }
    document.getElementById("inputSaque").innerHTML = `
    <input type="text" id="saldo-saque">`;
    document.getElementById("btnEnviarDois").innerHTML = `
    <button class="btnSend" onclick="enviarValor()">Enter</button>`;
    opSelecionada = 'saque';  // Define o opSelecionada para saque, assim dizendo que o input de saque esta sendo exibido
}


// Adiciona o campo de input do depósito ao clicar no botão
function adicionarInputDeposito(){
    if (opSelecionada == "saque"){ //Verifica se o input de saque esta sendo exibido
        document.getElementById("inputSaque").innerHTML = "";
        document.getElementById("btnEnviarDois").innerHTML = "";
    }
    document.getElementById("inputDeposito").innerHTML = `
    <input type="text" id="saldo-deposito">`
    document.getElementById("btnEnviar").innerHTML = `
    <button class="btnSend" onclick="enviarValor()">Enter</button>`;
    opSelecionada = 'deposito'; // Define o opSelecionada para deposito, assim dizendo que o input de saque esta sendo exibido
}

// Função para pegar o valor que esta no campo de input
function enviarValor(){
    if (opSelecionada == 'saque'){
        valorRecebido = document.getElementById("saldo-saque").value;
        
        document.getElementById("inputSaque").innerHTML = "";
        document.getElementById("btnEnviarDois").innerHTML = "";
        calculoConta();
    }else if (opSelecionada == 'deposito'){
        valorRecebido = document.getElementById("saldo-deposito").value;
        document.getElementById("inputDeposito").innerHTML = "";
        document.getElementById("btnEnviar").innerHTML = "";
        calculoConta();
    }
    listaExtrato.unshift(valorRecebido, opSelecionada);
    valorRecebidoConvertido = valorRecebido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

// Função para calcular o valor a ser acrescentado ou debitado da conta
function calculoConta(){
        if (opSelecionada == 'deposito'){
        valorDepositoDois = parseInt(valorRecebido) || 0;
        saldoConta += valorDepositoDois;
        var saldoEmConta = saldoConta.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.getElementById("saldoConta").innerHTML = `<h2>${saldoEmConta}</h2>`;
    }else{
        saldoConta -= valorRecebido;
        var saldoEmConta = saldoConta.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.getElementById("saldoConta").innerHTML = `<h2>${saldoEmConta}</h2>`;
    }
}

// Função para mostrar o extrato bancário
function mostrarExtrato() {
    let extratoHTML = ''; //Coleta o valor da lista
    if (mostraExt == "mostrando"){
        for (let i = 0; i < listaExtrato.length; i += 2) {
                extratoHTML += ``
        }
        mostraExt = "oculto";
    }
    else{
        for (let i = 0; i < 19; i += 2) { //i<19 para mostrar somente as 10 primeiras transações
            if (listaExtrato[i + 1] == 'deposito') {
                extratoHTML += `<li class="depositoExtrato"><i class='bx bx-up-arrow-alt'></i>${Number(listaExtrato[i]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>`;
            }

            if (listaExtrato[i + 1] == 'saque') {
                extratoHTML += `<li class="saqueExtrato"><i class='bx bx-down-arrow-alt'></i> ${Number(listaExtrato[i]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>`;
            }
        }
    mostraExt = "mostrando";
    }   
    document.getElementById("testeLista").innerHTML = extratoHTML;
}
