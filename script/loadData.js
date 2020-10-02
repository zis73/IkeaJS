import { getData } from './getData.js'

const wishList = ['idd008','idd013','idd005','idd073'];

const cartList = [
  {
    id: 'idd003',
    count: 4
  },
  {
    id: 'idd023',
    count: 2
  },
  {
    id: 'idd034',
    count: 4
  }
];

export const loadData = () => {

  if(location.search) {
    const search = decodeURI(location.search),
    prop = search.split('=')[0].substring(1),
    value = search.split('=')[1];
    
    if(prop === 's'){
      getData.search(value, (data) => console.log(data))
    } else if (prop === 'wishlist'){
        getData.wishList(wishList, (data) => console.dir({wishList:data})); 
    } else if(prop === 'cat' || prop === 'subcat'){
      getData.category(prop, value, (data) => console.log(data));
    }
  }
  if(location.hash) {
    getData.item(location.hash.substring(1), (data) => console.log(data));
  }
  if(location.pathname.includes('cart')){
    console.cart(cartList, (data) => console.log(data));
  }

  getData.catalog((data) => console.log(data));
  getData.subCatalog("Декор", (data) => console.log(data));
};