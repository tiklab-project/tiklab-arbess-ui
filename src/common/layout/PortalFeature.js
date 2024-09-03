import React,{useState} from 'react'
import {BaseModal,HeaderDropdown} from "thoughtware-licence-ui/es/commons";
import {disableFunction,applySubscription} from "thoughtware-core-ui";
import vipLight from '../../assets/images/vip-light.png';
import vipDark from '../../assets/images/vip-dark.png';
import "./PortalFeature.scss";


const featureList = [
    {
        "id": "23rfsd",
        "productType": {
            "id": "arbess",
            "code": null,
            "typeName": null
        },
        "type": "ee",
        "name": "Arbess-企业版",
        "price": "45",
        "version": "V1.0.2",
        "createTime": "2024-01-31 16:17:04.831",
        "modelList": [
            {
                "id": "ea5a5e1a18e0",
                "comparisonId": "23rfsd",
                "name": "流水线设计模块：支持配置后置处理企业微信消息提醒，邮箱消息提醒。",
                "sort": 1,
                "createTime": "2024-06-06 16:47:04.477",
                "children": []
            },
            {
                "id": "0e2f94669409",
                "comparisonId": "23rfsd",
                "name": "流水线执行模块：支持4条流水线同时运行。",
                "sort": 1,
                "createTime": "2024-06-06 16:47:14.029",
                "children": []
            },
            {
                "id": "e4d241d927a8",
                "comparisonId": "23rfsd",
                "name": "用户模块：支持Ldap用户，企业微信用户，Ldap用户目录，企业微信用户目录",
                "sort": 3,
                "createTime": "2024-06-06 15:38:59.27",
                "children": []
            },
            {
                "id": "91f821b545a5",
                "comparisonId": "23rfsd",
                "name": "登录模块：支持Ldap用户登录，企业微信用户登录",
                "sort": 4,
                "createTime": "2024-06-06 15:38:51.487",
                "children": []
            },
            {
                "id": "b3625378edf9",
                "comparisonId": "23rfsd",
                "name": "消息模块：支持企业微信机器人消息",
                "sort": 5,
                "createTime": "2024-06-06 16:46:05.417",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "49cd5e7b7207",
                "comparisonId": "23rfsd",
                "key": "并行执行",
                "values": "4个",
                "sort": 1,
                "createTime": "2024-05-24 21:32:24.978"
            },
            {
                "id": "9c4efa7588dd",
                "comparisonId": "23rfsd",
                "key": "构建时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:32:48.342"
            },
            {
                "id": "e121778187a0",
                "comparisonId": "23rfsd",
                "key": "制品保存时长",
                "values": "30天",
                "sort": 1,
                "createTime": "2024-05-24 21:33:18.104"
            },
            {
                "id": "a322220f7750",
                "comparisonId": "23rfsd",
                "key": "日志保存时长",
                "values": "30天",
                "sort": 1,
                "createTime": "2024-05-24 21:33:24.677"
            },
            {
                "id": "976809e76c9e",
                "comparisonId": "23rfsd",
                "key": "构建缓存",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:52:01.908"
            }
        ],
        "customerList": [
            {
                "id": "5d7b6fce037b",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:31:46.152"
            },
            {
                "id": "e04416ccf931",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:47:30.283"
            },
            {
                "id": "f598b162b535",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "7*24 小时智能客服",
                "sort": 3,
                "createTime": "2024-05-24 21:31:50.003"
            },
            {
                "id": "7a071a8826c8",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "企业微信专属客服",
                "sort": 3,
                "createTime": "2024-05-24 21:47:05.908"
            },
            {
                "id": "db71d603bf70",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "提供私有化专属技术支持",
                "sort": 5,
                "createTime": "2024-05-24 21:31:39.672"
            }
        ]
    },
    {
        "id": "5943ed320311",
        "productType": {
            "id": "arbess",
            "code": null,
            "typeName": null
        },
        "type": "ce",
        "name": "Arbess-社区版",
        "price": "0",
        "version": "V1.0.1",
        "createTime": "2024-01-31 16:17:04.831",
        "modelList": [
            {
                "id": "a60761d7b46b",
                "comparisonId": "5943ed320311",
                "name": "流水线管理模块",
                "sort": 1,
                "createTime": "2024-05-15 17:24:43.587",
                "children": [
                    {
                        "id": "56e352e45774",
                        "comparisonModelId": "a60761d7b46b",
                        "name": "多模板支持",
                        "sort": 0,
                        "createTime": "2024-05-15 17:29:47.517"
                    },
                    {
                        "id": "2b7378e8f29f",
                        "comparisonModelId": "a60761d7b46b",
                        "name": "定时执行",
                        "sort": 0,
                        "createTime": "2024-05-15 17:31:07.802"
                    },
                    {
                        "id": "231f454b2e34",
                        "comparisonModelId": "a60761d7b46b",
                        "name": "站内信消息通知",
                        "sort": 0,
                        "createTime": "2024-05-15 17:31:32.827"
                    },
                    {
                        "id": "f9d9615ea1d0",
                        "comparisonModelId": "a60761d7b46b",
                        "name": "全局变量支持",
                        "sort": 0,
                        "createTime": "2024-05-15 17:32:34.502"
                    }
                ]
            },
            {
                "id": "0109635eeb65",
                "comparisonId": "5943ed320311",
                "name": "流水线设计模块基础功能",
                "sort": 2,
                "createTime": "2024-05-15 17:27:29.225",
                "children": [
                    {
                        "id": "2454e0ed2931",
                        "comparisonModelId": "0109635eeb65",
                        "name": "多种任务支持",
                        "sort": 0,
                        "createTime": "2024-05-15 17:34:22.267"
                    },
                    {
                        "id": "f5018313b8e8",
                        "comparisonModelId": "0109635eeb65",
                        "name": "多种任务自由组合",
                        "sort": 0,
                        "createTime": "2024-05-15 17:34:44.009"
                    }
                ]
            },
            {
                "id": "fccb13075e48",
                "comparisonId": "5943ed320311",
                "name": "流水线执行模块基础功能",
                "sort": 3,
                "createTime": "2024-06-06 17:35:59.952",
                "children": []
            },
            {
                "id": "41802f09163a",
                "comparisonId": "5943ed320311",
                "name": "用户模块基础功能",
                "sort": 4,
                "createTime": "2024-06-06 16:36:13.017",
                "children": []
            },
            {
                "id": "1d9203cd1e37",
                "comparisonId": "5943ed320311",
                "name": "权限模块",
                "sort": 5,
                "createTime": "2024-06-06 16:36:23.681",
                "children": []
            },
            {
                "id": "32ea572b28b2",
                "comparisonId": "5943ed320311",
                "name": "登录模块基础功能",
                "sort": 6,
                "createTime": "2024-06-06 16:36:35.371",
                "children": []
            },
            {
                "id": "c3f79274c236",
                "comparisonId": "5943ed320311",
                "name": "消息模块基础功能",
                "sort": 7,
                "createTime": "2024-06-06 16:36:59.928",
                "children": []
            },
            {
                "id": "8d25f5d92ee8",
                "comparisonId": "5943ed320311",
                "name": "安全模块",
                "sort": 8,
                "createTime": "2024-05-15 19:27:43.813",
                "children": [
                    {
                        "id": "5c631c49fdfa",
                        "comparisonModelId": "8d25f5d92ee8",
                        "name": "系统数据备份与恢复",
                        "sort": 0,
                        "createTime": "2024-05-15 19:27:58.353"
                    }
                ]
            }
        ],
        "resourcesList": [
            {
                "id": "5d4d530a6ae2",
                "comparisonId": "5943ed320311",
                "key": " 构建时长",
                "values": "2000分钟",
                "sort": 1,
                "createTime": "2024-05-24 21:45:21.745"
            },
            {
                "id": "bb746d01ccfc",
                "comparisonId": "5943ed320311",
                "key": "制品保存时长",
                "values": "7天",
                "sort": 1,
                "createTime": "2024-05-24 21:45:33.286"
            },
            {
                "id": "e75bb359be2f",
                "comparisonId": "5943ed320311",
                "key": "日志保存时长",
                "values": "7天",
                "sort": 1,
                "createTime": "2024-05-24 21:45:41.554"
            },
            {
                "id": "6d73de77d422",
                "comparisonId": "5943ed320311",
                "key": "构建缓存",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:51:27.701"
            }
        ],
        "customerList": [
            {
                "id": "ae46ddaea9b5",
                "comparisonId": "5943ed320311",
                "key": null,
                "values": "应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:46:21.094"
            },
            {
                "id": "d8a0e3c3f297",
                "comparisonId": "5943ed320311",
                "key": null,
                "values": " 在线工单支持",
                "sort": 2,
                "createTime": "2024-05-24 21:45:48.686"
            }
        ]
    },
    {
        "id": "2a4627413bef",
        "productType": {
            "id": "arbess",
            "code": null,
            "typeName": null
        },
        "type": "cloud-free",
        "name": "Arbess-线上免费版",
        "price": "0",
        "version": null,
        "createTime": "2024-03-26 10:56:04.821",
        "modelList": [
            {
                "id": "4de5ac3e4f82",
                "comparisonId": "2a4627413bef",
                "name": "流水线管理模块",
                "sort": 1,
                "createTime": "2024-06-06 17:37:53.805",
                "children": []
            },
            {
                "id": "b0ee2641065b",
                "comparisonId": "2a4627413bef",
                "name": "流水线设计模块基础功能",
                "sort": 1,
                "createTime": "2024-06-06 17:38:05.709",
                "children": []
            },
            {
                "id": "d4dec01bf8ba",
                "comparisonId": "2a4627413bef",
                "name": "流水线执行模块基础功能",
                "sort": 1,
                "createTime": "2024-06-06 17:38:31.542",
                "children": []
            },
            {
                "id": "cdfcb08ac4af",
                "comparisonId": "2a4627413bef",
                "name": "权限模块",
                "sort": 5,
                "createTime": "2024-06-06 17:37:19.538",
                "children": []
            },
            {
                "id": "96b65325e830",
                "comparisonId": "2a4627413bef",
                "name": "消息模块基础功能",
                "sort": 5,
                "createTime": "2024-06-06 17:37:42.532",
                "children": []
            },
            {
                "id": "f63219245a7e",
                "comparisonId": "2a4627413bef",
                "name": "安全模块",
                "sort": 6,
                "createTime": "2024-06-06 17:38:39.197",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "2f725fe9b265",
                "comparisonId": "2a4627413bef",
                "key": "构建时长",
                "values": "2000分钟",
                "sort": 1,
                "createTime": "2024-05-24 21:34:08.378"
            },
            {
                "id": "b5ae2d84cb45",
                "comparisonId": "2a4627413bef",
                "key": "制品保存时长",
                "values": "7天",
                "sort": 1,
                "createTime": "2024-05-24 21:34:17.53"
            },
            {
                "id": "c91a51a51c08",
                "comparisonId": "2a4627413bef",
                "key": "日志保存时长",
                "values": "7天",
                "sort": 1,
                "createTime": "2024-05-24 21:34:22.647"
            },
            {
                "id": "71dcb56cf7c5",
                "comparisonId": "2a4627413bef",
                "key": "构建缓存",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:52:32.924"
            }
        ],
        "customerList": [
            {
                "id": "c407a30afea7",
                "comparisonId": "2a4627413bef",
                "key": null,
                "values": " 应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:47:58.861"
            },
            {
                "id": "b387e7441531",
                "comparisonId": "2a4627413bef",
                "key": null,
                "values": "在线工单支持",
                "sort": 2,
                "createTime": "2024-05-24 21:34:26.146"
            }
        ]
    },
    {
        "id": "a6305e348d38",
        "productType": {
            "id": "arbess",
            "code": null,
            "typeName": null
        },
        "type": "cloud-pay",
        "name": "Arbess-线上付费版",
        "price": "15",
        "version": null,
        "createTime": "2024-03-26 10:56:24.921",
        "modelList": [
            {
                "id": "de43fa452d82",
                "comparisonId": "a6305e348d38",
                "name": "流水线设计模块：支持配置后置处理企业微信消息提醒，邮箱消息提醒，短信消息提醒。",
                "sort": 0,
                "createTime": "2024-05-14 19:58:16.736",
                "children": [
                    {
                        "id": "860fe2c062c5",
                        "comparisonModelId": "de43fa452d82",
                        "name": "运行时长不限制",
                        "sort": 0,
                        "createTime": "2024-05-14 19:59:30.315"
                    },
                    {
                        "id": "d7738e061e30",
                        "comparisonModelId": "de43fa452d82",
                        "name": "制品保存30天",
                        "sort": 0,
                        "createTime": "2024-05-14 19:59:38.07"
                    },
                    {
                        "id": "756af0ef272b",
                        "comparisonModelId": "de43fa452d82",
                        "name": "日志保存30天",
                        "sort": 0,
                        "createTime": "2024-05-15 19:40:36.675"
                    }
                ]
            },
            {
                "id": "4e27b3506f47",
                "comparisonId": "a6305e348d38",
                "name": "流水线执行模块：支持4条流水线同时运行。",
                "sort": 1,
                "createTime": "2024-06-06 16:51:08.196",
                "children": []
            },
            {
                "id": "6655ac494b72",
                "comparisonId": "a6305e348d38",
                "name": "用户模块：支持Ldap用户，企业微信用户，Ldap用户目录，企业微信用户目录",
                "sort": 1,
                "createTime": "2024-06-06 16:51:54.117",
                "children": []
            },
            {
                "id": "f4dd7fc78e88",
                "comparisonId": "a6305e348d38",
                "name": "登录模块：支持Ldap用户登录，企业微信用户登录",
                "sort": 1,
                "createTime": "2024-06-06 16:52:18.772",
                "children": []
            },
            {
                "id": "4ee151bc7ebe",
                "comparisonId": "a6305e348d38",
                "name": "消息模块：支持企业微信机器人消息",
                "sort": 1,
                "createTime": "2024-06-06 17:39:43.603",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "e8446c127003",
                "comparisonId": "a6305e348d38",
                "key": "构建时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:49:26.74"
            },
            {
                "id": "bbe9648ef65c",
                "comparisonId": "a6305e348d38",
                "key": "制品保存时长",
                "values": "30天",
                "sort": 4,
                "createTime": "2024-05-24 21:49:41.163"
            },
            {
                "id": "cfb597945711",
                "comparisonId": "a6305e348d38",
                "key": "日志保存时长",
                "values": "30天",
                "sort": 4,
                "createTime": "2024-05-24 21:49:47.43"
            },
            {
                "id": "062b933e7943",
                "comparisonId": "a6305e348d38",
                "key": "构建缓存",
                "values": "不限制",
                "sort": 5,
                "createTime": "2024-05-24 21:49:59.719"
            }
        ],
        "customerList": [
            {
                "id": "1ffa06d84300",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": "在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:50:16.754"
            },
            {
                "id": "99fe659d3771",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": " 应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:50:22.987"
            },
            {
                "id": "5e6c868c6a1a",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": "7*24 小时智能客服",
                "sort": 1,
                "createTime": "2024-05-24 21:50:29.408"
            },
            {
                "id": "adca0c1863d5",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": "企业微信专属客服",
                "sort": 1,
                "createTime": "2024-05-24 21:50:35.928"
            },
            {
                "id": "11114078b610",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": "提供私有化专属技术支持",
                "sort": 1,
                "createTime": "2024-06-06 15:43:36.466"
            }
        ]
    }
]

