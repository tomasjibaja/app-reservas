import { useState } from "react";
import Context from './Context'

const Provider = ({ children }) => {

  const [ reserva, setReserva ] = useState({})
  const [paso, setPaso] = useState(0)

  return (
    <Context.Provider value={{ reserva, setReserva, paso, setPaso }}>
      {children}
    </Context.Provider>
  )
}

export default Provider