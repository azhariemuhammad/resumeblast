import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'

export const routes = (
  <Routes>
    <Route path='/' element={<Layout />}>
      {/* your routes here */}
      <p>Hello</p>
    </Route>
  </Routes>
)
