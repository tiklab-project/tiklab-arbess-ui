import React,{useEffect,useState} from "react";
import {DatePicker,Select,Space} from "antd";
import BreadcrumbContent from "../../common/breadcrumb/Breadcrumb";
import DynamicList from "../../common/dynamic/DynamicList";
import Page from "../../common/page/Page";
import EmptyText from "../../common/emptyText/EmptyText";

const { RangePicker } = DatePicker

/**
 * 动态详情
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DynamicDetail = props =>{

    const {firstItem,goBack,findlogpage,dynaPage,dynamicList,pipelineIdList,pipelineList} = props

    const [pageCurrent,setPageCurrent] = useState(1) // 当前页
    const [timestamp,setTimestamp] = useState(null) // 时间戳
    const [module,setModule] = useState(null)  // 模板类型
    const [actionType,setActionType] = useState(null) // 动作类型
    const [pipelineId,setPipelineId] = useState(pipelineIdList && pipelineIdList)  // 内容id

    // 获取动态传的参数
    const params = {
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
        // 初始化流水线id
        setPipelineId(pipelineIdList)
    },[pipelineIdList])

    /**
     * 改变数据params
     * @param value
     * @param field
     */
    const changParams = (value,field) =>{
        switch (field) {
            case "module":
                params[field] = value
                setModule(value)
                break
            case "actionType":
                params[field] = value
                setActionType(value)
                break
            case "pipelineId":
                if(value === null){
                    params.content[field] = pipelineIdList
                    break
                }
                params.content[field] = [value]
                setPipelineId(value)
                break
            case "timestamp":
                if(value.some(item=>item==="")){
                    params[field] = null
                    break
                }
                params[field] = value
                setTimestamp(value)
        }
        findDyna(1)
    }


    /**
     * 切换分页
     * @param pages：页码
     */
    const changPage = pages =>{
        findDyna(pages)
    }

    /**
     * 获取动态
     * @param pages：页码
     */
    const findDyna = pages =>{
        setPageCurrent(pages && pages)
        params.pageParam.currentPage=pages
        findlogpage(params)
    }

    return(
        <div className="dyna" style={{height:"100%",overflow:"auto"}}>
            <div className="dyna-content mf-home-limited">
                <BreadcrumbContent firstItem={firstItem} goBack={goBack}/>
                <div className="dyna-screen" style={{padding:"15px 0"}}>
                    <Space>
                        {
                            pipelineList &&
                            <Select
                                showSearch
                                placeholder={"流水线"}
                                style={{width:150}}
                                onChange={(value)=>changParams(value,"pipelineId")}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                notFoundContent={<EmptyText/>}
                            >
                                <Select.Option key={"1"} value={null}>所有流水线</Select.Option>
                                {
                                    pipelineList && pipelineList.map(item=>{
                                        return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                    })
                                }
                            </Select>
                        }
                        <Select
                            placeholder={"类型"}
                            style={{width:150}}
                            onChange={(value)=>changParams(value,"actionType")}
                        >
                            <Select.Option key={"1"} value={null}>所有动态</Select.Option>
                            <Select.Option key={"2"} value={"LOG_PIPELINE"}>流水线动态</Select.Option>
                            <Select.Option key={"3"} value={"LOG_CONFIG"}>流水线配置动态</Select.Option>
                            <Select.Option key={"4"} value={"LOG_RUN"}>流水线运行动态</Select.Option>
                        </Select>
                        <Select
                            placeholder={"操作"}
                            style={{width:150}}
                            onChange={(value)=>changParams(value,"module")}
                        >
                            <Select.Option key={"1"} value={null}>所有操作</Select.Option>
                            <Select.Option key={"2"} value={"LOG_MD_CREATE"}>创建</Select.Option>
                            <Select.Option key={"3"} value={"LOG_MD_UPDATE"}>更新</Select.Option>
                            <Select.Option key={"4"} value={"LOG_MD_DELETE"}>删除</Select.Option>
                        </Select>
                        <RangePicker
                            onChange={(value,e)=>changParams(e,"timestamp")}
                            placeholder={["开始时间","结束时间"]}
                        />
                    </Space>
                </div>
                {
                    dynamicList && dynamicList.length>0 ?
                        <>
                            <DynamicList{...props} dynamicList={dynamicList}/>
                            <Page pageCurrent={pageCurrent} changPage={changPage} page={dynaPage}/>
                        </>
                        :
                        <EmptyText/>
                }
            </div>
        </div>

    )
}

export default DynamicDetail
