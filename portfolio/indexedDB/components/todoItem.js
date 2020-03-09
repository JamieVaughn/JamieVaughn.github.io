function TodoItem (props) {
    const [text, setText] = React.useState(props.text)

    const handleSubmit = e => {
        console.log(e.target, props.text)
        props.setter([...props.list.filter(j => j !== props.text), e.target.value])
    }

    return (
        <input 
        className='todo-text'
        type='text'
        value={text}
        placeholder={text}
        onChange={e=>setText(e.target.value)}
        onBlur={handleSubmit}
        />
    )
}