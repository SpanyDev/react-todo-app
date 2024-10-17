import React, { useRef, useState, useEffect } from 'react'
import ToDoIcon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import Alert from '@mui/material/Alert';

const Todo = () => {
    const [todoList, setTodoList] = React.useState(localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : []);
    const [alert, setAlert] = useState(null);
    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
            setAlert("Please enter a task!");
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            completed: false,
        }

        setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
        inputRef.current.value = '';
        setAlert(null);
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== id));
    }

    const toggleCompleted = (id) => {
        setTodoList((prevTodoList) =>
            prevTodoList.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 10000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={ToDoIcon} alt="" />
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>

            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add a task' />
                <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add+</button>
            </div>

            {alert && <Alert severity="warning">{alert}</Alert>}

            <div>
                {todoList.map((item, index) => {
                    return <TodoItems key={index} text={item.text} id={item.id} completed={item.completed} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
                })}
            </div>

        </div>
    )
}

export default Todo