
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from '../mainPage/MainPage';
import AddProduct from '../addProduct/AddProduct';



import './app.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>}></Route>
            <Route path="/add-product" element={<AddProduct/>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
