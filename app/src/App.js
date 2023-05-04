import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RoomDetail from './pages/RoomDetial';
import BookingScreen from './pages/BookingScreen';

import Login from './pages/Login';
import Register from './pages/Register';

import Admin from './pages/Admin';
import CreateNewRoom from './pages/CreateNewRoom';
import UpdateRoom from './pages/UpdateRoom';

function App() {
  return (
    <>
      <Router>
        {<Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:slug" element={<RoomDetail />} />
          <Route path="/booking" element={<BookingScreen />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/** Restric to Admin*/}
          <Route path="/admin" element={<Admin />} />
          <Route path="/new-room" element={<CreateNewRoom />} />
          <Route path="/update-room/:id" element={<UpdateRoom />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
