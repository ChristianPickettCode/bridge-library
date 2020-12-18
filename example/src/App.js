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
  console.log(props);
  const signout = () => {
    console.log("ok");
    props.logout();
  }
  return(
    <div style={{margin:"10%"}}>
      <p>{props.user.email}</p>
      <button onClick={() => signout()}>logout</button>
    </div>
  )
}

export default App
