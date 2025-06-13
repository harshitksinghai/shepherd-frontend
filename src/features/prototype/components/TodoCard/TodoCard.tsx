import { useState } from 'react';
import styles from './TodoCard.module.css'

interface TodoCardProps {
    taskId: string;
    initialTitle: string;
    initialDate: string;
    initialPriority: number;
    initialApproxTime: number;
    initialIsDivisible: boolean;
    onDelete: (taskId: string) => void;
    onUpdate: (taskId: string, title: string, date: string, priority: number, approxTime: number, isDivisible: boolean) => void;
}

const TodoCard = ({ taskId, initialTitle, initialDate, initialPriority, initialApproxTime, initialIsDivisible, onDelete, onUpdate }: TodoCardProps) => {
    const [title, setTitle] = useState(initialTitle);
    const [date, setDate] = useState(initialDate);
    const [priority, setPriority] = useState(initialPriority);
    const [approxTime, setApproxTime] = useState(initialApproxTime);
    const [isDivisible, setIsDivisible] = useState(initialIsDivisible);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        onUpdate(taskId, e.target.value, date, priority, approxTime, isDivisible);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
        onUpdate(taskId, title, e.target.value, priority, approxTime, isDivisible);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = parseInt(e.target.value);
        setPriority(newPriority);
        onUpdate(taskId, title, date, newPriority, approxTime, isDivisible);
    };

    const handleApproxTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setApproxTime(newTime);
        onUpdate(taskId, title, date, priority, newTime, isDivisible);
    };

    const handleIsDivisibleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        setIsDivisible(newValue);
        onUpdate(taskId, title, date, priority, approxTime, newValue);
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
            <input
                type="number"
                className={styles.approxTime}
                value={approxTime}
                onChange={handleApproxTimeChange}
                min="0"
                step="0.5"
                placeholder="Hours"
            />
            <div className={styles.divisibleContainer}>
                <input
                    type="checkbox"
                    className={styles.divisibleCheckbox}
                    checked={isDivisible}
                    onChange={handleIsDivisibleChange}
                />
                <span className={styles.divisibleLabel}>Divisible</span>
            </div>
            <button 
                className={styles.deleteBtn}
                onClick={() => onDelete(taskId)}
            >
                Delete
            </button>
        </div>
    );
};

export default TodoCard;