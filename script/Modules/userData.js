const userData = {
    _wishListData: JSON.parse(localStorage.getItem('saveWishList')) || [],
    get wishList() {
        return this._wishListData;
    },
    set wishList(id) {
        if (this._wishListData.includes(id)) {
            const index = this._wishListData.indexOf(id);
            this._wishListData.splice(index, 1);
        } else {
            this._wishListData.push(id);
        }
        this.saveLocalStorage();
    },
    _cartListData: JSON.parse(localStorage.getItem('saveCartList')) || [],
    get cartList() {
        return this._cartListData;
    },
    set cartList(id) {
        let obj = this._cartListData.find(item => item.id === id);
        if (obj) {
            obj.count++;
        } else {
            obj = {
                id,
                count: 1
            };
            this._cartListData.push(obj);
        }
        console.log(this._cartListData);
        this.saveLocalStorage();
    },
    set changeCountCartList(itemCart) {
        let obj = this._cartListData.find(item => item.id === itemCart.id);
        obj.count = itemCart.count;
        this.saveLocalStorage();
    },
    set removeCartItem(id) {
        const obj = this._cartListData.find(item => item.id === id);
        const index = this._cartListData.indexOf(obj);
        this._cartListData.splice(index, 1);
        this.saveLocalStorage();
    },
    saveLocalStorage() {
        localStorage.setItem('saveCartList', JSON.stringify(this._cartListData));
        localStorage.setItem('saveWishList', JSON.stringify(this._wishListData));
    }
};

export default userData;