import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateLink from './pages/CreateLink.jsx'
import ViewLink from './pages/ViewLink.jsx'

const App = () => {
  return (
    // routes
    <Routes>
      <Route path='/' element={<CreateLink/>}/>
      <Route path='/create-link' element={<CreateLink/>}/>
      <Route path='/link' element={<ViewLink/>}/>
    </Routes>
  )
}

export default App