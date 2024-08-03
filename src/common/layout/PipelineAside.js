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
    SettingOutlined, LeftOutlined, RightOutlined, LeftCircleOutlined, RightCircleOutlined,
} from "@ant-design/icons";
import pipelineStore from "../../pipeline/pipeline/store/PipelineStore";
import {getUser, productTitle, productWhiteImg} from "thoughtware-core-ui";
import {observer} from "mobx-react";
import Profile from "../component/profile/Profile";


const PipelineAside = (props) => {

    const {isExpand, setIsExpand,themeType} = props;

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
        <div className={`mf-aside ${isExpand ? 'mf-aside-expand': 'mf-aside-normal'} mf-aside-${themeType}`}>
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
                overlayClassName="aside-dropdown"
            >
                <div className='aside-opt' data-title-right={isExpand?null:pipeline?.name}>
                    <ListIcon
                        isMar={false}
                        text={pipeline?.name}
                        colors={pipeline && pipeline?.color}
                    />
                    {isExpand && <div className='aside-opt-name'>{pipeline?.name}</div>}
                    <div style={{opacity:0.8}}><CaretDownOutlined/></div>
                </div>
            </Dropdown>
            <div className="aside-up">
                <div className="aside-item-back">
                    <div className='aside-item' onClick={()=>props.history.push('/home')}>
                        <div className="aside-item-icon">
                            <HomeOutlined />
                        </div>
                        <div className="aside-item-title">返回首页</div>
                    </div>
                </div>
                {
                    firstRouters.map(item=>(
                        <div key={item.id}
                             className={`aside-item ${path.indexOf(item.id) === 0 ? "aside-select":""}`}
                             onClick={()=>props.history.push(item.id)}
                        >
                            <div className="aside-item-icon">{item.icon}</div>
                            <div className="aside-item-title">{item.title}</div>
                        </div>
                    ))
                }
            </div>
            <div className="aside-bottom">
                {
                    isExpand ?
                    <div className='aside-item'
                         onClick={()=>props.history.push(`/pipeline/${pipeline.id}/set`)}
                    >
                        <div className="aside-item-icon"><SettingOutlined /></div>
                        <div className="aside-item-title">设置</div>
                    </div>
                    :
                    <div
                        className="aside-bottom-text" data-title-right='设置'
                        onClick={()=>props.history.push(`/pipeline/${pipeline.id}/set`)}
                    >
                        <SettingOutlined />
                    </div>
                }
            </div>
            <div className="aside-hover-expand"/>
            <div className="aside-expand" onClick={()=>setIsExpand(!isExpand)}>
                {isExpand ? <LeftCircleOutlined />:<RightCircleOutlined />}
            </div>
        </div>
    )
}

export default observer(PipelineAside)
