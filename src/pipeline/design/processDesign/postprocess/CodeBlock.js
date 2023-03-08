import React,{useRef,useState} from "react";
import {PostprocessMirrorScenario} from "../../../../common/editor/CodeMirror";
import Btn from "../../../../common/btn/Btn";

/**
 * 后置处理代码块
 * shell && bat执行命令
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MirrorContent = props =>{

    const {item,updatePost} = props

    const mirrorRefs = useRef(null)
    const [styleActiveLine,setStyleActiveLine] = useState(false)

    /**
     * 取消编辑
     */
    const onCancel = () =>{
        setStyleActiveLine(false)
        const values = item.values
        if(values){
            mirrorRefs.current.editor.setValue(values && values.scriptOrder===null?"":values.scriptOrder)
        }
    }

    /**
     * 确定更改
     */
    const onOk = () => {
        const params = {
            taskType:item.taskType,
            taskId:item.taskId,
            values:{
                scriptOrder: mirrorRefs.current.editor.getValue()
            }
        }
        updatePost(params)
        setStyleActiveLine(false)
    }

    return   <div className="config-scenario">
        <PostprocessMirrorScenario
            value={item.task.values.scriptOrder}
            type={item.taskType}
            mirrorRefs={mirrorRefs}
            styleActiveLine={styleActiveLine}
            onFocus={()=>setStyleActiveLine(true)}
        />
        {
            styleActiveLine &&
            <div style={{paddingTop:8,textAlign:"right"}}>
                <Btn title={"取消"} isMar={true} onClick={onCancel}/>
                <Btn title={"保存"} type={"primary"} onClick={onOk}/>
            </div>
        }
    </div>
}

export default MirrorContent

