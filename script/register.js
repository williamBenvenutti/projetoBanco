var listaUsuarios = [];
var listaNomes = [];
var listaSenhas = [];
var listaSaldo = [];
var usuarioLogado;
var urlParams = new URLSearchParams(window.location.search);
var userName = "";
var nomeUsuario = "";
var senhaUsuario = "";

listaNomes.push(urlParams.get("nomeUsuario"));
listaSenhas.push(urlParams.get("senhaUsuario"));
listaUsuarios.push(urlParams.get("userName"));

function redirecionarRegistro(){
    window.location.href = `registro.html`;
};

const cpfInput = document.getElementById("cpfUser");

window.onload = function() {
  userName = JSON.parse(localStorage.getItem('userName'));
  nomeUsuario = JSON.parse(localStorage.getItem('nomeUsuario'));
  senhaUsuario = JSON.parse(localStorage.getItem('senhaUsuario'));
};

function coletarDados(){
    // Adicionar os valores atuais às listas
    nomeUsuario = document.getElementById('nomeInput').value;
    senhaUsuario = document.getElementById('senhaInput').value;
    userName = document.getElementById('userName').value;
    
    window.location.href = `teste.html?nomeUsuario=${nomeUsuario}&userName=${userName}&senhaUsuario=${senhaUsuario}`;
}


cpfInput.addEventListener("keyup", function(event) {
  let cpfConvert = cpfInput.value;
  cpfConvert = cpfConvert.replace(/\D/g, "");
  cpfConvert = cpfConvert.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  cpfInput.value = cpfConvert;
});

dataInput.addEventListener("keyup", function(event) {
    let dataConvert = dataInput.value;
    dataConvert = dataConvert.replace(/\D/g, "");
    dataConvert = dataConvert.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    dataInput.value = dataConvert;
});
