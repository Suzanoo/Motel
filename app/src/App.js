import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RoomDetail from './pages/RoomDetial';

function App() {
  return (
    <>
      <Router>
        {<Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:slug" element={<RoomDetail />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
