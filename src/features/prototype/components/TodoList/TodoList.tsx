import { useEffect, useState } from 'react';
import styles from './TodoList.module.css'
import TodoCard from '../TodoCard/TodoCard';

interface Todo {
    id: string;
    title: string;
    date: string;
    priority: number;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
    const [newPriority, setNewPriority] = useState(1);

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
        if (!newTitle.trim() || !newDate) return;

        const newTodo = {
            id: Date.now().toString(),
            title: newTitle,
            date: newDate,
            priority: newPriority
        };
        saveTodos([...todos, newTodo]);
        setNewTitle('');
        setNewDate(new Date().toISOString().split('T')[0]);
        setNewPriority(1);
    };

    const updateTodo = (id: string, title: string, date: string, priority: number) => {
        const newTodos = todos.map(todo => 
            todo.id === id ? { ...todo, title, date, priority } : todo
        );
        saveTodos(newTodos);
    };

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        saveTodos(newTodos);
    };

    const sortedTodos = [...todos].sort((a, b) => a.priority - b.priority);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Todo List</h2>
            </div>
            <div className={styles.formContainer}>
                <input
                    className={styles.formInput}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Add Title... (required)"
                />
                <select
                    className={styles.formPriority}
                    value={newPriority}
                    onChange={(e) => setNewPriority(parseInt(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>P{num}</option>
                    ))}
                </select>
                <input
                    type="date"
                    className={styles.formDate}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />
                <button
                    className={styles.addButton}
                    onClick={addTodo}
                    disabled={!newTitle.trim() || !newDate}
                >
                    Add Task
                </button>
            </div>
            <div className={styles.todoList}>
                {sortedTodos.map(todo => (
                    <TodoCard
                        key={todo.id}
                        id={todo.id}
                        initialTitle={todo.title}
                        initialDate={todo.date}
                        initialPriority={todo.priority}
                        onDelete={deleteTodo}
                        onUpdate={updateTodo}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;