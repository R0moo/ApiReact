import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Notas from './pages/Notas'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>📝 Keepinho React Turbo</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: '#007bff', 
              marginRight: '15px',
              fontWeight: 'bold'
            }}
          >
            Home
          </Link>
          <Link 
            to="/notas" 
            style={{ 
              textDecoration: 'none', 
              color: '#007bff',
              fontWeight: 'bold'
            }}
          >
            Gerenciar Notas
          </Link>
        </nav>
      </div>

      <Routes>
        <Route path='/notas' element={<Notas />} />
        <Route path='/' element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Bem-vindo ao Sistema de Notas</h2>
            <p>Clique em "Gerenciar Notas" para começar a criar e visualizar suas notas.</p>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App