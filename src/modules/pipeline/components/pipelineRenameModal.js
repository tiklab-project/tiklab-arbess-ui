import React,{useEffect} from "react";
import {Form,Modal} from "antd";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import ProjectRename from "../../project/reDel/projectRename";

const PipelineRenameModal = props =>{

    const {renameVisible,setRenameVisible,pipelineList,updatePipeline,userId,pipeline,fresh,setFresh} = props
    const [form] = Form.useForm()

    useEffect(()=>{
        if(renameVisible){
            form.setFieldsValue({...pipeline})
        }
    },[renameVisible])

    const re = value =>{
        const params={
            user:{id:userId},
            pipelineId:pipeline && pipeline.pipelineId,
            pipelineName:value.pipelineName
        }
        updatePipeline(params).then(res=>{
            if(res.code === 0){
                setFresh(!fresh)
            }
        }).catch(error=>{
            console.log(error)
        })
        setRenameVisible(false)
    }

    const style={
        "textAlign":"right"
    }

    return(
        <Modal
            visible={renameVisible}
            closable={false}
            onCancel={()=>setRenameVisible(false)}
            footer = {null}
            okText="确认"
            cancelText="取消"
        >
            <ModalTitle
                setVisible={setRenameVisible}
                title={"修改流水线名称"}
            />

            <ProjectRename
                style={style}
                setVisible={setRenameVisible}
                pipelineList={pipelineList}
                form={form}
                re={re}
            />
        </Modal>
    )
}

export default PipelineRenameModal