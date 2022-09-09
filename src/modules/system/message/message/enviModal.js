import React from "react";
import {message, Modal} from "antd";
import "./enviModal.scss";

const lis = [
    {
        id:1,
        title:"Git"
    },{
        id:2,
        title:"Svn"
    },{
        id:3,
        title:"node"
    },{
        id:4,
        title:"maven"
    },
]

const EnviModal = props =>{

    const {visible,setVisible,enviData,setEnviData} = props

    const handleClick = item =>{
        const newData = [...enviData]
        for(let i=0;i<enviData.length;i++){
            if(enviData[i].title===item.title){
                message.info({
                    content: `${item.title}已经存在`,
                    style: {
                        marginTop: "9vh",
                        marginLeft:"5vh"
                    }
                })
                return
            }
        }
        newData.push(item)
        setEnviData(newData)
        setVisible(false)
    }

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            footer={[]}
            closable={false}
        >
            <div className="enviModal">
                <div className="enviModal-content">
                    <div className="enviModal-content-title">配置任务组</div>
                    <div className="enviModal-content-group">
                        {
                            lis && lis.map(item=>{
                                return(
                                    <div
                                        onClick={()=>{handleClick(item)}}
                                        key={item.id}
                                        className={`enviModal-content-group_item`}
                                    >
                                    <span>
                                        {item.title}
                                    </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EnviModal