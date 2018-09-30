

function todoReducer(state = todos, action) {
    switch(action.type) {
        case TODO_ADD : {
            return applyAddTodo(state, action);
        }
        case TODO_TOGGLE : {
            return applyToggleTodo(state, action);
        }
        default : return state;
    }
}

function applyAddTodo(state, action) {
    const todo = Object.assign({}, action.todo, { completed: false });
    return state.concat(todo);
}

function applyToggleTodo(state, action) {
    return state.map(todo =>
        todo.id === action.todo.id
            ? Object.assign({}, todo, { completed: !todo.completed })
            : todo
    );
}

function filterReducer(state = 'SHOW_ALL', action) {
    switch(action.type) {
        case FILTER_SET : {
            return applySetFilter(state, action);
        }
        default : return state;
    }
}

function applySetFilter(state, action) {
    return action.filter;
}

function doAddTodo(id, name) {
    return {
        type: TODO_ADD,
        todo: { id, name },
    };
}

function doToggleTodo(id) {
    return {
        type: TODO_TOGGLE,
        todo: { id },
    };
}

function doSetFilter(filter) {
    return {
        type: FILTER_SET,
        filter,
    };
}

const rootReducer = combineReducers({
    todoState: todoReducer,
    filterState: filterReducer,
});

const store = createStore(rootReducer);

function TodoApp({ todos, onToggleTodo }) {
    return <TodoList
        todos={todos}
        onToggleTodo={onToggleTodo}
    />;
}

function TodoList({ todos, onToggleTodo }) {
    return (
        <div>
            {todos.map(todo => <TodoItem
                key={todo.id}
                todo={todo}
                onToggleTodo={onToggleTodo}
            />)}
        </div>
    );
}

function TodoItem({ todo, onToggleTodo }) {
    const { name, id, completed } = todo;
    return (
        <div>
            <div>
            {name}
            <button
                type="button"
                onClick={() => onToggleTodo(id)}
            >
                {completed ? "Incomplete" : "Complete"}
            </button>
        </div>
            );
            }

            ReactDOM.render(<TodoApp />, document.getElementById('root'));

