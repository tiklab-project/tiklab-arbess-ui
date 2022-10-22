import React,{useState} from "react";
import CodeAddModal from "./codeAddModal";
import Headline from "./headline";

const Code = props =>{

    const {data,setData,codeType,del,pipelineId,updateConfigure,iscode} = props

    const [codeVisible,setCodeVisible] = useState(false)

    const codeNull = (
        <>
            <div className="formView-wrapper">
                <div className="formView-wrapper-Headline code-handle">
                   <div className="desc-left">
                       <span className="desc-title">代码源</span>
                   </div>
                </div>
            </div>
            <div
                className="formView-wrapper-handle code-handle"
                onClick={()=>setCodeVisible(true)}
            >
                添加代码源
            </div>
        </>
    )

    const code = iscode => {
        return  iscode ?
            <Headline
                {...props}
                type={codeType}
                del={del}
                updateConfigure={updateConfigure}
                data={data}
                setData={setData}
                pipelineId={pipelineId}
            />
            :
            codeNull
    }

    return <>
        { code(iscode) }

        <CodeAddModal
            codeVisible={codeVisible}
            setCodeVisible={setCodeVisible}
        />
    </>
}

export default Code
