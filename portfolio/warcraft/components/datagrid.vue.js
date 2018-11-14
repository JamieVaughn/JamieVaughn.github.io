Vue.component('datagrid', {
    template: `
    <div>
        <h2>{{title}}</h2>
        <button @click='increment()'> Increment Counter {{counter}}</button>
    </div>
    `,
    props: ['title'],
    data: function() {
        return {
            counter: 1
        }
    },
    methods: {
        increment() {
            this.counter += 1;
        }
    }
})