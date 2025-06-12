import { useEffect, useState } from 'react';
import styles from './TodoList.module.css'
import TodoCard from '../TodoCard/TodoCard';
import { taskApi } from '../../api/taskApi';

interface Todo {
    taskId: string;
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
                taskId: task.taskId,
                title: task.title,
                date: task.dueDate.split('T')[0], // "2025-06-12T00:00:00" -> "2025-06-12"
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
                dueDate: new Date(newDate).toISOString(), // ✅ includes time zone info (Z)
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

    const updateTodo = async (taskId: string, title: string, date: string, priority: number) => {
        try {
            await taskApi.updateTask(taskId, {
                title,
                dueDate: new Date(date).toISOString(), // ✅ with time zone // ✅ includes time zone info (Z)
                priority: priority.toString()
            });
            await fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (taskId: string) => {
        try {
            await taskApi.deleteTask(taskId);
            await fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

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
                {todos.map(todo => (
                    <TodoCard
                        key={todo.taskId}
                        taskId={todo.taskId}
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