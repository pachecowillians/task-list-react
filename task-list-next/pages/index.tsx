import Head from 'next/head'
import { useState } from 'react';
import AddTask from '../components/AddTask/AddTask'
import EditTask from '../components/EditTask/EditTask';
import Header from '../components/Header/Header'
import ListTasks from '../components/ListTasks/ListTasks';
import styles from '../styles/Home.module.css'

export default function Home() {

    type Task = {
        id: number;
        text: string;
    };

    const [taskEdited, setTaskEdited] = useState({} as Task);
    const [countTasks, setCountTasks] = useState(0);
    const [tasks, setTasks] = useState([]);

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const addTask = (text) => {
        setCountTasks(countTasks + 1);

        const newTask = {
            id: countTasks,
            text
        }

        setTasks([newTask, ...tasks])
    }

    const editTask = (task) => {
        var item = tasks.find(taskSearched => taskSearched.id == task.id);
        if (item) {
            item.text = task.text;
        }
    }

    const renderTaskEdit = () => {
        if (Object.keys(taskEdited).length === 0 && taskEdited.constructor === Object) {
            return;
        } else {
            return <EditTask editTask={editTask} taskEdited={taskEdited} setTaskEdited={setTaskEdited} />;
        }
    }

    return (
        <div>
            <Head>
                <title>Task list</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet" />
            </Head>

            <Header />
            <main>
                {renderTaskEdit()}
                <div className={styles.taskContainer}>
                    <AddTask addTask={addTask} />
                    <ListTasks tasks={tasks} doTask={deleteTask} setTaskEdited={setTaskEdited} />
                </div>
            </main>
        </div>
    )
}