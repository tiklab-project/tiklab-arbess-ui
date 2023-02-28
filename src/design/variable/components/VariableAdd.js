import React,{useState,useEffect} from "react";
import {Modal,Form,Input,Select,message} from "antd";
import {PlusOutlined,MinusCircleOutlined } from "@ant-design/icons";
import Btn from "../../../common/btn/Btn";
import {autoHeight} from "../../../common/client/Client";
import ModalTitle from "../../../common/modalTitle/ModalTitle";

/**
 * 变量添加编辑
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const VariableAdd = props =>{

    const {variableVisible,setVariableVisible,formValue,createVariable,pipelineId,updateVariable} = props

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    useEffect(()=>{
        if(variableVisible){
            // 表单初始
            if(formValue){
                form.setFieldsValue({...formValue})
                return
            }
            form.resetFields()
        }
    },[variableVisible])

    /**
     * 变量添加编辑确定
     * @param values
     */
    const onOk = values =>{
        if(formValue){
            const params = {
                ...values,
                type:1,
                varId:formValue.varId
            }
            updateVariable(params).then(res=>{
                res.code===0 && message.info("更新成功",0.5)
            })
        }else {
            const params = {
                ...values,
                type:1,
                taskId:pipelineId,
            }
            createVariable(params).then(res=>{
                res.code===0 && message.info("添加成功",0.5)
            })
        }
        setVariableVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setVariableVisible(false)}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields()
                            onOk(values)
                        })
                }}
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    const [opt,setOpt] = useState([])

    // 聚焦获取默认选项
    const fouceVarValue = () =>{
        const list = form.getFieldValue("valueList")
        let newArr = []
        list && list.map(item=>{
            item && newArr.push(item)
        })
        setOpt([...newArr])
    }

    // chang可选项
    const changeValueList = () =>{
        const list = form.getFieldValue("valueList").some(item=>item===form.getFieldValue("varValue"))
        !list && form.setFieldsValue({varValue:null})
    }

    return(
        <Modal
            visible={variableVisible}
            onCancel={()=>setVariableVisible(false)}
            closable={false}
            destroyOnClose={true}
            footer={modalFooter}
            style={{height:height,top:60}}
            width={500}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="variable-modal">
                <div className="variable-modal-up">
                    <ModalTitle setVisible={setVariableVisible} title={"添加变量"}/>
                </div>
                <div className="variable-modal-content">
                    <Form
                        form={form}
                        layout={"vertical"}
                        initialValues={{valueList:[""],taskType:1}}
                    >
                        <Form.Item name="varKey" label="变量名" rules={[{required:true,message:"变量名不能为空"}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="taskType" label="类别" rules={[{required:true,message:"类别不能为空"}]}>
                            <Select>
                                <Select.Option value={1}>字符串</Select.Option>
                                <Select.Option value={2}>单选</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item shouldUpdate={(prevValues,currentValues)=> prevValues.taskType!==currentValues.taskType}>
                            {({ getFieldValue })=>
                                getFieldValue("taskType") === 1 ? (
                                    <Form.Item name="varValue" label="默认值" rules={[{required:true,message:"默认值不能为空"}]}>
                                        <Input/>
                                    </Form.Item>) :
                                     <>
                                     <Form.List name="valueList">
                                         {(fields,{add,remove},{errors}) =>{
                                         return(
                                             <>
                                                 {fields.map((field,index) => (
                                                    <Form.Item label={index===0 && "可选项"} required={false} key={field.key}>
                                                        <Form.Item
                                                            {...field}
                                                            key={field.key}
                                                            validateTrigger={["onChange","onBlur"]}
                                                            rules={[{
                                                                    required: index===0,
                                                                    whitespace: true,
                                                                    message: "请输入可选项",
                                                                }]}
                                                            noStyle
                                                         >
                                                            <Input placeholder="可选项" style={{width:"60%",marginRight:30}} onChange={changeValueList}/>
                                                        </Form.Item>
                                                        {fields.length > 1 && <MinusCircleOutlined onClick={()=>{
                                                            remove(field.name)
                                                            changeValueList()
                                                        }}/>}
                                                    </Form.Item>
                                                 ))}
                                                <Form.Item>
                                                    <Btn
                                                        type="link-nopadding"
                                                        title="添加可选项"
                                                        onClick={() => add()}
                                                        icon={<PlusOutlined />}
                                                    />
                                                </Form.Item>
                                             </>
                                         )}}
                                     </Form.List>
                                     <Form.Item name="varValue" label="默认选项">
                                         <Select onFocus={()=>fouceVarValue()} rules={[{required:true,message:"默认选项不能为空"}]} placeholder="默认选项">
                                             {
                                                 opt && opt.map((item,index)=>{
                                                     return <Select.Option value={item} key={index}>{item}</Select.Option>
                                                 })
                                             }
                                         </Select>
                                     </Form.Item>
                                 </>
                            }
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default VariableAdd
