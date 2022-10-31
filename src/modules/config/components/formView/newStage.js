import React,{useState} from "react";
import BlockContent from "./blockContent";
import ChangeSortsModal from "./changeSortsModal";

const NewStage = props =>{

    const {data,del,updateConfigure,setData,pipelineId,validType} = props

    const [changeSortVisible,setChangeSortVisible] = useState(false)

    const newStage = (item,index) =>{
        return <BlockContent
                    {...props}
                    id={`formView_${index}`}
                    type={item.dataType}
                    key={index}
                    del={del}
                    data={data}
                    setData={setData}
                    pipelineId={pipelineId}
                    setChangeSortVisible={setChangeSortVisible}
                    updateConfigure={updateConfigure}
                    validType={validType}
            />
    }

    return  (
        <>
            {data && data.map((item,index)=>{
                return newStage(item,index+1)
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