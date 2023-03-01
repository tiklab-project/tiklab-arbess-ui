import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {Input,message,Tooltip} from "antd";
import {PlusCircleOutlined,MinusCircleOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/Btn";
import {WhetherChange} from "../tasks/components/Common";
import EmptyText from "../../../common/emptyText/EmptyText";
import "./Variable.scss";

/**
 * task的变量
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Variable = props => {

    const {variableStore,dataItem} = props
    const {fixVariableData,variableData,setVariableData,createVariable,findAllVariable,fresh,deleteVariable,updateVariable} = variableStore

    const [bordered,serBordered] = useState(' ')

    useEffect(()=>{
        // 初始化变量
        findAllVariable(dataItem.taskId)
    },[fresh,dataItem.taskId])

    /**
     * 获取符合要求的item
     * @param data
     * @param varId
     * @returns {*}
     */
    const isequal = (data,varId) =>{
        let a
        data && data.map(item=>{
            if(item.varId===varId){
                a = item
            }
        })
        return a
    }

    /**
     * 改变文本框值
     * @param e
     * @param item
     * @param name
     */
    const onChange = (e,item,name) =>{
        const zz = isequal(variableData,item.varId)
        zz[name] = e.target.value
        setVariableData([...variableData])
    }

    /**
     * 添加环境变量
     */
    const addInput = () =>{
        createVariable({
            type:2,
            taskType:1,
            taskId:dataItem.taskId,
        })
    }

    /**
     * 删除环境变量
     * @param item
     */
    const reduceInput = (item) => {
        deleteVariable(item.varId)
    }

    /**
     * 确定更改
     * @param e
     * @param item
     * @param name
     */
    const onBlur = (e,item,name) =>{
        serBordered('')
        const zz = isequal(fixVariableData,item.varId)
        if(WhetherChange(e.target.value,zz[name])){
            const obj = {}
            obj[name] = e.target.value
            const params = {
                type:2,
                taskType:1,
                varId:item.varId,
                ...obj,
            }
            updateVariable(params)
        }
    }

    const renderInputs = (item,index) =>{
        return(
            <div key={index} className="pose-variable-inputs">
                <div className="inputs-variable">
                    <div className="inputs-variable-key">
                        <Input
                            // bordered={bordered===(item.varId+"varKey")}
                            className={`${bordered===(item.varId+"varKey")?"":'input-hover'}`}
                            onFocus={()=>serBordered(item.varId+"varKey")}
                            placeholder={"名称"}
                            value={item && item.varKey}
                            onChange={e=>onChange(e,item,"varKey")}
                            onBlur={e=>onBlur(e,item,"varKey")}
                            onPressEnter={(e)=>e.target.blur()}
                        />
                    </div>
                    <div>=</div>
                    <div className="inputs-variable-value">
                        <Input
                            // bordered={bordered===(item.varId+"varValue")}
                            className={`${bordered===(item.varId+"varValue")?"":'input-hover'}`}
                            onFocus={()=>serBordered(item.varId+"varValue")}
                            placeholder={"值"}
                            value={item && item.varValue}
                            onChange={e=>onChange(e,item,"varValue")}
                            onBlur={e=>onBlur(e,item,"varValue")}
                            onPressEnter={(e)=>e.target.blur()}
                        />
                    </div>
                    <div className="inputs-variable-opt">
                        <Tooltip title={"删除"}>
                            <MinusCircleOutlined
                                style={{fontSize:16}}
                                onClick={()=>reduceInput(item)}
                            />
                        </Tooltip>
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
                <div>
                    <span style={{paddingRight:5}}>环境变量</span>
                    <span style={{fontSize:13}}>({variableData && variableData.length?variableData.length:0}个)</span>
                </div>
                <Btn
                    title={"添加环境变量"}
                    type={"link-nopadding"}
                    icon={<PlusCircleOutlined/>}
                    onClick={()=>addInput()}
                />
            </div>
            <div className="pose-variable-content">
                {
                    variableData && variableData.length>0 ?
                    variableData.map((item,index)=>renderInputs(item,index))
                    :
                    <EmptyText title={"暂无环境变量"}/>
                }
            </div>
        </div>
    )
}

export default inject("variableStore")(observer(Variable))
