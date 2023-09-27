import React,{useState,useEffect} from "react";
import {observer,inject} from "mobx-react";
import {TextMirrorEditor} from "../../../../common/component/editor/CodeMirror";
import {SpinLoading} from "../../../../common/component/loading/Loading";
import "./Text.scss";

/**
 * w文本编辑器
 */
const Text = props =>{

    const {pipelineStore,stageStore,taskStore} = props

    const {pipeline:{id,type}} = pipelineStore
    const {finYamlTask} = taskStore
    const {findStageYaml} = stageStore

    const [textEditor,setTextEditor] = useState(null);

    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        if(type===1){
            // 多任务
            finYamlTask(id).then(res=>{
                if(res.code===0){
                    setTextEditor(res.data)
                }
                setLoading(false)
            })
            return
        }
        // 多阶段
        findStageYaml(id).then(res=>{
            if(res.code===0){
                setTextEditor(res.data)
            }
            setLoading(false)
        })
    },[])


    if(loading){
        return <SpinLoading size="large" title="加载中……"/>
    }

    return (
        <div className='text-view'>
            <TextMirrorEditor
                value = {textEditor}
            />
        </div>
    )
}

export default inject("stageStore","taskStore")(observer(Text))