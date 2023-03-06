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

    const {fresh,findUserPipeline,findAllFollow,findLike,listType,setListType} = pipelineStore

    useEffect(()=>{
        if(listType===1){
            // 所有流水线
            findUserPipeline()
        }else {
            // 所有收藏的流水线
            findAllFollow()
        }
    },[fresh,listType])

    const lis = [
        {
            id:1,
            title:"所有流水线",
        },
        {
            id:2,
            title:"我收藏的",
        }
    ]

    /**
     * 模糊查询流水线
     * @param e：文本框value
     */
    const onChangeSearch = e =>{
        findLike(e.target.value)
    }

    /**
     * 切换流水线类型
     * @param item
     */
    const clickType = item => {
        setListType(item.id)
    }

    /**
     * 去添加流水线页面
     */
    const onClick = () =>{
        props.history.push('/index/pipeline/new')
    }

    return(
        <div className="pipeline">
            <div className="pipeline-content mf-home-limited mf">
                <div className="pipeline-top pipeline-flex">
                    <BreadcrumbContent firstItem={"流水线"}/>
                    <Btn onClick={onClick} type={"primary"} title={"新建流水线"} icon={<PlusOutlined/>}/>
                </div>
                <div className="pipeline-type">
                    <Tabs type={listType} tabLis={lis} onClick={clickType}/>
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
                <PipelineTable {...props} pipelineStore={pipelineStore}/>
            </div>
        </div>
    )
}

export default withRouter(inject("pipelineStore")(observer(Pipeline)))
