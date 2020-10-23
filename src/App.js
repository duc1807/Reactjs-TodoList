import React, { useState, useEffect } from "react";
import "./styles/todoContainer.css";

const TodoApp = () => {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [mainList, setMainList] = useState([]);
  const [filter, setFilter] = useState("all");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      var id = new Date().getTime();
      var newText = { text: text, id: id, status: "active" };
      setList((prevList) => {
        return [...prevList, ...[newText]];
      });
      setText("");
    }
  };
  const handleActive = (id, status) => {
    if (status === "active") {
      // var activeTodo = list.find((item) => item.id == id);
      // activeTodo.status = "done";
      // console.log(activeTodo.status)
      let newList = list;
      setList(
        newList.filter((item) => {
          if (item.id === id) {
            item.status = "done";
          }
          return newList;
        })
      );
    } else if (status === "done") {
      // var doneTodo = list.find((item) => item.id == id);
      // doneTodo.status = "active";
      // console.log(doneTodo.status)
      let newList = list;
      setList(
        newList.filter((item) => {
          if (item.id == id) {
            item.status = "active";
          }
          return newList;
        })
      );
    }
  };
  const checkActive = (status) => {
    if (list && list.length) {
      list.map((item) => {
        switch (item.status) {
          case "active":
            document.getElementById(item.id).style.display =
              "rgb(223, 223, 223)";
            break;
          case "done":
            document.getElementById(item.id).style.backgroundColor = "green";
            break
        default:
            return null
        }
        if (item.status === "active") {
          document.getElementById(item.id).style.backgroundColor =
            "rgb(223, 223, 223)";
        } else if (item.status === "done") {
          document.getElementById(item.id).style.backgroundColor = "green";
        }
      });
    }
  };
  //   // switch (status) {
  //   //   case 'all':
  //   //     setMainList(list)
  //   //     mainList.map(item => {
  //   //       document.getElementById(item.id).style.backgroundColor ="rgb(223, 223, 223)";
  //   //       document.getElementById(item.id).style.display = "subgrid";
  //   //     })
  //   //     var newList = mainList
  //   //     setList(newList)
  //   //     break
  //   //   case 'active':
  //   //     setMainList(list)
  //   //     newList = mainList.filter(item => item.status != 'active')
  //   //     setList(newList)
  //   //     break
  //   // }
  // };

  const removeTodo = (id) => {
    console.log("ok");
    var newList = list.filter((items) => items.id !== id);
    setList(newList);
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="container">
      <h1 id="title">Take note your todo tasks ↝</h1>
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
          {/* {list.map((item) => {
            const active = item.status == "done" ? "done" : "";
            if(filter == "all") {
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
            }
            if(filter == 'active') {
              let filteredList = list.filter(item => item.status == 'active')
              console.log("filtered: ", filteredList)
              filteredList.map(item => {
                const active = item.status == "done" ? "done" : "";
                console.log("Itemm: ", item)
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
              })
            } else {
              let filteredList = list.filter(item => item.status == 'done')
              console.log("filtered: ", filteredList)
            }
          })} */}
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
                    <p>⨯</p>
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
        <button className={`btn ${filter === "active" ?  'activeBtn' : ""}`} onClick={() => setFilter("active")}>
          Active
        </button>
        <button className={`btn ${filter === "done" ?  'activeBtn' : ""}`} onClick={() => setFilter("done")}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoApp;