function TodoItem (props) {
    const [text, setText] = React.useState(props.todo.text)
    const handleSubmit = e => {
        if(e.which !== 13) return
        props.setter('update', props.todo.id, text)
        e.target.blur()
    }

    return (
        <span className={`todo-item ${props.todo.done?'done':''}`}>
            <input 
            className='todo-text'
            type='text'
            value={text}
            placeholder={text}
            onChange={e=>setText(e.target.value)}
            onKeyDown={handleSubmit}
            checked={props.todo.done}
            />
            <span className="timestamp">
                {props.todo.doneOn ? 'done: ':'created: '}
                {props.todo.doneOn || props.todo.createdOn}
            </span>
        </span>
    )
}