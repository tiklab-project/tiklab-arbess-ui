import React, {useState,useEffect} from "react";
import {DatePicker,Select,Space,Row,Col} from "antd";
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
    const {findlogpage} = overviewStore

    const pageParam = {
        pageSize:15,
        currentPage:1
    }

    // 获取近期动态请求数据
    const [params,setParams] = useState(
        route.path === '/dyna' ?
            {
                pageParam,
                data:{}
            }
            :
            {
                pageParam,
                data:{pipelineId:[match.params.id]},
            }
    )

    const [dynamicList,setDynamicList] = useState([]);
    const [dynaPage,setDynaPage] = useState([]);

    useEffect(()=>{
        if(route.path==='/dyna'){
            findUserPipeline().then()
        }
    },[])

    useEffect(()=>{
        findlogpage(params).then(res=>{
            if(res.code===0){
                setDynamicList(res.data?.dataList || [])
                setDynaPage({
                    currentPage: res.data.currentPage,
                    totalPage: res.data.totalPage,
                    totalRecord: res.data.totalRecord,
                })
            }
        })
    },[params])

    /**
     * 改变数据params
     * @param value
     * @param field
     */
    const changParams = (value,field) =>{
        switch (field) {
            case "data":
                setParams({
                    ...params,
                    pageParam,
                    [field] : value==="null"?{}:{pipelineId:[value]}
                })
                break
            case "timestamp":
                setParams({
                    ...params,
                    pageParam,
                    [field] : value[0]===''? null:value
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
        if(route.path === '/dyna'){
            props.history.push('/home')
            return
        }
        props.history.push(`/pipeline/${match.params.id}/survey`)
    }

    return(
        <Row className="dyna" style={{height:"100%",width:"100%",overflow:"auto"}}>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="mf-home-limited">
                    <BreadCrumb firstItem={"动态"} onClick={goBack}/>
                    <div className="dyna-screen" style={{padding:"15px 0"}}>
                        <Space>
                            {
                                route.path==='/dyna' &&
                                <Select
                                    showSearch
                                    placeholder={"流水线"}
                                    style={{width:150}}
                                    onChange={(value)=>changParams(value,"data")}
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
                            <Select
                                placeholder={"操作"}
                                style={{width:150}}
                                onChange={(value)=>changParams(value,"actionType")}
                            >
                                <Select.Option key={"1"} value={null}>所有操作</Select.Option>
                                <Select.Option key={"2"} value={"PIP_GREATE"}>创建流水线</Select.Option>
                                <Select.Option key={"3"} value={"PIP_DELETE"}>删除流水线</Select.Option>
                                <Select.Option key={"5"} value={"PIP_UPDATE"}>更新流水线</Select.Option>
                                <Select.Option key={"5"} value={"PIP_RUN"}>运行流水线</Select.Option>
                            </Select>
                            <RangePicker
                                onChange={(value,e)=>changParams(e,"timestamp")}
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
            </Col>
        </Row>
    )
}

export default observer(Dynamic)
