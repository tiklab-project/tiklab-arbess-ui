import React,{useState,useEffect,useRef} from "react";
import  "./formView.scss";
import {Button,Form,Input,message} from "antd";
import {CloseOutlined,EditOutlined} from "@ant-design/icons";
import {getUser} from "doublekit-core-ui";
import moment from "../../../../../common/moment/moment";
import ConfigAddNewStageModal from "../formView/configAddNewStageModal";
import ConfigAddCodeModal from "../formView/configAddCodeModal";
import ChangeConfigSortsDrawer from "../formView/changeConfigSortsDrawer";
import ConfigAddNewStage from "../formView/configAddNewStage";
import ConfigCode from "../formView/configCode";
import ConfigForm from "./configForm";
import ConfigName from "./configName";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";

const FormView = props =>{

    const {form,del,configDataStore,updateConfigure,jumpOrNot} = props

    const {setIsPrompt,data,setData,codeData,setCodeData,formInitialValues,setFormInitialValues,
        isFormAlias,setIsFormAlias,setCodeType,mavenShellBlock,linuxShellBlock,unitShellBlock,
        orderShellBlock,
    } = configDataStore

    const inputRef = useRef()
    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const pipelineId = localStorage.getItem("pipelineId")
    const userId = getUser().userId

    useEffect(()=>{
        if (isFormAlias!==""){
            inputRef.current.focus()
        }
    },[isFormAlias])

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues])

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

    const onFinish = values => {
        //排序
        let codeSort, testSort,structureSort, deploySort = 0
        //配置别名
        let testAlias,structureAlias,deployAlias
        //配置类型
        let testType,structureType,deployType

        switch (codeData){
            case "":
                codeSort = 0
                break
            default:codeSort = 1
        }

        data && data.map((item,index)=>{
            if(item.dataType > 10 && item < 20 ){
                testSort = index + 2
                testAlias = item.title
                testType = item.dataType
            }
            if(item.dataType > 20 && item.dataType < 30){
                structureSort = index + 2
                structureAlias = item.title
                structureType = item.dataType
            }
            if(item.dataType > 30 && item.dataType < 40){
                deploySort = index + 2
                deployAlias = item.title
                deployType = item.dataType
            }
        })

        const configureList = {
            configureCreateTime:moment.moment,
            user:{id:userId,},
            pipeline:{pipelineId:pipelineId},
            pipelineCode:{
                codeId:localStorage.getItem("codeId"),
                sort:codeSort,
                type:codeData && codeData.codeType,
                codeBranch:values.codeBranch,
                codeName:values.codeName,
                proof:{proofId:localStorage.getItem("gitProofId")}
            },
            pipelineTest:{
                testId:localStorage.getItem("testId"),
                sort:testSort,
                testAlias:testAlias,
                type:testType,
                testOrder:unitShellBlock,
            },
            pipelineStructure:{
                structureId:localStorage.getItem("structureId"),
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureType,
                structureAddress:values.structureAddress,
                structureOrder:mavenShellBlock,
            },
            pipelineDeploy:{
                deployId:localStorage.getItem("deployId"),
                sort:deploySort,
                deployAlias:deployAlias,
                type:deployType,
                sshIp:values.sshIp,
                sshPort:values.sshPort,
                deployAddress: values.deployAddress,
                sourceAddress: values.sourceAddress,
                startShell:linuxShellBlock,
                startPort:values.startPort,
                mappingPort:values.mappingPort,
                startAddress:values.startAddress,
                deployType:values.deployType,
                deployOrder:orderShellBlock,
                proof:{ proofId:localStorage.getItem("deployProofId") }
            }
        }
        updateConfigure(configureList).then(res=>{
            setIsPrompt(false)
            if(jumpOrNot){
                props.history.push("/index/task/config")
            }
            if(res.code!==0){
                message.error({content:"配置失败", className:"message"})
            }else {
                message.success({content: "配置成功", className:"message"})
            }
        })
    }

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    const newStage = data =>{
        return data && data.map((group,index)=>{
            return  <div className="configView1-wrapper" key={index} >
                        <div className="configView1-wrapper-Headline">
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
                            <div className="desc-delete" onClick={()=>deletePart(group)}>
                                <CloseOutlined />
                            </div>
                        </div>
                        <div className="desc-name">
                            <ConfigName type={group.dataType}/>
                        </div>
                        <div className="configView1-wrapper-newStage">
                            <ConfigForm type={group.dataType} del={del}/>
                        </div>
                    </div>
        })
    }

    return(
        <div className="configView1">
            <div className="configView1-content">
                <div className="configView1-content-changSort">
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

export default withRouter(inject("configDataStore")(observer(FormView)))