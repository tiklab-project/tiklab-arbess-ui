import React,{useState,useEffect} from "react";
import {Select} from "antd";
import {MinusCircleOutlined,PlusOutlined} from "@ant-design/icons";
import Btn from "../../../../common/btn/btn";
import "./condition.scss";
import {Input} from "antd";

const Condition = props =>{

    const [a,setA] = useState([""])
    
    const addCondition = () => {
        a[a.length] = ""
        setA([...a])
    }

    const reduceInput = (item,index) =>{
        a.splice(index,1)
        setA([...a])
    }
    
    const onBlur = () => {
      
    }

    const renderA = (item,index) =>{
        return(
            <div className="inputs-condition" key={index}>
                {/*<div>{index}</div>*/}
                <div className="inputs-condition-key">
                    <Input
                        placeholder={"名称"}
                        // defaultValue={item && item.varKey}
                        onBlur={e=>onBlur(e,item,"varKey")}
                        onPressEnter={(e)=>e.target.blur()}
                    />
                </div>
                <div>
                    <Select defaultValue={1}>
                        <Select.Option value={1}>等于</Select.Option>
                        <Select.Option value={2}>大于</Select.Option>
                        <Select.Option value={3}>小于</Select.Option>
                    </Select>
                </div>
                <div className="inputs-condition-value">
                    <Input
                        placeholder={"值"}
                        // defaultValue={item && item.varValue}
                        onBlur={e=>onBlur(e,item,"varValue")}
                        onPressEnter={(e)=>e.target.blur()}
                    />
                </div>
                <div className="inputs-condition-opt">
                    <MinusCircleOutlined onClick={()=>reduceInput(item,index)}/>
                </div>
            </div>
        )
    }

    return(
        <div className="pose-condition">
            <div className="pose-condition-up">
                <div>
                    <span style={{paddingRight:5}}>条件</span>
                    <span style={{fontSize:13}}>({a && a.length?a.length:0}个)</span>
                </div>
                <Btn
                    title={"添加"}
                    type={"link-nopadding"}
                    icon={<PlusOutlined/>}
                    onClick={()=>addCondition()}
                />
            </div>
            <div className="pose-condition-content">
                {
                    a && a.map((item,index)=>{
                        return renderA(item,index)
                    })
                }
            </div>
        </div>
    )
}

export default Condition