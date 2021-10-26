"use strict"

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/500x500/FFFFFF',
        basketUrl: '/getBasket.json',
        basketProducts: [],
        showBasket: false,
        basketCount: 2,
        userSearch: '',
        filtered: [],
        error: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            let find = this.basketProducts.find(item => item.id_product === product.id_product);
            this.basketCount++;
            if (find) {
                find.quantity++;
            } else {
                this.basketProducts.push(
                    product);
                Vue.set(product, 'quantity', 1);
            }
        },
        removeProduct(product) {
            this.basketCount--;
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                this.basketProducts.splice(this.basketProducts.indexOf(product), 1);
            }
        },
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                    this.filtered.push(product);
                }
            });
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let product of data.contents) {
                    this.basketProducts.push(product);
                }
            });
        // this.getJson(`getProducts.json`)
        //     .then(data => {
        //         for (let el of data) {
        //             this.products.push(el);
        //         }
        //     })
    },

});







// class Validator {
//     constructor(form) {
//         this.patterns = {
//             name: /^[a-zа-яё]+$/i,
//             phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
//             email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
//         };
//         this.errors = {
//             name: 'Имя содержит только буквы',
//             phone: 'Телефон подчиняется шаблону +7(000)000-0000',
//             email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
//         };
//         this.errorClass = 'error-msg';
//         this.form = form;
//         this.valid = false;
//         this._validateForm();
//     }
//     validate(regexp, value) {
//         regexp.test(value)
//     }

//     _validateForm() {
//         let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
//         for (let error of errors) {
//             error.remove();
//         }
//         let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
//         for (let field of formFields) {
//             this._validate(field);
//         }
//         if (![...document.getElementById(this.form).querySelectorAll('.invalid')].length) {
//             this.valid = true;
//         }
//     }
//     _validate(field) {
//         if (this.patterns[field.name]) {
//             if (!this.patterns[field.name].test(field.value)) {
//                 field.classList.add('invalid');
//                 this._addErrorMsg(field);
//                 this._watchField(field);
//             }
//         }
//     }
//     _addErrorMsg(field) {
//         let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
//         field.parentNode.insertAdjacentHTML('beforeend', error);
//     }
//     _watchField(field) {
//         field.addEventListener('input', () => {
//             let error = field.parentNode.querySelector(`.${this.errorClass}`);
//             if (this.patterns[field.name].test(field.value)) {
//                 field.classList.remove('invalid');
//                 field.classList.add('valid');
//                 if (error) {
//                     error.remove();
//                 }
//             } else {
//                 field.classList.remove('valid');
//                 field.classList.add('invalid');
//                 if (!error) {
//                     this._addErrorMsg(field);
//                 }
//             }
//         })
//     }
// }


// class List {
//     constructor(url, container, list = list2) {
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     /**
//     * Метод создает массив с товарами.
//     */
//     handleData(data) {
//         this.goods = [...data];
//         this.render();
//     }
//     /**
//      * Метод считает суммарную стоимость всех товаров.
//     **/
//     calcSum() {
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//     /**
//      * Метод выводит товары на страницу.
//     **/
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new this.list[this.constructor.name](product);
//             console.log(productObj);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }
//     /**
//     * Метод проверяет наличие товара в корзине.
//     */
//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product__item"[data-id="${el.id_product}"]`);
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('hidden');
//             } else {
//                 block.classList.remove('hidden');
//             }
//         })
//     }
//     _init() {
//         return false
//     }
// }


// class Item {
//     constructor(el, image = 'https://via.placeholder.com/500x500/FFFFFF') {
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.id_product = el.id_product;
//         this.image = image;
//     }
//     /**
//      * Метод формирует верстку каждого товара.
//     **/
//     render() {
//         return `<div class="product__item" data-id="${this.id_product}">
//                     <img src="${this.image}" alt="ptoduct" class="product__img">
//                         <div class="product__block">
//                             <div>
//                                 <h3 class="product__title">${this.product_name}</h3>
//                                 <p class="product__price">${this.price}&#8381;</p>
//                             </div>
//                             <button class="button buy-btn" data-id="${this.id_product}" data-name="${this.product_name}" data-price="${this.price}"">Купить</button>
//                         </div>
//                     </div>`
//     }
// }

// class ProductsList extends List {
//     constructor(cart, container = '.products', url = "/catalogData.json") {
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }
//     /**
//      *
//     **/
//     _init() {
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('buy-btn')) {
//                 this.cart.addProduct(e.target);
//                 document.getElementById('basket-count').textContent++;
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value)
//         })
//     }
// }


// class ProductItem extends Item { }

