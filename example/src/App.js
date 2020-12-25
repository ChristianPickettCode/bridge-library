import React from 'react'

import Bridge from '@esotterik/bridge-library'
import '@esotterik/bridge-library/dist/index.css'

const App = () => {

  return (
    <Bridge request={{
      data: ["email", "name"],
      appName: "apple",
      appID: "123"
    }}>
      <Hi />
    </Bridge>
  )
}

const Hi = (props) => {
  return(
    <div style={{margin:"10%"}}>
      {props.user ?
        <div>
          <p>{props.user.email}</p>
          <button onClick={() => props.logout()}>logout</button>
        </div>
      : 
        <div>
          <button onClick={() => props.login()}>login</button>
        </div>
      }

    </div>
  )
}

export default App
