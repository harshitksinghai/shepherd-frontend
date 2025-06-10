import { useState } from 'react';
import styles from './TodoCard.module.css'

const TodoCard = () => {
    const [title, setTitle] = useState<string>('');
    return (
        <>
            <div className={styles.todoContainer}>
                <input placeholder='Add Title...' onChange={(e) => setTitle(e.target.value)}>{title}</input>
                <button>Due Date</button>
            </div>
        </>
    )
}

export default TodoCard;