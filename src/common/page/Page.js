import React from "react";
import {LeftOutlined,RightOutlined} from "@ant-design/icons";
import "./Page.scss";

/**
 * 分页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Page = props =>{

    const {pageCurrent,changPage,page} = props

    // 换页-<
    const renderLeftOut = () =>{
        if(pageCurrent===1){
            return (
                <span className="mf-page-ban">
                    <LeftOutlined/>
                </span>
            )
        }else {
            return (
                <span className="mf-page-allow" onClick={()=>changPage(pageCurrent-1)}>
                    <LeftOutlined/>
                </span>
            )
        }
    }

    // 换页+>
    const renderRightOut = () =>{
        if(pageCurrent===page.total){
            return (
                <span className="mf-page-ban">
                    <RightOutlined/>
                </span>
            )
        }else {
            return (
                <span className="mf-page-allow" onClick={()=>changPage(pageCurrent+1)}>
                    <RightOutlined/>
                </span>
            )
        }
    }

    if(!page || page.total<2) return null

    return  <div className="mf-page">
                { renderLeftOut() }
                <span className="mf-page-current">{pageCurrent}</span>
                <span> / {page?.total || 1}</span>
                { renderRightOut() }
            </div>
}

export default Page
