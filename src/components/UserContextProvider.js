import React, { useReducer, useState } from 'react';
import Index from './index';
import { UserContext } from "./UserContext";
import { userReducer } from "./UserReducer";

const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(userReducer, {name : "default"});
    const [res, setRes] = useState(false);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("app");
        localStorage.removeItem("request");
        window.location.reload();
    }
    const childWithUserProp = React.Children.map(
        props.children,
        (child) => {
          return React.cloneElement((child), {
            user,
            logout,
            ...props
          });
        }
      );

    const response = (data) => {
        dispatch({type: "SET_USER", user: data});
        setRes(true);
    }

    return (
        <div>
            {res ? 
                <UserContext.Provider value={user, dispatch}>
                    {childWithUserProp}
                </UserContext.Provider>
              : <Index request={props.request} response={response}/>}
            
        </div>
    )
}

export default UserContextProvider
