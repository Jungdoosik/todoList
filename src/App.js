import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import './App.css'

export function App() {
  const [todoList, setTodoList] = useState([]);
  const [sequance, setSequance] = useState(null);
  const [chooseDate, setChooseDate] = useState();
  const refTodoItem = useRef();

  useEffect(() => { //로컬 스토리지에 미리 sequance, todoList 삽입
    setTodoList(JSON.parse(window.localStorage.getItem("todoList")));
    let sequance = window.localStorage.getItem("sequance");
    if (sequance === null) {
      window.localStorage.setItem("sequance", "0");
      sequance = 0;
    }
    const handleSetInit = () => {
      window.localStorage.setItem("todoList", "[{},{}]");
      return "[]";
    };

    let todo = JSON.parse(window.localStorage.getItem("todoList") ?? handleSetInit());
    setTodoList(todo);
    setSequance(Number(sequance));
    setChooseDate(new Date())
  }, []);

  const handleTodoAdd = (item) => {
    if (sequance === null) {
      return;
    }
    if (item === '') {
      return;
    }
    let todo = [...todoList];
    todo.push({ chooseDate: moment(chooseDate).format('YYYYMMDD'), tf: false, id: sequance + 1, text: item });

    window.localStorage.setItem("todoList", JSON.stringify(todo));
    window.localStorage.setItem("sequance", String(sequance + 1));

    setTodoList(todo);
    setSequance(sequance + 1);
    refTodoItem.current.value = '';
  };

  const handleTodoCheck = (tf, i) => {
    let todo = [...todoList];
    todo[i].tf = !tf;

    window.localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);
  };

  const handleTodoDelete = (id) => {
    let todo = [...todoList];
    todo = todo.filter((item) => item.id !== id);

    window.localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);

  };

  const handleChooseDate = (val) => {
    let date = moment(val).format('YYYYMMDD');
    console.log(date)
    setChooseDate(date);

  }
  return (
    <div className='mainLayout'>
      <div className='todoLayout'>
        <div className='todoTop'>
          <div className='todoTitle'>
            To Do List
          </div>
          <div className='todoCalendar'>
            <Calendar
              locale='ko'
              formatDay={(locale, date) => moment(date).format('D')}
              onChange={(value) => handleChooseDate(value)}
              value={chooseDate}
            />
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
          {
            todoList.map((item, i) => {
              if (item.chooseDate === moment(chooseDate).format('YYYYMMDD')) {
                return (
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
            }
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App