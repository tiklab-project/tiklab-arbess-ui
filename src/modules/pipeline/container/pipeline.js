import React,{useEffect,useState} from "react";
import {Input} from "antd";
import {PlusOutlined,SearchOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "../components/pipeline.scss";
import PipelineTable from "../components/pipelineTable";
import PipelineAdd from "../components/pipelineAdd";
import BreadcrumbContent from "../../common/breadcrumb/breadcrumb";
import Btn from "../../common/btn/btn";
import Tabs from "../../common/tabs/tabs";

const Pipeline = props =>{

    const {pipelineStore} = props

    const {fresh,findAllPipelineStatus,findAllFollow,findLike,listType,setListType} = pipelineStore

    const [addPipelineVisible,setAddPipelineVisible] = useState(false)

    const onChangeSearch = e =>{
        const params = {
            pipelineName:e.target.value,
        }
        findLike(params)
    }

    useEffect(()=>{
        if(listType===1){
            // 所有流水线
            findAllPipelineStatus()
        }else {
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

    const clickType = item => {
        setListType(item.id)
    }

    const onClick = () =>{
        setAddPipelineVisible(true)
    }

    return(
        <div className="pipeline home-limited mf">
            <div className="pipeline-top pipeline-flex">
                <BreadcrumbContent firstItem={"流水线"}/>
                <div className="pipeline-top-r">
                    <Btn
                        onClick={onClick}
                        type={"primary"}
                        title={"新建流水线"}
                        icon={<PlusOutlined/>}
                    />
                </div>
            </div>
            <div className="pipeline-type">
                <div className="pipeline-tabs ">
                    <Tabs
                        type={listType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                </div>
                <div className="pipeline-type-input">
                    <Input
                        placeholder="流水线名称"
                        onChange={onChangeSearch}
                        prefix={<SearchOutlined />}
                        style={{ width: 280 }}
                    />
                </div>
            </div>
            
            <PipelineTable
                {...props}
                pipelineStore={pipelineStore}
            />
            <PipelineAdd
                {...props}
                addPipelineVisible={addPipelineVisible}
                setAddPipelineVisible={setAddPipelineVisible}
            />
        </div>
    )
}

export default withRouter(inject("pipelineStore")(observer(Pipeline)))