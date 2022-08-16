import { useEffect, useState } from 'react';
import './App.scss';
import queryString from 'query-string';
import Pagination from './components/Pagination';
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

      // pagination
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  })

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  })

  function handlePageChange(newPage) {
    console.log('New page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }
    
  // call Api useEffect
  const [postLists, setPostLists] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters); //chuyển obj filter thành querry params
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostLists(data); //cập nhật state sau khi lấy dữ liệu xong
        setPagination(pagination);
      } catch (err) {
        console.log('Failed to fetch post list', err.message);
      }
    }

    fetchPostList();
  }, [filters]);  //chạy khi mỗi lần filter thay đổi



  return (
    <div className="app">
      <h1>Hooks</h1>
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      <PostList posts={postLists} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
