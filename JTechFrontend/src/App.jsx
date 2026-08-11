import { useState, useEffect } from 'react'
import Resumen from './components/Resumen'
import MarcaList from './components/MarcaList'
import ProductoList from './components/ProductoList'
import './App.css'

function App() {
    const [vista, setVista] = useState('resumen')
    const [theme, setTheme] = useState(() => localStorage.getItem('jtech-theme') || 'dark')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('jtech-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    return (
        <div>
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </button>
            <h1>J-Tech - Control de Inventario</h1>
            <nav>
                <button className={vista === 'resumen' ? 'active' : ''} onClick={() => setVista('resumen')}>Resumen</button>
                <button className={vista === 'marcas' ? 'active' : ''} onClick={() => setVista('marcas')}>Marcas</button>
                <button className={vista === 'productos' ? 'active' : ''} onClick={() => setVista('productos')}>Productos</button>
            </nav>
            {vista === 'resumen' && <Resumen irA={setVista} />}
            {vista === 'marcas' && <MarcaList />}
            {vista === 'productos' && <ProductoList />}
        </div>
    )
}

export default App