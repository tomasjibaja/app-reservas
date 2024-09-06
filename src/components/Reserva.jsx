import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import Context from '../context/Context'
import { preguntas } from '../data/preguntas'

const Reserva = () => {
  const {reserva, setReserva, paso, setPaso} = useContext(Context)
  const { register, handleSubmit, formState:{errors}, setFocus, reset, watch } = useForm()
  const navegarA = useNavigate()

  const guardarValores = (data) => {
    const newData = {
      ...reserva,
      [preguntas[paso].campo]: data.valor
    }
    setReserva(newData)
    reset()
    setPaso(paso + 1)
  }

  const resetReserva = () => {
    setPaso(0)
    navegarA('/')
    setReserva({})
  }

  return (
    <>
       <div className='reserva'>
        {paso < 4 && 
        (<div className="reserva-pregunta">
          <h2>{preguntas[paso].pregunta}</h2>
          <form onSubmit={handleSubmit(guardarValores)}>
            <input autoComplete='off'
            {...register('valor', {
              required: true,
              min: preguntas[paso].min,
              max: preguntas[paso].max
            })} 
            />
            <div className="reserva-buttons">
              {paso > 0 && <button onClick={() => setPaso(paso - 1)}>Volver</button>}
              <input type="submit" value='Enviar' />
            </div>
              {errors.valor != null && <h5 className='error-msg'>{preguntas[paso].error}</h5>}
          </form>
          <button onClick={resetReserva}>Elegir otra zona</button>
        </div>)
        }
        <div className="reserva-datos">
          <h2>Tu reserva<span className='reserva-nombre'>{reserva.nombre}</span></h2>
          <img src={reserva.imagen} alt="" />
          <p><span className='reserva-item'>Tipo de zona: </span>{reserva.lugar}</p>
          <p><span className='reserva-item'>Precio por día: </span>${reserva.precio}</p>
          {reserva.habitaciones && <p><span className='reserva-item'>Habitaciones: </span>{reserva.habitaciones}</p>}
          {reserva.personas && <p><span className='reserva-item'>Personas: </span>{reserva.personas}</p>}
          {reserva.dias && <p><span className='reserva-item'>Días: </span>{reserva.dias}</p>}
          {reserva.dias && <h3>Total: <span className='reserva-precio-final'>
            ${reserva.precio * (reserva.habitaciones || 1) * (reserva.dias || 1) * (reserva.personas || 1)}
          </span></h3>}
        </div>
      </div>
      {paso == 4 && (<button className='reset-btn' onClick={resetReserva}>Volver al principio</button>)}
    </>
   
  )
}

export default Reserva
