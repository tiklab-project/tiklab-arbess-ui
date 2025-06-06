/**
 * @Description: 任务变量
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {Input, Popconfirm, Select, Form} from "antd";
import {PlusCircleOutlined, DeleteOutlined, CaretDownOutlined,CaretRightOutlined} from "@ant-design/icons";
import Button from "../../../../../../common/component/button/Button";
import ListEmpty from "../../../../../../common/component/list/ListEmpty";
import {Validation} from "../../../../../../common/utils/Client";
import "./Variable.scss";

const Variable = props => {

    const {variableStore,dataItem} = props

    const {createVariable,findAllVariable,deleteVariable, updateVariable} = variableStore

    const [formVar] = Form.useForm();

    const [variableData,setVariableData] = useState([])

    const [variableObj,setVariableObj] = useState(null);

    const [showArrow,setShowArrow] = useState(false);

    useEffect(()=>{
        // 初始化变量
        findVariable()
    },[dataItem.taskId])

    /**
     * 获取变量
     */
    const findVariable = () =>{
        findAllVariable(dataItem.taskId,'task').then(res=>{
            if(res.code===0){
                setVariableData(res?.data || [])
            }
        })
    }

    useEffect(()=>{
        if(variableObj){
            formVar.setFieldsValue(variableObj)
        }
    },[variableObj])

    /**
     * 添加环境变量
     */
    const addInput = () =>{
        setVariableObj({
            var:"add",
        })
    }

    /**
     * 编辑变量
     */
    const editInput = (item) => {
        setVariableObj({
            var:"edit",
            varId:item.varId,
            varKey:item.varKey,
            varValue:item.varValue || "",
        })
    }

    /**
     * 删除变量
     */
    const reduceInput = (e,item) => {
        e.stopPropagation();
        deleteVariable(item.varId).then(res=>{
            if(res.code===0){
                findVariable()
            }
        })
    }

    const onCancel = () =>{
        setVariableObj(null)
    }

    /**
     * 确定添加或修改
     */
    const onOk = item =>{
        formVar.validateFields().then(value => {
            const {varKey,varValue,varType} = value
            if(item && item.varKey===varKey && item.varValue===varValue && item.varType===varType){
                onCancel()
                return;
            }
            if(variableObj.var==='add'){
                createVariable({
                    type:2,
                    taskId:dataItem.taskId,
                    ...value,
                }).then(res=>{
                    if(res.code===0){
                        onCancel()
                        findVariable()
                    }
                })
                return
            }
            updateVariable({
                type:2,
                varId:variableObj.varId,
                ...value
            }).then(res=>{
                if(res.code===0){
                    onCancel()
                    findVariable()
                }
            })
        })
    }

    const inputHtml = item =>{
        return (
            <Form
                form={formVar}
                layout={"vertical"}
                autoComplete={"off"}
                initialValues={{varType:"str"}}
            >
                <Form.Item
                    label={'变量名'}
                    name={'varKey'}
                    rules={[
                        {required:true,message:"变量名不能为空"},
                        Validation("变量名"),
                        ({ getFieldValue }) => ({
                            validator(rule,value) {
                                let nameArray = []
                                if(item){
                                    nameArray = variableData && variableData.map(list=>list.varKey).filter(list=>list!==item.varKey)
                                } else {
                                    nameArray = variableData && variableData.map(list=>list.varKey)
                                }
                                if (nameArray.includes(value)) {
                                    return Promise.reject("变量名已经存在");
                                }
                                return Promise.resolve()
                            },
                        }),
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={'类别'}
                    name={'varType'}
                    rules={[{required:true,message:"变量名不能为空"}]}
                >
                    <Select
                        showArrow={showArrow}
                        onMouseEnter={()=>setShowArrow(true)}
                        onMouseLeave={()=>setShowArrow(false)}
                    >
                        <Select.Option value={"str"}>字符串</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={'变量'}
                    name={'varValue'}
                    rules={[
                        {required:true,message:"变量名不能为空"},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <div className="inputs-variable-btn">
                    <Button onClick={()=>onCancel()} title={"取消"} isMar={true}/>
                    <Button onClick={()=>onOk(item)} title={"保存"} type={"primary"}/>
                </div>
            </Form>
        )
    }

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
                <Button
                    title={"添加变量"}
                    type={"link-nopadding"}
                    onClick={()=>addInput()}
                />
            </div>
            <div className="pose-variable-content">
                {variableObj?.var==='add' && inputHtml()}
                {
                    variableData && variableData.length>0 ?
                    variableData.map((item,index)=>renderInputs(item,index))
                    :
                    <ListEmpty />
                }
            </div>
        </div>
    )
}

export default inject("variableStore")(observer(Variable))
