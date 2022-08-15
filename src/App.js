import { useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList'

function App() {
  
  const [todoList, setTodoList] = useState([
    { id: '1', title: 'Eat' },
    { id: '2', title: 'Sleep' },
    { id: '3', title: 'Code'}
  ])
  
  function handleTodoClick(todo) {
    // lấy được todo được click rồi
    console.log(todo);
    // tìm vị trí
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index == -1) return;

    const newTodoList = [...todoList] //clone nếu muốn dùng mảng đó
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
    // 
  }
  
  

  return (
    <div className="app">
      <h1>Hooks</h1>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  );
}

export default App;
