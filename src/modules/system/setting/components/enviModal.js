import React from "react";
import {Modal} from "antd";

const lis = [
    {
        scmId:"1",
        scmType:1,
    },
    {
        scmId:"5",
        scmType:5,
    },
    {
        scmId:"22",
        scmType:22,
    },
    {
        scmId:"21",
        scmType:21,
    },
]

const EnviModal = props =>{

    const {visible,setVisible,enviData,setEnviData,scmTitle} = props

    const handleClick = item =>{
        const newData = [...enviData]
        newData.push(item)
        setEnviData(newData)
        setVisible(false)
    }

    // 环境配置是否已经存在
    const isGray = scmType => {
        return enviData.some(item=>item.scmType===scmType)
    }
    
    const renderLis = lis => {
        return lis.map(item=>{
            return  <div
                        onClick={()=>isGray(item.scmType) ? null:handleClick(item)}
                        key={item.scmType}
                        className={`enviModal-group_list enviModal-item ${isGray(item.scmType) ? "isGray" :"notGray"}`}
                    >
                        <div>
                            {scmTitle(item.scmType)}
                        </div>
                        {isGray(item.scmType) ? <div>已存在</div>:null}
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