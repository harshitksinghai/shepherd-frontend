import { useEffect, useState } from 'react';
import styles from './TodoList.module.css'
import TodoCard from '../TodoCard/TodoCard';
import { taskApi } from '../../api/taskApi';

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
    const [isLoading, setIsLoading] = useState(false);

    const fetchTodos = async () => {
        try {
            const response = await taskApi.fetchAllTasks();
            const formattedTodos = response.data.map(task => ({
                id: task.taskId,
                title: task.title,
                date: new Date(task.dueDate).toISOString().split('T')[0],
                priority: parseInt(task.priority)
            }));
            setTodos(formattedTodos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (!newTitle.trim() || !newDate) return;
        setIsLoading(true);

        try {
            await taskApi.addTask({
                title: newTitle,
                dueDate: new Date(newDate).toISOString(),
                priority: newPriority.toString()
            });
            
            setNewTitle('');
            setNewDate(new Date().toISOString().split('T')[0]);
            setNewPriority(1);
            await fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateTodo = async (id: string, title: string, date: string, priority: number) => {
        try {
            await taskApi.updateTask(id, {
                title,
                dueDate: new Date(date).toISOString(),
                priority: priority.toString()
            });
            await fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await taskApi.deleteTask(id);
            await fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
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
                    disabled={isLoading}
                />
                <select
                    className={styles.formPriority}
                    value={newPriority}
                    onChange={(e) => setNewPriority(parseInt(e.target.value))}
                    disabled={isLoading}
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
                    disabled={isLoading}
                />
                <button
                    className={styles.addButton}
                    onClick={addTodo}
                    disabled={!newTitle.trim() || !newDate || isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Task'}
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