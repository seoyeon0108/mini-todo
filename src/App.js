import React, { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import './App.css';
import Template from './components/Template';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

let nextId = 4; // 밖에두는 이유는, 함수안에두면 계속초기화 되어서

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '할일  1',
      checked: true
    },{
      id: 2,
      text: '운동하기',
      checked: true
    },{
      id: 3,
      text: '피그마 만들기',
      checked: false
    },{
      id: 4,
      text: '배포하기ㄴ',
      checked: true
    }
  ]);
  const [insertToggle, setInsertToggle] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);// 원래 있던 일정 수정시, 값 가져오게끔 하는...
  // selectedTodo에는 선택한 한개의 todo객체가 들어 있음

  const onInsertToggle = () => {   //todo추가 폼나옴
    setInsertToggle(prev => !prev)
  }

  const onInsertTodo = (text) =>{ //일정추가
    if(text === ''){
      return alert('할일을 입력해주세요')
    }else{
      const todo = {
        id: nextId,
        text,
        checked: false
      }
      setTodos(todos => todos.concat(todo)); //push안하는 이유는, 변경되기 전 값을 기억하고 있어야 되기 떄문임.. push는 해당 배열 자체가 변경되고, concat은 새배열이 리턴되고 기존 배열은 변경이 되지 않는다.
      nextId++;
    }
  }

  // 클릭된 객체의  id를 봐서, 그 id와 일치하는 객체를 찾아서 해당 객체의 checked라는 속성의 불리언 값을 반대로 바꿔준다
  const onCheckToggle = (id) =>{
    setTodos(todos => todos.map(todo => (todo.id === id ? {...todo, checked: !todo.checked} : todo)))
  }

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo)
  }

  const onRemove = (id) => {
    setInsertToggle(); //삭제하면 창이 닫힘
    setTodos(todos => todos.filter(todo => todo.id != id));
  }

  return(
    <Template todoLength={todos.length}>
      <TodoList 
        todos={todos} 
        onCheckToggle={onCheckToggle} 
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
      />
      <div className='add-todo-button' onClick={onInsertToggle}>
        <MdAddCircle/>
      </div>
      {insertToggle && 
        <TodoInsert 
          onInsertToggle={onInsertToggle}
          onInsertTodo={onInsertTodo}
          selectedTodo={selectedTodo}
          onRemove={onRemove}
        />}
    </Template>

  ) 
}

export default App;
