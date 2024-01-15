import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Layout from './layout.jsx'
import Test from './pages/test.jsx'
import './index.css'
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="Test" element={<Test />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
)
