import React, { useState, useEffect } from 'react'
import QRCode from "qrcode.react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import crypto from "crypto-js";

const Index = ({request, response}) => {
    const [id, setId] = useState();
    const url = "https://www.esotterik.io"; 
    const [requestString, setRequestString] = useState()

    const parse = (encryptedData, ws) => {
        const parsedData = crypto.AES.decrypt(encryptedData, ws.id).toString(crypto.enc.Utf8)
        const d = JSON.parse(parsedData);
        localStorage.setItem("user", 
            JSON.stringify(d)
        )
        console.log(d);
        response(d);
    }

    const getUser = () => {
        let user = localStorage.getItem("user");
        if (user) {
            console.log(user);
            response(JSON.parse(user));
            return true;
        }
        return false;
    }

    useEffect(() => {
        console.log(request)
        const isUser = getUser();
        if (!isUser) {
            setRequestString(request.data.join("&"));
            const ws = new W3CWebSocket(`wss://u9j9kermu5.execute-api.us-east-1.amazonaws.com/dev`);
            ws.onopen = () =>  {
                console.log("connected.");
                ws.send(JSON.stringify({
                    message: "connect",
                    action: "message"
                }));
            };

            ws.onclose = () => {
                console.log("disconnected.");
            };

            ws.onmessage = (msg) =>  {
                if (msg.type === "message") {
                    const data = JSON.parse(msg.data);
                    if (data.status === "connect") {
                        setId(data.id);
                        ws.id = data.id;
                    }
                    if (data.status === "send") {
                        parse(data.data, ws);
                    }
                }
            };

            // return () => {
            //     ws.close();
            // }
        }

    }, []);

    return (
        <div>
            { id ? 
                <div style={{paddingLeft :"10px", paddingRight:"10px", paddingTop:"10px", paddingBottom:"5px", backgroundColor:"white", borderRadius:"5px", margin:"0"}}>
                    <QRCode fgColor="#282c34" value={`${url}/welcome/${id}/?${requestString}&appName=${request.appName}&appID=${request.appID}`}  onClick={() => console.log(id)}/>
                </div> : ""}
        </div>
    )
}

export default Index
