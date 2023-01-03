import React,{useRef,useState} from "react";
import {PostposeMirrorScenario} from "../../../common/components/mirror";
import Btn from "../../../../common/btn/btn";

const MirrorContent = props =>{

    const {item,pipelineId,updatePostConfig} = props

    const mirrorRefs = useRef(null)

    const [styleActiveLine,setStyleActiveLine] = useState(false)

    const onFocus = e => {
        setStyleActiveLine(true)
    }

    const onCancel = () =>{
        setStyleActiveLine(false)
        mirrorRefs.current.editor.setValue(item && item.scriptOrder===null?"":item.scriptOrder)
    }

    const onOk = () => {
        const params = {
            taskType:item.type,
            configId:item.configId,
            taskId:pipelineId,
            values:{
                scriptOrder: mirrorRefs.current.editor.getValue()
            }
        }
        updatePostConfig(params)
        setStyleActiveLine(false)
    }
    
    return   <div className="config-scenario">
        <PostposeMirrorScenario
            value={item.scriptOrder}
            type={item.type}
            mirrorRefs={mirrorRefs}
            styleActiveLine={styleActiveLine}
            onFocus={onFocus}
        />
        {
            styleActiveLine &&
            <div style={{paddingTop:8}}>
                <Btn
                    title={"取消"}
                    isMar={true}
                    onClick={()=>onCancel()}
                />
                <Btn
                    title={"保存"}
                    type={"primary"}
                    onClick={()=>onOk()}
                />
            </div>
        }
    </div>
}

export default MirrorContent

