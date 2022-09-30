import React from "react";
import {CloseOutlined} from "@ant-design/icons";
import {Button,Modal} from "antd";

const ConfigCodeOrNewStage = props =>{

    const {lis,handleClick,setVisible,visible} = props

    const renderLis = lis =>{
        return lis && lis.map(group=>{
            return  <div className="group" key={group.id}>
                        <div className="group-title"> {group.title} </div>
                        <div className="group-content">
                            {
                                group.desc.map((item,index)=>{
                                    return <div onClick={()=>handleClick(group,item,index)}
                                                className="group-desc"
                                                key={item.type}
                                            >
                                                <div className="group-desc-tpl">
                                                    <div className="group-tpl"> {item.tel} </div>
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                    </div>
        })
    }

    const style = {
        display:"flex",
        justifyContent:"space-between",
        marginBottom:10,
        borderBottom:"1px solid #ccc"
    }

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            footer={[]}
            closable={false}
        >
            <div className="taskGroup" style={style}>
                <div>选择任务组</div>
                <div>
                    <Button onClick={()=>setVisible(false)} type="text">
                        <CloseOutlined/>
                    </Button>
                </div>
            </div>
            {renderLis(lis)}
        </Modal>
    )
}

export default ConfigCodeOrNewStage