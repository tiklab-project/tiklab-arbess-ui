import React,{useRef,useState} from "react";
import {PostposeMirror} from "../../common/components/mirror";
import Btn from "../../../common/btn/btn";
import "./mirror.scss";

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

    const onOk = () =>{
        const params = {
            values: {scriptOrder: mirrorRefs.current.editor.getValue()},
            pipeline:{pipelineId},
            taskType:item.type,
            configId:item.configId
        }
        updatePostConfig(params)
        setStyleActiveLine(false)
    }

    return   <div className="config-scenario">
                <PostposeMirror
                    item={item}
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

