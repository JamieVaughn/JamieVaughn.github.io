var app = new Vue({
    el: '#app',
    data: {
        fetchUrl: "https://jsonplaceholder.typicode.com/users",
        fetchResult: '',
        dataBin: document.querySelector('#fetchResult')
    },
    methods: {
        fetchData (url) {
            axios.get(url).then(resp => {
                this.dataBin.innerHTML = resp;
                console.log(resp)
            }).catch(err => {
                console.log(err)
            }).then(i => {
                console.log(i)
            })
        }
    }, 
    computed: {

    }
})