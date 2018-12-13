import React from 'react'
import {Route, Switch} from "react-router-dom"
import Posts from './posts'
import Replies from './replies'

const AppRouter = (props) => {
  if (props.posts.length < 1){return null}
  return (
    <Switch>
      <Route
        exact={true} path='/' 
        render={() => <Posts {...props} />}
      />
      <Route
        path='/posts/:id'
        render={({match}) => {
          return <Replies {...props} post={props.posts.find((p)=> p.id === Number(match.params.id))} />
        }}
      />

    </Switch>
  )
}

export default AppRouter