import React from "react";
import Headline from "./headline";

const Code = props =>{

    const {data,setData,codeType,del,pipelineId} = props

    const code = codeType => {
        return  codeType !=="" &&
            <Headline
                {...props}
                type={codeType}
                del={del}
                data={data}
                setData={setData}
                pipelineId={pipelineId}
            />
    }

    return code(codeType)
}

export default Code
