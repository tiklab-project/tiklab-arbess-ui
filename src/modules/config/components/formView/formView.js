import React,{useState,useEffect} from "react";
import  "./formView.scss";
import {Form,Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import ConfigAddNewStage from "./configAddNewStage";
import ConfigCode from "./configCode";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import ConfigSwitch from "./configSwitch";
import Forms from "../configForm/forms";

const formView = props =>{

    const {form,del,configDataStore,onFinish,pipelineId} = props

    const {setIsPrompt,data,setData,formInitialValues,setFormInitialValues,setCodeType,codeType,
        setBuildType,setDeployType,deployType
    } = configDataStore

    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipelineId])

    // 删除部分构建配置
    const deletePart = group =>{
        del(group.dataType)
        for (let i = 0 ;i<data.length;i++){
            if(data[i].dataType === group.dataType){
                data.splice(i,1)
            }
            setData([...data])
        }
    }

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    const renderTitle = dataType =>{
        switch (parseInt(dataType)) {
            case 11:
                return "测试"
            case 21:
            case 22:
                return "构建"
            case 31:
            case 32:
                return "部署"
        }
    }

    const newStage = data =>{
        return data && data.map((group,index)=>{
            return  <div className="formView-wrapper" key={index} >
                        <div className="formView-wrapper-Headline">
                            <div className="desc">
                                <span className="desc-delete">
                                    <Popconfirm
                                        title="当前项的所有数据会被清空"
                                        onConfirm={()=>deletePart(group)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <DeleteOutlined />
                                    </Popconfirm>
                                </span>
                                <span className="desc-title">
                                    {renderTitle(group.dataType)}
                                </span>
                            </div>
                        </div>
                        <ConfigSwitch type={group.dataType}/>
                        <div className="formView-wrapper-forms">
                            <Forms type={group.dataType}/>
                        </div>
                    </div>
        })
    }

    return(
        <div className="formView">
            <div className="formView-content">
                <Form
                    id="form"
                    form={form}
                    autoComplete="off"
                    scrollToFirstError={true}
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    initialValues={{[deployType+"deployType"]:1}}
                >
                    <ConfigCode
                        codeType={codeType}
                        setCodeType={setCodeType}
                        codeVisible={codeVisible}
                        setCodeVisible={setCodeVisible}
                        setIsPrompt={setIsPrompt}
                        del={del}
                    />
                    { newStage(data) }
                    {
                        data && data.length < 3 ?
                            <ConfigAddNewStage
                                data={data}
                                setData={setData}
                                newStageVisible={newStageVisible}
                                setNewStageVisible={setNewStageVisible}
                                setIsPrompt={setIsPrompt}
                                setBuildType={setBuildType}
                                setDeployType={setDeployType}
                            />
                            :null
                    }
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject("configDataStore")(observer(formView)))