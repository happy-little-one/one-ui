import React, { Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Skeleton } from 'antd'

import Layout from '@/components/layout'
import routes, { RouteItem } from '@/routes'

const renderRoutes = (routes: RouteItem[]) =>
  routes.map(({ path, routes, component }) =>
    routes ? renderRoutes(routes) : <Route key={path} path={path} component={component} />,
  )

const App = () => {
  return (
    <Layout routes={routes}>
      <Redirect from="/" to="/products" exact />
      <Suspense fallback={<Skeleton />}>{renderRoutes(routes)}</Suspense>
    </Layout>
  )
}

export default App
