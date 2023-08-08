import React,{useEffect,useState} from "react";
import { Progress } from 'antd';
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import {SpinLoading} from "../../../common/loading/Loading";
import resourceStore from "../store/ResourceStore";
import "./Resources.scss";

/**
 * 资源占用，可用容量
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Resources = props => {

    const {findResourcesList,resourceList} = resourceStore

    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 获取资源占用内存
        findResourcesList().then(r=>setIsLoading(false))
    },[])

    if(isLoading) return <SpinLoading size="large"/>

    // 并发数百分比
    const ccyPercent = (resourceList?.useCcyNumber/resourceList?.ccyNumber) * 100

    // 构建时长百分比
    const scePercent = (resourceList?.useSceNumber/resourceList?.sceNumber) * 100

    // 缓存大小百分比
    const cachePercent = (resourceList?.useCacheNumber/resourceList?.cacheNumber) * 100

    const limitation = (number,unit) =>{
        if(number < 0) return "不限"
        return number + unit
    }

    return (
        <div className='resources mf-home-limited mf'>
            <Breadcrumb firstItem={"资源占用"}/>
            <div className="resources-content">
                <div className='resources-info-version'>当前版本：{resourceList?.version===1?'免费版':'付费版'}</div>
                <div>
                    <div className='resources-info-item'>
                        <div className='resources-item-title'>并发数</div>
                        <div className='resources-item-total'>{limitation(resourceList?.ccyNumber,'')}</div>
                        <div className='resources-item-progress'>
                            <Progress percent={ccyPercent > 1 ? ccyPercent : 1} showInfo={false}/>
                        </div>
                        <div className='resources-item-title'>剩余并发数</div>
                        <div className='resources-item-residue'>{limitation(resourceList?.residueCcyNumber,'')} </div>
                    </div>
                    <div className='resources-info-item'>
                        <div className='resources-item-title'>构建时长</div>
                        <div className='resources-item-total'>{limitation(resourceList?.sceNumber,'分钟/月')}</div>
                        <div className='resources-item-progress'>
                            <Progress percent={scePercent > 1 ? scePercent : 1} showInfo={false}/>
                        </div>
                        <div className='resources-item-title'>剩余时长</div>
                        <div className='resources-item-residue'>{limitation(resourceList?.residueSceNumber,'分钟')}</div>
                    </div>
                    <div className='resources-info-item'>
                        <div className='resources-item-title'>磁盘空间</div>
                        <div className='resources-item-total'>{limitation(resourceList?.cacheNumber,'G')}</div>
                        <div className='resources-item-progress'>
                            <Progress percent={cachePercent > 1 ? cachePercent : 1}  showInfo={false}/>
                        </div>
                        <div className='resources-item-title'>剩余空间</div>
                        <div className='resources-item-residue'>{limitation(resourceList?.residueCacheNumber,'G')}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resources
