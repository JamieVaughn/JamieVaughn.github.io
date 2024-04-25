function TodoForm (props) {
    const [input, setInput] = React.useState('')

    const handleChange = (e) => {
        let val = e.target.value
        setInput(val)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (input.replace(/ /g,'') != '') props.setter(input)
        setInput('')
    }

    return (
        <form className="new-todo-form" onSubmit={handleSubmit}>
            <input 
            onChange={handleChange}
            value={input}
            type="text" 
            name="new-todo" 
            className="new-todo" 
            placeholder="Enter a todo item..." 
            autoComplete="off"
            required />
        </form>
    )
}