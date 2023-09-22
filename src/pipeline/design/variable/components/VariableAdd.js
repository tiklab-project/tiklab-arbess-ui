import React,{useState,useEffect} from "react";
import {Form,Input,Select,message} from "antd";
import Modals from "../../../../common/component/modal/Modal";
import {Validation} from "../../../../common/utils/Client";

/**
 * 变量添加编辑
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const VariableAdd = props =>{

    const {variableVisible,setVariableVisible,formValue,createVariable,pipelineId,updateVariable,
        variableData,
    } = props

    const [form] = Form.useForm()

    useEffect(()=>{
        if(variableVisible){
            // 表单初始
            if(formValue){
                form.setFieldsValue({
                    ...formValue,
                    valueList:formValue.varType==="str"?[formValue.varValue]:formValue.valueList
                })
                return
            }
            form.resetFields()
        }
    },[variableVisible])

    /**
     * 变量添加编辑确定
     */
    const onOk = () =>{
        form.validateFields().then((values)=>{
            if(formValue){
                const params = {
                    ...values,
                    type:"pipeline",
                    lastKey:formValue.varKey,
                    pipelineId:pipelineId,
                }
                updateVariable(params).then(res=>{
                    res.code===0 && message.info("更新成功",0.5)
                })
            }else {
                const params = {
                    ...values,
                    type:"pipeline",
                    pipelineId:pipelineId,
                }
                createVariable(params).then(res=>{
                    res.code===0 && message.info("添加成功",0.5)
                })
            }
            setVariableVisible(false)
        })
    }

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
        <Modals
            visible={variableVisible}
            onCancel={()=>setVariableVisible(false)}
            onOk={onOk}
            width={500}
            title={formValue?"修改":"添加"}
        >
            <div className="variable-modal">
                <Form
                    form={form}
                    layout={"vertical"}
                    autoComplete={"off"}
                    initialValues={{valueList:[""],varType:"str"}}
                >
                    <Form.Item
                        name="varKey"
                        label="变量名"
                        rules={[
                            {required:true,message:"变量名不能为空"},
                            Validation("变量名"),
                            ({ getFieldValue }) => ({
                                validator(rule,value) {
                                    let nameArray = []
                                    if(variableData){
                                        nameArray = variableData && variableData.map(item=>item.varKey)
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
                    <Form.Item name="varType" label="类别" rules={[{required:true,message:"类别不能为空"}]}>
                        <Select>
                            <Select.Option value={"str"}>字符串</Select.Option>
                            {/*<Select.Option value={"single"}>单选</Select.Option>*/}
                        </Select>
                    </Form.Item>
                    <Form.Item name="varValue" label="默认值" rules={[{required:true,message:"默认值不能为空"}]}>
                        <Input/>
                    </Form.Item>
                    {/*<Form.Item shouldUpdate={(prevValues,currentValues)=> prevValues.varType!==currentValues.varType}>*/}
                    {/*    {({ getFieldValue })=>*/}
                    {/*        getFieldValue("varType") === 1 ? (*/}
                    {/*            <Form.Item name="varValue" label="默认值" rules={[{required:true,message:"默认值不能为空"}]}>*/}
                    {/*                <Input/>*/}
                    {/*            </Form.Item>) :*/}
                    {/*             <>*/}
                    {/*             <Form.List name="valueList">*/}
                    {/*                 {(fields,{add,remove},{errors}) =>{*/}
                    {/*                 return(*/}
                    {/*                     <>*/}
                    {/*                         {fields.map((field,index) => (*/}
                    {/*                            <Form.Item label={index===0 && "可选项"} required={false} key={field.key}>*/}
                    {/*                                <Form.Item*/}
                    {/*                                    {...field}*/}
                    {/*                                    key={field.key}*/}
                    {/*                                    validateTrigger={["onChange","onBlur"]}*/}
                    {/*                                    rules={[{*/}
                    {/*                                            required: index===0,*/}
                    {/*                                            whitespace: true,*/}
                    {/*                                            message: "请输入可选项",*/}
                    {/*                                        }]}*/}
                    {/*                                    noStyle*/}
                    {/*                                 >*/}
                    {/*                                    <Input placeholder="可选项" style={{width:"60%",marginRight:30}} onChange={changeValueList}/>*/}
                    {/*                                </Form.Item>*/}
                    {/*                                {fields.length > 1 && <MinusCircleOutlined onClick={()=>{*/}
                    {/*                                    remove(field.name)*/}
                    {/*                                    changeValueList()*/}
                    {/*                                }}/>}*/}
                    {/*                            </Form.Item>*/}
                    {/*                         ))}*/}
                    {/*                        <Form.Item>*/}
                    {/*                            <Btn*/}
                    {/*                                type="link-nopadding"*/}
                    {/*                                title="添加可选项"*/}
                    {/*                                onClick={() => add()}*/}
                    {/*                                icon={<PlusOutlined />}*/}
                    {/*                            />*/}
                    {/*                        </Form.Item>*/}
                    {/*                     </>*/}
                    {/*                 )}}*/}
                    {/*             </Form.List>*/}
                    {/*             <Form.Item name="varValue" label="默认选项"  rules={[{required:true,message:"默认选项不能为空"}]} >*/}
                    {/*                 <Select onFocus={()=>fouceVarValue()} placeholder="默认选项">*/}
                    {/*                     {*/}
                    {/*                         opt && opt.map((item,index)=>{*/}
                    {/*                             return <Select.Option value={item} key={index}>{item}</Select.Option>*/}
                    {/*                         })*/}
                    {/*                     }*/}
                    {/*                 </Select>*/}
                    {/*             </Form.Item>*/}
                    {/*         </>*/}
                    {/*    }*/}
                    {/*</Form.Item>*/}
                </Form>
            </div>
        </Modals>
    )
}

export default VariableAdd
