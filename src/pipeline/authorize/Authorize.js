import React,{useEffect} from "react";
import {getUrlParam} from "../../common/client/Client";

/**
 * 回调地址页面
 * Gitee&&Github授权
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Authorize = props =>{

    useEffect(() => {
        // 获取code
        let code  = getUrlParam("code")
        if(code !== null){
            // 存储code
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
