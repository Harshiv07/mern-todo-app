import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
const api_base = "https://mern-todo-app-server.herokuapp.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState({ description: "", priority: 0 });

  useEffect(() => {
    GetTodos();
  }, []);

  useEffect(() => {
    GetTodos();
  }, [todos]);

  const GetTodos = () => {
    fetch(api_base, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error: ", err));
  };

  const completeTodo = async id => {
    const data = await fetch(api_base + "/complete", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then(res => res.json());

    setTodos(todos =>
      todos.map(todo => {
        if (todo._id === data._id) {
          todo.status = data.status;
        }
        return todo;
      })
    );
  };

  const addTodo = async () => {
    console.log("new todo ", newTodo);
    const data = await fetch(api_base + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newTodo.description,
        priority: newTodo.priority,
      }),
    }).then(res => res.json());

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo({ description: "", priority: 0 });
  };

  const deleteTodo = async id => {
    const data = await fetch(api_base + "/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
  };

  return (
    <div className='App'>
      <h1>Welcome!</h1>
      <h4>Your tasks</h4>

      <div className='todos'>
        {todos.length > 0 ? (
          todos.map(todo => (
            <div
              className={"todo" + (todo.status ? " is-complete" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className='checkbox'></div>

              <div className='text'>{todo.description}</div>
              <div className='priority'>
                {todo.priority === 0
                  ? "HIGH"
                  : todo.priority === 1
                  ? "MEDIUM"
                  : "LOW"}
              </div>

              <div className='delete-todo' onClick={() => deleteTodo(todo._id)}>
                x
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className='addPopup' onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className='popup'>
          <div className='closePopup' onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className='content'>
            <h3>Add Task</h3>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              className='add-todo-input'
              placeholder='Description'
              onChange={e =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
              value={newTodo.description}
            />
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as='select'
              className='add-todo-input'
              onChange={e =>
                setNewTodo({ ...newTodo, priority: e.target.value })
              }
              value={newTodo.priority}
            >
              <option value='0'>HIGH</option>
              <option value='1'>MEDIUM</option>
              <option value='2'>LOW</option>
            </Form.Control>
            <div className='button' onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
