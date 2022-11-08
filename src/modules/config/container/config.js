import React,{useState} from "react";
import {inject,observer} from "mobx-react";
import ConfigTop from "../components/common/configTop";
import ConfigView from "../components/common/configView";
import Anch from "../components/common/anch";
import AddModal from "../components/formView/addModal";

const Config = props =>{

    const {pipelineStore,configDataStore} = props

    const {pipelineId,pipeline} = pipelineStore
    const {data,opt,setOpt} = configDataStore

    const [view,setView] = useState("forms")
    const [addConfigVisible,setAddConfigVisible] = useState(false)

    const onScroll = () =>{
        const scrollTop=document.getElementById("config-content").scrollTop
        data && data.map((item,index)=>{
            const form = `formView_${index+1}`
            const iId = document.getElementById(form)
            const lastId = document.getElementById(form) && document.getElementById(form).previousSibling
            const iTop = iId && iId.offsetTop
            const lastTop =lastId && lastId.offsetTop
            if(scrollTop>lastTop && scrollTop<iTop ){
                setOpt(index+1)
            }
        })
    }

    return (
        <div
            className="config"
            id="config-content"
            onScroll={onScroll}
        >
            <div className="config-up">
                <div className="config-up-content">
                    <ConfigTop
                        view={view}
                        setView={setView}
                        pipelineId={pipelineId}
                        pipelineName={pipeline.pipelineName}
                        setAddConfigVisible={setAddConfigVisible}
                    />
                    {
                        view==="forms" &&
                        <Anch
                            data={data}
                            opt={opt}
                            setOpt={setOpt}
                            setAddConfigVisible={setAddConfigVisible}
                        />
                    }
                </div>
            </div>
            <div className="config-content">
                <ConfigView view={view}/>
            </div>
            <AddModal
                addConfigVisible={addConfigVisible}
                setAddConfigVisible={setAddConfigVisible}
            />
        </div>
    )
}

export default inject("pipelineStore","configDataStore")(observer(Config))