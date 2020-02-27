import React, { useState, useRef } from "react"
import { useTodos } from "../hooks"
import { TiDelete } from "react-icons/ti"

export default props => {
  const { todos, add, del, toggle, count, filter, clear } = useTodos()
  const [todo, setTodo] = useState("")
  const inputEl = useRef(null)
  const [view, setView] = useState("all")
  const Pluralize = ({ count }, item, suffix = "s") =>
    `${count} ${item}${count !== 1 ? suffix : ""}`

  function handleSubmit(e) {
    e.preventDefault()
    add(todo)
    setTodo("")
    inputEl.current.focus()
  }

  function changeView(status) {
    setView(status)
    filter(status)
  }

  return (
    <div className="wrapper">
      <div>
        <p className="title">todos</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputEl}
            type="text"
            onChange={e => setTodo(e.target.value)}
            placeholder="Do homework ..."
            value={todo}
            className="inputBox"
          />
          <button className="addButton" type="submit">
            Add
          </button>
        </form>
        <ul>
          {todos.map(todo => (
            <li
              key={"todo" + todo.id}
              className={todo.status === "completed" ? "completed" : ""}
              onClick={e => toggle(todo.id)}
            >
              {todo.text}{" "}
              <button className="deleteItemButton" onClick={e => del(todo.id)}>
                <TiDelete />
              </button>
            </li>
          ))}
        </ul>

        <div className="listFooter">
          <p>{Pluralize({ count }, "item")} left</p>

          <div className="filter">
            <input
              checked={view === "all" ? true : false}
              onChange={e => changeView("all")}
              name="view"
              id="all"
              type="radio"
            />
            <label htmlFor="all">All</label>
            <br />

            <input
              checked={view === "active" ? true : false}
              onChange={e => changeView("active")}
              name="view"
              id="active"
              type="radio"
            />
            <label htmlFor="active">Active</label>
            <br />

            <input
              checked={view === "completed" ? true : false}
              onChange={e => changeView("completed")}
              name="view"
              id="completed"
              type="radio"
            />
            <label htmlFor="completed">Completed</label>
          </div>

          <button className="clearButton" onClick={e => clear()}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  )
}
