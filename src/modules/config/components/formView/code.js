import React from "react";
import Headline from "./headline";

const Code = props =>{

    const {data,setData,codeType,del,pipelineId,updateConfigure,validType} = props

    const code = codeType => {
        return  codeType !=="" &&
            <Headline
                {...props}
                type={codeType}
                del={del}
                updateConfigure={updateConfigure}
                data={data}
                setData={setData}
                pipelineId={pipelineId}
                validType={validType}
            />
    }

    return code(codeType)
}

export default Code
