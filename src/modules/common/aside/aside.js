import React,{useEffect,useState} from "react";
import {Dropdown} from "antd";
import {SettingOutlined, CaretDownOutlined} from "@ant-design/icons";
import {renderRoutes} from "react-router-config";
import {interceptUrl} from "../client/client";
import {Loading} from "../loading/loading";
import "./aside.scss";

const Aside = props =>{

    const {pipelineList,pipeline,route,location,match,firstRouters} = props

    const path = location.pathname
    const lastPath = interceptUrl(path,match.params.id)[1]
    const [nav,setNav] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        let indexPath = `/index/pipeline/${match.params.id}/${interceptUrl(path)[4]}`
        setNav(indexPath)
    },[path])

    // 切换流水线的路由跳转
    const changePipeline = item => {
        if(pipeline.id!==item.id){
            setIsLoading(true)
            props.history.push(`/index/pipeline/${item.id}${lastPath}`)
            setTimeout(()=>setIsLoading(false),150)
        }
    }

    // 切换项目菜单列表
    const pipelineMenu = item =>{
        return  <div onClick={()=>changePipeline(item)}
                     key={item.id}
                     className={`pipeline-opt-item ${pipeline && pipeline.id === item.id ?"pipeline-opt-active":""}`}
                >
                    <span className={`pipeline-opt-icon mf-icon-${item.color}`}>
                        {item.name.substring(0,1).toUpperCase()}
                    </span>
                    <span className="pipeline-opt-name">
                        {item.name}
                    </span>
                </div>
    }

    // 切换项目菜单
    const changPipelineMenu = (
        <div className="pipeline-opt">
            <div className="pipeline-opt-title">切换流水线</div>
            <div className="pipeline-opt-group">
                {
                    pipelineList && pipelineList.map(item=>pipelineMenu(item))
                }
            </div>
        </div>
    )

    // 渲染左侧一级菜单
    const renderTaskRouter = item => {
        return   <div key={item.key}
                      className={`normal-aside-item ${nav===item.to ? "normal-aside-select":""}`}
                      onClick={()=>props.history.push(item.to)}
                >
                    <div className="normal-aside-item-icon">{item.icon}</div>
                    <div className="normal-aside-item-title">{item.title}</div>
                </div>
    }

    return(
        <div className="mf-layout">
            <div className="mf-normal-aside">
                <div  className="normal-aside-up">
                    <Dropdown
                        overlayStyle={{top:"48px",left:"80px"}}
                        overlay={changPipelineMenu}
                        trigger={["click"]}
                        overlayClassName="aside-dropdown"
                    >
                        <div className="normal-aside_chang" onClick={(e)=>e.preventDefault()}>
                             <span className={`dropdowns_icon mf-icon-${pipeline && pipeline.color}`}>
                                 {pipeline && pipeline.name.substring(0,1).toUpperCase()}
                             </span>
                            <span><CaretDownOutlined /></span>
                        </div>
                    </Dropdown>
                    {
                        firstRouters.map(item=>renderTaskRouter(item))
                    }
                </div>

                <div className="normal-aside-item" onClick={()=>props.history.push(`/index/pipeline/${pipeline.id}/assembly/set`)}>
                    <div className="normal-aside-item-icon"><SettingOutlined/></div>
                    <div>设置</div>
                </div>
            </div>
            {
                isLoading ? <Loading/> :
                    <div className='mf-layout-content'>
                        {renderRoutes(route.routes)}
                    </div>
            }
        </div>
    )
}

export default Aside
