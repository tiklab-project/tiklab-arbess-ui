import React,{useState} from "react";
import CodeAddModal from "./codeAddModal";
import Headline from "./headline";

const Code = props =>{

    const {data,setData,codeType,del,pipelineId,updateConfigure} = props

    const [codeVisible,setCodeVisible] = useState(false)

    const codeNull = (
        <>
            <div className="formView-wrapper">
                <div className="formView-wrapper-Headline code-handle">
                    代码源
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

    const code = codeType => {
        return  codeType === "" ?
            codeNull
            :
            <Headline
                {...props}
                type={codeType}
                del={del}
                updateConfigure={updateConfigure}
                data={data}
                setData={setData}
                pipelineId={pipelineId}
            />
    }

    return <>
        { code(codeType) }

        <CodeAddModal
            codeVisible={codeVisible}
            setCodeVisible={setCodeVisible}
        />
    </>
}

export default Code
