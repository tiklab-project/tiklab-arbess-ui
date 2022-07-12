import React from "react"
import {Button,Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";

const { Search } = Input;

const PipelineSearch= props=>{

    const {pipelineStore}=props
    const {findOneName}=pipelineStore

    const onSearch = value =>{
        props.history.push(`/index/searchresult/${value}`)
    }

    return(
        <div className="pipeline-top">
            <div className="pipeline-top-r">
                <Search placeholder="请输入流水线"  onSearch={onSearch} style={{ width: 240,marginRight:10 }} />
                <Button type="primary" onClick={()=>props.history.push("/index/new")}>
                    <PlusOutlined/> 新建流水线
                </Button>
            </div>
        </div>
    )
}

export default withRouter(inject("pipelineStore")(observer(PipelineSearch)))