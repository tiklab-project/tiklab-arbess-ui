import React,{useEffect,useState} from "react";
import {Input} from "antd";
import {PlusOutlined,SearchOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import PipelineTable from "./PipelineTable";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import Tabs from "../../../common/tabs/Tabs";
import "./Pipeline.scss";

/**
 * 流水线页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Pipeline = props =>{

    const {pipelineStore} = props

    const {findUserPipelinePage} = pipelineStore

    const [listType,setListType] = useState(1)

    const [fresh,setFresh] = useState(false)

    const [isLoading,setIsLoading] = useState(true)

    const [pageParam] = useState({
        pageSize:13,
        currentPage: 1,
    })

    const [pipelineParam,setPipelineParam] = useState({
        pageParam
    })

    useEffect(()=>{
        if(listType===1){
            findUserPipelinePage(pipelineParam).then(r=>setIsLoading(false))
        }else {
            findUserPipelinePage({
                ...pipelineParam,
                pipelineFollow:1
            }).then(r=>setIsLoading(false))
        }
    },[fresh,pipelineParam])

    /**
     * 模糊查询流水线
     * @param e：文本框value
     */
    const onChangeSearch = e =>{
        setPipelineParam({
            ...pipelineParam,
            pipelineName:e.target.value,
            pageParam
        })
    }

    /**
     * 换页
     * @param page
     */
    const changPage = page =>{
        setPipelineParam({
            ...pipelineParam,
            pageParam:{
                pageSize:13,
                currentPage: page,
            }
        })
    }

    /**
     * 切换流水线类型
     * @param item
     */
    const clickType = item => {
        setPipelineParam({
            pageParam
        })
        setListType(item.id)
    }

    /**
     * 去添加流水线页面
     */
    const onClick = () =>props.history.push('/index/pipeline/new')

    /**
     * 重新获取流水线，刷新状态
     */
    const changFresh = () =>setFresh(!fresh)

    return(
        <div className="pipeline">
            <div className="pipeline-content mf-home-limited mf">
                <div className="pipeline-top pipeline-flex">
                    <BreadcrumbContent firstItem={"流水线"}/>
                    <Btn onClick={onClick} type={"primary"} title={"新建流水线"} icon={<PlusOutlined/>}/>
                </div>
                <div className="pipeline-type">
                    <Tabs type={listType} tabLis={[
                        {id:1, title:"所有流水线"},
                        {id:2, title:"我收藏的"}
                    ]} onClick={clickType}/>
                    <div className="pipeline-type-input">
                        <Input
                            allowClear
                            placeholder="流水线名称"
                            onChange={onChangeSearch}
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
                    pipelineStore={pipelineStore}
                />
            </div>
        </div>
    )
}

export default withRouter(inject("pipelineStore")(observer(Pipeline)))
