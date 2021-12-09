import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { TodoContext } from "../../context";
import Moment from "react-moment";
import axios from "axios";

const TODOS = () => {
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState("");
  const [todos, setTodos] = React.useState([]);

  const router = useRouter();
  const { updateState } = React.useContext(TodoContext);
  const { id } = router.query;

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5000/api/todo/${id}`);
      setTodos(result.data);
      console.log(result.data);
    };

    if (!id) {
      return;
    }

    fetchData();
  }, [id]);

  const createSingleTodo = async () => {
    const result = await axios.post(`http://localhost:5000/api/todo/${id}`, {
      text,
      date,
    });
    console.log(result.data);
    setTodos([...todos, result.data]);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (!id) {
      alert("Please select a category");
    } else if (text === "" || date === "") {
      alert("Please enter a task");
    } else {
      createSingleTodo();
      console.log(text, id, date);
      setText("");
      setDate("");
    }
  };

  const deleteSingleTodo = async (todoId) => {
    const result = await axios.delete(
      `http://localhost:5000/api/removetodo/${todoId}`
    );
    console.log(result.data);

    setTodos(todos.filter((todo) => todo._id !== todoId));
  };

  const updateStatus = async (todoId) => {
    const result = await axios.put(
      `http://localhost:5000/api/updatetodo/${todoId}`
    );

    setTodos(
      todos.map((todo) =>
        todo._id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );

    console.log(result.data);
  };

  const deleteAllTodos = async (e) => {
    e.preventDefault();

    if (!id) {
      return;
    }

    const result = await axios.delete(`http://localhost:5000/api/todo/${id}`);
    console.log(result.data);
    if (result.data) {
      setTodos([]);
      router.push("/");
      updateState();
    }
  };

  return (
    <div>
      <Layout
        text={text}
        setText={setText}
        date={date}
        setDate={setDate}
        handleSubmit1={handleSubmit1}
        selectedCategory={id}
        deleteAllTodos={deleteAllTodos}
      >
        <div className="min-h-screen">
          {todos.map((todo) => (
            <div className="bg-bdark2 px-3 py-2 mb-2 rounded-sm flex justify-between ">
              <p className="text-gray-200">{todo.text}</p>
              <Moment className="text-gray-200" format="YYYY/MM/DD">
                {todo.scheduleddate}
              </Moment>
              <button
                onClick={() => deleteSingleTodo(todo._id)}
                className="bg-purple-500 px-3 py-1 rounded-sm text-white"
              >
                delete
              </button>
              <button
                onClick={() => updateStatus(todo._id)}
                className="bg-purple-500 px-3 py-1 rounded-sm text-white  shadow-sm"
              >
                {!todo.completed ? "incomplete" : "complete"}
              </button>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default TODOS;
