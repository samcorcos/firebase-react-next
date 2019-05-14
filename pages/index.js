import React from 'react'

import { Context } from '../lib/context'
import { firebase, db } from '../lib/firebase'
import Data from '../components/Data'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  submit = async () => {
    try {
      await db.collection('widgets').add({
        name: this.state.name
      })
      this.setState({ name: '' })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    return (
      <Context.Consumer>
        {store => {
          if (!store.currentUser.uid) {
            return (
              <div>
                <input placeholder='Email' onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
                <input type='password' placeholder='Password' onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
                <button onClick={() => firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)}>Submit</button>
              </div>
            )
          }
          return (
            <div>
              <div>Email: {store.currentUser.email}</div>
              <button onClick={() => store.signOut()}>Sign out</button>
              <Data query={db.collection('widgets')}>
                {({ loading, data: widgets }) => {
                  if (loading) return <div>Loading...</div>
                  const widgetList = Object.keys(widgets).map(key => widgets[key])
                  return (
                    <div>
                      {widgetList.map(w => (
                        <div key={w.id}>
                          {w.name}
                        </div>
                      ))}
                      <input onChange={e => this.setState({ name: e.target.value })} value={this.state.name} />
                      <button onClick={this.submit}>
                        Create Widget
                      </button>
                    </div>
                  )
                }}
              </Data>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}
