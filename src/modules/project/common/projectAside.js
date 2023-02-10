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
import {observer} from "mobx-react";
import {interceptUrl} from "../../common/client/client";

const ProjectAside = props =>{

    const {pipelineStore,configStore,setIsLoading,match} = props

    let path = props.location.pathname
    const [nav,setNav] = useState("")

    const {pipelineList,pipelineId,pipeline} = pipelineStore
    const {setTaskFormDrawer} = configStore
    const lastPath = interceptUrl(path,match.params.id)[1]

    useEffect(()=>{
        let indexPath = `/index/task/${match.params.id}/${interceptUrl(path)[4]}`
        setNav(indexPath)
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
            title: "设计",
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
        setTaskFormDrawer(false)
        if(pipelineId!==item.id){
            setIsLoading(true)
            props.history.push(`/index/task/${item.id}${lastPath}`)
            setTimeout(()=>setIsLoading(false),150)
        }
    }

    // 切换项目菜单列表
    const pipelineMenu = item =>{
        return  <div onClick={()=>{changePipeline(item)}} key={item.id} className={`pipeline-opt-item ${item.id===pipelineId ?"pipeline-opt-active":""}`}>
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
                      className={`aside_content ${nav===item.to ? "aside_active":""}`}
                      onClick={()=>changeNav(item.to)}
                >
                    <div className="aside_content_icon">{item.icon}</div>
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
                          <span className={`dropdowns_icon mf-icon-${pipeline.color}`}>
                             {pipeline && pipeline.name.substring(0,1).toUpperCase()}
                         </span>
                         <span>
                             <CaretDownOutlined />
                         </span>
                     </div>
                </Dropdown>
                {
                    firstRouters.map(item=>renderTaskRouter(item))
                }
            </div>

             <div className="project-sys" onClick={()=>props.history.push(`/index/task/${pipelineId}/assembly/set`)}>
                 <div className="aside_content_icon"><SettingOutlined/></div>
                 <div>设置</div>
             </div>

         </div>
    )
}

export default observer(ProjectAside)
