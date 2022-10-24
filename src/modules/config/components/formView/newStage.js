import React,{useState} from "react";
import Headline from "./headline";
import ChangeSortsModal from "./changeSortsModal";

const NewStage = props =>{

    const {data,del,updateConfigure,setData,pipelineId,validType} = props

    const [changeSortVisible,setChangeSortVisible] = useState(false)

    const newStage = item =>{
        return <Headline
                    {...props}
                    type={item.dataType}
                    key={item.dataType}
                    del={del}
                    data={data}
                    setData={setData}
                    pipelineId={pipelineId}
                    updateConfigure={updateConfigure}
                    setChangeSortVisible={setChangeSortVisible}
                    validType={validType}
            />
    }

    return  (
        <>
            {data && data.map(item=>{
                return newStage(item)
            })}

            <ChangeSortsModal
                changeSortVisible={changeSortVisible}
                setChangeSortVisible={setChangeSortVisible}
                data={data}
                setData={setData}
                updateConfigure={updateConfigure}
                pipelineId={pipelineId}
            />
        </>
    )
}

export default NewStage