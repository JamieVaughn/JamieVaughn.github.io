function TodoList (props) {
    const [list, setList] = React.useState(props.list)
    const handleDelete = (id) => {
        console.log(id)
        console.log(...props.list.filter(j => j.id == id), 'delete')
        props.setter('delete', id)
        setList(list.filter(j => j.id !== id))
    }
    const handleComplete = (e, id) => {
        e.target.nextElementSibling.classList.toggle('done')
        let action = e.target.checked ? 'done' : 'undone'
        props.setter(action, id)
    }
    
    // React.useEffect(() => console.log(props, list), [list])
    return (
    <ul className='todo-items'>
        {props.list.map ? props.list.map((i, index) => (
            <li key={i.id}>
                <input 
                title='Mark Done'
                onClick={e => handleComplete(e, i.id)}
                defaultChecked={i.done}
                type='checkbox'/>
                <TodoItem
                todo={i}
                setter={props.setter}
                />
                <span 
                title="Delete"
                onClick={() => handleDelete(i.id)}
                className='delete'
                >╳</span>
            </li>
        )) : ''}
        <li className='empty-state'>No Todos Left!</li>
    </ul>
    )
}