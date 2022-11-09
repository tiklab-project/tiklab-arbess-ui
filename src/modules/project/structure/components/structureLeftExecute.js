import React from "react";
import StructureLeftList from "./structureLeftList";

const StructureLeftExecute = props => {

    const {execState,status,setIndex,index} = props

    const click = () => {
        setIndex(0)
    }
    
    const renderExecState = execState =>{
        return execState===""?
            null
            :
            <StructureLeftList
                onClick={click}
                index={index}
                name={execState && execState.execName}
                state={status(5)}
                type={0}
                createTime={execState && execState.createTime}
                title={`运行中`}
            />
    }

    return renderExecState(execState)
}

export default StructureLeftExecute