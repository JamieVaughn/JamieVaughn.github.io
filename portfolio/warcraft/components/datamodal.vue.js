Vue.component('datamodal', {
    template: `
    <div id='datamodal' ref='datamodal'>
        <header>
            <h2>{{char}} of {{realm}}</h2>
            <button @click='resetModal()'>
                <img src='img/close.png' alt='Close'>
            </button>
        </header>
        <section class='stats-grid'>
            {{counter}}
        </section>
        <section class='items-grid'>
            items
        </section>
    </div>
    `,
    props: ['char', 'realm'],
    data: function() {
        return {
            counter: 1
        }
    },
    methods: {
        resetModal() {
            console.log(this.$refs.datamodal.hidden = true)
        }
    }
})