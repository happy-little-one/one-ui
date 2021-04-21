import React from 'react'
import { Route } from 'react-router-dom'

import List from './list'

export default () => (
  <>
    <Route path="/products" component={List} />
  </>
)
