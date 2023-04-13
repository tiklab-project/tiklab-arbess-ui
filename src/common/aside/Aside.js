import React,{useEffect,useState} from "react";
import {Dropdown} from "antd";
import {SettingOutlined, CaretDownOutlined} from "@ant-design/icons";
import {renderRoutes} from "react-router-config";
import {interceptUrl,autoHeight} from "../client/Client";
import {Loading} from "../loading/Loading";
import "./Aside.scss";

/**
 * 左侧路由（二级标题）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Aside = props =>{

    const {pipelineList,pipeline,route,location,match,firstRouters} = props

    const path = location.pathname
    const [nav,setNav] = useState("")

    const [isLoading,setIsLoading] = useState(false)

    // 切换流水线的高度
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return window.onresize = null
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    useEffect(()=>{
        let indexPath = `/index/pipeline/${match.params.id}/${interceptUrl(path)[4]}`
        setNav(indexPath)
    },[path])

    /**
     * 切换流水线
     * @param item
     */
    const changePipeline = item => {
        if(pipeline.id!==item.id){
            setIsLoading(true)
            props.history.push(`/index/pipeline/${item.id}/survey`)
            setTimeout(()=>setIsLoading(false),150)
        }
    }

    // 流水线切换的目录
    const renderPipelineMenu = (
        <div className="pipeline-opt">
            <div className="pipeline-opt-title">切换流水线</div>
            <div className="pipeline-opt-group" style={{maxHeight:height,overflow:"auto"}}>
                {
                    pipelineList && pipelineList.map(item=>(
                        <div onClick={()=>changePipeline(item)}
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
                    ))
                }
            </div>
        </div>
    )

    // 渲染左侧菜单
    const renderTaskRouter = item => {
        return   <div key={item.key}
                      className={`normal-aside-item ${nav===item.id ? "normal-aside-select":""}`}
                      onClick={()=>props.history.push(item.id)}
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
                        overlay={renderPipelineMenu}
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

                <div className="normal-aside-item" onClick={()=>props.history.push(`/index/pipeline/${pipeline.id}/assembly`)}>
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
