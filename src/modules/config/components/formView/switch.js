import React,{useState} from "react";
import {Space} from "antd";
import {SwapOutlined} from "@ant-design/icons";
import SubIcon from "../formTitle/subIcon";
import Btn from "../../../common/btn/btn";
import SwitchType from "./switchType";
import "./switch.scss";


const Switch = props =>{

    const {type} = props

    const [visible,setVisible] = useState(false)
    const [showType,setShowType] = useState("")

    const onClick = type =>{
        setVisible(true)
        setShowType(type)
    }

    const renderType = type =>{
        return  <Space>
                    <div className="configCode-gitList-item ">
                        <SubIcon type={type}/>
                    </div>
                    <Btn
                        title={<><SwapOutlined/>切换类型</>}
                        type={"link-small"}
                        onClick={()=>onClick(type)}
                    />
                </Space>
    }

    return(
        <div className="configCode-gitList">
            {
                (()=>{
                    if(type > 0 &&type < 10){
                        return  <>
                                    <div className="configCode-gitList-title">源码类型</div>
                                    { renderType(type) }
                                </>
                    }
                    if(type===11){
                        return  <>
                                    <div className="configCode-gitList-title">测试类型</div>
                                    { renderType(type) }
                                </>
                    }
                    else if(type > 20 && type < 30){
                        return  <>
                                    <div className="configCode-gitList-title">构建类型</div>
                                    { renderType(type) }
                                </>
                    }
                    else if(type > 30 && type < 40){
                        return  <>
                                    <div className="configCode-gitList-title">部署类型</div>
                                    { renderType(type) }
                                </>
                    }
                    else if(type > 40 && type < 50){
                        return  <>
                                    <div className="configCode-gitList-title">代码扫描类型</div>
                                    { renderType(type) }
                                </>
                    }
                    else if(type > 50 && type < 60){
                        return  <>
                                    <div className="configCode-gitList-title">推送制品类型</div>
                                    { renderType(type) }
                                </>
                    }

                })()
            }
            <SwitchType
                visible={visible}
                setVisible={setVisible}
                showType={showType}
            />
        </div>
    )
}

export default Switch