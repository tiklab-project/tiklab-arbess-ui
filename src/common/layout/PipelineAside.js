import React, {useEffect, useState} from 'react';
import {useRouteMatch} from "react-router-dom";
import {Dropdown} from "antd";
import ListIcon from "../component/list/ListIcon";
import {
    ApartmentOutlined,
    CaretDownOutlined,
    ClockCircleOutlined,
    CreditCardOutlined,
    ExperimentOutlined,
    RadarChartOutlined,
    HomeOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import pipelineStore from "../../pipeline/pipeline/store/PipelineStore";
import {productWhiteImg} from "thoughtware-core-ui";
import {observer} from "mobx-react";


const PipelineAside = (props) => {

    const {findRecentlyPipeline,pipeline} = pipelineStore;

    const match = useRouteMatch("/pipeline/:id");

    const id = match?.params.id;
    const path = props.location.pathname;

    //最近打开的流水线
    const [recentlyPipeline,setRecentlyPipeline] = useState([]);
    //最近打开的流水线下拉框
    const [dropdownVisible,setDropdownVisible] = useState(false);

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

    useEffect(() => {
        if(id){
            findRecentlyPipeline(id).then(res=>{
                if(res.code===0){
                    setRecentlyPipeline(res.data)
                }
            })
        }
    }, [id]);

    /**
     * 切换流水线
     */
    const changePipeline = (item) => {
        if(id!==item.id){
            setDropdownVisible(false)
            props.history.push(`/pipeline/${item.id}/history`)
        }
    }

    return (
        <aside className="mf-normal-aside">
            <div className='normal-aside-pipeline-logo' onClick={()=>props.history.push('/home')}>
                <img src={productWhiteImg.matflow} height={32} width={28} alt={''}/>
            </div>
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
                    <div className='normal-aside-item' onClick={()=>props.history.push('/home')}>
                        <div className="normal-aside-item-icon">
                            <HomeOutlined />
                        </div>
                        <div className="normal-aside-item-title">返回首页</div>
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
    )
}

export default observer(PipelineAside)
