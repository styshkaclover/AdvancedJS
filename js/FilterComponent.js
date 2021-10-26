Vue.component('search', {
    template: ` <form action="#" class="header__form search-form" @submit.prevent="$parent.filter">
                    <button class="header__button btn-search">
                    <i class="fas fa-search"></i>
                    </button>
                    <input type="text" placeholder="Search" class="header__input input-text search-field"
                        v-model="$parent.userSearch">
                </form>`
});
