import getData from "./getData.js";
import userData from "./userData.js";

const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    });

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }

    return await response.json();
};

const sendCart = (data) => {
    const cartForm = document.querySelector('.cart-form'),
        userName = document.querySelector('[name="name"]'),
        email = document.querySelector('[name="email"]');

    cartForm.addEventListener('submit', e => {
        e.preventDefault();

        if (userName.value.trim() === '' &&
            email.value.trim() === '') {
            alert('Заполните поля');
        } else {
            const formData = new FormData(cartForm);

            const data = {};

            for (const [key, value] of formData) {
                data[key] = value;
            }

            data.order = userData.cartList; 

            sendData('https://jsonplaceholder.typicode.com/posts', JSON.stringify(data))
                .then(() => {
                    cartForm.reset();
                })
                .catch(error => console.error(error));
        }
    });
};

const generateCart = () => {
    const cartListItems = document.querySelector('.cart-list'),
        cartTotalPrice = document.querySelector('.cart-total-price');
    const createCard = data => {
        let totalPreice = 0;

        cartListItems.textContent = '';

        if (data.length === 0) {
            cartListItems.innerHTML = '<h2>Корзина пуста</h2>';
        } else {
            let listItem = '';

            data.forEach(item => {
                let itemOption = '';

                let countUser = userData.cartList.find(elem => elem.id === item.id).count;

                if (countUser > item.count) {
                    countUser = item.count;
                }

                for (let i = 1; i <= item.count; i++) {
                    itemOption += `<option value="${i}" ${countUser === i ? 'selected' : ''}>${i}</option>`;
                }

                listItem += `
                    <li class="cart-item">
                        <div class="product">
                            <div class="product__image-container">
                                <img 
                                    src="${item.img[0]}" alt="${item.name}" 
                                    aria-describedby="aria_product_description_40366083" 
                                    itemprop="image"
                                >
                            </div>
                            <div class="product__description">
                                <h3 class="product__name">
                                    <a href="card.html#${item.id}">${item.name}</a></h3>
                                <p class="product_description-text">${item.description}</p>
                            </div>
                            <div class="product__prices">
                                <div class="product__price-type product__price-type-regular">
                                    <div>
                                        <div class="product__total product__total-regular">
                                                ${item.price * countUser}.-
                                            </div>
                                        ${countUser > 1 ? `
                                        <div class="product__price-regular">${item.price}.-</div>
                                        ` : ''}
                                        
                                        <!--      -->
                                    </div>
                                </div>
                            </div>
                            <div class="product__controls">

                                <div class="product-controls__remove">
                                    <button type="button" class="btn btn-remove" data-idd="${item.id}">
                                        <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                                    </button>
                                </div>
                                <div class="product-controls__quantity">
                                    <select 
                                        title="Выберите количество" 
                                        aria-label="Выберите количество" 
                                        data-idd="${item.id}"
                                    >
                                        ${itemOption}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </li>
                `;

                totalPreice += item.price * countUser;
            });

            cartListItems.insertAdjacentHTML('afterbegin', listItem);
        }
        cartTotalPrice.textContent = `${totalPreice}.-`;

    };

    if (location.pathname.includes('cart')) {
        getData.cart(userData.cartList, createCard);
        cartListItems.addEventListener('change', e => {
            const target = e.target;

            if (target.closest('select')) {
                userData.changeCountCartList = {
                    id: target.dataset.idd,
                    count: +target.value
                };
                getData.cart(userData.cartList, createCard);
            }
        });
        cartListItems.addEventListener('click', e => {
            const target = e.target.closest('.btn-remove');

            if (target) {
                userData.removeCartItem = target.dataset.idd;
                getData.cart(userData.cartList, createCard);
            }
        });

        sendCart();
    }
};

export default generateCart;