import { useState } from 'react';
import styles from './HomePage.module.css'
import TodoList from '../../components/TodoList/TodoList';
import Today from '../../components/Today/Today';

const HomePage = () => {
    const [nav, setNav] = useState<'todolist' | 'today'>('todolist');
    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.sideNav}>
                    <p className={styles.navElement} onClick={() => setNav('today')}>Today</p>
                    <br />
                    <p className={styles.navElement} onClick={() => setNav('todolist')}>Todo List</p>
                </div>
                <div className={styles.rightComponent}>
                    {nav === 'todolist' ? (
                        <>
                            <TodoList />
                        </>
                    ) : (
                        <>
                            <Today />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default HomePage;