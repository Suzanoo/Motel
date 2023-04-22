import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPwd from './pages/ForgotPwd';
import ResetPwd from './pages/ResetPwd';

import CreateNewProduct from './pages/CreateNewProduct';
import UpdateProduct from './pages/UpdateProduct';

import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-pwd" element={<ForgotPwd />} />
            <Route path="/:token" element={<ResetPwd />} />
            {/* TODO : Solve to use  path="/reset-pwd:token" instead */}

            <Route path="/new-product" element={<CreateNewProduct />} />
            <Route path="/product/:id" />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
