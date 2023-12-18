import React,{useEffect,useState} from "react";
import {Input,Select,Space,Row,Col} from "antd";
import {CaretDownOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import PipelineTable from "./PipelineTable";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import Btn from "../../../common/component/btn/Btn";
import Tabs from "../../../common/component/tabs/Tabs";
import {debounce} from "../../../common/utils/Client";
import pipelineStore from "../store/PipelineStore";
import envStore from "../../../setting/configure/env/store/EnvStore";
import groupingStore from "../../../setting/configure/grouping/store/GroupingStore";
import "./Pipeline.scss";

/**
 * 流水线页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Pipeline = props =>{

    const {findUserPipelinePage} = pipelineStore;
    const {findEnvList} = envStore;
    const {findGroupList} = groupingStore;

    // 流水线分类
    const [listType,setListType] = useState('all')

    // 刷新状态
    const [fresh,setFresh] = useState(false)

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    const [pageParam] = useState({
        pageSize:15,
        currentPage: 1,
    })

    // 请求数据
    const [pipelineParam,setPipelineParam] = useState({
        pageParam
    });

    // 流水线列表
    const [pipelineListPage,setPipelineListPage] = useState([]);

    // 流水线分页
    const [pipPage,setPipPage] = useState({});

    // 环境管理列表
    const [envList,setEnvList] = useState([]);

    // 分组管理列表
    const [groupList,setGroupList] = useState([]);

    useEffect(()=>{
        // 获取环境和分组管理
        getEnvOrGroup()
    },[])

    /**
     * 获取环境和分组管理
     */
    const getEnvOrGroup = () => {
        findEnvList().then(res=>{
            if(res.code===0){
                setEnvList(res.data || [])
            }
        })
        findGroupList().then(res=>{
            if(res.code===0){
                setGroupList(res.data || [])
            }
        })
    }

    useEffect(()=>{
        // 初始化获取流水线
        findPipeline()
    },[pipelineParam,fresh])

    /**
     * 获取流水线
     */
    const findPipeline = () =>{
        let param = pipelineParam
        if(listType==='follow'){
            param = {
                ...pipelineParam,
                pipelineFollow:1
            }
        }
        findUserPipelinePage(param).then(res=>{
            setIsLoading(false)
            if(res.code===0){
                setPipelineListPage(res.data.dataList || [])
                setPipPage({
                    currentPage: res.data.currentPage,
                    totalPage: res.data.totalPage,
                    totalRecord: res.data.totalRecord,
                })
            }
        })
    }

    /**
     * 模糊查询流水线
     * @param e：文本框value
     */
    const onChangeSearch = debounce((e) => {
        setIsLoading(true)
        setPipelineParam({
            ...pipelineParam,
            pipelineName:e.target.value,
            pageParam
        })
    }, 500);

    /**
     * 换页
     * @param page
     */
    const changPage = page =>{
        setIsLoading(true)
        setPipelineParam({
            ...pipelineParam,
            pageParam:{
                pageSize:15,
                currentPage: page,
            }
        })
    }

    /**
     * 切换流水线类型
     * @param item
     */
    const clickType = item => {
        setIsLoading(true)
        setPipelineParam({
            pageParam
        })
        setListType(item.id)
    }

    /**
     * 筛选
     * @param value
     * @param type
     */
    const screen = (value,type) => {
        if(value==='all'){
            delete pipelineParam[type]
            setPipelineParam({
                ...pipelineParam,
            })
        }else {
            setPipelineParam({
                ...pipelineParam,
                [type]:value,
                pageParam
            })
        }
    }

    /**
     * 操作更新流水线状态
     */
    const changFresh = () => {
        setFresh(!fresh)
    }

    /**
     * 去添加流水线页面
     */
    const onClick = () =>props.history.push('/pipeline/new')

    return(
        <Row className="pipeline">
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="mf-home-limited mf">
                    <BreadCrumb firstItem={"流水线"}>
                        <Btn
                            onClick={onClick}
                            type={"primary"}
                            title={"新建流水线"}
                            icon={<PlusOutlined/>}
                        />
                    </BreadCrumb>
                    <div className="pipeline-flex">
                        <Tabs type={listType} tabLis={[
                            {id:'all', title:"所有流水线"},
                            {id:'follow', title:"我收藏的"}
                        ]} onClick={clickType}/>
                        <Space>
                            <Select
                                showSearch
                                style={{width:120}}
                                placeholder={"分组管理"}
                                suffixIcon={<CaretDownOutlined />}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={value=>screen(value,"groupId")}
                            >
                                <Select.Option value={'all'} key={'all'}>全部</Select.Option>
                                {
                                    groupList && groupList.map(item=>(
                                        <Select.Option value={item.id} key={item.id}>{item.groupName}</Select.Option>
                                    ))
                                }
                            </Select>
                            <Select
                                showSearch
                                style={{width:120}}
                                placeholder={"环境管理"}
                                suffixIcon={<CaretDownOutlined />}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={value=>screen(value,"envId")}
                            >
                                <Select.Option value={'all'} key={'all'}>全部</Select.Option>
                                {
                                    envList && envList.map(item=>(
                                        <Select.Option value={item.id} key={item.id}>{item.envName}</Select.Option>
                                    ))
                                }
                            </Select>
                            <Input
                                allowClear
                                placeholder="流水线名称"
                                autoComplete={"off"}
                                onPressEnter={onChangeSearch}
                                prefix={<SearchOutlined />}
                                style={{ width: 150 }}
                            />
                        </Space>
                    </div>
                    <PipelineTable
                        {...props}
                        listType={listType}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        changPage={changPage}
                        changFresh={changFresh}
                        pipPage={pipPage}
                        pipelineListPage={pipelineListPage}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default Pipeline
