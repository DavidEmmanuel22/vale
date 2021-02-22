import React from 'react'
import { Route } from 'react-router-dom'

const AppRouter = ({
  exact,
  path,
  component: Component,
  layout: Layout,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  ></Route>
)

export default AppRouter
