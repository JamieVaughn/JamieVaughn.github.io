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

        <button id='query-go' ref='query-go' 
        @mouseover='hovered=true' @mouseout='hovered=false'
        @click.stop.prevent='fetchData()'>
            {{prompt}}
            <p v-show='useDefault'>{{tooltip}}</p>
        </button>
    </form>
    `,
    data: function () {
        return {
            response: {},
            baseUrl: 'https://us.api.battle.net/wow/character/',
            realm: '',
            char: '',
            field: 'stats,items',
            locale: '&locale=en_US',
            k: '&ap'+'ik'+'e'+'y'+'=a2dnsby9tf7qxv95cwxd9vybnpanpjwh',
            tooltip: 'Click for an example search',
            hovered: false,
            prompt: 'Search'
        }
    },
    methods: {
        async fetchData() {
            console.log(this.getUrl)
            try {
                let response = await axios.get(this.getUrl)
                let feedback = await response.statusText == 'OK' ? this.prompt = 'OK!' : false
                let data = await response.data
                var emission = this.$bus.$emit('CharFound', await data);
                setTimeout(()=>this.prompt='Search',2000);
            } catch (error) {
                this.prompt = 'Error :( Try another search.'
                console.log(error)
            }
        }
    },
    computed: {
        getUrl() {
            return this.baseUrl+(this.realm || 'dalaran') +'/'
            +(this.char || 'regex')+'?fields='+this.field+this.locale+this.k;
        },
        useDefault() {
            return this.hovered && !(this.realm || this.char);
        }
    }
})