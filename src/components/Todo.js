import React, { useState } from 'react';
import './Todo.css';

function Task({ task, index, completeTask, removeTask, onEdit }) {
  return (
    <div
      className="task wrapper"
      style={{ textDecoration: task.completed ? 'line-through' : '' }}
    >
      {task.title}
      <div className="btn-hover">
        <button onClick={() => completeTask(index)}>Complete</button>
        <button style={{ background: 'red' }} onClick={() => removeTask(index)}>
          Remove
        </button>
        <button onClick={() => onEdit(task)} style={{ background: 'green' }}>
          Edit
        </button>
      </div>
    </div>
  );
}

function Todo() {
  const [selectTodo, setSelectTodo] = useState();
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Meeting',
      completed: true,
    },
    {
      id: 2,
      title: 'Set Plan',
      completed: true,
    },
    {
      id: 3,
      title: 'Start Action',
      completed: false,
    },
  ]);
  // Add Task
  const addTask = (title) => {
    if (selectTodo) {
      tasks.filter((todo) => {
        if (todo.id === selectTodo.id) {
          todo.title = title;
          setTasks([...tasks]);
        }
      });
    } else {
      dubplicate(title);
    }
  };
  // Complete Task
  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };
  // Remove Task
  const removeTask = (index) => {
    const newTasks = [...tasks];
    if (newTasks.length > 1) {
      newTasks.splice(index, 1);
      setTasks(newTasks);
    }
  };
  // Edit Task
  const onEdit = (task) => {
    setValue(task.title);
    setSelectTodo(task);
  };
  // Dubplicate
  const dubplicate = (title) => {
    const result = tasks.find((item) => item.title === title);
    if (!result) {
      const newTasks = [
        ...tasks,
        { title, completed: false, id: Math.random() },
      ];
      setTasks(newTasks);
    } else {
      alert('Task is already exist!');
    }
  };
  return (
    <div className="todo-container">
      <div className="header">TODO - LIST</div>
      <div className="create-task">
        <CreateTask
          addTask={addTask}
          value={value}
          setValue={setValue}
          setSelectTodo={setSelectTodo}
        />
      </div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            index={index}
            onEdit={onEdit}
            completeTask={completeTask}
            removeTask={removeTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Todo;

function CreateTask({ addTask, value, setValue, setSelectTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setSelectTodo('');
    setValue('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add new task.."
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
