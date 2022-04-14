import React ,{useState,useEffect} from "react";
import {Button, Form, Input} from "antd";
import OptModal from "../modal/optModal";
import AddCodeModal from "../modal/addCodeModal";
import ChangeConfigSorts_drawer from "./changeConfigSorts_drawer";
import PracticeRight_code from "./practiceRight_code";
import PracticeRight_test from "./practiceRight_test";
import PracticeRight_maven from "./practiceRight_maven";
import PracticeRight_node from "./practiceRight_node";
import PracticeRight_linux from "./practiceRight_linux";
import PracticeRight_docker from "./practiceRight_docker";
import {CloseOutlined,EditOutlined} from "@ant-design/icons";

const PracticeRight = props =>{

    const {createCode,createTest,createStructure,createDeploy,updateConfigure} = props

    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const [data, setData] = useState([])
    const [codeData, setCodeData] = useState('' )

    const pipelineId = localStorage.getItem('pipelineId')


    const configureId = localStorage.getItem('configureId')
    const [step,setStep] = useState('')
    const [inputValue,setInputValue] = useState(  )

    const changeConfigSorts = () => {
        setChangeSortVisible(true)
    }

    const displayInput = (group,index) =>{
        setStep(index)
    }

    const changeInputValue = (e,index) =>{

        setInputValue(e.target.value)

        //深拷贝一次，可以让arr指向单独的内存空间
        let arr = JSON.parse(JSON.stringify(data))
        for(let i = 0 ;i<arr.length;i++){
            if( i === index ) {
                arr[i].step = e.target.value
            }
        }
        setData(arr)
    }

    const hiddenInput = () =>{
        setStep('')
    }

    const deletePart = (group,index) =>{

    }

    const inputContent = group =>{
        if(group){
            switch (group.desc){
                case '单元测试':
                    return <PracticeRight_test/>
                case 'maven':
                    return <PracticeRight_maven/>
                case 'node':
                    return <PracticeRight_node/>
                case 'linux':
                    return <PracticeRight_linux/>
                case 'docker':
                    return <PracticeRight_docker/>
            }
        }
    }

    const newStage = () =>{

        return  data && data.map((group,index)=>{
                    return(
                        <div className='config-details-wrapper' key={group.configureId}>
                            <div
                                className='config-details-Headline'
                            >
                                {
                                    step !== index ?
                                        <div style={{display:"inline"}}>
                                            {group.step}
                                        </div>
                                        :
                                        <Input
                                            onBlur={hiddenInput}
                                            style={{width:100}}
                                            defaultValue={group.step}
                                            onChange={e=>changeInputValue(e,index)}
                                         />
                                }
                                &nbsp; &nbsp;
                                <span onClick={()=>displayInput(group,index)}>
                                    <EditOutlined />
                                </span>
                            </div>
                            <div className='config-details-newStage'>
                                <div className='desc'>
                                    <div className='desc-head'>{group.desc}</div>
                                    <div
                                        id='del'
                                        className='desc-delete'
                                        onClick={()=>deletePart(group,index)}
                                    >
                                        <CloseOutlined />
                                    </div>
                                </div>
                                <div className='desc-input'>
                                    {
                                        inputContent(group)
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
    }

    const onFinish = value => {
        setNewStageVisible(true)
        let configureList={}
        let nameArray = data && data.map((item) => item.desc);
        for (let i in nameArray){
            switch (nameArray[i]){
                case '单元测试':
                    configureList = {
                        configureId:configureId,
                        test:{
                            testOrder : value.testOrder
                        }
                    }
                    break
                case 'maven':
                    configureList = {
                        configureId:configureId,
                        maven:{
                            mavenAddress:value.mavenAddress,
                            mavenOrder:value.mavenOrder
                        }
                    }
                    break
                case 'node':
                    configureList = {
                        configureId:configureId,
                        node:{
                            nodeAddress:value.nodeAddress,
                            nodeOrder:value.nodeOrder
                        }
                    }
                    break
                case 'linux':
                    configureList = {
                        configureId:configureId,
                        linux:{
                            linuxTargetAddress:value.linuxTargetAddress,
                            linuxPlace:value.linuxPlace,
                            linuxAddress:value.linuxAddress,
                            linuxShell:value.linuxShell,
                        }
                    }
                    break
                case 'docker':
                    configureList = {
                        configureId:configureId,
                        docker:{
                            dockerTargetAddress:value.dockerTargetAddress,
                            dockerPlace:value.dockerPlace,
                            dockerBootPort:value.dockerBootPort,
                            dockerMappingPort:value.dockerMappingPort,
                            dockerAddress:value.dockerAddress,
                        }
                    }
                    break
                default:
                    configureList = {
                        configureId:configureId,
                    }
            }
        }
        console.log('configureList',configureList)
        updateConfigure(configureList)
    }

    return(
        <div className='config-details-right'>
            <div className='config-details-right-all'>
                <div style={{textAlign:'right'}}>
                    <Button onClick={changeConfigSorts}>更改配置顺序</Button>
                </div>
                <div>
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <PracticeRight_code
                            codeData={codeData}
                            setCodeVisible={setCodeVisible}
                        />
                        { newStage()}

                        <div className='config-details-tail'>
                            <div className='config-details-Headline'>新阶段</div>
                            {/*<div className='config-details-handle' onClick={b}>新任务</div>*/}
                            <Button htmlType="submit">新任务</Button>
                        </div>
                    </Form>
                </div>

            </div>

            <OptModal
                data={data}
                setData={setData}
                newStageVisible={newStageVisible}
                setNewStageVisible={setNewStageVisible}
                pipelineId={pipelineId}
                createTest={createTest}
                createStructure={createStructure}
                createDeploy={createDeploy}
            />

            <AddCodeModal
                codeVisible={codeVisible}
                setCodeVisible={setCodeVisible}
                setCodeData={setCodeData}
                pipelineId={pipelineId}
                createCode={createCode}
            />

            <ChangeConfigSorts_drawer
                changeSortVisible={changeSortVisible}
                setChangeSortVisible={setChangeSortVisible}
                data={data}
                setData={setData}
            />
        </div>
    )
}

export default PracticeRight