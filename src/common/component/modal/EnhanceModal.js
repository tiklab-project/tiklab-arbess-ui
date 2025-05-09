/**
 * @Description: 增强引导弹出框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/5/06
 */
import React, {useEffect, useState} from "react";
import {CheckCircleTwoTone} from "@ant-design/icons";
import Modals from "./Modal";
import {applySubscription} from 'tiklab-core-ui';
import "./EnhanceModal.scss";
import pipResources from "../../../assets/images/pip-feature-resources.png";
import pipOperate from "../../../assets/images/pip-feature-operate.png";
import pipResult from "../../../assets/images/pip-feature-result.png";
import pipRelease from "../../../assets/images/pip-feature-release.png";
import pipAgent from "../../../assets/images/pip-feature-agent.png";

const EnhanceModal = (props) => {

    const {type = 'resources',visible,setVisible} = props;

    const data = {
        resources: [
            {id: "resources", icon: pipResources, title: "资源监控"},
        ],
        statistics: [
            {id: "operate", icon: pipOperate, title: "运行统计"},
            {id: "result", icon: pipResult, title: "结果统计"},
        ],
        release: [
            {id: "release", icon: pipRelease, title: "发布计划"},
        ],
        configure: [
            {id: 'agent',icon: pipAgent, title: "Agent"}
        ]
    }

    const title = {
        resources: '系统',
        statistics: '统计',
        release: '发布计划',
        configure: '配置',
    }

    const desc = {
        resources: '资源监控',
        statistics: '运行统计，结果统计',
        release: '发布，评审',
        configure: 'Agent自定义',
    }

    const list = data[type];

    const [active, setActive] = useState(list ? list[0] : {});

    useEffect(() => {
        if(visible){
            setActive(list ? list[0] : {})
        }
    }, [visible]);

    return (
        <Modals
            width={800}
            visible={visible}
            className="arbess-enhance-modal"
            onCancel={()=>setVisible(false)}
            closable={false}
            footer={null}
        >
            <div className="enhance-free">
                <div className="enhance-free-introduce">
                    <div className="enhance-title">{title[type]}</div>
                    <div className="enhance-title-desc">付费版本专属功能</div>
                    <div className="enhance-desc">
                        {desc[type]}
                    </div>
                    <div className="enhance-desc-box">
                        {
                            list.map(item => {
                                return (
                                    <div className={`enhance-desc-item ${item.id === active?.id ? 'enhance-desc-active-item' : ''}`}
                                         onClick={() => setActive(item)}
                                         onMouseEnter={() => setActive(item)}
                                         key={item.id}
                                    >
                                        <div><CheckCircleTwoTone /></div>
                                        <div>{item.title}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='enhance-desc-guid' onClick={()=>window.open('https://tiklab.net/contactus')}>
                        咨询购买
                    </div>
                    <div className='enhance-desc-buy' onClick={()=>applySubscription('arbess')}>
                        立即购买
                    </div>
                </div>
                <div className="enhance-free-image">
                    <img src={active?.icon} alt="" width={"100%"} />
                </div>
            </div>
        </Modals>
    )
}

export default EnhanceModal;
