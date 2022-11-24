import React,{useEffect,useState} from "react";
import {DatePicker,Select,Space} from "antd";
import BreadcrumbContent from "../../common/breadcrumb/breadcrumb";
import DynaList from "./dynaList";
import Page from "../../common/page/page";
import EmptyText from "../../common/emptyText/emptyText";
import "./dyna.scss";

const { RangePicker } = DatePicker

const DynaDetail = props =>{

    const {firstItem,secondItem,goBack,findlogpage,dynaPage,dynamicList,pipelineIdList,pipelineList} = props

    const [pageCurrent,setPageCurrent] = useState(1)
    const [timestamp,setTimestamp] = useState(null) // 时间戳
    const [module,setModule] = useState(null)  // 模板类型
    const [actionType,setActionType] = useState(null) // 动作类型
    const [pipelineId,setPipelineId] = useState(pipelineIdList && pipelineIdList)  // 内容id

    const  params = {
        pageParam:{
            pageSize:15,
            currentPage:pageCurrent
        },
        bgroup:"matflow",
        content:{
            pipelineId:pipelineId
        },
        timestamp:timestamp,
        module:module,
        actionType:actionType,
    }

    useEffect(()=>{
        setPipelineId(pipelineIdList)
    },[pipelineIdList])

    const changContent = (value,field) =>{
        switch (field) {
            case "timestamp":
                if(value.some(item=>item==="")){
                    params[field] = null
                    break
                }
                setTimestamp(value)
                params[field] = value
                break
            case "module":
                setModule(value)
                params[field] = value
                break
            case "actionType":
                setActionType(value)
                params[field] = value
                break
            case "pipelineId":
                if(value === null){
                    params.content[field] = pipelineIdList
                    break
                }
                params.content[field] = [value]
                setPipelineId(value)
        }
        findDyna(1)
    }


    const changPage = pages =>{
        findDyna(pages && pages)
    }

    const findDyna = (page) =>{
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
                                onChange={(value)=>changContent(value,"pipelineId")}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                notFoundContent={<EmptyText/>}
                            >
                                <Select.Option key={"1"} value={null}>所有流水线</Select.Option>
                                {
                                    pipelineList && pipelineList.map(item=>{
                                        return <Select.Option value={item.pipelineId} key={item.pipelineId}>{item.pipelineName}</Select.Option>
                                    })
                                }
                            </Select>
                        }
                        <Select
                            placeholder={"类型"}
                            style={{width:150}}
                            onChange={(value)=>changContent(value,"actionType")}
                        >
                            <Select.Option key={"1"} value={null}>所有动态</Select.Option>
                            <Select.Option key={"2"} value={"LOG_PIPELINE"}>流水线动态</Select.Option>
                            <Select.Option key={"3"} value={"LOG_PIPELINE_CONFIG"}>流水线配置动态</Select.Option>
                            <Select.Option key={"4"} value={"LOG_PIPELINE_RUN"}>流水线运行动态</Select.Option>
                        </Select>
                        <Select
                            placeholder={"操作"}
                            style={{width:150}}
                            onChange={(value)=>changContent(value,"module")}
                        >
                            <Select.Option key={"1"} value={null}>所有操作</Select.Option>
                            <Select.Option key={"2"} value={"LOG_MD_PIPELINE_CREATE"}>创建</Select.Option>
                            <Select.Option key={"3"} value={"LOG_MD_PIPELINE_UPDATE"}>更新</Select.Option>
                            <Select.Option key={"4"} value={"LOG_MD_PIPELINE_DELETE"}>删除</Select.Option>
                        </Select>
                        <RangePicker
                            onChange={(value,e)=>changContent(e,"timestamp")}
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