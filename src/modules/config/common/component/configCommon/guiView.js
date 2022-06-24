import React, {Fragment,useState,useRef,useEffect} from "react";
import  './guiView.scss';
import ConfigCode from "../guiView/configCode";
import ConfigAddNewStage from "../guiView/configAddNewStage";
import ConfigAddCodeDrawer from "../guiView/configAddCodeDrawer";
import ConfigAddNewStageDrawer from "../guiView/configAddNewStageDrawer";
import ConfigFormDetailsDrawer from "../guiView/configFormDetailsDrawer";
import {inject, observer} from "mobx-react";
import {Form, Input} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import ConfigName from "./configName";

const GuiView = props =>{

    const {form,configDataStore,del,onFinish} = props

    const {setIsPrompt,data,setData,codeData,setCodeData,formInitialValues,setFormInitialValues,
        isAlias,setIsAlias,codeType,setCodeType} = configDataStore

    const inputRef = useRef();
    const [codeDrawer,setCodeDrawer] = useState(false) // 新建源码抽屉
    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉
    const [taskFormDrawer,setTaskFormDrawer] = useState(false) // 表单详情抽屉
    const [index,setIndex] = useState('')  // 配置位置的插入
    const [newStage,setNewStage] = useState('')

    useEffect(()=>{
        if (isAlias !==''){
            inputRef.current.focus()
        }
    },[isAlias])

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues])

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
            if( i === index  && e.target.value) {
                arr[i].title = e.target.value
                setIsPrompt(true)
            }
        }
        setData([...arr])
    }

    const showStage = item =>{
        setNewStage(item.dataType)
        setTaskFormDrawer(true)
    }
    
    const insertData = (item,index) => {
        setNewStageDrawer(true)
        setIndex(index)
    }

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    const newStageShow = () =>{
        return data && data.map((item,index)=>{
            return(
                <Fragment key={index}>
                    <div className='group-flow'>
                        <div className='group-flow_btn' >
                            <svg
                                className="icon group-flow_btn_i"
                                aria-hidden="true"
                                onClick={()=>insertData(item,index)}
                            >
                                {/*<use xlinkHref="#icon-tianjia"/>*/}
                                <use xlinkHref="#icon-zengjia"/>
                            </svg>
                        </div>
                    </div>
                    <div className='group-table'>
                        <div className='group-head'>
                            <div className='name'>
                                <div  className='label'>
                                    {
                                        isAlias === index ?
                                            <Input
                                                type="text"
                                                ref={inputRef}
                                                onBlur={hiddenInput}
                                                style={{width:100}}
                                                defaultValue={item.title}
                                                onChange={e=>changeInputValue(e,index)}
                                            />
                                            :
                                        <Fragment>
                                            {item.title}
                                            &nbsp; &nbsp;
                                            <span onClick={()=> displayInput(index)} >
                                                <EditOutlined />
                                            </span>
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='newStages'>
                            <div className='newStages-step'>
                                <div className='newStages-content'  >
                                    <div className='newStages-task'>
                                        <div className='newStages-job'>
                                            <div className='newStages-job_text' onClick={()=>showStage(item)}>
                                                <ConfigName type={item.dataType}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }

    return (
        <div className='configView2'>
            <div className='configView2-content'>
                <ConfigCode
                    codeData={codeData}
                    setCodeDrawer={setCodeDrawer}
                    setNewStage={setNewStage}
                    setTaskFormDrawer={setTaskFormDrawer}
                />
                <div className='configView2-main'>
                    <div className='configView2-main_container'>
                        <div className='configView2-main_group'>
                            { newStageShow() }
                            <ConfigAddNewStage
                                setIndex={setIndex}
                                setNewStageDrawer={setNewStageDrawer}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Form
                id='form'
                form={form}
                layout='vertical'
                autoComplete = "off"
                onFinish={onFinish}
                onValuesChange={onValuesChange}
            >
                <ConfigAddCodeDrawer
                    setIsPrompt={setIsPrompt}
                    codeData={codeData}
                    setCodeData={setCodeData}
                    codeDrawer={codeDrawer}
                    setCodeDrawer={setCodeDrawer}
                    codeType={codeType}
                    setCodeType={setCodeType}
                    formInitialValues={formInitialValues}
                />
                <ConfigAddNewStageDrawer
                    setIsPrompt={setIsPrompt}
                    newStageDrawer={newStageDrawer}
                    setNewStageDrawer={setNewStageDrawer}
                    taskFormDrawer={taskFormDrawer}
                    setTaskFormDrawer={setTaskFormDrawer}
                    setNewStage={setNewStage}
                    data={data}
                    setData={setData}
                    index={index}
                    setIndex={setIndex}
                />
                <ConfigFormDetailsDrawer
                    data={data}
                    setData={setData}
                    taskFormDrawer={taskFormDrawer}
                    setTaskFormDrawer={setTaskFormDrawer}
                    newStage={newStage}
                    del={del}
                />
           </Form>
        </div>
    )
}

export default withRouter(inject('configDataStore')(observer(GuiView)))