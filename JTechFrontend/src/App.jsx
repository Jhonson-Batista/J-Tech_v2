import { useState } from 'react'
import MarcaList from './components/MarcaList'
import ProductoList from './components/ProductoList'
import './App.css'

function App() {
    const [vista, setVista] = useState('marcas')

    return (
        <div>
            <h1>J-Tech - Control de Inventario</h1>
            <nav>
                <button onClick={() => setVista('marcas')}>Marcas</button>
                <button onClick={() => setVista('productos')}>Productos</button>
            </nav>
            {vista === 'marcas' && <MarcaList />}
            {vista === 'productos' && <ProductoList />}
        </div>
    )
}

export default App