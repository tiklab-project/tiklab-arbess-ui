import React,{useState,useEffect,useRef} from "react";
import  "./formView.scss";
import {Button,Form,Input,Popconfirm} from "antd";
import {CloseOutlined,EditOutlined} from "@ant-design/icons";
import ConfigAddNewStageModal from "./configAddNewStageModal";
import ConfigAddCodeModal from "./configAddCodeModal";
import ChangeConfigSortsDrawer from "./changeConfigSortsDrawer";
import ConfigAddNewStage from "./configAddNewStage";
import ConfigCode from "./configCode";
import ConfigForm from "../configCommon/configForm";
import ConfigName from "../../../../../common/configName/configName";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";

const formView = props =>{

    const {form,del,configDataStore,onFinish,matFlowId} = props

    const {setIsPrompt,data,setData,codeData,setCodeData,formInitialValues,setFormInitialValues,
        isFormAlias,setIsFormAlias,setCodeType} = configDataStore

    const inputRef = useRef()
    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)

    useEffect(()=>{
        if (isFormAlias!==""){
            inputRef.current.focus()
        }
    },[isFormAlias])

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,matFlowId])

    // 显示文本框
    const displayInput = index =>{
        setIsFormAlias(index)
    }

    // 隐藏文本框
    const hiddenInput = () =>{
        setIsFormAlias("")
    }

    // 改变title
    const changeInputValue = (e,index) =>{
        //深拷贝一次，可以让arr指向单独的内存空间
        let arr = JSON.parse(JSON.stringify(data))
        for(let i = 0 ;i<arr.length;i++){
            if( i === index && e.target.value) {
                arr[i].title = e.target.value
                setIsPrompt(true)
            }
        }
        setData([...arr])
    }

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

    const newStage = data =>{
        return data && data.map((group,index)=>{
            return  <div className="formView-wrapper" key={index} >
                        <div className="formView-wrapper-Headline">
                            <div className="desc">
                                {
                                    isFormAlias === index ?
                                        <Input type="text"
                                               ref={inputRef}
                                               onBlur={hiddenInput}
                                               style={{width:100}}
                                               defaultValue={group.title}
                                               onChange={e=>changeInputValue(e,index)}
                                        />
                                        :
                                        <>
                                            <span className="desc-title">{group.title}</span>
                                            <span onClick={()=> displayInput(index)}>
                                                <EditOutlined />
                                            </span>
                                        </>
                                }
                            </div>
                            <div className="desc-delete">
                                <Popconfirm
                                    title="当前项数据会被清空"
                                    onConfirm={()=>deletePart(group)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button type="text"><CloseOutlined/></Button>
                                </Popconfirm>
                            </div>
                        </div>
                        <div className="desc-name">
                            <ConfigName type={group.dataType}/>
                        </div>
                        <div className="formView-wrapper-newStage">
                            <ConfigForm type={group.dataType}/>
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
                        codeData={codeData}
                        setCodeVisible={setCodeVisible}
                        del={del}
                    />
                    { newStage(data) }
                    <ConfigAddNewStage setNewStageVisible={setNewStageVisible}/>
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
                    setCodeData={setCodeData}
                    setIsPrompt={setIsPrompt}
                    setCodeType={setCodeType}
                />
                <ChangeConfigSortsDrawer
                    changeSortVisible={changeSortVisible}
                    setChangeSortVisible={setChangeSortVisible}
                    data={data}
                    setData={setData}
                    codeData={codeData}
                    setIsPrompt={setIsPrompt}
                />
            </div>
        </div>
    )
}

export default withRouter(inject("configDataStore")(observer(formView)))