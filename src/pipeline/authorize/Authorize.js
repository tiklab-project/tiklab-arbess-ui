/**
 * @Description: 流水线授权回调
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useEffect} from "react";
import {getUrlParam} from "../../common/utils/Client";

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
