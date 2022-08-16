import { useEffect, useState } from 'react';
import './App.scss';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
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
    newTodoList.splice(index, 1);  //splice (index: vị trí xóa, 1: số phần tử xóa
    setTodoList(newTodoList);
    // 
  }
  
  function handleTodoFormSubmit(formValues) {
    console.log('Form submit: ', formValues);

    // tạo ra thằng newTodo update vào List, như thế có thể tương tác với todolist
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,  //lấy tất cả các key có trong form value, title...
    }
    // add new todo list
    const newTodoList = [...todoList];
    newTodoList.push(newTodo); //

    setTodoList(newTodoList);
  }

  
  // call Api useEffect
  const [postLists, setPostLists] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = "http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data } = responseJSON;
        setPostLists(data); //cập nhật state sau khi lấy dữ liệu xong
      } catch (err) {
        console.log('Failed to fetch post list', err.message);
      }
    }

    fetchPostList();
  }, []);

  

  return (
    <div className="app">
      <h1>Hooks</h1>
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      <PostList posts={postLists} />
    </div>
  );
}

export default App;
