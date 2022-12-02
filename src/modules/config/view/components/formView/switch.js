import React,{useState} from "react";
import {Space} from "antd";
import {SwapOutlined} from "@ant-design/icons";
import SubIcon from "../formTitle/subIcon";
import Btn from "../../../../common/btn/btn";
import SwitchType from "./switchType";
import "./switch.scss";


const Switch = props =>{

    const {dataItem} = props

    const [visible,setVisible] = useState(false)
    const [showItem,setShowItem] = useState("")

    const onClick = dataItem =>{
        setVisible(true)
        setShowItem(dataItem)
    }

    const isBtn = dataItem => {
        if(dataItem.type===11 || dataItem.type===41 || dataItem.type===61){
            return
        }
        else {
            return <Btn
                        title={<><SwapOutlined/>切换类型</>}
                        type={"link-small"}
                        onClick={()=>onClick(dataItem)}
                    />
        }
    }
    
    const renderType = dataItem =>{
        return  <Space>
                    <div className="configCode-gitList-item ">
                        <SubIcon type={dataItem.type}/>
                    </div>
                    {isBtn(dataItem)}

                </Space>
    }

    return(
        <div className="configCode-gitList">
            {
                (()=>{
                    if(dataItem.type > 0 && dataItem.type < 10){
                        return  <>
                                    <div className="configCode-gitList-title">源码类型</div>
                                    { renderType(dataItem) }
                                </>
                    }
                    if(dataItem.type===11){
                        return  <>
                                    <div className="configCode-gitList-title">测试类型</div>
                                    { renderType(dataItem) }
                                </>
                    }
                    else if(dataItem.type > 20 && dataItem.type < 30){
                        return  <>
                                    <div className="configCode-gitList-title">构建类型</div>
                                    { renderType(dataItem) }
                                </>
                    }
                    else if(dataItem.type > 30 && dataItem.type < 40){
                        return  <>
                                    <div className="configCode-gitList-title">部署类型</div>
                                    { renderType(dataItem) }
                                </>
                    }
                    else if(dataItem.type > 40 && dataItem.type < 50){
                        return  <>
                                    <div className="configCode-gitList-title">代码扫描类型</div>
                                    { renderType(dataItem) }
                                </>
                    }
                    else if(dataItem.type > 50 && dataItem.type < 60){
                        return  <>
                                    <div className="configCode-gitList-title">推送制品类型</div>
                                    { renderType(dataItem) }
                                </>
                    }
                    else if(dataItem.type > 60 && dataItem.type < 70){
                        return  <>
                                    <div className="configCode-gitList-title">消息通知类型</div>
                                    { renderType(dataItem) }
                                </>
                    }

                })()
            }
            <SwitchType
                visible={visible}
                setVisible={setVisible}
                showItem={showItem}
            />
        </div>
    )
}

export default Switch