import React,{useEffect,useState} from "react";
import {Input} from "antd";
import {PlusOutlined,SearchOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import PipelineTable from "../components/pipelineTable";
import PipelineAdd from "../components/pipelineAdd";
import BreadcrumbContent from "../../common/breadcrumb/breadcrumb";
import Btn from "../../common/btn/btn";
import Tabs from "../../common/tabs/tabs";
import "../components/pipeline.scss";

const Pipeline = props =>{

    const {pipelineStore} = props

    const {fresh,findAllPipelineStatus,findAllFollow,findLike,listType,setListType} = pipelineStore

    const [addPipelineVisible,setAddPipelineVisible] = useState(false)

    const onChangeSearch = e =>{
        findLike(e.target.value)
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
        <div className="pipeline">
            <div className="pipeline-content mf-home-limited mf">
                <div className="pipeline-top pipeline-flex">
                    <BreadcrumbContent firstItem={"流水线"}/>
                    <Btn
                        onClick={onClick}
                        type={"primary"}
                        title={"新建流水线"}
                        icon={<PlusOutlined/>}
                    />
                </div>
                <div className="pipeline-type">
                    <Tabs
                        type={listType}
                        tabLis={lis}
                        onClick={clickType}
                    />
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
                    pipelineStore={pipelineStore}
                />
                <PipelineAdd
                    {...props}
                    addPipelineVisible={addPipelineVisible}
                    setAddPipelineVisible={setAddPipelineVisible}
                />
            </div>
        </div>
    )
}

export default withRouter(inject("pipelineStore")(observer(Pipeline)))
