Vue.component('datamodal', {
    template: `
    <div id='datamodal' ref='datamodal' v-show='display'>
        <header>
            <h2>{{char}} of {{realm}}</h2>
            <img :src="concatThumb">
            <button @click='resetModal()'>
                <img src='img/close.png' alt='Close'>
            </button>
        </header>
        <section class='stats-grid' @charfound='display=true'>
            <div class='stats-block' v-for="(attr, key) in stats">
                <h3>{{key}}</h3>
                <ul class='stats-list'>
                    <li v-for='(i, key) in attr'>{{key}}: {{i}}</li>
                </ul>
            </div>
        </section>
        <section class='item-grid' @charfound='display=true'><h3>Equipped Items:</h3>
            <ul class='item-list'>
                <li v-for='(item, key) in items' :class='item.class'>
                    <span v-show='inspect === key' class='item-title'>{{item.name}}</span>
                    <img class='item-icon' v-bind:src='item.icon' v-bind:alt='item.icon' 
                    @mouseover='inspect = key' @mouseout='inspect = null'>
                </li>
            </ul>
        </section>
    </div>
    `,
    data: function() {
        return {
            display: false,
            inspect: null,
            char: '',
            realm: '',
            thumbPrefix: 'https://render-us.worldofwarcraft.com/character/',
            iconPrefix: 'https://wow.zamimg.com/images/wow/icons/medium/',
            thumb: '',
            items: {},
            stats: {
                attributes: {},
                attack: {},
                spell: {},
                defense: {},
                enhancements: {}
            },
            items: {
                head: {},
                neck: {},
                shoulder: {},
                back: {},
                chest: {},
                shirt: {},
                wrist: {},
                hands: {},
                waist: {},
                legs: {},
                feet: {},
                finger1: {},
                finger2: {},
                trinket1: {},
                trinket2: {},
                mainHand: {}
            }
        }
    },
    methods: {
        resetModal() {
            this.$refs.datamodal.$remove
            this.display = false;
        },
        displayData(obj){
            console.log('data received: ', obj)
            obj.items && obj.stats ? this.display = true : this.display = false;
            this.char = obj.name;
            this.realm = obj.realm;
            this.thumb = obj.thumbnail;
            let stat = this.stats
            stat.attributes.strength = obj.stats.str;
            stat.attributes.agility = obj.stats.agi;
            stat.attributes.intellect = obj.stats.int;
            stat.attributes.stamina = obj.stats.sta;

            stat.attack.speed = obj.stats.mainHandSpeed
            stat.attack.damage = obj.stats.mainHandDps.toFixed(2)

            stat.spell.mana = obj.stats.mana5
            stat.spell.spellCrit = obj.stats.spellCrit.toFixed(2)

            stat.defense.armor = obj.stats.armor;
            stat.defense.dodge = obj.stats.dodge;
            stat.defense.parry = obj.stats.parry;
            stat.defense.block = obj.stats.block;

            stat.enhancements.crit = obj.stats.crit.toFixed(2);
            stat.enhancements.haste = obj.stats.haste.toFixed(2);
            stat.enhancements.mastery = obj.stats.mastery;
            stat.enhancements.leech = obj.stats.leech;
            stat.enhancements.versatility = obj.stats.versatility;
            var styles = document.querySelector('style');
            var css = '';
            for(key in this.items){
                this.items[key].name= obj.items[key].name
                this.items[key].icon= this.iconPrefix + obj.items[key].icon + '.jpg'
                this.items[key].class = key;
                css += `.${key} { grid-area: ${key};}`
            }
            styles.innerHTML = css;
        }
    },
    created: function() {
        this.$bus.$on('CharFound', (data) => this.displayData(data))
    },
    computed: {
        concatThumb() {
            return this.thumbPrefix + this.thumb;
        }
    }
    
})