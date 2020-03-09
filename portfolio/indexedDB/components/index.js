
function TodoApp () {
    const [todos, setTodos] = useIdb('todos', [])

    // const createTodo = (text) => {
    //     let todoObj = {
    //         id: +String(Math.random()).slice(2,7),
    //         text: text,
    //         createdOn: new Date().toLocaleString(),
    //         done: false,
    //         doneOn: null,
    //         deleted: false,
    //         deletedOn: null
    //     }
    //     setTodos([...todos, todoObj])
    // }

    // const clearTodos = () => setTodos([])

    return (
        <div className="page-wrapper">
            <h1 onClick={()=>console.log(todos)}>React Todo App</h1>
            <h2>(with Async, In-Memory DB)</h2>
            <TodoForm setter={setTodos} list={todos}></TodoForm>
            <TodoList setter={setTodos} list={todos}></TodoList>
            <div className='footer'>
                <span>total: {todos.length}</span>
                <button onClick={() => setTodos([])}>Clear All</button>
            </div>
        </div>
    )
}

const root = document.getElementById('todo-app')
ReactDOM.render(<TodoApp/>, root)