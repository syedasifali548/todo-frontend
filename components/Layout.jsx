import { useContext } from "react";
import { TodoContext } from "../context";
// import { Link } from "react-router-dom";
import React from "react";
import Link from "next/link";
const Layout = ({
  children,
  text,
  setText,
  date,
  setDate,
  handleSubmit1,
  selectedCategory,
  deleteAllTodos,
}) => {
  const [title, setTitle] = React.useState("");
  console.log(selectedCategory);
  const { createCategory, state } = useContext(TodoContext);
  console.log(state);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      createCategory(title);
      setTitle("");
    }
  };

  return (
    <div className="flex ">
      <div className="flex flex-col h-screen  sticky top-0 bg-bdark w-1/3 border-r border-bdark2 ">
        <div className="">
          <div className="flex">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="lg:px-3 py-2 ">
                <input
                  placeholder="Create Category..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className=" text-gray-200 mt-2 shadow w-full appearance-none bg-bdark2 rounded  py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  onClick={handleSubmit}
                  className=" shadow-md  mt-2 w-full bg-purple-500 py-2 rounded-sm text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="px-3">
          {state.categories.map((item) => (
            <Link href={`/category/${item._id}`}>
              <div className="flex transition duration-500 ease-in-out  hover:bg-bdark2 rounded-md  px-3 py-2">
                <p className="text-gray-300 text-sm text-semibold">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className=" w-full h-screen">
        <form>
          <div className="flex px-3">
            <input
              placeholder="Add Note.."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className=" text-gray-200 mt-2 shadow w-full mr-3 appearance-none bg-bdark2 rounded  py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />

            <input
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className=" text-gray-200 mt-2 shadow w-full appearance-none bg-bdark2 rounded  py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="px-3 flex">
            <button
              disabled={typeof selectedCategory === "undefined" ? true : false}
              onClick={handleSubmit1}
              className=" shadow-md mt-3  w-3/4 bg-purple-500 py-2 rounded-sm text-white"
            >
              {typeof selectedCategory === "undefined"
                ? " Please Select Category or Create New"
                : "Create"}
            </button>
            <button
              onClick={deleteAllTodos}
              disabled={typeof selectedCategory === "undefined" ? true : false}
              className=" shadow-md mt-3  ml-4 w-1/4 bg-red-500 py-2 rounded-sm text-white"
            >
              deleteAll
            </button>
          </div>
        </form>

        <div className="px-3 py-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
