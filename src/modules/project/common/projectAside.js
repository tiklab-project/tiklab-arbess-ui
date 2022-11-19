import React,{useEffect,useState} from "react";
import "./projectAside.scss";
import {Dropdown} from "antd";
import {
    SettingOutlined,
    ApartmentOutlined,
    CreditCardOutlined,
    ClockCircleOutlined,
    CaretDownOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";

const ProjectAside = props =>{

    const {pipelineStore,structureListStore} = props

    let path = props.location.pathname
    const [nav,setNav] = useState("")

    const {lastPath,setLastPath,pipelineList,pipelineId,pipeline} = pipelineStore
    const {setState,setEnforcer,setMode} = structureListStore

    useEffect(()=>{
        setLastPath(path.substring(path.lastIndexOf('/') + 1))
        setNav(path)
    },[path])

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/task/${pipelineId}/survey`,
            title:"概况",
            icon:<ApartmentOutlined />,
            key:"2",
        },
        {
            to:`/index/task/${pipelineId}/config`,
            title: "配置",
            icon: <CreditCardOutlined />,
            key:"3",
        },
        {
            to:`/index/task/${pipelineId}/structure`,
            title: "历史",
            icon: <ClockCircleOutlined />,
            key:"4",
        },
    ]

    const changeNav = item=>{
        props.history.push(item)
    }

    // 切换流水线的路由跳转
    const changePipeline = item => {
        if(pipelineId!==item.pipelineId){
            setState(0)
            setEnforcer(null)
            setMode(0)
            if(path.indexOf(`/index/task/${pipelineId}/assembly`) === 0) {
                props.history.push(`/index/task/${item.pipelineId}/assembly/${lastPath}`)
            }else {
                props.history.push(`/index/task/${item.pipelineId}/${lastPath}`)
            }
        }
    }

    // 切换项目菜单列表
    const pipelineMenu = item =>{
        return  <div onClick={()=>{changePipeline(item)}} key={item.pipelineId} className="pipeline-opt-item">
                    <span className={`pipeline-opt-icon icon-${item.color}`}>
                        {item.pipelineName.substring(0,1).toUpperCase()}
                    </span>
                    <span className="pipeline-opt-name">
                        {item.pipelineName}
                    </span>
                </div>
    }

    // 切换项目菜单
    const changPipelineMenu = (
        <div className="pipeline-opt">
            <div className="pipeline-opt-title">切换流水线</div>
            <div className="pipeline-opt-group">
                {
                    pipelineList && pipelineList.map(item=>{
                        return pipelineMenu(item)
                    })
                }
            </div>
        </div>
    )

    // 渲染左侧一级菜单
    const renderTaskRouter = item => {
        return   <div key={item.key}
                      className={`aside_content ${nav===item.to ? "aside_active":""}`}
                      onClick={()=>changeNav(item.to)}
                >
                    <div className="aside_content_icon">
                        {item.icon}
                    </div>
                    <div className="aside_content_title">{item.title}</div>
                </div>
    }

    return(
         <div className="aside">
             <div  className="content">
                 <Dropdown
                     overlayStyle={{top:"48px",left:"80px"}}
                     overlay={changPipelineMenu}
                     trigger={["click"]}
                     overlayClassName="aside-dropdown"
                 >
                     <div className="aside_chang"
                         onClick={(e)=>e.preventDefault()}
                     >
                          <span className={`dropdowns_icon icon-${pipeline.color}`}>
                             {pipeline && pipeline.pipelineName.substring(0,1).toUpperCase()}
                         </span>
                         <span>
                             <CaretDownOutlined />
                         </span>
                     </div>
                </Dropdown>
                {
                    firstRouters.map(item=>{
                        return renderTaskRouter(item)
                    })
                }
            </div>

             <div className="project-sys"
                  onClick={()=>props.history.push(`/index/task/${pipelineId}/assembly/redel`)}
             >
                 <div className="aside_content_icon">
                     <SettingOutlined/>
                 </div>
                 <div>设置</div>
             </div>

         </div>
    )
}

export default inject("structureListStore")(observer(ProjectAside))
