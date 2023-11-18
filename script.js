document.addEventListener('DOMContentLoaded', function () {
    // Carregue o carrinho da localStorage ao carregar a página
    loadCartFromStorage();

    // Obtenha todos os itens do menu
    const menuItems = document.querySelectorAll('.item');

    // Adicione um evento de clique a cada item do menu
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // Obtenha informações do item clicado
            const itemId = item.querySelector('figcaption').innerText;
            const itemPrice = parseFloat(item.querySelector('.item-description span').innerText.replace('R$', ''));

            // Adicione o item ao carrinho
            addToCart(itemId, itemPrice);
        });
    });

    // Função para adicionar itens ao carrinho
    function addToCart(itemId, itemPrice) {
        // Verifique se o carrinho já existe na localStorage
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : {};

        // Atualize a quantidade do item no carrinho
        cart[itemId] = (cart[itemId] || 0) + 1;

        // Salve o carrinho na localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Atualize a exibição do carrinho
        updateCartView(cart, itemPrice);
    }

    // Função para atualizar a exibição do carrinho
    function updateCartView(cart, itemPrice) {
        const totalElement = document.querySelector('.total');
        let currentTotal = parseFloat(totalElement.innerText) || 0;

        // Atualize o total
        currentTotal += itemPrice;
        totalElement.innerText = currentTotal.toFixed(2);

        // Atualize a lista de itens no carrinho
        const cartList = document.querySelector('.itens');
        cartList.innerHTML = '';

        // Adicione cada item ao carrinho
        for (const itemId in cart) {
            const itemQuantity = cart[itemId];
            const itemElement = document.createElement('li');
            itemElement.innerText = `${itemId} - ${itemQuantity}x`;
            cartList.appendChild(itemElement);
        }
    }


    // Função para carregar o carrinho da localStorage
    function loadCartFromStorage() {
        const cart = localStorage.getItem('cart');

        if (cart) {
            const parsedCart = JSON.parse(cart);

            // Atualize a exibição do carrinho
            updateCartView(parsedCart, 0);
        }
    }

    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('cart'); // Remove o carrinho da localStorage
    });
});