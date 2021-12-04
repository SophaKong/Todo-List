import React, { useState } from 'react';
import './Todo.css';

function Task({ task, index, completeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? 'line-through' : '' }}
    >
      {task.title}
      <button onClick={() => completeTask(index)}>Complete</button>
    </div>
  );
}

function Todo() {
  const [tasks, setTasks] = useState([
    {
      title: 'Grab some Pizza',
      completed: true,
    },
    {
      title: 'Do your workout',
      completed: true,
    },
    {
      title: 'Hangout with friends',
      completed: false,
    },
  ]);

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTask(newTasks);
  };

  return (
    <div className="todo-container">
      <div className="header">TODO - ITEMS</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            index={index}
            completeTask={completeTask}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}

export default Todo;

function CreateTask({ addTask }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
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
