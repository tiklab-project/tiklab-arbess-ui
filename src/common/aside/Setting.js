import React,{useState,useEffect} from "react";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";
import {renderRoutes} from 'react-router-config'
import "./Setting.scss";

const Setting = props =>{

    const {location,route,secondRouter,pipelineId} = props

    let path = location.pathname
    const [nav,setNav] = useState("")

    useEffect(()=>{
        setNav(path)
    },[path])

    const navContent = item =>{
        return  <div key={item.key}
                     className={`mf-setting-aside-item ${nav===item.key?"mf-setting-aside-select":""} `}
                     onClick={()=>props.history.push(item.key)}
                >
                    <span className="mf-setting-aside-item-label">{item.label}</span>
                </div>
    }

    const renderRouter = item => {
        return   <PrivilegeProjectButton key={item.key} code={item.enCode} domainId={pipelineId}>
                    {navContent(item)}
                </PrivilegeProjectButton>
    }

    return(
        <div className='mf-setting'>
            <div className="mf-setting-aside">
                <div className='mf-setting-aside-head'>设置</div>
                {
                    secondRouter.map(item=>renderRouter(item))
                }
            </div>
            <div className='mf-setting-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default Setting
