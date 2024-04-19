import React, {useEffect, useState} from "react";
import {message, Row,Col ,Radio} from 'antd';
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import {SpinLoading} from "../../../common/component/loading/Loading";
import resourceStore from "../store/ResourceStore";
import "./Resources.scss";

/**
 * 资源监控，可用容量
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Resources = props => {

    const {findResourcesList,findAllCathe,updateCathe,findResourcesDetails} = resourceStore

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    // 资源占用概况
    const [resourceList,setResourceList] = useState({});

    // 日志、制品保存时长
    const [saveDur,setSaveDur] = useState({});

    // 资源详情
    const [resourcesDetails,setResourcesDetails] = useState({});

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
            setIsLoading(false)
        })
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
        if(version==='ce'){
            window.open("https://thoughtware.cn/download/matflow/ee")
            return
        }
        const authServiceUrl = JSON.parse(localStorage.getItem("authConfig"))?.authServiceUrl
        if(authServiceUrl){
            window.open(`${authServiceUrl}/#/enterprise/application`)
        }
    }

    // 资源监控数据渲染
    const limitation = (number,unit) =>{
        if(resourceList){
            if(number < 0) return "不限"
            return number + unit
        }
        return "--"
    }

    if(isLoading) return <SpinLoading size="large"/>

    return (
        <Row className='resources'>
            <Col
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: "16", offset: "4" }}
                xl={{ span: "12", offset: "6" }}
            >
                <div className='mf-home-limited mf'>
                    <BreadCrumb firstItem={"资源监控"}/>
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
                            <div className='resources-item-title'>日志保存时长</div>
                            <Radio.Group value={saveDur?.logCache} onChange={e => changeCathe(e,'logCache')}>
                                <Radio value={7}>7天</Radio>
                                <span data-title-bottom={resourceList?.version===1? "该功能为企业版功能" : null}>
                                <Radio
                                    value={15}
                                    disabled={resourceList?.version===1}
                                >15天</Radio>
                            </span>
                                <span data-title-bottom={resourceList?.version===1? "该功能为企业版功能" : null}>
                                <Radio
                                    value={30}
                                    disabled={resourceList?.version===1}
                                >30天</Radio>
                            </span>

                            </Radio.Group>
                        </div>
                        <div className='resources-info-item'>
                            <div className='resources-item-title'>制品保存时长</div>
                            <Radio.Group value={saveDur?.artifactCache} onChange={e => changeCathe(e,'artifactCache')}>
                                <Radio value={7}>7天</Radio>
                                <span data-title-bottom={resourceList?.version===1? "该功能为企业版功能" : null}>
                                <Radio
                                    value={15}
                                    disabled={resourceList?.version===1}
                                >15天</Radio>
                            </span>
                                <span data-title-bottom={resourceList?.version===1? "该功能为企业版功能" : null}>
                                <Radio
                                    value={30}
                                    disabled={resourceList?.version===1}
                                >30天</Radio>
                            </span>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )

}

export default Resources
