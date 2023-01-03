import React,{useEffect} from "react";
import {Tooltip,Select} from "antd";
import {MinusCircleOutlined,PlusOutlined} from "@ant-design/icons";
import {Input} from "antd";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";
import {x} from "../../view/components/delData";
import EmptyText from "../../../common/emptyText/emptyText";
import "./condition.scss";

/*
    条件
*/
const Condition = props =>{

    const {condStore,dataItem} = props

    const {createCond,findAllTaskCond,condData,fixCondData,setCondData,updateCond,fresh,deleteCond} = condStore

    useEffect(()=>{
        findAllTaskCond(dataItem.configId)
    },[fresh,dataItem && dataItem.configId])

    const isequal = (data,condId) =>{
        let a
        data && data.map(item=>{
            if(item.condId===condId){
                a = item
            }
        })
        return a
    }

    const onChange = (e,item,name) =>{
        const zz = isequal(condData,item.condId)
        zz[name] = e.target.value
        setCondData([...condData])
    }

    // 添加
    const addCondition = () => {
        createCond({
            condType:1,
            taskId:dataItem.configId
        })
    }
    
    const ChangeCondType = (value,item) => {
        updateCond({
            condType:value,
            condId:item.condId
        })
    }

    const reduceInput = item =>{
        deleteCond(item.condId)
    }
    
    const onBlur = (e,item,name)  => {
        const zz = isequal(fixCondData,item.condId)
        if(x(e.target.value,zz[name])){
            const obj = {}
            obj[name] = e.target.value
            updateCond({
                condId:item.condId,
                ...obj
            })
        }
    }

    const renderCondData = (item,index) =>{
        return(
            <div className="pose-condition-inputs" key={index}>
                <div className="inputs-condition">
                    <div className="inputs-condition-key">
                        <Input
                            placeholder={"名称"}
                            value={item && item.condKey}
                            onChange={e=>onChange(e,item,"condKey")}
                            onBlur={e=>onBlur(e,item,"condKey")}
                            onPressEnter={(e)=>e.target.blur()}
                        />
                    </div>
                    <div>
                        <Select
                            value={item.condType}
                            onChange={value=>ChangeCondType(value,item)}
                            style={{width:85}}
                        >
                            <Select.Option value={1}>等于</Select.Option>
                            <Select.Option value={2}>不等于</Select.Option>
                        </Select>
                    </div>
                    <div className="inputs-condition-value">
                        <Input
                            placeholder={"值"}
                            value={item && item.condValue}
                            onChange={e=>onChange(e,item,"condValue")}
                            onBlur={e=>onBlur(e,item,"condValue")}
                            onPressEnter={(e)=>e.target.blur()}
                        />
                    </div>
                    <div className="inputs-condition-opt">
                        <Tooltip title={"删除"}>
                            <MinusCircleOutlined
                                style={{fontSize:16}}
                                onClick={()=>reduceInput(item)}
                            />
                        </Tooltip>

                    </div>
                </div>
                <div className="inputs-error">
                    { item && item.condKey && item.condKey.trim()!=="" ? item.condValue && item.condValue.trim()!=="" ?"":"请输入参数值":"请输入名称"}
                </div>
            </div>
        )
    }

    return(
        <div className="pose-condition">
            <div className="pose-condition-up">
                <div>
                    <span style={{paddingRight:5}}>条件</span>
                    <span style={{fontSize:13}}>({condData && condData.length?condData.length:0}个)</span>
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
                    condData && condData.length > 0 ?
                    condData.map((item,index)=>{
                        return renderCondData(item,index)
                    })
                    :
                    <EmptyText title={"暂无条件"}/>
                }
            </div>
        </div>
    )
}

export default inject("condStore")(observer(Condition))