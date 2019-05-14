import React from 'react'
import App, { Container } from 'next/app'

import { firebase } from '../lib/firebase'
import { Context, Provider } from '../lib/context'
import AuthBindings from '../components/AuthBindings'

// Use this additional container to bind firebase auth listener to store
class _App extends App {
  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Provider>
          <Context.Consumer>
            {store => (
              <>
                <AuthBindings firebase={firebase} store={store} />
                <Component store={store} {...pageProps} />
              </>
            )}
          </Context.Consumer>
        </Provider>
      </Container>
    )
  }
}

export default _App
