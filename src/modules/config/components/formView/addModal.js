import React, {useEffect,useState} from "react";
import {Modal,message,Button,Form} from "antd";
import {inject,observer} from "mobx-react";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import "./addModal.scss";
import AddModalStepOne from "./addModalStepOne";
import AddModalStepTwo from "./addModalStepTwo";

const AddModal = props =>{

    const {initType,setInitType,lis,configDataStore,configStore,pipelineStore,setVisible,visible} = props

    const {setCodeType,setBuildType,setDeployType,data,setData,setIsCode,
        formInitialValues,setFormInitialValues,unitShellBlock,
        deployShellBlock,deployOrderShellBlock,virShellBlock,buildShellBlock,
    } = configDataStore

    const {updateConfigure,setIsAddType} = configStore
    const {pipelineId} = pipelineStore
    const [form] = Form.useForm()

    const [current,setCurrent] = useState(0)
    const [type,setType] = useState(1)

    useEffect(()=>{
        if(visible){
            setIsAddType(false)
            current===1 && form.resetFields()
        }
        return ()=>{
            setIsAddType(true)
            setCurrent(0)
        }
    },[visible])
    
    const hit = (initType,values) => {
        if( initType>10 && initType<20 && values.testOrder===undefined){
            values.testOrder=unitShellBlock
            setIsCode(true)
        }
        else if(initType>20 && initType<30 && values.buildOrder===undefined){
            values.buildOrder=buildShellBlock
        }
        else if(initType>30 && initType<40 && values.deployType){
            switch (values.deployType) {
                case 1:
                    values.startShell=virShellBlock
                    values.deployOrder=deployOrderShellBlock
                    break
                case 0:
                    values.startShell=deployShellBlock
            }
        }
    }
    
    // 保存
    const onOk = values => {
        hit(initType,values)
        const params = {
            pipeline:{pipelineId},
            message:"create",
            taskType:initType,
            values,
        }
        updateConfigure(params,values).then(res=>{
            if(res.code===0){
                addData(initType,values)
            }
        })
        setVisible(false)
    }

    const newData = [...data]
    const addData = (type,values) =>{
        if(type>10){
            newData.push({
                dataId:type,
                dataType:type
            })
            setData([...newData])
        }
        Object.assign(formInitialValues,values)
        setFormInitialValues({...formInitialValues})
    }

    const add = type =>{
        if(type>0 && type<10){
            setCodeType(type)
        }
        if(type>20 && type<30){
            setBuildType(type)
        }else if(type>30 && type<40){
            setDeployType(type)
        }
    }

    // 判断类型是否存在
    const isExist = () => {
        const params = {
            pipeline:{pipelineId},
            message:"judge",
            taskType:initType,
        }
        updateConfigure(params).then(res=>{
            if(res.code===50001){
                message.info(res.msg)
            }if(res.code===0){
                setCurrent(current + 1)
            }
        })
    }

    const previous = () => {
        setCurrent(current - 1)
    }

    // 表单底部内容
    const modalFooter = (
        <div className="steps-action">
            {current === 0 && (
                <Button onClick={()=>setVisible(false)}>
                    取消
                </Button>
            )}
            {current > 0 && (
                <Button  onClick={()=>previous()}>
                    上一步
                </Button>
            )}
            {current < 1 && (
                <Button type="primary" onClick={()=> isExist()}>
                    下一步
                </Button>
            )}
            {current === 1 && (
                <Button type="primary"
                        onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    onOk(values)
                                })
                        }}
                >
                    保存
                </Button>
            )}
        </div>
    )

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            footer={modalFooter}
            closable={false}
            width={800}
        >
            <ModalTitle
                setVisible={setVisible}
                title={"选择任务组"}
            />
            <div className="codeOrNewStage">
                {
                    current===1?
                        <AddModalStepTwo
                            initType={initType}
                            form={form}
                        />
                        :
                       <AddModalStepOne
                           add={add}
                           lis={lis}
                           type={type}
                           setType={setType}
                           initType={initType}
                           setInitType={setInitType}
                       />
                }
            </div>
        </Modal>
    )
}

export default inject("configDataStore","configStore","pipelineStore")(observer(AddModal))