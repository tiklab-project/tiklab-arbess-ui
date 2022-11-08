import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUrlParam} from "../../common/client/client";

const Authorize = props =>{

    const {authorizeStore} = props

    const {findAccessToken} = authorizeStore
    const codeValue = getUrlParam("code")

    // Gitee和Github授权
    useEffect(() => {
        const params = {
            code:codeValue,
            type:localStorage.getItem("code"),
        }
        if(localStorage.getItem("code")){
            findAccessToken(params).then(res=>{
                if(res.code===0){
                    localStorage.setItem("message",res.data)
                    localStorage.removeItem("code")
                    window.close()
                }
            })
        }
    }, [])

    return(
        <div style={{marginTop:150,textAlign:"center"}}>
            用户授权
        </div>
    )
}

export default inject("authorizeStore")(observer(Authorize))
