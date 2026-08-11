/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:64075/api/Producto'
const API_MARCAS = 'http://localhost:64075/api/Marca'

function ProductoList() {
    const [productos, setProductos] = useState([])
    const [marcas, setMarcas] = useState([])
    const [nombre, setNombre] = useState('')
    const [imei, setImei] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [mesGarantia, setMesGarantia] = useState('')
    const [marcaId, setMarcaId] = useState('')
    const [editId, setEditId] = useState(null)
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        cargar()
        cargarMarcas()
    }, [])

    const cargar = async () => {
        const res = await axios.get(API)
        setProductos(res.data)
    }

    const cargarMarcas = async () => {
        const res = await axios.get(API_MARCAS)
        setMarcas(res.data)
    }

    const guardar = async () => {
        if (guardando) return
        setGuardando(true)
        setError('')
        const payload = {
            nombre,
            imei,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            mesGarantia: parseInt(mesGarantia),
            marcaId: parseInt(marcaId)
        }
        try {
            if (editId) {
                await axios.put(`${API}/${editId}`, payload)
            } else {
                await axios.post(API, payload)
            }
            cancelarEdicion()
            cargar()
        } catch (err) {
            setError('No se pudo guardar: revisa que todos los campos estén completos y que el IMEI tenga 15 dígitos.')
        } finally {
            setGuardando(false)
        }
    }

    const editar = (producto) => {
        setEditId(producto.id)
        setNombre(producto.nombre)
        setImei(producto.imei)
        setPrecio(String(producto.precio))
        setStock(String(producto.stock))
        setMesGarantia(String(producto.mesGarantia))
        setMarcaId(String(producto.marcaId))
        setError('')
    }

    const cancelarEdicion = () => {
        setEditId(null)
        setNombre(''); setImei(''); setPrecio(''); setStock(''); setMesGarantia(''); setMarcaId('')
    }

    const eliminar = async (id, nombreProducto) => {
        const confirmado = window.confirm(`¿Eliminar "${nombreProducto}"? Esta acción no se puede deshacer.`)
        if (!confirmado) return
        try {
            await axios.delete(`${API}/${id}`)
            if (editId === id) cancelarEdicion()
            cargar()
        } catch (err) {
            setError('No se pudo eliminar el producto. Intenta de nuevo.')
        }
    }

    return (
        <div className="content-card">
            <h2>Productos</h2>
            <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <input placeholder="IMEI" value={imei} onChange={e => setImei(e.target.value)} />
            <input placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
            <input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
            <input placeholder="Meses Garantía" value={mesGarantia} onChange={e => setMesGarantia(e.target.value)} />
            <select value={marcaId} onChange={e => setMarcaId(e.target.value)}>
                <option value="">Selecciona Marca</option>
                {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
            <button onClick={guardar} disabled={guardando}>
                {guardando ? 'Guardando...' : editId ? 'Actualizar' : 'Guardar'}
            </button>
            {editId && (
                <button onClick={cancelarEdicion} className="btn-cancelar" style={{ marginLeft: '8px' }}>
                    Cancelar
                </button>
            )}
            {error && <p style={{ color: '#FB7185' }}>{error}</p>}
            <table border="1">
                <thead>
                    <tr><th>Id</th><th>Nombre</th><th>IMEI</th><th>Precio</th><th>Stock</th><th>Garantía</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>{p.imei}</td>
                            <td>{p.precio}</td>
                            <td>{p.stock}</td>
                            <td>{p.mesGarantia}</td>
                            <td>
                                <button className="btn-editar" onClick={() => editar(p)}>Editar</button>
                                <button onClick={() => eliminar(p.id, p.nombre)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductoList