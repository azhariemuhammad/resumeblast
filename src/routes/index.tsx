import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'
import { Home } from '../pages'
import { Editor } from '../pages/Editor'

export const routes = (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/editor" element={<Editor />} />
        </Route>
    </Routes>
)
