import React, { useState } from 'react';
import UserContextProvider from  "./components/UserContextProvider";
/**
 * <Bridge request={{
        data: ["email", "name"],
        appName: "apple",
        appID: "123"
    }}>
        <Hi />
    </Bridge>
 */

const Bridge = (props) => {
    return (
        <UserContextProvider {...props} />
    )
}

export default Bridge;
