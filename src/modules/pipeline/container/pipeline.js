import React,{useEffect,useState} from "react";
import {getUser} from "tiklab-core-ui";
import {Button,Input,message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "../components/pipeline.scss";
import PipelineTable from "../components/pipelineTable";
import PipelineAddModal from "../components/pipelineAddModal";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";


const Pipeline = props =>{

    const {pipelineStore} = props

    const {pipelineList,fresh,findAllPipelineStatus,findAllFollow,createPipeline,findLike,
        listType,setListType
    } = pipelineStore

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
        if(listType===1){
            // 所有流水线
            findAllPipelineStatus(userId)
        }else {
            findAllFollow(userId)
        }
    },[fresh,listType])

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
        setListType(item.id)
    }

    const renderLis = lis => {
        return lis.map(item=>{
            return <div key={item.id}
                        className={`pipeline-type-link ${listType===item.id ? "pipeline-type-active" : ""}`}
                        onClick={()=>onclick(item)}
                    >
                        <span>{item.title}</span>
                    </div>
        })
    }
    return(
        <div className="pipeline home-limited">
            <div className="pipeline-top pipeline-flex">
                <BreadcrumbContent firstItem={"流水线"}/>
                <div className="pipeline-top-r">
                    <Button type="primary" onClick={()=>setAddPipelineVisible(true)}>
                        <PlusOutlined/> 新建流水线
                    </Button>
                </div>
            </div>
            <div className="pipeline-type pipeline-flex">
                <div className="pipeline-type-group ">
                    {renderLis(lis)}
                </div>
                <div className="pipeline-type-input">
                    <Input
                        placeholder="请输入流水线"
                        onChange={onChangeSearch}
                        // onPressEnter={onChangeSearch}
                        style={{ width: 280 }}
                    />
                </div>
            </div>
            
            <PipelineTable
                {...props}
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