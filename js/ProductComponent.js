Vue.component('products', {
    props: ['products', 'img'],
    template: ` <div class="products">
                    <product v-for="product of products" :key="product.id_product" :img="img" :product="product"></product>
                </div>`
});
Vue.component('product', {
    props: ['img', 'product'],
    template: ` <div class="product__item">
                    <img :src="img" alt="ptoduct" class="product__img">
                    <div class="product__block">
                        <div>
                            <h3 class="product__title">{{ product.product_name }}</h3>
                            <p class="product__price">{{ product.price }}&#8381;</p>
                        </div>
                        <button class="button buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                    </div>
                </div>`
})