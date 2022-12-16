import React from "react";
import {LeftOutlined,RightOutlined} from "@ant-design/icons";
import "./page.scss";

const Page = props =>{

    const {pageCurrent,changPage,page} = props

    return <div className="mf-page">
                <span
                    className={`${pageCurrent===1?"mf-page-ban":"mf-page-allow"}`}
                    onClick={()=>pageCurrent===1? null :changPage(pageCurrent - 1)}
                >
                    <LeftOutlined/>
                </span>
                <span className="mf-page-current">{pageCurrent}</span>
                <span> / {page && page.total?page.total:1}</span>
                <span
                    className={`${(pageCurrent===page.total || !page.total)?"mf-page-ban":"mf-page-allow"}`}
                    onClick={()=>(pageCurrent===page.total || !page.total)?null:changPage(pageCurrent + 1)}
                >
                    <RightOutlined/>
                </span>
         </div>
}

export default Page