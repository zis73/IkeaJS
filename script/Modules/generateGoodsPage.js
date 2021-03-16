import getData from './getData.js';
import userData from './userData.js';

const COUNTER = 6;

const generateGoodsPage = () => {
    const mainHeader = document.querySelector('.main-header'),
        goodsList = document.querySelector('.goods-list'),
        title = document.querySelector('title');

    const generateCards = data => {
        goodsList.textContent = '';
        if (data.length === 0) {
            goodsList.innerHTML = location.search === '?wishlist' ? '<h2>Список желаний пуст</h2>' :
                `<h2>Ничего не найдено</h2>`;
        } else {
            data.forEach(item => {
                goodsList.insertAdjacentHTML('afterbegin', `
                    <li class="goods-list__item">
                        <a class="goods-item__link" href="card.html#${item.id}">
                            <article class="goods-item">
                                <div class="goods-item__img">
                                    <img src="${item.img[0]}"
                                        ${item.img[1] ? `data-second-image="${item.img[1]}"` : ''} alt="${item.name}">
                                </div>
                                ${item.count >= COUNTER ? '<p class="goods-item__new">Новинка</p>' : ''}
                                ${!item.count ? '<p class="goods-item__new">Нет в наличие</p>' : ''}
                                <h3 class="goods-item__header">${item.name}</h3>
                                <p class="goods-item__description">${item.description}</p>
                                <p class="goods-item__price">
                                    <span class="goods-item__price-value">${item.price}</span>
                                    <span class="goods-item__currency"> ₽</span>
                                </p>
                                ${item.count ? `
                                    <button 
                                        class="btn btn-add-card" aria-label="Добравить в корзину" 
                                        data-idd="${item.id}"
                                    >
                                    </button>
                                ` : ''}
                                
                            </article>
                        </a>
                    </li>
                `);
            });
        }
    };

    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search),
            prop = search.split('=')[0].slice(1),
            value = search.split('=')[1];

        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`;
            title.textContent = `Найденые товары - IKEA`;
        } else if (prop === 'wishlist') {
            getData.wishList(userData.wishList, generateCards);
            mainHeader.textContent = `Избранное`;
            title.textContent = `Избранное - IKEA`;
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
            title.textContent = `${value} - IKEA`;
        }

        document.body.addEventListener('click', event => {
            if (event.target.closest('.btn-add-card')) {
                event.preventDefault();
                const id = event.target.closest('.btn-add-card').dataset.idd;
                userData.cartList = id;
            }
        });
    }
};

export default generateGoodsPage;