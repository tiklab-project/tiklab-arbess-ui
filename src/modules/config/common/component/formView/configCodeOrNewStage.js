import React,{Fragment} from "react";
import {CloseOutlined} from "@ant-design/icons";
import "./configCodeOrNewStage.scss";

const ConfigCodeOrNewStage = props =>{

    const {lis,handleClick} = props

    const renderLis = lis =>{
        return lis && lis.map(group=>{
            return(
                <div className="group" key={group.id}>
                    <div className="group-title"> {group.title} </div>
                    <div className="group-content">
                        {
                            group.desc.map((item,index)=>{
                                return(
                                    <div onClick={()=>handleClick(group,item,index)}
                                         className="group-desc"
                                         key={item.type}
                                    >
                                        <div className="group-desc-tpl">
                                            <div className="group-tpl"> {item.tel} </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    }

    return(
        <Fragment>
            <div className="taskGroup">
                <div>选择任务组</div>
                <div><CloseOutlined/></div>
            </div>
            {renderLis(lis)}
        </Fragment>
    )
}

export default ConfigCodeOrNewStage