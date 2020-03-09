
function TodoApp () {
    const [todos, setTodos] = useIdb('todos', [])

    const getDate = () => new Date().toLocaleString()

    const appendTodo = (text) => {
        let todoObj = {
            id: +String(Math.random()).slice(2,7),
            text: text,
            createdOn: getDate(),
            done: false,
            doneOn: null,
            deleted: false,
            deletedOn: null
        }
        let newTodos = todos.length ? [...todos, todoObj] : [todoObj]
        setTodos(newTodos)
    }

    const modifyTodo = (action, id) => {
        switch(action) {
            case 'delete':
                setTodos(todos.filter(j => j.id !== id))
                break;
            case 'done':
                setTodos(todos.map(j => {
                    if(j.id == id) {
                        j.done = true
                        j.doneOn = getDate()
                    }
                    return j
                }))
                break;
            case 'undone':
                setTodos(todos.map(j => {
                    if(j.id == id) {
                        j.done = false
                        j.doneOn = ''
                    }
                    return j
                }))
                break;
            default:
                console.log('default')
        }
    }

    return (
        <div className="page-wrapper">
            <h1 onClick={()=>console.log(todos)}>React Todo App</h1>
            <h2>(with Async, In-Memory DB)</h2>
            <TodoForm setter={appendTodo} list={todos}></TodoForm>
            <TodoList setter={modifyTodo} list={todos}></TodoList>
            <div className='footer'>
                <span>total: {todos.length || 0}</span>
                <button onClick={() => setTodos([])}>Clear All</button>
            </div>
        </div>
    )
}

const root = document.getElementById('todo-app')
ReactDOM.render(<TodoApp/>, root)