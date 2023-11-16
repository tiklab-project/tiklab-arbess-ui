import React, {useState,useEffect} from "react";
import {DatePicker,Select,Space} from "antd";
import {observer} from "mobx-react";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../common/component/list/ListEmpty";
import Page from "../../../common/component/page/Page";
import DynamicList from "../../../common/component/list/DynamicList";
import overviewStore from "../store/OverviewStore";
import pipelineStore from "../../pipeline/store/PipelineStore";

const { RangePicker } = DatePicker

/**
 * 动态详情
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Dynamic = props =>{

    const {match,route} = props

    const {findUserPipeline,pipelineList} = pipelineStore
    const {findlogpage,dynamicList,dynaPage} = overviewStore

    const pageParam = {
        pageSize:15,
        currentPage:1
    }

    // 获取近期动态请求数据
    const [params,setParams] = useState(
        route.path === '/index/dyna' ?
            {
                pageParam,
                content:{}
            }
            :
            {
                pageParam,
                content:{pipelineId:[match.params.id]},
            }
    )

    useEffect(()=>{
        if(route.path==='/index/dyna'){
            findUserPipeline().then()
        }
    },[])

    useEffect(()=>{
        findlogpage(params).then()
    },[params])

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
                    pageParam,
                    [field] : value==="null"?{}:{pipelineId:[value]}
                })
                break
            default:
                setParams({
                    ...params,
                    pageParam,
                    [field] : value
                })
        }
    }

    /**
     * 切换分页
     * @param pages
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

    const goBack = () =>{
        if(route.path === '/index/dyna'){
            props.history.push('/index/home')
            return
        }
        props.history.push(`/index/pipeline/${match.params.id}/survey`)
    }

    return(
        <div className="dyna" style={{height:"100%",width:"100%",overflow:"auto"}}>
            <div className="dyna-content mf-home-limited">
                <BreadCrumb firstItem={"动态"} onClick={goBack}/>
                <div className="dyna-screen" style={{padding:"15px 0"}}>
                    <Space>
                        {
                            route.path==='/index/dyna' &&
                            <Select
                                showSearch
                                placeholder={"流水线"}
                                style={{width:150}}
                                onChange={(value)=>changParams(value,"content")}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                notFoundContent={<ListEmpty/>}
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
                <DynamicList
                    {...props}
                    dynamicList={dynamicList}
                />
                <Page
                    currentPage={params.pageParam.currentPage}
                    changPage={changPage}
                    page={dynaPage}
                />
            </div>
        </div>
    )
}

export default observer(Dynamic)
