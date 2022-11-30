import React,{useState} from "react";
import {inject,observer} from "mobx-react";
import ConfigTop from "../components/common/configTop";
import View from "../components/common/view";

const Config = props =>{

    const {configStore} = props

    const {data,setOpt} = configStore

    const [view,setView] = useState("forms")

    // 滚动--锚点
    const onScroll = () =>{
        const scrollTop=document.getElementById("config-content").scrollTop
        data && data.map((item,index)=>{
            const form = `formView_${index+1}`
            const iId = document.getElementById(form)
            const lastId = document.getElementById(form) && document.getElementById(form).previousSibling
            const iTop = iId && iId.offsetTop
            const lastTop =lastId && lastId.offsetTop
            if(scrollTop>lastTop && scrollTop<iTop ){
                setOpt(index+1)
            }
        })
    }

    return (
        <div className="config mf" id="config-content" onScroll={onScroll}>
            <ConfigTop view={view} setView={setView}/>
            {/* <View view={view} setView={setView}/> */}
        </div>
    )
}

export default inject("configStore")(observer(Config))