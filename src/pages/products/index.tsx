import React from 'react'
import { Route } from 'react-router-dom'

import List from './list'
import Detail from './detail'

export default () => (
  <>
    <Route path="/products" component={List} exact />
    <Route path="/products/detail/:id" component={Detail} />
  </>
)
