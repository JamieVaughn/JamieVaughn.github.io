function TodoList (props) {
    const handleDelete = (e, i) => {
        console.log(i)
        console.log(props.list.filter(j => j !== i))
        props.setter(props.list.filter(j => j !== i))
    }
    
    return (
    <ul className='todo-items'>
        {props.list.map((i, index) => (
            <li key={index}>
                <input 
                title='Mark complete'
                onClick={e => e.target.nextElementSibling.classList.toggle('done')}
                className='todo-checkbox' type='checkbox'/>
                <TodoItem
                text={i}
                list={props.list}
                setter={props.setter}
                />
                <span 
                title="Delete"
                onClick={(e) => handleDelete(e, i)}
                className='delete'
                >╳</span>
            </li>
        ))}
        <li className='empty-state'>No Todos Left!</li>
    </ul>
    )
}