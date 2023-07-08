const carregaFilme = filme => {

    let idade = classificacoes(filme.classificacao)


    let estrelas = carregaEstrela(filme.opinioes[0].rating)

    let resp = `<div class="filmes2">
    <h1>${filme.titulo}</h1>
    <img src="${filme.figura}" alt="">
    <P>${filme.resumo}</p>   
    <p>${filme.generos}</p>
    <p>${filme.elenco}</p>
    <p>${idade}</p>
    <p>${estrelas}</p>
    </div>`
    
    const divResp = document.querySelector(".filmes")
    divResp.innerHTML += resp
}

const carregaEstrela = opiniao => {
    switch(opiniao){
        case 3:{
            avaliacao = `
            <img src="css/estrela.png" alt="" width="20px" height="20px"><img>
            <img src="css/estrela.png" alt="" width="20px" height="20px"><img>
            <img src="css/estrela.png" alt="" width="20px" height="20px"><img>
            <img src="css/estrela.png" alt=""  width="20px" height="20px"><img>
            <img src="css/estrela.png" alt=""  width="20px" height="20px"><img>
            `
        }
        
        case 4:{
            avaliacao = `  <img src="css/estrela.png" alt="" width="20px" height="20px"><img>
            <img src="css/estrela.png" alt="" width="20px" height="20px"><img>
            <img src="css/estrela.png" alt="" width="20px" height="20px"><img>
            <img src="css/estrela.png" alt=""  width="20px" height="20px"><img>
            <img src="css/estrela.png" alt=""  width="20px" height="20px"><img>
            `;
        } break;
        
        case 5:{
            avaliacao = `  <img src="css/estrela.png" alt="" width="20px" height="20px"><img>
            <img src="css/estrela.png" alt="" width="20px" height="20px"><img>
            <img src="css/estrela.png" alt="" width="20px" height="20px"><img>
            <img src="css/estrela.png" alt=""  width="20px" height="20px"><img>
            <img src="css/estrela.png" alt=""  width="20px" height="20px"><img>
            `
        }
    }
    return avaliacao;
}

const classificacoes = classificacao => {
    switch(classificacao)
    {
        case 0:
            return `<p style="color:aliceblue;background-color:green;padding-top:10px;padding-bottom:10px; padding-right:20px; padding-left:20px; width:max-content;">L</p>`
            break;
        case 10:
            return `<p style="color:aliceblue;background-color:blue;padding:10px;width:max-content;">10</p>`
            break;
        case 12:
            return `<p style="color:aliceblue;background-color:gold;padding:10px;width:max-content;">12</p>`
            break;
        case 14:
            return `<p style="color:aliceblue;background-color:orange;padding:10px;width:max-content;">14</p>`
            break;
        case 16:
            return `<p style="color:aliceblue;background-color:red;padding:10px; width:max-content;">16</p>`
            break;
        case 18:
            return `<p style="color:aliceblue;background-color:red;padding:10px;width:max-content;border:1px aliceblue;">18</p>`
            break;
    }
}

const xhttp = new XMLHttpRequest()
    const url = `https://rafaelescalfoni.github.io/desenv_web/filmes.json`
    
    xhttp.open("get", url)
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                let resposta = this.responseText
                let filme = JSON.parse(resposta)
                //iterar o array 
                filme.forEach(filme3 => {
                    //carregar os filmes
                    carregaFilme(filme3)
                });
            } else {
                //deu bigode! :#(
            }
        } 
    }

