import React from "react";
import {DatePicker,Select,Space} from "antd";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import EmptyText from "../../common/emptyText/EmptyText";
import Page from "../../common/page/Page";
import DynamicList from "../../common/list/DynamicList";

const { RangePicker } = DatePicker

/**
 * 动态详情
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DynamicDetail = props =>{

    const {firstItem,goBack,params,setParams,dynaPage,dynamicList,pipelineList} = props

    /**
     * 改变数据params
     * @param value
     * @param field
     */
    const changParams = (value,field) =>{
        switch (field) {
            case "content":
                setParams({
                    ...params,
                    pageParam:{
                        pageSize:15,
                        currentPage:1
                    },
                    [field] : value==="null"?{}:{pipelineId:[value]}
                })
                break
            default:
                setParams({
                    ...params,
                    pageParam:{
                        pageSize:15,
                        currentPage:1
                    },
                    [field] : value
                })
        }
    }

    /**
     * 切换分页
     * @param pages：页码
     */
    const changPage = pages =>{
        setParams({
            ...params,
            pageParam:{
                pageSize:15,
                currentPage:pages
            }
        })
    }

    return(
        <div className="dyna" style={{height:"100%",overflow:"auto"}}>
            <div className="dyna-content mf-home-limited">
                <Breadcrumb firstItem={firstItem} onClick={goBack}/>
                <div className="dyna-screen" style={{padding:"15px 0"}}>
                    <Space>
                        {
                            pipelineList &&
                            <Select
                                showSearch
                                placeholder={"流水线"}
                                style={{width:150}}
                                onChange={(value)=>changParams(value,"content")}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                notFoundContent={<EmptyText/>}
                            >
                                <Select.Option key={"1"} value={"null"}>流水线</Select.Option>
                                {
                                    pipelineList && pipelineList.map(item=>{
                                        return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                    })
                                }
                            </Select>
                        }
                        {/*<Select*/}
                        {/*    placeholder={"类型"}*/}
                        {/*    style={{width:150}}*/}
                        {/*    onChange={(value)=>changParams(value,"actionType")}*/}
                        {/*>*/}
                        {/*    <Select.Option key={"1"} value={null}>动态</Select.Option>*/}
                        {/*    <Select.Option key={"2"} value={"LOG_PIPELINE"}>流水线动态</Select.Option>*/}
                        {/*    <Select.Option key={"3"} value={"LOG_CONFIG"}>流水线配置动态</Select.Option>*/}
                        {/*    <Select.Option key={"4"} value={"LOG_RUN"}>流水线运行动态</Select.Option>*/}
                        {/*</Select>*/}
                        <Select
                            placeholder={"操作"}
                            style={{width:150}}
                            onChange={(value)=>changParams(value,"module")}
                        >
                            <Select.Option key={"1"} value={null}>所有操作</Select.Option>
                            <Select.Option key={"2"} value={"CREATE"}>创建</Select.Option>
                            <Select.Option key={"3"} value={"UPDATE"}>更新</Select.Option>
                            <Select.Option key={"5"} value={"RUN"}>运行</Select.Option>
                        </Select>
                        <RangePicker
                            onChange={(value,e)=>changParams(e,"createTime")}
                            placeholder={["开始时间","结束时间"]}
                        />
                    </Space>
                </div>
                <DynamicList {...props} dynamicList={dynamicList}/>
                <Page
                    currentPage={params.pageParam.currentPage}
                    changPage={changPage}
                    page={dynaPage}
                />
            </div>
        </div>

    )
}

export default DynamicDetail
