import React from "react";
import Headline from "./headline";

const Code = props =>{

    const {formInitialValues,setNewStage,codeType,setTaskFormDrawer,validType,setIndex} = props

    if(codeType===""){
        return  null
    }

    return  <Headline
                setTaskFormDrawer={setTaskFormDrawer}
                setNewStage={setNewStage}
                index={null}
                setIndex={setIndex}
                validType={validType}
                type={codeType}
                formInitialValues={formInitialValues}
            />
}

export default Code