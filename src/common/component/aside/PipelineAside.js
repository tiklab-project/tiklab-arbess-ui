import React, {useState} from 'react';
import {
    HomeOutlined,
    SettingOutlined,
    LeftCircleOutlined,
    RightCircleOutlined,
} from "@ant-design/icons";
import {observer} from "mobx-react";


const PipelineAside = (props) => {

    const {isExpand,setIsExpand,themeType,initRouters,backUrl,setUrl,ChangeComponent} = props;

    const path = props.location.pathname;

    const [pipelineRouters,setPipelineRouters] = useState(initRouters)

    const goBack = () => {
        props.history.push(backUrl)
    }

    const goSetting = () => {
        props.history.push(setUrl)
    }

    return (
        <div className={`arbess-aside ${isExpand ? 'arbess-aside-expand': 'arbess-aside-normal'} arbess-aside-${themeType}`}>
            {ChangeComponent}
            <div className="aside-up">
                {
                    isExpand ?
                        <div className="aside-item-back">
                            <div className='aside-item' onClick={goBack}>
                                <div className="aside-item-icon">
                                    <HomeOutlined />
                                </div>
                                <div className="aside-item-title">返回首页</div>
                            </div>
                        </div>
                        :
                        <div className="aside-item-back">
                            <div className='aside-item-back-home' data-title-right='返回首页' onClick={goBack}>
                                <div className="aside-item-home-icon">
                                    <HomeOutlined />
                                </div>
                            </div>
                        </div>
                }
                {
                    initRouters.map(item=>(
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
                        <div className='aside-item' onClick={goSetting}>
                            <div className="aside-item-icon"><SettingOutlined /></div>
                            <div className="aside-item-title">设置</div>
                        </div>
                        :
                        <div className="aside-bottom-text" data-title-right='设置' onClick={goSetting}>
                            <SettingOutlined className='aside-bottom-text-icon'/>
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
