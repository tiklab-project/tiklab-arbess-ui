import React,{useEffect,useState} from "react";
import {Input} from "antd";
import {PlusOutlined,SearchOutlined} from "@ant-design/icons";
import PipelineTable from "./PipelineTable";
import Breadcrumb from "../../../common/component/breadcrumb/Breadcrumb";
import Btn from "../../../common/component/btn/Btn";
import Tabs from "../../../common/component/tabs/Tabs";
import {debounce} from "../../../common/utils/Client";
import pipelineStore from "../store/PipelineStore";
import "./Pipeline.scss";

/**
 * 流水线页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Pipeline = props =>{

    const {findUserPipelinePage} = pipelineStore

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
    })

    // 流水线列表
    const [pipelineListPage,setPipelineListPage] = useState([])

    // 流水线分页
    const [pipPage,setPipPage] = useState({})

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
     * 操作更新流水线状态
     */
    const changFresh = () => {
        setFresh(!fresh)
    }

    /**
     * 去添加流水线页面
     */
    const onClick = () =>props.history.push('/index/pipeline/new')

    return(
        <div className="pipeline">
            <div className="pipeline-content mf-home-limited mf">
                <Breadcrumb firstItem={"流水线"}>
                    <Btn
                        onClick={onClick}
                        type={"primary"}
                        title={"新建流水线"}
                        icon={<PlusOutlined/>}
                    />
                </Breadcrumb>
                <div className="pipeline-flex">
                    <Tabs type={listType} tabLis={[
                        {id:'all', title:"所有流水线"},
                        {id:'follow', title:"我收藏的"}
                    ]} onClick={clickType}/>
                    <div className="pipeline-type-input">
                        <Input
                            allowClear
                            placeholder="流水线名称"
                            autoComplete={"off"}
                            onPressEnter={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <PipelineTable
                    {...props}
                    listType={listType}
                    isLoading={isLoading}
                    changPage={changPage}
                    changFresh={changFresh}
                    pipPage={pipPage}
                    pipelineListPage={pipelineListPage}
                />
            </div>
        </div>
    )
}

export default Pipeline
