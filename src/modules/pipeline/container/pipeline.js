import React, {useEffect, useState} from "react";
import {getUser} from "tiklab-core-ui";
import {Button,Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import "../components/pipeline.scss";
import PipelineTable from "../components/pipelineTable";
import PipelineAddModal from "../components/pipelineAddModal";
import {inject,observer} from "mobx-react";

const { Search } = Input

const Pipeline = props =>{

    const {pipelineStore} = props

    const {pipelineList,fresh,findAllPipelineStatus,findAllFollow,createPipeline,findLike
    } = pipelineStore

    const [type,setType] = useState(1)
    const [addPipelineVisible,setAddPipelineVisible] = useState(false)
    const userId = getUser().userId

    const onChangeSearch = e =>{
        const params = {
            userId: getUser().userId,
            pipelineName:e.target.value,
        }
        findLike(params)
    }

    useEffect(()=>{
        if(type===1){
            // 所有流水线
            findAllPipelineStatus(userId)
        }else {
            findAllFollow(userId)
        }
    },[fresh,type])

    const lis = [
        {
            id:1,
            title:"所有",
        },
        {
            id:2,
            title:"收藏",
        }
    ]

    const onclick = item => {
        setType(item.id)
    }

    return(
        <div className="pipeline home-limited">
            <div className="pipeline-top pipeline-flex">
                <div className="pipeline-top-title">流水线</div>
                <div className="pipeline-top-r">
                    <Button type="primary" onClick={()=>setAddPipelineVisible(true)}>
                        <PlusOutlined/> 新建流水线
                    </Button>
                </div>
            </div>
            <div className="pipeline-type pipeline-flex">
                <div className="pipeline-type-group ">
                    {
                        lis.map(item=>{
                            return <div key={item.id}
                                        className={`pipeline-type-link ${type===item.id ? "pipeline-type-active" : ""}`}
                                        onClick={()=>onclick(item)}
                                    >
                                        <span>{item.title}</span>
                                    </div>
                        })
                    }
                </div>
                <div className="pipeline-type-input">
                    <Search
                        placeholder="请输入流水线"
                        // onChange={onChangeSearch}
                        onSearch={onChangeSearch}
                        style={{ width: 280 }}
                    />
                </div>
            </div>
            <PipelineTable
                {...props}
                type={type}
                pipelineStore={pipelineStore}
            />

            <PipelineAddModal
                {...props}
                userId={userId}
                createPipeline={createPipeline}
                pipelineList={pipelineList}
                addPipelineVisible={addPipelineVisible}
                setAddPipelineVisible={setAddPipelineVisible}
            />
        </div>
    )
}

export default withRouter(inject("pipelineStore")(observer(Pipeline)))