// class Cart extends List {
//     constructor(container = ".header__basket", url = "/getBasket.json") {
//         super(url, container);
//         this.getJson()
//             .then(data => {
//                 this.handleData(data.contents);
//             });
//     }
//     addProduct(element) {
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if (find) {
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         };
//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     _updateCart(product) {
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector('.product__count').textContent = `${product.quantity}`;
//         block.querySelector('.product__amount').textContent = `$${product.quantity * product.price}`;
//     }
//     _init() {
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('hidden');
//         });
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('del-btn')) {
//                 this.removeProduct(e.target);
//                 document.getElementById('basket-count').textContent--;
//             }
//         })
//     }

// }

// class CartItem extends Item {
//     constructor(el, img = 'https://placehold.it/50x100') {
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     /**
//      * Метод формирует верстку каждого товара в корзине.
//     **/
//     render() {
//         return `<div class="header__basket_product header__basket_check cart-item" data-id="${this.id_product}">
//                     <div>${this.product_name}</div>
//                     <div class="product__count">${this.quantity}</div>
//                     <div>$${this.price}</div>
//                     <div>$<span class="product__amount">${this.price * this.quantity}</span></div>
//                     <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                 </div>`;
//     }
// }


// const list2 = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };

// let cart = new Cart();
// let products = new ProductsList(cart);
// // products.getJson(`getProducts.json`).then(data => products.handleData(data));











// class ProductsList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.goods = [];//массив товаров из JSON документа
//         /**
//          * Метод создает массив с товарами
//          */
//         this._getProducts()
//             .then(data => { //data - объект js
//                 this.goods = [...data];
//                 this.render()
//             });
//     }

//     _getProducts() {
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     /**
//      * Метод считает суммарную стоимость всех товаров.
//     **/
//     getSumGoods() {
//         let sum = 0;
//         this.goods.forEach(item => sum += item.price);
//         console.log(`Суммарная стоимость всех товаров: ${sum}$`);

//         // let sum = 0;
//         // for (let product of this.goods) {
//         //     sum += product.price;
//         // }
//         // reduce используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
//         // let res = this.allProducts.reduce((sum, item) => sum + item.price, 0);
//         // alert(res);

//     }

//     /**
//      * Метод выводит товары на страницу.
//     **/
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new ProductItem(product);
//             block.insertAdjacentHTML("beforeend", productObj.render());
//             // block.innerHTML += item.render();
//         }
//     }
// }


// class ProductItem {
//     constructor(product, image = 'https://via.placeholder.com/500x500/FFFFFF') {
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.id_product = product.id_product;
//         this.image = image;
//     }

//     /**
//      * Метод формирует верстку каждого товара.
//     **/
//     render() {
//         return `<div class="product__item" data-id="${this.id_product}">
//                     <img src="${this.image}" alt="ptoduct" class="product__img">
//                         <div class="product__block">
//                             <div>
//                                 <h3 class="product__title">${this.product_name}</h3>
//                                 <p class="product__price">${this.price}&#8381;</p>
//                             </div>
//                             <button class="button buy-btn
//                             data-id="${this.id_product}"
//                             data-name="${this.product_name}"
//                             data-price="${this.price}"">Купить</button>
//                         </div>
//                     </div>`
//     }
// }

// let list = new ProductsList();
// console.log(list);


// class Basket {
//     constructor(container = '.header__basket') {
//         this.container = container;
//         this.goods = [];
//         this.clickBasket();
//         /**
//          * Метод создает массив с товарами для корзины
//          */
//         this._getBasketProducts()
//             .then(data => { //data - объект js
//                 this.goods = [...data.contents];
//                 this.render();
//             });
//     }
//     _getBasketProducts() {
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     /**
//      * Метод обрабатывет клик кнопки корзины.
//     **/
//     clickBasket() {
//         let basketEl = document.querySelector('.btn-cart');;
//         let basketBlock = document.querySelector(this.container);
//         basketEl.addEventListener('click', () => {
//             basketBlock.classList.toggle('hidden');
//         })

//     }
//     /**
//      * Метод выводит товары в корзину.
//     **/
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new BasketEl(product);
//             block.insertAdjacentHTML("beforeend", productObj.render());
//         }
//     }

// }

// class BasketEl {
//     constructor(product) {
//         this.product_name = product.product_name;
//         this.quantity = product.quantity;
//         this.price = product.price;
//         this.id_product = product.id_product;
//         // this.image = image;
//     }
//     /**
//      * Метод формирует верстку каждого товара в корзине.
//     **/
//     render() {
//         return `<div class="header__basket_product header__basket_check" data-productid="${this.id_product}">
//                     <div>${this.product_name}</div>
//                     <div class="product_count">${this.quantity}</div>
//                     <div>$${this.price}</div>
//                     <div>$<span class="productAmount">${this.price * this.quantity}</span></div>
//                     <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                 </div>`;
//     }

// }

// let basket = new Basket();
// console.log(basket);





// const products = [
//     { id: 1, title: 'Notebook', price: 2000, image: 'img/notebook.jpg' },
//     { id: 2, title: 'Mouse', price: 20, image: 'img/mouse.jpg' },
//     { id: 3, title: 'Keyboard', price: 200, image: 'img/keyboard.jpg' },
//     { id: 4, title: 'Gamepad', price: 50, image: 'img/gamepad.jpg' },
// ];
// /**
//  * Функция для формирования верстки каждого товара.
// **/
// const renderProduct = (product) => {
    // return `< div class="product__item" >
    //             <img src="${product.image}" alt="ptoduct" class="product__img">
    //             <div class="product__block">
    //                 <div>
    //                     <h3 class="product__title">${product.title}</h3>
    //                     <p class="product__price">${product.price}$</p>
    //                 </div>
    //                 <button class="button buy-btn">Купить</button>
    //             </div>
    //         </div>`
// };


// /**
//  * Функция генерирует разметку, используя renderProduct.
//  */
// const renderPage = list => {
//     document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(product => renderProduct(product)).join(''));
// };
