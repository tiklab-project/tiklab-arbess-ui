import React from "react";
import {Result} from "antd";

/**
 * 404页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const NotFound = props =>{

    const subTitle = (
        <>
            资源不存在或者没有访问权限，
            <span style={{color:"var(--tiklab-blue)",cursor:"pointer"}}
                  onClick={()=>props.history.push("/index/home")}>点击这里</span>
            返回首页
        </>
    )

    return(
        <Result
            status="404"
            title="404"
            subTitle={subTitle}
        />
    )
}

export default NotFound
