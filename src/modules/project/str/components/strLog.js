import React,{useState,useEffect} from "react";
import {Modal} from "antd";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import Subtitle from "../../../config/common/components/subtitle";
import HlineIcon from "../../../config/common/components/hlineIcon";
import {autoHeight} from "../../../common/client/client";

const StrLog = props =>{

    const {visible,setVisible,drawerContent,index} = props
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    useEffect(()=>{
        if(visible){
            const outLog=document.getElementById("outLog")
            if(outLog && index===0){
                outLog.scrollTop = outLog.scrollHeight
            }
        }
    },[visible])

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            footer={[]}
            width={"70%"}
            style={{height:height,top:60,minWidth:1000}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="strModal">
                <div className="strModal-up">
                    <ModalTitle
                        setVisible={setVisible}
                        title={
                            <>
                                <HlineIcon type={drawerContent.taskType}/>
                                &nbsp; -- &nbsp;
                                <Subtitle type={drawerContent.taskType}/>
                            </>
                        }
                    />
                </div>
                <div className="strModal-content" id="strModal-log">
                    <div className="log">
                        <div className="log-content" style={{whiteSpace:"pre-wrap"}}>
                            {
                                drawerContent && drawerContent.runLog ? drawerContent.runLog:"没有查询到日志"
                            }
                        </div>
                    </div>
                 </div>
            </div>
        </Modal>
    )
}

export default StrLog