/**
 * 应用管理产品特性
 * @param props
 * @constructor
 */
const PortalFeature = props =>{

    const isVip = disableFunction();

    const [visible,setVisible] = useState(false);

    const onOk = () =>{
        applySubscription('arbess')
        onCancel()
    }

    const onCancel = () =>{
        setVisible(false)
    }

    const featureHtml = type => {
        let item = featureList.find(li => li.type === type);
        return (
            <div className='feature-item'>
                <div className='feature-item-header'>
                    <div className='header-title'>
                        {type==='ce' && '社区版'}
                        {type==='ee' && '企业版'}
                        {type==='cloud-free' && '免费版' }
                        {type==='cloud-pay' && '专业版' }
                    </div>
                    <div className='header-desc'>
                        {type==='ce' && '适用于个人和小型团队快速部署和使用。'}
                        {type==='ee' && '适用于大型组织和企业的复杂需求。'}
                        {type==='cloud-free' && '适用于个人和小型团队快速部署和使用。' }
                        {type==='cloud-pay' && '适用于大型组织和企业的复杂需求。' }
                    </div>
                </div>
                <div className='feature-item-body'>
                    <div className='feature-item-body-model'>
                        <div className='feature-item-body-title'>
                            <span>功能</span>
                            {
                                type==='cloud-pay' &&
                                <span className='feature-item-body-title-ex'>
                                    包含免费版所有功能
                                </span>
                            }
                        </div>
                        <div>
                            {
                                item?.modelList?.map(model=>(
                                    <div key={model.id} className='feature-model-item'>
                                        <div className='feature-item-body-icon'></div>
                                        <div className='feature-model-item-name'>{model.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-resources'>
                        <div className='feature-item-body-title'>资源</div>
                        <div>
                            {
                                item?.resourcesList?.map(resources=>{
                                    return (
                                        <div key={resources.id} className='feature-resources-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-resources-item-key'>{resources?.key}：</div>
                                            <div className='feature-resources-item-values'>{resources?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-customer'>
                        <div className='feature-item-body-title'>服务</div>
                        <div>
                            {
                                item?.customerList?.map(customer=>{
                                    return (
                                        <div key={customer.id} className='feature-customer-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-customer-item-value'>{customer?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    return (
        <HeaderDropdown
            visible={visible}
            setVisible={setVisible}
            type={'applink'}
            tooltip={isVip ? (version==='cloud' ? '免费版' :'社区版') :  (version==='cloud' ? '专业版' :'企业版')}
            Icon={<img src={isVip ? vipDark : vipLight} alt={"vip"} width={24} height={24}/>}
        >
            <BaseModal
                width={700}
                title={"版本功能"}
                okText={isVip?'订阅':'续订'}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <div className='application-feature-modal'>
                    {featureHtml(version==='cloud'?'cloud-free':'ce')}
                    {featureHtml(version==='cloud'?'cloud-pay':'ee')}
                </div>
            </BaseModal>
        </HeaderDropdown>
    )
}

export default PortalFeature
