import React, { createContext, useState } from "react";
import axios from "axios";
export const TodoContext = createContext();

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    categories: [],
  });

  const [todostate, settodostate] = useState({
    todos: [],
  });

  const [render, setRender] = useState(false);

  React.useEffect(() => {
    getCategories();
  }, [render]);

  //   get ALL CATEGORIES FROM DB

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/category");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setState({
        ...state,
        categories: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //  create Categ
  const createCategory = async (title) => {
    const response = await axios.post("http://localhost:5000/api/category", {
      title,
    });

    setState({
      ...state,
      categories: [...state.categories, response.data],
    });
  };

  //  create Todo

  const createTodo = async (text, categoryId, date) => {
    console.log(text);
    const response = await axios.post(
      `http://localhost:5000/api/todo/${categoryId}`,
      {
        text,
        categoryId,
        date,
      }
    );

    settodostate({
      ...todostate,
      todos: [...todostate.todos, response.data],
    });
  };

  const updateState = () => {
    setRender(!render);
  };

  return (
    <TodoContext.Provider
      value={{
        state,
        createCategory,

        todostate,
        updateState,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
