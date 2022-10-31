import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import Headline from "../formTitle/headline";

const Anch = props =>{

    const {data,opt,setOpt,setAddConfigVisible} = props

    const changAnth = index =>{
        const scrollTop=document.getElementById("formView-content")
        if (index) {
            const name = document.getElementById("formView_"+index)
            if (name) {
                scrollTop.scrollTop = name.offsetTop - 160
                setOpt(index)
            }
        }
    }
    
    const renderData = (item,index) =>{
        return  <div
                    onClick={()=>changAnth(index)}
                    key={index}
                    className={`anch-item ${opt===index ?"anch-select":""}`}
                >
                    <Headline type={item.dataType}/>
                </div>
    }

    return(
        <div className="formView-anch formView-anch-limite">
            <div className="formView-anch-content">
                {
                    data && data.map((item,index)=>{
                        return renderData(item,index+1)
                    })
                }
                <div
                    className={`anch-item anch-plus`}
                    onClick={()=>setAddConfigVisible(true)}
                >
                    <PlusOutlined />
                </div>
            </div>
        </div>
    )
}

export default Anch