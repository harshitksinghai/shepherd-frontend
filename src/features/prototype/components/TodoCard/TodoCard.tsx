import { useState } from 'react';
import styles from './TodoCard.module.css'

interface TodoCardProps {
    id: string;
    initialTitle: string;
    initialDate: string;
    onDelete: (id: string) => void;
    onUpdate: (id: string, title: string, date: string) => void;
}

const TodoCard = ({ id, initialTitle, initialDate, onDelete, onUpdate }: TodoCardProps) => {
    const [title, setTitle] = useState(initialTitle);
    const [date, setDate] = useState(initialDate);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        onUpdate(id, e.target.value, date);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
        onUpdate(id, title, e.target.value);
    };

    return (
        <div className={styles.todoContainer}>
            <input 
                className={styles.input}
                value={title}
                onChange={handleTitleChange}
                placeholder="Add Title..."
            />
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