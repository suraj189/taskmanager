import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./index.module.css";
import { v1 as uuidv1 } from "uuid";

const Index = (props) => {
  const [input, setInput] = useState({
    id: "",
    task: "",
    description: "",
    status: false,
  });
  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    setErr(false);
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = () => {
    const { task, description } = input;
    if (task.trim() === "" || description.trim() === "") {
      setErr(true);
    } else {
      props.getTask({
        id: uuidv1(),
        task: input.task,
        description: input.description,
        status: false,
      });
      setInput({
        id: '',
        task: '',
        description: '',
        status: false,
      })
    }
  };

  const { task, description } = input;
  return (
    <div className={style.taskInputContainer}>
      <div className={style.inputContainer}>
        <label>Task</label>
        <input
          className={style.input}
          onChange={handleChange}
          name="task"
          value={task}
        />
      </div>
      <div className={style.textContainer}>
        <label>Task Description</label>
        <textarea
          rows="4"
          cols="50"
          name="description"
          onChange={handleChange}
          value={description}
        />
      </div>
      {err && <p className={style.err}>Please enter the task</p>}
      <div>
        <button className={style.button} onClick={handleCreate}>
          Create Task
        </button>
      </div>
    </div>
  );
};

export default Index;

Index.prototype = {
  getTask: PropTypes.func,
};
