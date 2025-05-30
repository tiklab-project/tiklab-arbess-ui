/**
 * @Description: 资源监控
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React, {useEffect, useState} from "react";
import {message, Row, Col, Radio, Space, Spin} from 'antd';
import {disableFunction,applySubscription} from "tiklab-core-ui";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import resourceStore from "../store/ResourceStore";
import "./Resources.scss";
import EnhanceModal from "../../../common/component/modal/EnhanceModal";

const Resources = props => {

    const {findResourcesList,findAllCathe,updateCathe,findResourcesDetails} = resourceStore

    //加载状态
    const [isLoading,setIsLoading] = useState(true)
    //资源占用概况
    const [resourceList,setResourceList] = useState({});
    //日志、制品保存时长
    const [saveDur,setSaveDur] = useState({});
    //资源详情
    const [resourcesDetails,setResourcesDetails] = useState({});
    //特性弹出框
    const [featureModal,setFeatureModal] = useState(false);

    const disable = disableFunction();

    useEffect(()=>{
        // 获取占用内存
        findResources()
        // 获取保存时长
        findCathe()
        // // 获取磁盘存储详情
        // findDetails("disk")
    },[])

    /**
     * 获取占用内存
     */
    const findResources = () => {
        findResourcesList().then(r=>{
            if(r.code===0){
                setResourceList(r.data)
            }
        }).finally(()=>setIsLoading(false))
    }

    /**
     * 获取保存时长
     */
    const findCathe = () => {
        findAllCathe().then(res=>{
            if(res.code===0){
                setSaveDur(res.data && res.data[0])
            }
        })
    }

    /**
     * 查看磁盘空间详情
     */
    const findDetails = (type) => {
        findResourcesDetails(type).then(r=>{
            if(r.code===0){
                setResourcesDetails({
                    ...r.data,type
                })
            }
        })
    }

    /**
     * 更新保存时长
     * @param e
     * @param type
     */
    const changeCathe = (e,type) => {
        if(disable){
            return setFeatureModal(true)
        }
        updateCathe({
            id:saveDur.id,
            [type]:e.target.value
        }).then(r=>{
            if(r.code===0){
                message.success("保存成功")
                findCathe()
            }
        })
    }

    /**
     * 升级企业版
     */
    const upGradation = () => {
        applySubscription('arbess')
    }

    // 资源监控数据渲染
    const limitation = (number = 0,unit) =>{
        if(resourceList){
            if(number < 0) return "不限"
            return number + unit
        }
        return "--"
    }

    return (
        <Row className='resources'>
            <Col
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: "16", offset: "4" }}
                xl={{ span: "12", offset: "6" }}
            >
                <div className='arbess-home-limited'>
                    <BreadCrumb
                        crumbs={[
                            {title:'资源监控'}
                        ]}
                    />
                    <Spin spinning={isLoading}>
                        <div className='resources-info'>
                            <div className='resources-info-item'>
                                <div className='resources-item-title'>版本类型</div>
                                <div className='resources-item-total'>{resourceList?.version===1?'社区版':'企业版'}</div>
                                {
                                    resourceList?.version===1 &&
                                    <div className='resources-item-allow' onClick={upGradation}>升级企业版</div>
                                }
                            </div>
                            <div className='resources-info-item'>
                                <div className='resources-item-title'>并发数</div>
                                <div className='resources-item-total'>
                                    <span>{limitation(resourceList?.useCcyNumber,'')}</span>
                                    <span className='resources-item-separat'>/</span>
                                    <span >{limitation(resourceList?.ccyNumber,'')}</span>
                                </div>
                            </div>
                            <div className='resources-info-item'>
                                <div className='resources-item-title'>构建时长</div>
                                <div className='resources-item-total'>
                                    <span>{limitation(resourceList?.useSceNumber,'分钟')}</span>
                                    <span className='resources-item-separat'>/</span>
                                    <span >{limitation(resourceList?.sceNumber,'分钟')}</span>
                                </div>
                            </div>
                            <div className='resources-info-item'>
                                <div className='resources-item-title'>磁盘空间</div>
                                <div className='resources-item-total'>
                                    <div>
                                        <span>{limitation(resourceList?.useCacheNumber,'G')}</span>
                                        <span className='resources-item-separat'>/</span>
                                        <span >{limitation(resourceList?.cacheNumber,'G')}</span>
                                    </div>
                                    {/*<div className='resources-cache-detail'>*/}
                                    {/*    <span className='resources-detail-item'>*/}
                                    {/*        源码 - {resourcesDetails?.sourceCache}G*/}
                                    {/*    </span>*/}
                                    {/*    <span className='resources-detail-item'>*/}
                                    {/*        日志 - {resourcesDetails?.artifactCache}G*/}
                                    {/*    </span>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className='resources-info-item'>
                                <EnhanceModal
                                    type={'resources'}
                                    visible={featureModal}
                                    setVisible={setFeatureModal}
                                />
                                <div className='resources-item-title'>日志保存时长</div>
                                <Radio.Group value={saveDur?.logCache} onChange={e => changeCathe(e,'logCache')}>
                                    <Radio value={7}>7天</Radio>
                                    <Radio value={15}>
                                        <Space size='small'>
                                            15天
                                            {/*{disable&&<img src={pipFeature} alt={''} width={16} height={16}/>}*/}
                                        </Space>
                                    </Radio>
                                    <Radio value={30}>
                                        <Space size={'small'}>
                                            30天
                                            {/*{disable&&<img src={pipFeature} alt={''} width={16} height={16}/>}*/}
                                        </Space>
                                    </Radio>
                                </Radio.Group>
                            </div>
                            <div className='resources-info-item'>
                                <div className='resources-item-title'>制品保存时长</div>
                                <Radio.Group value={saveDur?.artifactCache} onChange={e => changeCathe(e,'artifactCache')}>
                                    <Radio value={7}>7天</Radio>
                                    <Radio value={15}>
                                        <Space size='small'>
                                            15天
                                            {/*{disable&&<img src={pipFeature} alt={''} width={16} height={16}/>}*/}
                                        </Space>
                                    </Radio>
                                    <Radio value={30}>
                                        <Space size='small'>
                                            30天
                                            {/*{disable&&<img src={pipFeature} alt={''} width={16} height={16}/>}*/}
                                        </Space>
                                    </Radio>
                                </Radio.Group>
                            </div>
                        </div>
                    </Spin>
                </div>
            </Col>
        </Row>
    )

}

export default Resources
