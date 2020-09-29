'use srict';
//day 1
const btnBurger = document.querySelector('.btn-burger'),
  btnClose = document.querySelector('.btn-close'),
  subcatalog = document.querySelector('.subcatalog'),
  subcatalogHeader = document.querySelector('.subcatalog-header')
  btnReturn = document.querySelector('.btn-return');
  catalog = document.querySelector('.catalog');

const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.insertAdjacentElement('beforeend', overlay);
const openMenu = () => {
  catalog.classList.add('open');
  overlay.classList.add('active');
},
  closeMenu = () => {
    catalog.classList.remove('open');
    overlay.classList.remove('active');
    closeSubMenu();
  },
  openSubMenu = (event) => {
    event.preventDefault();
    const itemList = event.target.closest('.catalog-list__item');
    if(itemList) {
      subcatalogHeader.innerHTML = itemList.innerHTML;
      subcatalog.classList.add('subopen');
    }
  },
  closeSubMenu = () => {
    subcatalog.classList.remove('subopen'); 
  };

btnBurger.addEventListener('click', openMenu);
btnClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
catalog.addEventListener('click', openSubMenu);
btnReturn.addEventListener('click', closeSubMenu);


document.addEventListener('keydown', (event) => {
  if(event.code === 'Escape'){
    closeMenu();
  }
});