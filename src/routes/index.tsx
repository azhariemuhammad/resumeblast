import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'

const Home = React.lazy(() => import('../pages').then(module => ({ default: module.Home })))
const Editor = React.lazy(() => import('../pages/Editor').then(module => ({ default: module.Editor })))
const CollectionsPage = React.lazy(() =>
    import('../pages/Collections').then(module => ({ default: module.CollectionsPage }))
)

const LoadingFallback = () => <div>Loading...</div>

export const routes = (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route
                index
                element={
                    <Suspense fallback={<LoadingFallback />}>
                        <Home />
                    </Suspense>
                }
            />
            <Route
                path="/editor"
                element={
                    <Suspense fallback={<LoadingFallback />}>
                        <Editor />
                    </Suspense>
                }
            />
            <Route
                path="/candidate?isCandidateForm=true"
                element={
                    <Suspense fallback={<LoadingFallback />}>
                        <Editor />
                    </Suspense>
                }
            />
            <Route
                path="/collections"
                element={
                    <Suspense fallback={<LoadingFallback />}>
                        <CollectionsPage />
                    </Suspense>
                }
            />
        </Route>
    </Routes>
)
