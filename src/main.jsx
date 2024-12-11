import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Footer from './components/Footer.jsx';
import store from './redux/store';
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <div className="wrapper">
      <div className="content">
        <App />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
    </Provider>
  </StrictMode>
);
