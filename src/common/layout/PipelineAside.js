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
} from "@ant-design/icons";
import pipelineStore from "../../pipeline/pipeline/store/PipelineStore";
import Aside from "../component/aside/PipelineAside";
import {observer} from "mobx-react";

/**
 * 流水线侧边栏
 * @param props
 * @returns {Element}
 * @constructor
 */
const PipelineAside = (props) => {

    const {isExpand} = props;

    const {findRecentlyPipeline,pipeline} = pipelineStore;

    const match = useRouteMatch("/pipeline/:id");

    //流水线id
    const id = match?.params.id;
    //最近打开的流水线
    const [recentlyPipeline,setRecentlyPipeline] = useState([]);
    //最近打开的流水线下拉框
    const [dropdownVisible,setDropdownVisible] = useState(false);

    const firstRouters=[
        {
            id:`/pipeline/${id}/overview`,
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
            isEnhance: true,
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
    }, [id,pipeline?.name]);

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
        <Aside
            {...props}
            id={id}
            backUrl={'/home'}
            setUrl={`/pipeline/${id}/setting`}
            initRouters={firstRouters}
            ChangeComponent={
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
                                                    <span className={`pipeline-opt-icon arbess-icon-${item.color}`}>
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
                        {isExpand &&
                            <>
                                <div className='aside-opt-name'>{pipeline?.name}</div>
                                <div style={{opacity:0.8}}><CaretDownOutlined/></div>
                            </>
                        }
                    </div>
                </Dropdown>
            }
        />
    )

}

export default observer(PipelineAside)
