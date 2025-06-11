import { useEffect, useState } from 'react';
import styles from './TodoList.module.css'
import TodoCard from '../TodoCard/TodoCard';

interface Todo {
    id: string;
    title: string;
    date: string;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    const saveTodos = (newTodos: Todo[]) => {
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(newTodos);
    };

    const addTodo = () => {
        const newTodo = {
            id: Date.now().toString(),
            title: '',
            date: new Date().toISOString().split('T')[0]
        };
        saveTodos([...todos, newTodo]);
    };

    const updateTodo = (id: string, title: string, date: string) => {
        const newTodos = todos.map(todo => 
            todo.id === id ? { ...todo, title, date } : todo
        );
        saveTodos(newTodos);
    };

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        saveTodos(newTodos);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Todo List</h2>
                <button className={styles.addButton} onClick={addTodo}>
                    Add Task
                </button>
            </div>
            <div className={styles.todoList}>
                {todos.map(todo => (
                    <TodoCard
                        key={todo.id}
                        id={todo.id}
                        initialTitle={todo.title}
                        initialDate={todo.date}
                        onDelete={deleteTodo}
                        onUpdate={updateTodo}
                    />
                ))}
            </div>
        </div>
    )
}

export default TodoList;