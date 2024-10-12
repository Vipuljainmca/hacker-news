import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchBar from './components/SearchBar';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<SearchBar />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
