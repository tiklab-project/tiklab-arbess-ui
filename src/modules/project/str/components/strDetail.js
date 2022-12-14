import React,{useState,useEffect} from "react";
import {Drawer} from "antd";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import StrItem from "./strItem";
import StrExec from "./strExec";

const StrDetail = props =>{

    const {execData,detailsDrawer,setDetailsDrawer,detailsContent,itemData,pipeline,status,index} = props

    const [logContent,setLogContent] = useState("")

    useEffect(()=>{
        if(detailsContent){
            setLogContent(detailsContent)
        }
    },[detailsDrawer])

    return(
        <Drawer
            placement="right"
            visible={detailsDrawer}
            onClose={()=>setDetailsDrawer(false)}
            closable={false}
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:"calc(100% - 400px)",top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="strDetailDrawer">
                <div className="strDetailDrawer-up">
                    <ModalTitle
                        setVisible={setDetailsDrawer }
                        title={`# ${detailsContent.findNumber}`}
                    />
                </div>
                <div className="strDetailDrawer-content">
                    {
                        index===1?
                            <StrItem
                                itemData={itemData}
                                pipeline={pipeline}
                                status={status}
                                setLogContent={setLogContent}
                            />
                            :
                            <StrExec
                                pipeline={pipeline}
                                status={status}
                                execData={execData}
                                setLogContent={setLogContent}
                            />
                    }
                    <div className="strDetailDrawer-content-log">
                        {logContent && logContent.runLog}
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default StrDetail