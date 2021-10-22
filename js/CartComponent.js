Vue.component('cart', {
    props: ['basketProducts', 'visibility'],
    template: ` <div class="header__basket" v-show="visibility">
                    <div class="header__basket_titles header__basket_product">
                        <div>Наименование</div>
                        <div>Кол-во</div>
                        <div>Цена за шт.</div>
                        <div>Всего</div>
                    </div>
                    <cart-item v-for="product of basketProducts" :key="product.id_product" :cart-item="product">
                    </cart-item>
                </div>`
});

Vue.component('cart-item', {
    props: ['basketProduct'],
    template: ` <div class="header__basket_product header__basket_check cart-item">
                    <div>{{ basketProduct.product_name }}</div>
                    <div class="product__count">{{ basketProduct.quantity }}</div>
                    <div>{{ basketProduct.price }}</div>
                    <div>&#8381; <span class="product__amount">{{ basketProduct.price * basketProduct.quantity }}</span>
                    </div>
                    <button class="del-btn" @click="$parent.$emit('remove-product', basketProduct)">&times;</button>
                </div>`
})


// Vue.component('cart', {
//     props: ['cartItems', 'img', 'visibility'],
//     template: `
//         <div class="cart-block" v-show="visibility">
//             <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
//             </cart-item>
//         </div>
//     `
// });
// Vue.component('cart-item', {
//     props: ['img', 'cartItem'],
//     template: `
//     <div class="cart-item">
//                     <div class="product-bio">
//                         <img :src="img" alt="Some img">
//                         <div class="product-desc">
//                             <div class="product-title">{{ cartItem.product_name }}</div>
//                             <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
//                             <div class="product-single-price">$ {{ cartItem.price }} each</div>
//                         </div>
//                     </div>
//                     <div class="right-block">
//                         <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
//                         <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
//                     </div>
//                 </div>
//     `
// })


