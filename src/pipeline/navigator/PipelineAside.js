import React,{useEffect,useState} from "react";
import {inject,observer,Provider} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import {Dropdown, message} from "antd";
import {
    ApartmentOutlined,
    CaretDownOutlined,
    ClockCircleOutlined,
    CreditCardOutlined,
    ExperimentOutlined,
    LeftCircleOutlined,
    SettingOutlined,
    RadarChartOutlined
} from "@ant-design/icons";
import pipelineStore from "../pipeline/store/PipelineStore";
import ListIcon from "../../common/component/list/ListIcon";
import {renderRoutes} from "react-router-config";

/**
 * 流水线左侧导航（二级导航）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineAside= (props)=>{

    const store = {
        pipelineStore
    }

    const {match,systemRoleStore,route}=props;

    const {findOnePipeline,updateOpen,findRecentlyPipeline,pipeline} = pipelineStore
    const {getInitProjectPermissions} = systemRoleStore

    const id = match.params.id;
    const userId = getUser().userId;
    const path = props.location.pathname;

    //最近打开的流水线
    const [recentlyPipeline,setRecentlyPipeline] = useState([]);
    //最近打开的流水线下拉框
    const [dropdownVisible,setDropdownVisible] = useState(false);

    useEffect(()=>{
        if(id){
            // 获取单个流水线信息
            findOnePipeline(id).then(res=>{
                if(res.data===null || !res.data){
                    message.info("当前流水线不存在或没有权限！")
                    props.history.push('/pipeline')
                    return
                }
                // 获取流水线权限
                getInitProjectPermissions(userId,id,res.data?.power===1)
                // 当前流水线打开
                updateOpen(id).then()
                // 切换流水线
                findRecentlyPipeline(id).then(res=>{
                    if(res.code===0){
                        setRecentlyPipeline(res.data)
                    }
                })
            })
        }
    },[id])

    /**
     * 切换流水线
     */
    const changePipeline = (item) => {
        if(id!==item.id){
            setDropdownVisible(false)
            props.history.push(`/pipeline/${item.id}/history`)
        }
    }

    // 左侧菜单（二级菜单）
    const firstRouters=[
        {
            id:`/pipeline/${id}/survey`,
            title:"概况",
            icon:<ApartmentOutlined />,
        },
        {
            id:`/pipeline/${id}/config`,
            title: "设计",
            icon: <CreditCardOutlined />,
        },
        {
            id:`/pipeline/${id}/history`,
            title: "历史",
            icon: <ClockCircleOutlined />,
        },
        {
            id:`/pipeline/${id}/test`,
            title: "测试报告",
            icon: <ExperimentOutlined />,
        },
        {
            id:`/pipeline/${id}/statistics`,
            title: "统计",
            icon: <RadarChartOutlined />,
        },
    ]

    return (
        <Provider {...store}>
            <div className='mf-home'>
                <aside className="normal-aside">
                    <Dropdown
                        getPopupContainer={e => e.parentElement}
                        overlayStyle={{width:200,top:48,left:80}}
                        trigger={['click']}
                        visible={dropdownVisible}
                        onVisibleChange={visible => setDropdownVisible(visible)}
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
                                    isMar={false}
                                    text={pipeline?.name}
                                    colors={pipeline && pipeline?.color}
                                />
                                <span><CaretDownOutlined /></span>
                            </div>
                        </div>
                    </Dropdown>
                    <div className="normal-aside-up">
                        <div className='normal-aside-item-back'>
                            <div className='normal-aside-item' onClick={()=>props.history.push('/pipeline')}>
                                <div className="normal-aside-item-icon">
                                    <LeftCircleOutlined />
                                </div>
                                <div className="normal-aside-item-title">返回流水线</div>
                            </div>
                        </div>
                        {
                            firstRouters.map(item=>(
                                <div key={item.id}
                                     className={`normal-aside-item ${path.indexOf(item.id) === 0 ? "normal-aside-select":""}`}
                                     onClick={()=>props.history.push(item.id)}
                                >
                                    <div className="normal-aside-item-icon">{item.icon}</div>
                                    <div className="normal-aside-item-title">{item.title}</div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="normal-aside-bottom" onClick={()=>props.history.push(`/pipeline/${pipeline.id}/set`)}>
                        <div className="normal-aside-bottom-icon" data-title-right='设置'>
                            <SettingOutlined className='bottom-icon'/>
                        </div>
                    </div>
                </aside>
                <section className='mf-normal-content'>
                    {renderRoutes(route.routes)}
                </section>
            </div>
        </Provider>
    )

}

export default inject("systemRoleStore")(observer(PipelineAside))

