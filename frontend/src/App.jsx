// Importing Libraries
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Importing Pages
import Home from './pages/Home/Home.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Form from './pages/Form/Form.jsx';


// Importing Components
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

// Importing CSS
import './App.css';

export default function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* Header */}
          <Header />

          {/* Routes */}
          <main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/form' element={<Form />} />
                <Route path='/dashboard' element={<Dashboard />} />
              </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </>
  )
}