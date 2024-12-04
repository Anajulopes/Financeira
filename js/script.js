
function adicionarTransacao() 
{
    var nome = document.getElementById('nome').value;
    var des = document.getElementById('des').value;
    var categoria = document.getElementById('categoria').value;
    var data = document.getElementById('data').value;
    var valor = document.getElementById('valor').value;

    var usuario = { nome:nome, des:des, categoria:categoria, data:data, valor:valor };

    var lista_usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
    lista_usuarios.push(usuario);
    localStorage.setItem('lista_usuarios', JSON.stringify(lista_usuarios));
    document.getElementById('formcadastro').reset();
    exibir_usuarios();
    total ();
}

function exibir_usuarios() 
{
    var lista_usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
    var output = document.getElementById('output');
    output.innerHTML = '';

    for (let i = 0; i < lista_usuarios.length; i++) 
    {
        let li = document.createElement('li');
        li.innerHTML = 'Nome: ' + lista_usuarios[i].nome + ', Descrição: ' + lista_usuarios[i].des + ', Categoria: ' + lista_usuarios[i].categoria + ', Data: ' + lista_usuarios[i].data + ', Valor: R$' + lista_usuarios[i].valor +
        ` <button onclick="editarTransacao(${i})">Editar</button> <button onclick="excluirTransacao(${i})">Excluir</button>`;
        output.appendChild(li);
    }
}

function excluirTransacao(index) 
{
    var lista_usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
    lista_usuarios.splice(index, 1);
    localStorage.setItem('lista_usuarios', JSON.stringify(lista_usuarios));
    exibir_usuarios();
}

function editarTransacao(index) 
{
    var lista_usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || [];
    var usuario = lista_usuarios[index];

    document.getElementById('nome').value = usuario.nome;
    document.getElementById('des').value = usuario.des;
    document.getElementById('categoria').value = usuario.categoria;
    document.getElementById('data').value = usuario.data;
    document.getElementById('valor').value = usuario.valor;

    lista_usuarios.splice(index, 1);
    localStorage.setItem('lista_usuarios', JSON.stringify(lista_usuarios));

    document.getElementById('formcadastro').removeEventListener('submit', adicionarTransacao);
    document.getElementById('formcadastro').addEventListener('submit', function (event) 
    {
        event.preventDefault();
        adicionarTransacao();
        document.getElementById('formcadastro').addEventListener('submit', adicionarTransacao);
    })
}

document.getElementById('formcadastro').addEventListener('submit', function (event) 
{
    event.preventDefault();
    adicionarTransacao();
})

/*function somard()
{
    var totald  = JSON.parse(localStorage.getItem('totald')) || [];

    totald = valor + valor
    document.write = totald
}

function somarr()
{
    var totalr  = JSON.parse(localStorage.getItem('totalr')) || [];

    totalr = valor + valor
    document.write = totalr
}

if (categoria==despesas)
{
    somard()
    alert ("oi")
}

else(categoria==receitas)
{
    somarr()
}*/

function total ()
{
    var lista_usuarios = JSON.parse(localStorage.getItem('lista_usuarios')) || []
    var totalr = lista_usuarios.reduce((total, usuario) => total + parseFloat(usuario.receita), 0);
    var totald = lista_usuarios.reduce((total, usuario) => total + parseFloat(usuario.despesa), 0);
    var output2 = document.getElementById('output2');
    output2.innerHTML = '';
    
    let li = document.createElement('li');
    li.innerHTML = ("Total de receitas: "+totalr+"<br> Total de despesas: "+totald);
    output2.appendChild(li);

}