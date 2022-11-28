import {Route, Routes} from 'react-router-dom';
import {Layout} from './layout';
import {Home, Todo} from './pages';
import {TodoProvider} from './providers/todo.context';

export const App = () => {
  return (
    <div className="container">
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/todo/:id' element={<Todo />} />
          </Route>
          <Route path='*' element={<Layout />} ></Route>
        </Routes>
      </TodoProvider>
    </div>
  );
};