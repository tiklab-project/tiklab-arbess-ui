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
    const {findlogpage,findlogtype} = overviewStore

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

    // 动态列表
    const [dynamicList,setDynamicList] = useState([]);
    // 动态分页
    const [dynaPage,setDynaPage] = useState([]);
    // 动态操作类型
    const [dynamicType,setDynamicType] = useState([]);

    useEffect(()=>{
        if(route.path==='/dyna'){
            // 获取所有流水线
            findUserPipeline().then()
        }
        // 获取动态操作类型
        findlogtype().then(res=>{
            if(res.code===0){
                setDynamicType(res.data)
            }
        })
    },[])

    useEffect(()=>{
        // 获取动态列表
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
                    [field] : value?{pipelineId:[value]}:{}
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
                xs={{ span: "24" }}
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
                                    <Select.Option key={'all'} value={null}>全部</Select.Option>
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
                                <Select.Option key={'all'} value={null}>全部</Select.Option>
                                {
                                    dynamicType && dynamicType.map(item=>{
                                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    })
                                }
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
