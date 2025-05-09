/**
 * @Description: 流水线侧边栏
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React, {useState, useEffect} from 'react';
import {
    HomeOutlined,
    SettingOutlined,
    LeftCircleOutlined,
    RightCircleOutlined,
} from "@ant-design/icons";
import {observer} from "mobx-react";
import {disableFunction} from "tiklab-core-ui";
import EnhanceModal from "../modal/EnhanceModal";

const PipelineAside = (props) => {

    const {isExpand,setIsExpand,themeType,initRouters,backUrl,setUrl,ChangeComponent,id} = props;

    const path = props.location.pathname;
    const disable = disableFunction();

    //路由
    const [pipelineRouters,setPipelineRouters] = useState(initRouters);
    //特性弹出框
    const [featureModal,setFeatureModal] = useState(false);
    //特性类型
    const [featureType,setFeatureType] = useState('statistics')

    useEffect(() => {
        setPipelineRouters(initRouters)
    }, [id]);

    /**
     * 跳转
     */
    const onSelect = (item) => {
        const {id,isEnhance} = item;
        if(disable && isEnhance) {
            setFeatureModal(true);
            return;
        }
        props.history.push(id)
    }

    /**
     * 返回
     */
    const goBack = () => {
        props.history.push(backUrl)
    }

    /**
     * 设置
     */
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
                    pipelineRouters.map(item=>(
                        <div key={item.id}
                             className={`aside-item ${path.indexOf(item.id) === 0 ? "aside-select":""}`}
                             onClick={()=>onSelect(item)}
                        >
                            <div className="aside-item-icon">{item.icon}</div>
                            <div className="aside-item-title">{item.title}</div>
                        </div>
                    ))
                }
                <EnhanceModal
                    type={featureType}
                    visible={featureModal}
                    setVisible={setFeatureModal}
                />
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
