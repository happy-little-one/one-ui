import React, { lazy } from 'react'
import { FunctionComponent, LazyExoticComponent } from 'react'

export interface RouteItem {
  name: string
  icon?: FunctionComponent<any>
  path: string
  component?: LazyExoticComponent<any> | FunctionComponent<any>
  routes?: RouteItem[]
}

const routes: RouteItem[] = [
  {
    name: 'ๅๅๅ่กจ',
    path: '/products',
    component: lazy(() => import('@/pages/products')),
  },
]

export default routes
