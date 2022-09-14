import React from "react";
import {Modal} from "antd";

const lis = [
    {
        pathId:"1",
        pathType:1,
    },
    {
        pathId:"5",
        pathType:5,
    },
    {
        pathId:"22",
        pathType:22,
    },
    {
        pathId:"21",
        pathType:21,
    },
]

const EnviModal = props =>{

    const {visible,setVisible,enviData,setEnviData,pathTitle} = props

    const handleClick = item =>{
        const newData = [...enviData]
        newData.push(item)
        setEnviData(newData)
        setVisible(false)
    }

    // 环境配置是否已经存在
    const isGray = pathType => {
        return enviData.some(item=>item.pathType===pathType)
    }
    
    const renderLis = lis => {
        return lis.map(item=>{
            return  <div
                        onClick={()=>isGray(item.pathType) ? null:handleClick(item)}
                        key={item.pathType}
                        className={`enviModal-group_list enviModal-item ${isGray(item.pathType) ? "isGray" :"notGray"}`}
                    >
                        <div>
                            {pathTitle(item.pathType)}
                        </div>
                        {isGray(item.pathType) ? <div>已存在</div>:null}
                    </div>
        })
    }

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            footer={[]}
            closable={false}
        >
            <div className="enviModal">
                <div className="enviModal-title">配置任务组</div>
                <div className="enviModal-group">
                    {renderLis(lis)}
                </div>
            </div>
        </Modal>
    )
}

export default EnviModal