import React from "react";
import StructureLeftList from "./structureLeftList";

const StructureLeftExecute = props => {

    const {execState,status,setIndex,index} = props

    const state = () =>{
        if(execState){
            switch(execState.runStatus){
                case 1:
                    return  status(2) //失败
                case 30 :
                    return  status(1) //成功
                default :
                    return  status(5) //运行过程
            }
        }
    }

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
                state={state()}
                type={0}
                createTime={execState && execState.createTime}
                title={`运行中`}
            />
    }

    return renderExecState(execState)
}

export default StructureLeftExecute