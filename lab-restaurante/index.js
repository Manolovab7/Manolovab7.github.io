let carrinhoDeCompra = [];
let totalPrecos = {};


async function fetchMenuItems(url) {

    const resposta = await fetch(url);
    const dados = await resposta.json();
    return dados;
}

function adicionarItemAoMenu(item, container) {
    const { photo, price, name, details } = item;
    const itemElement = document.createElement("div");
    itemElement.className = "col-md-6";
    itemElement.innerHTML = `
        <div class="item">
            <figure>
                <img src="https://rafaelescalfoni.github.io/desenv_web/restaurante/${photo}">
                <figcaption>${name}</figcaption>
            </figure>
            <div class="item-description">
                ${details}
                <span class="preco" data-item-code="${item.code}">${price}</span>
            </div>
        </div>`;
    container.appendChild(itemElement);
}

async function loadMenu() {
    const url = "https://rafaelescalfoni.github.io/desenv_web/restaurante/items.json";
    const dados = await fetchMenuItems(url);
    const sectionContent = document.getElementById("cardapio");

    dados.forEach((elem) => {
        adicionarItemAoMenu(elem, sectionContent);
    });

    const carrinhoLocalStorage = localStorage.getItem('carrinhoDeCompra');
    const totalPrecosLocalStorage = localStorage.getItem('totalPrecos');

    if (carrinhoLocalStorage && totalPrecosLocalStorage) {
        carrinhoDeCompra = JSON.parse(carrinhoLocalStorage);
        totalPrecos = JSON.parse(totalPrecosLocalStorage);
        atualizarCarrinho();
        atualizarTotalCarrinho();
    }

    const botoesPreco = document.querySelectorAll('.item-description span.preco');
    botoesPreco.forEach((botao) => {
        botao.addEventListener('click', function () {
            const itemCode = this.getAttribute('data-item-code');
            const item = dados.find((elem) => elem.code === itemCode);
            if (item) {
                adicionarAoCarrinho(item);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", loadMenu);

function adicionarAoCarrinho(item) {
    const preco = parseFloat(item.price.replace(/[^\d.]/g, ''));

    if (totalPrecos[item.code]) {
        totalPrecos[item.code] += preco;
    } else {
        totalPrecos[item.code] = preco;
    }

    carrinhoDeCompra.push(item);
    localStorage.setItem('carrinhoDeCompra', JSON.stringify(carrinhoDeCompra));
    localStorage.setItem('totalPrecos', JSON.stringify(totalPrecos));
    atualizarCarrinho();
    atualizarTotalCarrinho();

    itemTimers[item.code] = setTimeout(function () {
        cancelarItemDoCarrinho(item);
    }, 5 * 60 * 1000);
}


function atualizarCarrinho() {
    const detalhesCompra = document.getElementById("detalhes-compra");
    detalhesCompra.innerHTML = "";

    carrinhoDeCompra.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Quantidade: 1 - R$${formatarNumero(totalPrecos[item.code])}`;

        detalhesCompra.appendChild(li);
    });
}

function atualizarTotalCarrinho() {
    const totalElement = document.getElementById("total-carrinho");
    const subtotal = Object.values(totalPrecos).reduce((acc, preco) => acc + preco, 0);
    const taxaServico = subtotal * 0.1;
    const total = subtotal + taxaServico;

    if (totalElement.textContent.includes('Total: R$')) {
        const valorAnterior = parseFloat(totalElement.textContent.replace('Total: R$', '').replace(',', '.'));
        const novoTotal = valorAnterior + total;
        totalElement.textContent = `Total: R$ ${formatarNumero(novoTotal)}`;
    } else {
        totalElement.textContent = `Total: R$ ${formatarNumero(total)}`;
    }
}

const fecharContaButton = document.getElementById("fechar-conta");
fecharContaButton.addEventListener("click", function () {
    fecharConta();
});

function fecharConta() {
    if (carrinhoDeCompra.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de fechar a conta.");
        return;
    }
    localStorage.removeItem('carrinhoDeCompra');
    localStorage.removeItem('totalPrecos');
    carrinhoDeCompra = [];
    totalPrecos = {};

    atualizarCarrinho();
    atualizarTotalCarrinho();

    alert("Pedido realizado! Obrigado pela sua compra.");
    window.location.href = "index.html";
}
function cancelarItemDoCarrinho(item) {
    const index = carrinhoDeCompra.findIndex((elem) => elem.code === item.code);
    if (index !== -1) {
        carrinhoDeCompra.splice(index, 1);
        delete totalPrecos[item.code];
        localStorage.setItem('carrinhoDeCompra', JSON.stringify(carrinhoDeCompra));
        localStorage.setItem('totalPrecos', JSON.stringify(totalPrecos));
        atualizarCarrinho();
        atualizarTotalCarrinho();
        clearTimeout(itemTimers[item.code]);
        alert(`Desculpe, mas seu pedido de ${item.name} já foi enviado para a cozinha.`);
    }
}

function formatarNumero(numero) {
    return numero.toFixed(2).replace('.', ',');
}
