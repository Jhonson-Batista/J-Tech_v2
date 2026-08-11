import { useState, useEffect } from 'react'
import axios from 'axios'

const API_PRODUCTOS = 'http://localhost:64075/api/Producto'
const API_MARCAS = 'http://localhost:64075/api/Marca'

function Resumen({ irA }) {
    const [productos, setProductos] = useState([])
    const [marcas, setMarcas] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        cargarTodo()
    }, [])

    const cargarTodo = async () => {
        setCargando(true)
        const [resProd, resMarc] = await Promise.all([
            axios.get(API_PRODUCTOS),
            axios.get(API_MARCAS)
        ])
        setProductos(resProd.data)
        setMarcas(resMarc.data)
        setCargando(false)
    }

    if (cargando) return <div className="content-card"><h2>Resumen</h2><p className="vacio" style={{ textAlign: 'center' }}>Cargando datos...</p></div>

    const totalUnidades = productos.reduce((acc, p) => acc + (p.stock || 0), 0)
    const valorInventario = productos.reduce((acc, p) => acc + (p.precio || 0) * (p.stock || 0), 0)
    const stockBajo = productos.filter(p => p.stock < 3)
    const ultimos = [...productos].sort((a, b) => b.id - a.id).slice(0, 4)

    const porMarca = marcas.map(m => ({
        nombre: m.nombre,
        cantidad: productos.filter(p => p.marcaId === m.id).length
    })).sort((a, b) => b.cantidad - a.cantidad)
    const maxCantidad = Math.max(1, ...porMarca.map(m => m.cantidad))

    return (
        <div className="content-card">
            <h2>Resumen</h2>

            <div className="acciones-rapidas">
                <button className="btn-accion" onClick={() => irA('marcas')}>
                    <span className="btn-accion-icono">＋</span> Nueva marca
                </button>
                <button className="btn-accion" onClick={() => irA('productos')}>
                    <span className="btn-accion-icono">＋</span> Nuevo producto
                </button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-icono"></span>
                    <span className="stat-valor">{marcas.length}</span>
                    <span className="stat-label">Marcas registradas</span>
                </div>
                <div className="stat-card">
                    <span className="stat-icono"></span>
                    <span className="stat-valor">{productos.length}</span>
                    <span className="stat-label">Productos registrados</span>
                </div>
                <div className="stat-card">
                    <span className="stat-icono"></span>
                    <span className="stat-valor">{totalUnidades}</span>
                    <span className="stat-label">Unidades en stock</span>
                </div>
                <div className="stat-card">
                    <span className="stat-icono"></span>
                    <span className="stat-valor">RD$ {valorInventario.toLocaleString('es-DO', { maximumFractionDigits: 0 })}</span>
                    <span className="stat-label">Valor del inventario</span>
                </div>
            </div>

            <div className="resumen-columnas">
                <div className="panel">
                    <h3>Productos por marca</h3>
                    {porMarca.length === 0 && <p className="vacio">Aún no hay marcas registradas.</p>}
                    {porMarca.map(m => (
                        <div key={m.nombre} className="barra-fila">
                            <span className="barra-label">{m.nombre}</span>
                            <div className="barra-track">
                                <div className="barra-fill" style={{ width: `${(m.cantidad / maxCantidad) * 100}%` }}></div>
                            </div>
                            <span className="barra-valor">{m.cantidad}</span>
                        </div>
                    ))}
                </div>

                <div className="panel">
                    <h3>Stock bajo (menos de 3 unidades)</h3>
                    {stockBajo.length === 0 && <p className="vacio">Todo el inventario tiene stock saludable.</p>}
                    {stockBajo.map(p => (
                        <div key={p.id} className="alerta-fila">
                            <span>{p.nombre}</span>
                            <span className="alerta-badge">{p.stock} unid.</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="panel" style={{ marginTop: '16px' }}>
                <h3>Últimos productos agregados</h3>
                {ultimos.length === 0 && <p className="vacio">Todavía no has agregado productos.</p>}
                {ultimos.map(p => {
                    const marca = marcas.find(m => m.id === p.marcaId)
                    return (
                        <div key={p.id} className="reciente-fila">
                            <div>
                                <span className="reciente-nombre">{p.nombre}</span>
                                <span className="reciente-marca">{marca ? marca.nombre : '—'}</span>
                            </div>
                            <span className="reciente-precio">RD$ {Number(p.precio).toLocaleString('es-DO')}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Resumen