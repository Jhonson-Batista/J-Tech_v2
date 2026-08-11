/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:64075/api/Marca'

function MarcaList() {
    const [marcas, setMarcas] = useState([])
    const [nombre, setNombre] = useState('')
    const [paisOrigen, setPaisOrigen] = useState('')
    const [editId, setEditId] = useState(null)
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
            if (editId) {
                await axios.put(`${API}/${editId}`, { nombre, paisOrigen })
            } else {
                await axios.post(API, { nombre, paisOrigen })
            }
            cancelarEdicion()
            cargar()
        } catch (err) {
            setError('No se pudo guardar: revisa que Nombre y País de Origen estén completos.')
        } finally {
            setGuardando(false)
        }
    }

    const editar = (marca) => {
        setEditId(marca.id)
        setNombre(marca.nombre)
        setPaisOrigen(marca.paisOrigen)
        setError('')
    }

    const cancelarEdicion = () => {
        setEditId(null)
        setNombre('')
        setPaisOrigen('')
    }

    const eliminar = async (id, nombreMarca) => {
        const confirmado = window.confirm(`¿Eliminar "${nombreMarca}"? Esta acción no se puede deshacer.`)
        if (!confirmado) return
        try {
            await axios.delete(`${API}/${id}`)
            if (editId === id) cancelarEdicion()
            cargar()
        } catch (err) {
            setError('No se pudo eliminar la marca. Intenta de nuevo.')
        }
    }

    return (
        <div className="content-card">
            <h2>Marcas</h2>
            <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <input placeholder="País de Origen" value={paisOrigen} onChange={e => setPaisOrigen(e.target.value)} />
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
                    <tr><th>Id</th><th>Nombre</th><th>País</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {marcas.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.nombre}</td>
                            <td>{m.paisOrigen}</td>
                            <td>
                                <button className="btn-editar" onClick={() => editar(m)}>Editar</button>
                                <button onClick={() => eliminar(m.id, m.nombre)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MarcaList