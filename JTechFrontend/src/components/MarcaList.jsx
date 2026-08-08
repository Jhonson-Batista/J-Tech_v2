/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:64075/api/Marca'

function MarcaList() {
    const [marcas, setMarcas] = useState([])
    const [nombre, setNombre] = useState('')
    const [paisOrigen, setPaisOrigen] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        cargar()
    }, [])

    const cargar = async () => {
        const res = await axios.get(API)
        setMarcas(res.data)
    }

    const guardar = async () => {
        await axios.post(API, { nombre, paisOrigen })
        setNombre('')
        setPaisOrigen('')
        cargar()

        try {
            setError('')
            await axios.post(API, { nombre, imei, precio: parseFloat(precio), stock: parseInt(stock), mesGarantia: parseInt(mesGarantia), marcaId: parseInt(marcaId) })
            setNombre(''); setImei(''); setPrecio(''); setStock(''); setMesGarantia(''); setMarcaId('')
            cargar()
        } catch (err) {
            setError('Error al guardar: revisa que todos los campos estén completos y correctos.')
        }
    }

    const eliminar = async (id) => {
        await axios.delete(`${API}/${id}`)
        cargar()
    }

    return (
        <div>
            <h2>Marcas</h2>
            <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <input placeholder="País de Origen" value={paisOrigen} onChange={e => setPaisOrigen(e.target.value)} />
            <button onClick={guardar}>Guardar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table border="1">
                <thead>
                    <tr><th>Id</th><th>Nombre</th><th>País</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {marcas.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.nombre}</td>
                            <td>{m.paisOrigen}</td>
                            <td><button onClick={() => eliminar(m.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MarcaList