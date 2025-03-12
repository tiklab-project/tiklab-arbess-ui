/**
 * @Description: 流水线运行日志
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect,useRef} from "react";
import {Skeleton} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import HistoryDetailTree from "./HistoryDetailTree";
import {runStatusText,getTime} from "./HistoryCommon";
import "./HistoryDetail.scss";

const HistoryDetail = props =>{

    const {execData,historyItem,back,logData} = props

    const scrollRef = useRef(null);

    //获取当前流水线信息
    const pipeline = historyItem && historyItem.pipeline;
    //日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true);
    //日志id
    const [id,setId] = useState(null);

    useEffect(() => {
        if(logData){
            changeAnchor(logData,true)
        }
    }, [logData]);

    /**
     * 返回列表
     */
    const goBack = () => {
        init()
        back()
    }

    /**
     * 初始
     */
    const init = ()=>{
        setId(null)
        setIsActiveSlide(true)
    }

    /**
     * 锚点跳转
     */
    const changeAnchor = (anchorId,slide) =>{
        setId(anchorId)
        setIsActiveSlide(slide)
        const anchorElement = document.getElementById(anchorId)
        if (anchorElement) {
            scrollRef.current.scrollTop = anchorElement.offsetTop - 130
        }
    }

    let startScrollTop  = 0;

    /**
     * 鼠标滚轮滑动事件
     */
    const onWheel = () => {
        if(!isActiveSlide) return
        setIsActiveSlide(false)
    }

    /**
     * 鼠标左键事件获取内容区域初始滚动位置
     * @param e
     */
    const handleMouseDown = e =>{
        if(e.button===0){
            if(!isActiveSlide) return
            startScrollTop =  scrollRef.current.scrollTop;
        }
    }

    /**
     * 结束滚动位置
     * @param e
     */
    const handleMouseUp = e => {
        if(e.button===0){
            if(!isActiveSlide) return
            const endScrollTop = scrollRef.current.scrollTop;
            if(startScrollTop !== endScrollTop) {
                setIsActiveSlide(false)
            }
        }
    }

    // 控制台日志
    const renderLog = () =>{
        if(scrollRef.current && isActiveSlide){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
        return (
            <div className="bottom-log">
                {
                    execData && execData.map(group=>{
                        const {stageInstanceList} = group
                        return <div key={group.id} id={group.id} className='bottom-log-item'>
                            {
                                stageInstanceList && stageInstanceList.map(list=>{
                                    const {taskInstanceList} = list
                                    return <div key={list.id} id={list.id}>
                                        {
                                            taskInstanceList && taskInstanceList.map(item=>{
                                                return <div key={item.id} id={item.id}>{item.runLog}</div>
                                            })
                                        }
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        )
    }

    // 获取时间
    const setTime = execData && execData.reduce((pre, cur) => {
        return pre + cur.stageTime;
    }, 0);

    //运行方式
    const runWay = () =>{
        switch (historyItem?.runWay) {
            case 1:
                return historyItem?.user?.nickname + " · 手动触发"
            case 2:
                return "定时触发";
            case 3:
                return historyItem?.user?.nickname + " · 回滚触发"
        }
    }

    return(
        <div className="str-detail">
            <Skeleton loading={false} active>
                <div className="str-detail-bread">
                    <BreadCrumb firstItem={pipeline?.name +" # " + historyItem?.findNumber}>
                        <CloseOutlined style={{fontSize:16}} onClick={goBack}/>
                    </BreadCrumb>
                    <div className="bread-center">
                        <div className="bread-center-item">
                            <span className='bread-center-name'>开始时间</span>
                            <span className='bread-center-desc'>{historyItem?.createTime }</span>
                        </div>
                        <div className="bread-center-item">
                            <span className='bread-center-name'>运行方式</span>
                            <span className='bread-center-desc'>{runWay()}</span>
                        </div>
                        <div className="bread-center-item">
                            <span className='bread-center-name'>运行状态</span>
                            <span className={`bread-center-desc bread-center-${historyItem?.runStatus}`}>{runStatusText(historyItem?.runStatus)}</span>
                        </div>
                        <div className="bread-center-item">
                            <span className='bread-center-name'>运行时长</span>
                            <span className='bread-center-desc'>{getTime(setTime)}</span>
                        </div>
                    </div>
                </div>
                <div className="str-detail-bottom">
                    <HistoryDetailTree
                        id={id}
                        logData={logData}
                        execData={execData}
                        changeAnchor={changeAnchor}
                    />
                    <div className="str-detail-log"
                         ref={scrollRef}
                         onWheel={onWheel}
                         onMouseDown={handleMouseDown}
                         onMouseUp={handleMouseUp}
                    >
                        { renderLog() }
                    </div>
                </div>
            </Skeleton>
        </div>
    )
}

export default HistoryDetail
