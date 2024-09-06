import { datos } from '../data/array'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context'

const Paso1 = () => {

  const { register, handleSubmit, formState:{errors} } = useForm()
  const { reserva, setReserva } = useContext(Context)
  const navegarA = useNavigate()

  const guardarValores = (data) => {
    const zonaElegida = datos.find((elem) => elem.lugar === data.valor)
    const newData = {...reserva,
      lugar: zonaElegida.lugar,
      precio: zonaElegida.precio,
      imagen: zonaElegida.imagen
    }
    setReserva(newData)
    navegarA('/reserva', { replace: true })
  }

  return (
    <div className='zonas-container'>
      <h2>Selecciona el tipo de zona a visitar:</h2>
      <form onSubmit={handleSubmit(guardarValores)}>
        <div className="zonas-wrapper">
          {datos.map((zona, index) => {
            return (
              <div className="zona" key={index}>
                <input className='zona-radio' type="radio" name='zona' value={zona.lugar}
                {...register('valor', { required: true })}
                />
                <h4 className='zona-title'>{zona.lugar}</h4>
                <h5 className='zona-price'>(${zona.precio})</h5>
                <img className='zona-img' src={zona.imagen} alt="" />
              </div>
            )
          })}
        </div>
        <input className='zonas-submit' type='submit' value='Enviar'/>
        {errors.valor?.type === 'required' && <h5 className='error-msg'>Debes seleccionar una opción</h5>}
      </form>
    </div>
  )
}

export default Paso1
