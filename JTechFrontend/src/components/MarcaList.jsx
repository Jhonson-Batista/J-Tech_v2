/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:64075/api/Marca'

function MarcaList() {
    const [marcas, setMarcas] = useState([])
    const [nombre, setNombre] = useState('')
    const [paisOrigen, setPaisOrigen] = useState('')
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        cargar()
    }, [])

    const cargar = async () => {
        const res = await axios.get(API)
        setMarcas(res.data)
    }

    const guardar = async () => {
        if (guardando) return
        setGuardando(true)
        setError('')
        try {
            await axios.post(API, { nombre, paisOrigen })
            setNombre('')
            setPaisOrigen('')
            cargar()
        } catch (err) {
            setError('No se pudo guardar: revisa que Nombre y País de Origen estén completos.')
        } finally {
            setGuardando(false)
        }
    }

    const eliminar = async (id, nombreMarca) => {
        const confirmado = window.confirm(`¿Eliminar "${nombreMarca}"? Esta acción no se puede deshacer.`)
        if (!confirmado) return
        try {
            await axios.delete(`${API}/${id}`)
            cargar()
        } catch (err) {
            setError('No se pudo eliminar la marca. Intenta de nuevo.')
        }
    }

    return (
        <div>
            <h2>Marcas</h2>
            <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <input placeholder="País de Origen" value={paisOrigen} onChange={e => setPaisOrigen(e.target.value)} />
            <button onClick={guardar} disabled={guardando}>{guardando ? 'Guardando...' : 'Guardar'}</button>
            {error && <p style={{ color: '#FB7185' }}>{error}</p>}
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
                            <td><button onClick={() => eliminar(m.id, m.nombre)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MarcaList