import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {Input, Popconfirm, Select, Space} from "antd";
import {PlusCircleOutlined, DeleteOutlined, CloseOutlined, CaretDownOutlined,EditOutlined,CaretRightOutlined} from "@ant-design/icons";
import Btn from "../../../../common/component/btn/Btn";
import EmptyText from "../../../../common/component/emptyText/EmptyText";
import "./Variable.scss";

/**
 * task的变量
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Variable = props => {

    const {variableStore,dataItem} = props
    const {variableData,createVariable,findAllVariable,fresh,deleteVariable,
        updateVariable
    } = variableStore

    const variables = {
        varId:null,
        varKey:"",
        varValue: "",
    }

    const [variableObj,setVariableObj] = useState({
        ...variables
    })

    const [showArrow,setShowArrow] = useState(false);

    useEffect(()=>{
        // 初始化变量
        findAllVariable(dataItem.taskId)
    },[fresh,dataItem.taskId])

    /**
     * 添加环境变量
     */
    const addInput = () =>{
        setVariableObj({
            var:"add",
            varKey:"VARIABLE_NAME",
            varValue:"${VARIABLE_VALUE}",
        })
    }


    /**
     * 编辑变量
     */
    const editInput = (item) => {
        setVariableObj({
            var:"edit",
            varId:item.varId,
            varKey:item.varKey || "",
            varValue:item.varValue || "",
        })
    }
    
    /**
     * 删除变量
     */
    const reduceInput = (e,item) => {
        e.stopPropagation();
        deleteVariable(item.varId)
    }

    /**
     * 更新值
     */
    const changeVar = (e,type) => {
        setVariableObj({
            ...variableObj,
            [type]:e.target.value
        })
    }

    const onCancel = () =>{
        setVariableObj({})
    }

    /**
     * 确定添加或修改
     */
    const onOk = item =>{
        const {varKey,varValue} = variableObj
        if(varKey.trim()==='' || varValue.trim()==='' ){
            return
        }
        if(item && item.varKey===varKey && item.varValue===varValue){
            onCancel()
            return;
        }
        update({
            type:2,
            taskType:1,
            varKey:varKey,
            varValue:varValue,
        })
    }

    const update = value =>{
        if(variableObj.var==='add'){
            createVariable({
                taskId:dataItem.taskId,
                ...value
            }).then(res=>{
                if(res.code===0){onCancel()}
            })
            return
        }
        updateVariable({
            varId:variableObj.varId,
            ...value
        }).then(res=>{
            if(res.code===0){onCancel()}
        })

    }

    const inputHtml = item =>(
        <>
            <div className="inputs-variable-key">
                <div className="inputs-variable-title">变量名</div>
                <Input
                    placeholder={"变量名"}
                    defaultValue={variableObj && variableObj.varKey}
                    onChange={e=>changeVar(e,"varKey")}
                />
                {
                    variableObj?.varKey.trim()==="" && <div className="inputs-error">变量名不能为空</div>
                }
            </div>
            <div className="inputs-variable-type">
                <div className="inputs-variable-title">类别</div>
                <Select
                    showArrow={showArrow}
                    onMouseEnter={()=>setShowArrow(true)}
                    onMouseLeave={()=>setShowArrow(false)}
                    defaultValue={1}
                    style={{width:"100%"}}
                >
                    <Select.Option value={1}>等于</Select.Option>
                </Select>
            </div>
            <div className="inputs-variable-value">
                <div className="inputs-variable-title">变量值</div>
                <Input
                    placeholder={"变量值"}
                    defaultValue={variableObj && variableObj.varValue}
                    onChange={e=>changeVar(e,"varValue")}
                />
                {
                    variableObj?.varValue.trim()==="" && <div className="inputs-error">变量值不能为空</div>
                }
            </div>
            <div className="inputs-variable-btn">
                <Btn onClick={()=>onCancel()} title={"取消"} isMar={true}/>
                <Btn onClick={()=>onOk(item)} title={"保存"} type={"primary"}/>
            </div>
        </>
    )

    const renderInputs = (item,index) =>{
        return(
            <div key={index} className="pose-variable-inputs">
                <div className="inputs-variable"
                     onClick={()=>variableObj?.varId === item.varId ? onCancel() : editInput(item)}
                >
                    <div className="inputs-variable-icon">
                    {
                        variableObj?.varId === item.varId ?
                            <CaretDownOutlined />
                            :
                            <CaretRightOutlined />
                    }
                    </div>
                    <div className="inputs-variable-varKey">{item && item.varKey}</div>
                    <div className="inputs-variable-opt">
                        <span data-title-bottom={"删除"} onClick={e=>e.stopPropagation()}>
                            <Popconfirm
                                placement="bottomRight"
                                title={"你确定删除吗"}
                                okText="确定"
                                cancelText="取消"
                                onConfirm={e=>reduceInput(e,item)}
                            >
                                <DeleteOutlined />
                             </Popconfirm>
                        </span>
                    </div>
                </div>
                {
                    variableObj?.varId === item.varId &&
                    <div className="inputs-variable-html">
                        { inputHtml(item) }
                    </div>
                }
            </div>
        )
    }

    return(
        <div className="pose-variable">
            <div className="pose-variable-up">
                <div>
                    <span style={{paddingRight:5}}>变量</span>
                    <span style={{fontSize:13}}>({variableData && variableData.length?variableData.length:0}个)</span>
                </div>
                <Btn
                    title={"添加变量"}
                    type={"link-nopadding"}
                    icon={<PlusCircleOutlined/>}
                    onClick={()=>addInput()}
                />
            </div>
            <div className="pose-variable-content">
                {variableObj?.var==='add' && inputHtml()}
                {
                    variableData && variableData.length>0 ?
                    variableData.map((item,index)=>renderInputs(item,index))
                    :
                    <EmptyText title={"暂无变量"}/>
                }
            </div>
        </div>
    )
}

export default inject("variableStore")(observer(Variable))
