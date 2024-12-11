import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Login from './components/Login';
import { Provider, useSelector } from 'react-redux';
// import store from './redux/store';
import SearchBar from './components/SearchBar';
import RouteHome from './components/RouteHome';


const App = () => {
 

  
  return (
    // <Provider store={store}>
      <Router>
        <div style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
         
           <RouteHome/>
          
        </div>
      </Router>
    // </Provider>
  );
};

export default App;
