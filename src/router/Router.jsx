import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Paso1 from '../components/Paso1'
import Reserva from '../components/Reserva'
import Context from '../context/Context'

const Router = () => {
  const {reserva} = useContext(Context)
  return (
    <Routes>
      <Route path={'/'} element={ <Paso1 />} />
      <Route path={'/reserva'} element={ reserva.lugar == undefined ? <Navigate to='/' /> : <Reserva /> } />
      <Route path={'/*'} element={ <Navigate to='/' /> } />
    </Routes>
  )
}

export default Router
