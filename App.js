import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Library from './pages/Library';
import PdfDetail from './pages/PdfDetail';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Header from './components/Header';
import Menu from './components/Menu';

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ padding: 12 }}>
          <Header />
          <Menu />
          <Routes>
            <Route path="/" element={<Library/>} />
            <Route path="/library" element={<Library/>} />
            <Route path="/pdf/:id" element={<PdfDetail/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/admin/upload" element={<Upload/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
