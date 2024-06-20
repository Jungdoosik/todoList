import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([])
  const [sequance, setSequance] = useState(null)
  const refTodoItem = useRef();

  useEffect(() => {
    let sequance = window.localStorage.getItem("sequance");
    if (sequance === null) {
      window.localStorage.setItem("sequance", "0");
      sequance = 0;
    }
    const handleSetInit = () => {
      window.localStorage.setItem("todoList", "[]");
      return "[]"
    }

    let todo = JSON.parse(window.localStorage.getItem("todoList") ?? handleSetInit());

    setTodoList(todo);
    setSequance(Number(sequance));
  }, [])

  const handleTodoAdd = (item) => {
    if (sequance === null) {
      return
    }
    if (item === '') {
      return
    }

    let todo = [...todoList];
    todo.push({ tf: false, id: sequance + 1, text: item });

    window.localStorage.setItem("todoList", JSON.stringify(todo));
    window.localStorage.setItem("sequance", String(sequance + 1));

    setTodoList(todo);
    setSequance(sequance + 1);
    refTodoItem.current.value = ''
  }

  const handleTodoCheck = (tf, i) => {
    let todo = [...todoList];
    todo[i].tf = !tf;

    window.localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);
  }

  const handleTodoDelete = (id) => {
    let todo = [...todoList];
    todo = todo.filter((item) => item.id !== id);

    window.localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);

  }
  return (
    <div className='mainLayout'>
      <div className='todoLayout'>
        <div className='todoTop'>
          <div className='todoTitle'>
            To Do List
          </div>
          <div className='todoAdd'>
            <input
              type='text'
              placeholder='할 일을 입력하세요.'
              ref={refTodoItem} />
            <div onClick={() => handleTodoAdd(refTodoItem.current.value)}>
              +
            </div>
          </div>
        </div>
        {
          todoList.map((item, i) =>
            <div className='todoItem' key={i}>
              <div className='todoCheckBox' onClick={() => handleTodoCheck(item.tf, i)}>
                <div className='checkIcon'>
                  {item.tf ? '✔️' : ''}
                </div>
                <span>{item.text}</span>
              </div>
              <div className='deleteItem' onClick={() => handleTodoDelete(item.id)}>
                ✖️
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;

