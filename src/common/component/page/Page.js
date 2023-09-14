import React from "react";
import {LeftOutlined,RightOutlined} from "@ant-design/icons";
import "./Page.scss";

/**
 * 分页
 */
const Page = props =>{

    const {currentPage,changPage,page:{totalPage=1,totalRecord=1}} = props

    return totalPage > 1 && <div className="mf-page">
                <div className={`${currentPage===1?"mf-page-ban":"mf-page-allow"}`}
                     onClick={()=>currentPage===1 ? null:changPage(currentPage-1)}
                ><LeftOutlined/></div>
                <div className="mf-page-current">{currentPage}</div>
                <div className='mf-page-line'> / </div>
                <div>{totalPage}</div>
                <div className={`${currentPage===totalPage?"mf-page-ban":"mf-page-allow"}`}
                     onClick={()=>currentPage===totalPage? null:changPage(currentPage+1)}
                ><RightOutlined/></div>
                <div className='mf-page-record'>  共{totalRecord}条 </div>
            </div>
}

export default Page
