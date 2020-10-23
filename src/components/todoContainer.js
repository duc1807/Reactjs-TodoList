import React, { useState } from "react";
import "./styles/todoContainer.css";

const TodoApp = () => {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      var id = new Date().getTime();
      var newText = { text: text, id: id, status: "active" };
      setList((prevList) => {
        return [...prevList, ...[newText]];
      });
    }
  };
  const handleActive = (id, status) => {
    if (status === "active") {
      let newList = list;
      setList(
        newList.filter((item) => {
          if (item.id === id) {
            item.status = "done";
          }
          return newList;
        })
      );
      console.log("done");
    } else if (status === "done") {
      let newList = list;
      setList(
        newList.filter((item) => {
          if (item.id === id) {
            item.status = "active";
          }
          return newList;
        })
      );
      console.log("active");
    }
  };

  const removeTodo = (id) => {
    setList(list.filter((items) => items.id !== id));
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="container">
      <div className="input">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Add todo..."
            type="text"
            value={text}
            onChange={(e) => onChange(e)}
          ></input>
        </form>
      </div>
      <div className="content">
        <ul>
          {list
            .filter((item) => {
              if (filter === "active") {
                return item.status === "active";
              } else if (filter === "done") {
                return item.status === "done"
              } else return item
            })
            .map((item) => {
              const active = item.status === "done" ? "done" : "";
              return (
                <div id="todoContainer">
                  <div id="todoContent">
                    <li
                      className={`todo ${active}`}
                      onClick={() => handleActive(item.id, item.status)}
                      id={item.id}
                      key={item.id}
                    >
                      {item.text}
                    </li>
                  </div>
                  <div id="delBtn" onClick={() => removeTodo(item.id)}>
                    <p>X</p>
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
      <div className="buttonContainer">
        <p>{(list.filter(item => {
          if(filter === "all") return item
          else return item.status === filter
          })).length} items left</p>
        <button className={`btn ${filter === "all" ?  'activeBtn' : ""}`} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={`btn ${filter === "active" ? "activeBtn" : ""}`} onClick={() => setFilter("active")}>
          Active
        </button>
        <button className={`btn ${filter === "done" ? "activeBtn" : ""}`} onClick={() => setFilter("done")}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoApp;