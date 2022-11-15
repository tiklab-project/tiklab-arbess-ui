import React,{useEffect,useState} from "react";
import {DatePicker,Select,Space} from "antd";
import BreadcrumbContent from "../../common/breadcrumb/breadcrumb";
import DynaList from "./dynaList";
import Page from "../../common/page/page";
import EmptyText from "../../common/emptyText/emptyText";
import "./dyna.scss";

const { RangePicker } = DatePicker

const DynaDetail = props =>{

    const {firstItem,secondItem,goBack,findlogpage,dynaPage,dynamicList,pipelineList,pipelineId} = props

    const [pageCurrent,setPageCurrent] = useState(1)
    const [timestamp,setTimestamp] = useState(null) // 时间戳
    const [module,setModule] = useState(null)  // 模板类型
    const [actionType,setActionType] = useState(null) // 动作类型
    const [content,setContent] = useState(pipelineId && pipelineId)  // 内容id

    const  params = {
        pageParam:{
            pageSize:15,
            currentPage:pageCurrent
        },
        bgroup:"matflow",
        content:{
            pipelineId:content
        },
        timestamp:timestamp,
        module:module,
        actionType:actionType,
    }

    useEffect(()=>{
        setContent(pipelineId)
    },[])

    const changContent = (value,e,type) =>{
        if(e.key!=="1"){
            switch (type) {
                case "pipeline":
                    setContent([e.key])
                    params.content.pipelineId=[e.key]
                    break
                case "module":
                    setModule(e.key)
                    params.module=e.key
                    break
                case "action":
                    setActionType(e.key)
                    params.actionType=e.key
                    break
                case "timestamp":
                    setTimestamp(e)
                    params.timestamp=e
            }
        }else {
            switch (type) {
                case "pipeline":
                    setContent(pipelineId)
                    params.content.pipelineId=pipelineId
                    break
                case "module":
                    setModule(null)
                    params.module=null
                    break
                case "action":
                    setActionType(null)
                    params.actionType=null
                    break
                case "timestamp":
                    setTimestamp(null)
                    params.timestamp=null
            }
        }
        findDyna(1)
    }

    const changPage = pages =>{
        findDyna(pages && pages)
    }

    const findDyna = page =>{
        setPageCurrent(page)
        params.pageParam.currentPage=page
        findlogpage(params)
    }

    return(
        <div className="dyna">
            <div className="dyna-content home-limited">
                <BreadcrumbContent
                    firstItem={firstItem}
                    secondItem={secondItem && secondItem}
                    goBack={goBack}
                />
                <div className="dyna-screen">
                    <Space>
                        {
                            pipelineList &&
                            <Select
                                showSearch
                                placeholder={"流水线"}
                                style={{width:150}}
                                onChange={(value,e)=>changContent(value,e,"pipeline")}
                            >
                                <Select.Option key={"1"} value={"所有"}>所有流水线</Select.Option>
                                {
                                    pipelineList && pipelineList.map(item=>{
                                        return <Select.Option value={item.pipelineName} key={item.pipelineId}>{item.pipelineName}</Select.Option>
                                    })
                                }
                            </Select>
                        }
                        <Select
                            placeholder={"类型"}
                            style={{width:150}}
                            onChange={(value,e)=>changContent(value,e,"module")}
                        >
                            <Select.Option key={"1"} value={"所有"}>所有动态</Select.Option>
                            <Select.Option key={"pipeline"} value={"pipeline"}>流水线动态</Select.Option>
                            <Select.Option key={"pipelineConfig"} value={"pipelineConfig"}>流水线配置动态</Select.Option>
                            <Select.Option key={"run"} value={"run"}>流水线运行动态</Select.Option>
                        </Select>
                        <Select
                            placeholder={"操作"}
                            style={{width:150}}
                            onChange={(value,e)=>changContent(value,e,"action")}
                        >
                            <Select.Option key={"1"} value={"所有"}>所有操作</Select.Option>
                            <Select.Option key={"create"} value={"创建"}>创建</Select.Option>
                            <Select.Option key={"update"} value={"更新"}>更新</Select.Option>
                            <Select.Option key={"delete"} value={"删除"}>删除</Select.Option>
                        </Select>
                        <RangePicker
                            onChange={(value,e)=>changContent(value,e,"timestamp")}
                            placeholder={["开始时间","结束时间"]}
                        />
                    </Space>
                </div>
                {
                    dynamicList && dynamicList.length>0 ?
                        <>
                            <DynaList
                                {...props}
                                dynamicList={dynamicList}
                                pipelineId={pipelineId}
                            />
                            <Page
                                pageCurrent={pageCurrent}
                                changPage={changPage}
                                page={dynaPage}
                            />
                        </>
                        :
                        <EmptyText
                            title={"没有查询到数据"}
                        />
                }
            </div>
        </div>

    )
}

export default DynaDetail