import React,{useState,useEffect} from "react";
import {Button,Form,Input} from "antd";
import EnviModal from "./enviModal";
import "./envi.scss"

const Envi = props =>{

    const [visible,setVisible] = useState(false)
    const [enviData,setEnviData] = useState([])
    useEffect(()=>{
        console.log(enviData)
    },[visible])

    const renderEnviContent = title =>{
        switch (title) {
            case 1:
                return <Form>
                    <Form.Item label="名称">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="地址">
                        <Input/>
                    </Form.Item>
                </Form>
            case 2:
                return <Form>
                    <Form.Item label="名称">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="地址">
                        <Input/>
                    </Form.Item>
                </Form>
            case 3:
                return <Form>
                    <Form.Item label="名称">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="地址">
                        <Input/>
                    </Form.Item>
                </Form>
            case 4:
                return <Form>
                    <Form.Item label="名称">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="地址">
                        <Input/>
                    </Form.Item>
                </Form>
        }

    }
    
    const renderEnviData = enviData => {
        return enviData && enviData.map(item=>{
            return(
                <div key={item.id} className="envi-item">
                    <div className="envi-item-title">{item.title}</div>
                    {renderEnviContent(item.id)}
                </div>
            )
        })
    }

    return <div className="envi">
        <Button onClick={()=>setVisible(true)}>添加配置</Button>

        {renderEnviData(enviData)}

        <EnviModal
            visible={visible}
            setVisible={setVisible}
            enviData={enviData}
            setEnviData={setEnviData}
        />
    </div>
}

export default Envi