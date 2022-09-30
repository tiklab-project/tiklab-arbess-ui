import React,{useState,useEffect} from "react";
import  "./formView.scss";
import {Button,Form,Popconfirm} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import ConfigAddNewStageModal from "./configAddNewStageModal";
import ConfigAddCodeModal from "./configAddCodeModal";
import ChangeConfigSortsDrawer from "./changeConfigSortsDrawer";
import ConfigAddNewStage from "./configAddNewStage";
import ConfigCode from "./configCode";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import ConfigForm from "../components/configForm";
import ConfigSwitch from "./configSwitch";
import Forms from "./configForm/forms";

const formView = props =>{

    const {form,del,configDataStore,onFinish,pipelineId} = props

    const {setIsPrompt,data,setData,formInitialValues,setFormInitialValues,setCodeType,codeType} = configDataStore

    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)

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
        switch (dataType) {
            case 11:return "测试"
            case 21:
            case 22:
                return "构建"
            case 31:
            case 32:
                return "部署"
        }
    }

    const newStage = data =>{
        console.log(data)
        return data && data.map((group,index)=>{
            return  <div className="formView-wrapper" key={index} >
                        <div className="formView-wrapper-Headline">
                            <div className="desc">
                                <>
                                    <span className="desc-title">
                                        {renderTitle(group.dataType)}
                                    </span>
                                    <span className="desc-delete">
                                        <Popconfirm
                                            title="当前项数据会被清空"
                                            onConfirm={()=>deletePart(group)}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <Button type="text"><CloseOutlined/></Button>
                                        </Popconfirm>
                                    </span>
                                </>
                            </div>
                        </div>
                        <div className="desc-name">
                            <ConfigSwitch type={group.dataType}/>
                        </div>
                        <div className="formView-wrapper-newStage">
                            <Forms type={group.dataType}/>
                        </div>
                    </div>
        })
    }

    return(
        <div className="formView">
            <div className="formView-content">
                <div className="formView-content-changSort">
                    <Button onClick={()=>setChangeSortVisible(true)}>更改配置顺序</Button>
                </div>
                <Form
                    id="form"
                    form={form}
                    autoComplete="off"
                    scrollToFirstError={true}
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    initialValues={{deployType:1}}
                >
                    <ConfigCode
                        codeType={codeType}
                        setCodeVisible={setCodeVisible}
                        setCodeType={setCodeType}
                    />
                    { newStage(data) }
                    {
                        data && data.length < 3 ?
                            <ConfigAddNewStage setNewStageVisible={setNewStageVisible}/>
                            :null
                    }

                    <div style={{marginTop:20}}>
                        <Button form="form" htmlType="submit" type="primary">保存</Button>
                    </div>
                </Form>

                <ConfigAddNewStageModal
                    data={data}
                    setData={setData}
                    newStageVisible={newStageVisible}
                    setNewStageVisible={setNewStageVisible}
                    setIsPrompt={setIsPrompt}
                />
                <ConfigAddCodeModal
                    codeVisible={codeVisible}
                    setCodeVisible={setCodeVisible}
                    setIsPrompt={setIsPrompt}
                    setCodeType={setCodeType}
                />
                <ChangeConfigSortsDrawer
                    changeSortVisible={changeSortVisible}
                    setChangeSortVisible={setChangeSortVisible}
                    data={data}
                    setData={setData}
                    codeType={codeType}
                    setIsPrompt={setIsPrompt}
                />
            </div>
        </div>
    )
}

export default withRouter(inject("configDataStore")(observer(formView)))