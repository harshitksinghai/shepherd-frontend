import { useState } from 'react';
import styles from './TodoCard.module.css'

interface TodoCardProps {
    id: string;
    initialTitle: string;
    initialDate: string;
    initialPriority: number;
    onDelete: (id: string) => void;
    onUpdate: (id: string, title: string, date: string, priority: number) => void;
}

const TodoCard = ({ id, initialTitle, initialDate, initialPriority, onDelete, onUpdate }: TodoCardProps) => {
    const [title, setTitle] = useState(initialTitle);
    const [date, setDate] = useState(initialDate);
    const [priority, setPriority] = useState(initialPriority);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        onUpdate(id, e.target.value, date, priority);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
        onUpdate(id, title, e.target.value, priority);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = parseInt(e.target.value);
        setPriority(newPriority);
        onUpdate(id, title, date, newPriority);
    };

    return (
        <div className={styles.todoContainer}>
            <input 
                className={styles.input}
                value={title}
                onChange={handleTitleChange}
                placeholder="Add Title..."
            />
            <select 
                className={styles.priority}
                value={priority}
                onChange={handlePriorityChange}
            >
                {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>P{num}</option>
                ))}
            </select>
            <input 
                type="date"
                className={styles.date}
                value={date}
                onChange={handleDateChange}
            />
            <button 
                className={styles.deleteBtn}
                onClick={() => onDelete(id)}
            >
                Delete
            </button>
        </div>
    );
};

export default TodoCard;