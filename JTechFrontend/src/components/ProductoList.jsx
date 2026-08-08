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
    const [error, setError] = useState('')

    useEffect(() => {
        cargar()
        cargarMarcas()
    }, [])

    const cargar = async () => {
        const res = await axios.get(API)
        setProductos(res.data)

        try {
            setError('')
            await axios.post(API, { nombre, imei, precio: parseFloat(precio), stock: parseInt(stock), mesGarantia: parseInt(mesGarantia), marcaId: parseInt(marcaId) })
            setNombre(''); setImei(''); setPrecio(''); setStock(''); setMesGarantia(''); setMarcaId('')
            cargar()
        } catch (err) {
            setError('Error al guardar: revisa que todos los campos estén completos y correctos.')
        }

    }


    const cargarMarcas = async () => {
        const res = await axios.get(API_MARCAS)
        setMarcas(res.data)
    }

    const guardar = async () => {
        await axios.post(API, { nombre, imei, precio: parseFloat(precio), stock: parseInt(stock), mesGarantia: parseInt(mesGarantia), marcaId: parseInt(marcaId) })
        setNombre(''); setImei(''); setPrecio(''); setStock(''); setMesGarantia(''); setMarcaId('')
        cargar()
    }

    const eliminar = async (id) => {
        await axios.delete(`${API}/${id}`)
        cargar()
    }

    return (
        <div>
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
            <button onClick={guardar}>Guardar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                            <td><button onClick={() => eliminar(p.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductoList