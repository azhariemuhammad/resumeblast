import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'
import { Home } from '../pages'
import { Editor } from '../pages/Editor'
import { Preview } from '../pages/Preview'
import { Collections } from '../pages/Collections'

export const routes = (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/collections" element={<Collections />} />
        </Route>
    </Routes>
)
