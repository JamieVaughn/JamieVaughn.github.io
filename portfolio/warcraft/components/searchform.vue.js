Vue.component('searchform', {
    template: `
    <form id='searchform' class='flex-col'>
        <input type="text" id='query-char' 
        v-model='char' autocomplete='off'
        pattern='[A-z0-9À-ž\\s]{2,}' required>
        <label for='query-char'>Character Name</label>

        <input type="text" id='query-realm' 
        v-model='realm' autocomplete='off'
        pattern='[A-z0-9À-ž\\s]{2,}' required>
        <label for='query-realm'>Realm Name</label>

        <button id='query-go' @click.stop.prevent='fetchData()'>Search</button>
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
            console.log(this.getUrl)
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
            return this.baseUrl+this.realm+'/'+this.char+'?'+this.locale+this.key;
        }
    }
})