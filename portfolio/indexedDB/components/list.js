function TodoList (props) {
    const handleDelete = (id) => {
        console.log(id)
        console.log(...props.list.filter(j => j.id == id), 'delete')
        props.setter('delete', id)
    }
    const handleComplete = (e, id) => {
        e.target.nextElementSibling.classList.toggle('done')
        props.setter('toggleDone', id)
    }
    
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