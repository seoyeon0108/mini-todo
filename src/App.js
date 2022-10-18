import React, { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import Template from './components/Template';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import styled from 'styled-components';

const CircleButton = styled.div`
  position: fixed;
  right: -5px;
  bottom: 0;
  z-index: 100;
  width: 100px;
  height: 100px;
  cursor: pointer;
  font-size:  5rem;
  color:  #f67280;
`

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

  //토글 열고 닫는 함수
  const onInsertToggle = () => {   //todo추가 폼나옴
    if(selectedTodo){
      setSelectedTodo(null)
    } //이걸 안해주면, 추가하는 insert에 계속 값이 남아 있게됨.
    setInsertToggle(prev => !prev)
  }

  // 할일 추가 함수
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

  // 기존 할일 선택해서 그 값읽는 함수
  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo)
  }

  // 할일 삭제 함수
  const onRemove = (id) => {
    setInsertToggle(); //삭제하면 창이 닫힘
    setTodos(todos => todos.filter(todo => todo.id != id)); // 일치하지 않는 할일만 남기기 // 일치하는건 삭제되는!
  }

  // 기존 할일 수정 함수
  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos => 
      todos.map(todo => todo.id === id ? {...todo, text} : todo)) // {...todo, text}수정된 text만 바꾸고 나머지는 그대로 하는 전개구문
  }

  return(
    <Template todoLength={todos.length}>
      <TodoList 
        todos={todos} 
        onCheckToggle={onCheckToggle} 
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
      />
      <CircleButton onClick={onInsertToggle}>
        <MdAddCircle/>
      </CircleButton>
      {insertToggle && 
        <TodoInsert 
          onInsertToggle={onInsertToggle}
          onInsertTodo={onInsertTodo}
          selectedTodo={selectedTodo}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />}
    </Template>

  ) 
}

export default App;
