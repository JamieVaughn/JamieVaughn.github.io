function TodoItem (props) {
    const [text, setText] = React.useState(props.todo.text)
    const [item, setItem] = React.useState(props.todo)
    const handleSubmit = e => {
        console.log(e.target, props.text)
        props.setter([...props.list.filter(j => j !== props.text), e.target.value])
    }

    return (
        <span className={`todo-item ${props.todo.done?'done':''}`}>
            <input 
            className='todo-text'
            type='text'
            value={text}
            placeholder={text}
            onChange={e=>setText(e.target.value)}
            onBlur={handleSubmit}
            checked={item.done}
            />
            <span className="timestamp">{props.todo.doneOn ? 'done: ':'created: '}{props.todo.doneOn || props.todo.createdOn}</span>
        </span>
    )
}