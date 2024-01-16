import React,{useState} from "react";
import {Dropdown} from "antd";
import {SettingOutlined, CaretDownOutlined} from "@ant-design/icons";
import {renderRoutes} from "react-router-config";
import {Loading} from "../loading/Loading";
import ListIcon from "../list/ListIcon";
import "./Aside.scss";

/**
 * 左侧路由（二级标题）
 */
const Aside = props =>{

    const {recentlyPipeline,pipeline,route,location,firstRouters} = props

    const path = location.pathname

    // 加载状态
    const [isLoading,setIsLoading] = useState(false)

    /**
     * 切换流水线
     * @param item
     */
    const changePipeline = item => {
        if(pipeline.id!==item.id){
            setIsLoading(true)
            props.history.push(`/pipeline/${item.id}/history`)
            setTimeout(()=>setIsLoading(false),150)
        }
    }

    return(
        <div className="mf-layout">
            <div className="mf-normal-aside">
                <Dropdown
                    getPopupContainer={e => e.parentElement}
                    overlayStyle={{width:200,top:48,left:80}}
                    trigger={['click']}
                    overlay={
                        <div className="pipeline-opt">
                            <div className="pipeline-opt-title">切换流水线</div>
                            <div className="pipeline-opt-group">
                                {
                                    recentlyPipeline && recentlyPipeline.map(item=>{
                                        if(item){
                                            return (
                                                <div onClick={()=>changePipeline(item)}
                                                     key={item.id}
                                                     className={`pipeline-opt-item ${item.id===pipeline?.id?"pipeline-opt-active":""}`}
                                                >
                                                    <span className={`pipeline-opt-icon mf-icon-${item.color}`}>
                                                        {item.name.substring(0,1).toUpperCase()}
                                                    </span>
                                                    <span className="pipeline-opt-name">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            )
                                        }
                                        return null
                                    })
                                }
                                <div className='pipeline-opt-more'
                                     onClick={()=>props.history.push('/pipeline')}
                                >更多</div>
                            </div>
                        </div>
                    }
                    overlayClassName="normal-aside-dropdown"
                >
                    <div className='normal-aside-opt' data-title-right={pipeline?.name}>
                        <div className="normal-aside-opt-icon">
                            <ListIcon
                                text={pipeline?.name}
                                colors={pipeline && pipeline?.color}
                            />
                            <span><CaretDownOutlined /></span>
                        </div>
                    </div>
                </Dropdown>
                <div className="normal-aside-up">
                    {
                        firstRouters.map(item=>(
                            <div key={item.key}
                                 className={`normal-aside-item ${path.indexOf(item.id) === 0 ? "normal-aside-select":""}`}
                                 onClick={()=>props.history.push(item.id)}
                            >
                                <div className="normal-aside-item-icon">{item.icon}</div>
                                <div className="normal-aside-item-title">{item.title}</div>
                            </div>
                        ))
                    }
                </div>

                <div className="normal-aside-item" onClick={()=>props.history.push(`/pipeline/${pipeline.id}/set`)}>
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
