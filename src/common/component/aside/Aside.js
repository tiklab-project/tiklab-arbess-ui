import React,{useEffect,useState} from "react";
import {Dropdown} from "antd";
import {SettingOutlined, CaretDownOutlined} from "@ant-design/icons";
import {renderRoutes} from "react-router-config";
import {interceptUrl} from "../../utils/Client";
import {Loading} from "../loading/Loading";
import "./Aside.scss";

/**
 * 左侧路由（二级标题）
 */
const Aside = props =>{

    const {pipelineList,pipeline,route,location,match,firstRouters} = props

    const path = location.pathname
    const [nav,setNav] = useState("")

    // 加载状态
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        // 初始化菜单
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
            props.history.push(`/index/pipeline/${item.id}/structure`)
            setTimeout(()=>setIsLoading(false),150)
        }
    }

    return(
        <div className="mf-layout">
            <div className="mf-normal-aside">
                <Dropdown
                    overlayStyle={{width:200,top:48,left:80}}
                    trigger={['click']}
                    overlay={
                        <div className="pipeline-opt">
                            <div className="pipeline-opt-title">切换流水线</div>
                            <div className="pipeline-opt-group">
                                {
                                    pipelineList && pipelineList.map((item,index)=>{
                                        return index < 6 && pipeline?.id !== item.id &&
                                            <div onClick={()=>changePipeline(item)}
                                                 key={item.id}
                                                 className={`pipeline-opt-item`}
                                            >
                                                <span className={`pipeline-opt-icon mf-icon-${item.color}`}>
                                                    {item.name.substring(0,1).toUpperCase()}
                                                </span>
                                                    <span className="pipeline-opt-name">
                                                    {item.name}
                                                </span>
                                            </div>
                                    })
                                }
                                {
                                    pipelineList && pipelineList.length > 6 &&
                                    <div className='pipeline-opt-item pipeline-opt-more'
                                         onClick={()=>props.history.push('/index/pipeline')}
                                    >更多</div>
                                }
                            </div>
                        </div>
                    }
                    overlayClassName={"normal-aside-dropdown"}
                >
                    <div className='normal-aside-opt' data-title-bottom={pipeline?.name}>
                        <div className="normal-aside-opt-icon">
                                <span className={`dropdowns_icon mf-icon-${pipeline && pipeline.color}`}>
                                     {pipeline && pipeline.name.substring(0,1).toUpperCase()}
                                </span>
                            <span><CaretDownOutlined /></span>
                        </div>
                    </div>
                </Dropdown>
                <div className="normal-aside-up">
                    {
                        firstRouters.map(item=>(
                            <div key={item.key}
                                 className={`normal-aside-item ${nav===item.id ? "normal-aside-select":""}`}
                                 onClick={()=>props.history.push(item.id)}
                            >
                                <div className="normal-aside-item-icon">{item.icon}</div>
                                <div className="normal-aside-item-title">{item.title}</div>
                            </div>
                        ))
                    }
                </div>

                <div className="normal-aside-item" onClick={()=>props.history.push(`/index/pipeline/${pipeline.id}/set`)}>
                    <div className="normal-aside-item-icon"><SettingOutlined/></div>
                    <div>设置</div>
                </div>
            </div>
            {
                isLoading ? <Loading/> : renderRoutes(route.routes)
            }
        </div>
    )
}

export default Aside
