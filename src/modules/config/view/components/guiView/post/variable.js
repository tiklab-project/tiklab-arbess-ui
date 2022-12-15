import React, {useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Input,message} from "antd";
import {PlusOutlined,MinusCircleOutlined} from "@ant-design/icons";
import Btn from "../../../../../common/btn/btn";
import {x} from "../../delData";
import "./variable.scss";

const Variable = props => {

    const {variableStore,dataItem} = props
    const {fixVariableData,variableData,setVariableData,createVariable,findAllVariable,fresh,deleteVariable,updateVariable} = variableStore

    useEffect(()=>{
        findAllVariable(dataItem.configId)
    },[fresh])

    const isequal = (data,varId) =>{
        let a
        data && data.map(item=>{
            if(item.varId===varId){
                a = item
            }
        })
        return a
    }

    const onChange = (e,item,name) =>{
        const zz = isequal(variableData,item.varId)
        zz[name] = e.target.value
        setVariableData([...variableData])
    }

    // 添加
    const addInput = () =>{
        createVariable({
            type:2,
            taskType:1,
            taskId:dataItem.configId,
        })
    }

    // 删除
    const reduceInput = (item) => {
        deleteVariable(item.varId)
    }

    // 更新
    const onBlur = (e,item,name) =>{
        const zz = isequal(fixVariableData,item.varId)
        if(x(e.target.value,zz[name])){
            const obj = {}
            obj[name] = e.target.value
            const params = {
                type:2,
                taskType:1,
                varId:item.varId,
                ...obj,
            }
            updateVariable(params).then(res=>{
                res.code===0 && message.info("更新成功",0.5)
            })
        }
    }

    const renderInputs = (item,index) =>{
        return(
            <div key={index} className="pose-variable-inputs">
                <div className="inputs-variable">
                    <div className="inputs-variable-key">
                        <Input
                            placeholder={"名称"}
                            defaultValue={item && item.varKey}
                            onChange={e=>onChange(e,item,"varKey")}
                            onBlur={e=>onBlur(e,item,"varKey")}
                            onPressEnter={(e)=>e.target.blur()}
                        />
                    </div>
                    <div>=</div>
                    <div className="inputs-variable-value">
                        <Input
                            placeholder={"值"}
                            defaultValue={item && item.varValue}
                            onChange={e=>onChange(e,item,"varValue")}
                            onBlur={e=>onBlur(e,item,"varValue")}
                            onPressEnter={(e)=>e.target.blur()}
                        />
                    </div>
                    <div className="inputs-variable-opt">
                        <MinusCircleOutlined onClick={()=>reduceInput(item)}/>
                    </div>
                </div>
                <div className="inputs-error">
                    { item && item.varKey && item.varKey.trim()!=="" ? item.varValue && item.varValue.trim()!=="" ?"":"请输入参数值":"请输入名称"}
                </div>
            </div>
        )
    }

    return(
        <div className="pose-variable">
            <div className="pose-variable-up">
                <div>变量</div>
                <Btn
                    title={"添加"}
                    type={"link-nopadding"}
                    icon={<PlusOutlined/>}
                    onClick={()=>addInput()}
                />
            </div>
            <div className="pose-variable-content">
                {
                    variableData && variableData.map((item,index)=>{
                        return renderInputs(item,index)
                    })
                }
            </div>
        </div>
    )
}

export default inject("variableStore")(observer(Variable))