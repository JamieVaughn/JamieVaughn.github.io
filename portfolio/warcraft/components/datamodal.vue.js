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
            <div v-for="(attr, key) in stats">
                <h3>{{key}}</h3>
                <ul v-for='(item, key) in attr'>
                    <li>{{key}}: {{item}}</li>
                </ul>
            </div>
        </section>
        <section class='items-grid'>
            items
        </section>
    </div>
    `,
    data: function() {
        return {
            display: false,
            char: '',
            realm: '',
            thumbPrefix: 'https://render-us.worldofwarcraft.com/character/',
            thumb: '',
            items: {},
            stats: {
                attributes: {
                    strength: 1206,
                    agility: 4922,
                    intellect: 711,
                    stamina: 5995
                },
                attack: {
                    damage: 4076,
                    speed: 1.62
                },
                spell: {
                    mana: 0,
                    spellCrit: 0
                },
                defense: {
                    armor: 1246,
                    dodge: 12.62,
                    parry: 3,
                    block: 0
                },
                enhancements: {
                    crit: 33.41,
                    haste: 11.2,
                    mastery: 77.99,
                    leech: 0,
                    versatility: 7.58
                }
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