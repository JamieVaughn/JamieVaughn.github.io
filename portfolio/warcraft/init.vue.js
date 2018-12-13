//bind the event bus to the Vue prototype
Vue.prototype.$bus = new Vue({})
//Instantiate the main vue instance
const app = new Vue({
    el: '#app',
    data: {
        logoAlt: 'EagleDream Technologies Logo'
    }
})