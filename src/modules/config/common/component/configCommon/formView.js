import React, {useState, useEffect,useRef} from "react";
import  './formView.scss';
import {Button, Form, Input} from "antd";
import ConfigAddNewStageModal from "../formView/configAddNewStageModal";
import ConfigAddCodeModal from "../formView/configAddCodeModal";
import ChangeConfigSortsDrawer from "../formView/changeConfigSortsDrawer";
import ConfigAddNewStage from "../formView/configAddNewStage";
import ConfigCode from "../formView/configCode";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import ConfigForm from "./configForm";
import ConfigName from "./configName";

const FormView = props =>{

    const {form,del,configDataStore,onFinish} = props

    const {setIsPrompt,data,setData,codeData,setCodeData,formInitialValues,setFormInitialValues,
        isAlias,setIsAlias,setCodeType,
    } = configDataStore

    const inputRef = useRef();
    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        if (isAlias!==''){
            inputRef.current.focus()
        }
    },[isAlias])

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipelineId])

    const displayInput = index =>{
        setIsAlias(index)
    }

    const hiddenInput = () =>{
        setIsAlias('')
    }

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

    const newStage = () =>{
        return   data && data.map((group,index)=>{
            return(
                <div className='configView1-wrapper' key={index} >
                    <div className='configView1-wrapper-Headline'>
                        {
                            isAlias !== index ?
                                <div style={{display:"inline"}}>
                                    {group.title}
                                    &nbsp; &nbsp;
                                    <span onClick={()=> displayInput(index)} style={{cursor:'pointer'}}>
                                        <EditOutlined />
                                    </span>
                                </div>
                                :
                                <Input
                                    type="text"
                                    ref={inputRef}
                                    onBlur={hiddenInput}
                                    style={{width:100}}
                                    defaultValue={group.title}
                                    onChange={e=>changeInputValue(e,index)}
                                />
                        }
                    </div>
                    <div className='configView1-wrapper-newStage'>
                        <div className='desc'>
                            <div className='desc-head'>
                                <ConfigName type={group.dataType}/>
                            </div>
                            <div className='desc-delete' onClick={()=>deletePart(group)}>
                                <CloseOutlined />
                            </div>
                        </div>
                        <div className='desc-input'>
                            <ConfigForm type={group.dataType}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return(
        <div className='configView1 '>
            <div className='configView1-content'>
                <div style={{textAlign:'right'}}>
                    <Button onClick={()=>setChangeSortVisible(true)}>更改配置顺序</Button>
                </div>
                <Form
                    id='form'
                    form={form}
                    layout='vertical'
                    autoComplete = "off"
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                >
                    <ConfigCode
                        codeData={codeData}
                        setCodeVisible={setCodeVisible}
                        del={del}
                    />
                    { newStage() }
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

export default withRouter(inject('configDataStore')(observer(FormView)))