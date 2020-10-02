const PARAM = {
  cat: 'category',
  subcat: 'subcategory',
  search: ['name', 'description', 'category', 'subcategory']
};

export const getData = {
  url: 'database/dataBase.json',
  get(process) {
    fetch(this.url)
      .then((response) => response.json())
      .then(process );
  },
  wishList(list, callback) {
    this.get((data) => {
      const result = data.filter((item) => list.includes(item.id));
      callback(result);
    });
  },
  item(value, callback) {
    this.get((data) => {
      const result = data.find(item => item.id === value);
      callback(result);
    });
  },
  cart(list, callback) {
    this.get((data) => {
      const result = data.filter(item => list.some(obj => obj/id === item.id));
      callback(result);
    });
  },
  category(prop, value, callback) {
    this.get((data) => {
      const result = data.filter(item => item[PARAM[prop]].toLowerCase() === value.toLowerCase());
      callback(result);
    });
  },
  search(value, callback) {
    this.get((data) => {
      const result = data.filter(item => {
        for(const prop in item) {
          if(PARAM.search.includes(prop) && item[prop].toLowerCase().includes(value.toLowerCase()))
          return true;
        }
      })
      callback(result);
    })
  },
  catalog(callback) {
    this.get((data) => {
        const result = [];
        data.forEach(item => {
          if (!result.includes(item.category))
              result.push(item.category);
      });
      callback(result);
    });
  },
    subCatalog(value, callback) {
    this.get((data) => {
      const result = [];
      data.filter(item => item.category === value)
      .forEach(item => { 
      if (!result.includes(item.subcategory))
          result.push(item.subcategory);
      });
      callback(result);
    });
  }
};