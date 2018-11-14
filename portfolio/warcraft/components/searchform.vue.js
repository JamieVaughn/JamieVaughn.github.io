Vue.component('searchform', {
    template: `
    <form>
        <input type="text" id='query-char' ref='char'>
        <input type="text" id='query-realm' ref='realm'>
        <button id='query-go' @click='fetchData()'>Search</button>
    </form>
    `,
    data: function () {
        return {
            response: {},
            testRealm: 'Dalaran',
            testChar: 'Regex',
            baseUrl: 'https://us.api.battle.net/wow/character/',
            realm: '',
            char: '',
            // + :realm/:charName?<field>
            locale: '&locale=en_US',
            key: '&apikey=a2dnsby9tf7qxv95cwxd9vybnpanpjwh'
        }
    },
    methods: {
        fetchData() {
            axios.get(this.getUrl)
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    },
    computed: {
        getUrl() {
            return this.getUrl+this.realm+'/'+this.char+'/'+this.locale+this.key;
        }
    }
})