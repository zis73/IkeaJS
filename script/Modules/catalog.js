import getData from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

const catalog = () => {
    const updateSubCatalog = generateSubCatalog();
    // Переменные
    const btnBurger = document.querySelector('.btn-burger'),
        catalog = document.querySelector('.catalog'),
        catalogList = document.querySelector('.catalog-list'),
        subCatalog = document.querySelector('.subcatalog'),
        catalogListItem = document.querySelectorAll('.catalog-list__item');

    const overlay = document.createElement('div');

    overlay.className = 'overlay';

    document.body.insertAdjacentElement('beforeend', overlay);

    // Функции
    const toggleCatalog = () => {
            catalog.classList.toggle('open');
            overlay.classList.toggle('active');
            closeSubMenu();
        },
        openSubMenu = event => {
            event.preventDefault();

            const itemList = event.target.closest('.catalog-list__item');

            if (itemList) {
                getData.subCatalog(itemList.textContent.trim(), data => {
                    updateSubCatalog(itemList.innerHTML, data);
                    subCatalog.classList.add('subopen');
                    catalogListItem.forEach(item => {
                        if (item !== itemList) {
                            item.classList.remove('active');
                        } else {
                            item.classList.add('active');
                        }
                    });
                });
            }
        },
        closeSubMenu = () => {
            subCatalog.classList.remove('subopen');
            catalogListItem.forEach(item => item.classList.remove('active'));
        };


    // Обработчики событей
    btnBurger.addEventListener('click', toggleCatalog);
    catalogList.addEventListener('click', openSubMenu);

    document.body.addEventListener('click', event => {
        const target = event.target;

        if (catalog.classList.contains('open') && !target.closest('.btn-burger')) {
            if (target === overlay ||
                target.closest('.btn-close')) {
                toggleCatalog();
            }
        }

        if (target.closest('.btn-return')) {
            closeSubMenu();
        }
    });

    document.addEventListener('keydown', event => {
        if (catalog.classList.contains('open')) {
            if (event.code === 'Escape') {
                toggleCatalog();
            }
        }
    });
};

export default catalog;