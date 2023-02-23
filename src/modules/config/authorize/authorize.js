import React,{useEffect} from "react";
import {getUrlParam} from "../../common/client/client";

const Authorize = props =>{

    // 本地存储code
    useEffect(() => {
        let code  = getUrlParam("code")
        if(code !== null){
            localStorage.setItem("codeValue",code)
            window.close()
        }
    }, [])

    return(
        <div style={{marginTop:150,textAlign:"center"}}>
            用户授权
        </div>
    )
}

export default Authorize
