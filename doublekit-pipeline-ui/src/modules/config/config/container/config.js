import React, {useState, useEffect, useRef} from "react";
import '../../common/style/config.scss';
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Button, Form, Input} from "antd";
import OptModal from "../modal/optModal";
import AddCodeModal from "../modal/addCodeModal";
import ChangeConfigSorts_drawer from "../components/changeConfigSorts_drawer";
import ConfigTop from "../components/configTop";
import Config_code from "../components/config_code";
import Config_test from "../components/config_test";
import Config_maven from "../components/config_maven";
import Config_node from "../components/config_node";
import Config_linux from "../components/config_linux";
import Config_docker from "../components/config_docker";
import moment from "../../../../common/moment/moment";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";

const Config = props =>{

    const {ConfigStore} = props
    const {createCode,createTest,createStructure,createDeploy,updateConfigure
    } = ConfigStore

    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const [data, setData] = useState([])
    const [codeData, setCodeData] = useState('' )
    const inputRef = useRef();

    const pipelineId = localStorage.getItem('pipelineId')
    const codeId = localStorage.getItem('codeId')
    const testId = localStorage.getItem('testId')
    const structureId = localStorage.getItem('structureId')
    const deployId = localStorage.getItem('deployId')

    const [step,setStep] = useState('')
    const [inputValue,setInputValue] = useState(  )

    useEffect(()=>{
        if(step!==''){
            inputRef.current.focus()
        }
        return () =>{
            localStorage.removeItem('codeId')
            localStorage.removeItem('testId')
            localStorage.removeItem('structureId')
            localStorage.removeItem('deployId')
        }
    },[])

    const changeConfigSorts = () => {
        setChangeSortVisible(true)
    }

    const displayInput = group =>{
        // inputRef.current.focus({
        //     cursor: 'end',
        // });
        setStep(group.dataId)
    }

    const changeInputValue = (e,index) =>{
        setInputValue(e.target.value)
        //深拷贝一次，可以让arr指向单独的内存空间
        let arr = JSON.parse(JSON.stringify(data))
        for(let i = 0 ;i<arr.length;i++){
            if( i === index ) {
                arr[i].title = e.target.value
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
                    return <Config_test/>
                case 'maven':
                    return <Config_maven/>
                case 'node':
                    return <Config_node/>
                case 'linux':
                    return <Config_linux/>
                case 'docker':
                    return <Config_docker/>
            }
        }
    }

    const formFinish = value => {

        let codeList, testList,structureList,deployList={}

        const dataArray = data && data.map((item) => item.desc)

        switch (codeData.desc){
            case '通用Git':
                codeList = {
                    codeType:1,
                    codeBranch:value.gitBranch,
                    codeName:value.gitCodeName,
                }
                break
            case 'Gitee':{
                codeList = {
                    codeType:2,
                    codeBranch:value.giteeBranch,
                    codeName:value.giteeCodeName,
                }
            }
        }

        for (let i in dataArray){
            switch (dataArray[i]){
                case '单元测试':
                    testList = {
                        testType:11,
                        testOrder : value.testOrder
                    }
                    break
                case 'maven':
                    structureList = {
                        structureType:21,
                        structureAddress:value.mavenAddress,
                        structureOrder:value.mavenOrder
                    }
                    break
                case 'node':
                    structureList = {
                        structureType:22,
                        structureAddress:value.nodeAddress,
                        structureOrder:value.nodeOrder
                    }
                    break
                case 'linux':
                    deployList = {
                        deployType:31,
                        deployAddress: value.linuxAddress,
                        deployTargetAddress:value.linuxProofName,
                        proofName: value.linuxPlace,
                    }
                    break
                case 'docker':
                    deployList = {
                        deployType:32,
                        deployAddress: value.linuxAddress,
                        deployTargetAddress:value.dockerTargetAddress,
                        proofName: value.dockerProofName,
                    }
            }
        }

        const configureList = {
            configureCreateTime:moment.moment,
            pipelineId:pipelineId,
            pipelineCode:{
                codeId:codeId,
                codeType:codeList && codeList.codeType ,
                codeBranch:codeList && codeList.codeBranch,
                codeName:codeList && codeList.codeName,
                proofName:value.gitProofName,
            },
            pipelineTest:{
                testId:testId,
                testType:testList && testList.testType,
                testOrder: testList && testList.testOrder,
            },
            pipelineStructure:{
                structureId:structureId,
                structureType:structureList && structureList.structureType,
                structureAddress:structureList && structureList.structureAddress,
                structureOrder:structureList && structureList.structureOrder,
            },
            pipelineDeploy:{
                deployId:deployId,
                deployType:deployList && deployList.deployType,
                deployAddress: deployList && deployList.deployAddress,
                deployTargetAddress: deployList && deployList.deployTargetAddress,
                proofName: deployList && deployList.proofName,
                deployShell:value.linuxShell,
                dockerPort:value.dockerBootPort,
                mappingPort:value.dockerMappingPort,
            }
        }

        console.log('configureList',configureList)
        updateConfigure(configureList)
        props.history.push('/home/task/config')
    }

    const newStage = () =>{

        console.log('data',data)

        return  data && data.map((group,index)=>{
            return(
                <div className='config-details-wrapper' key={index}>
                    <div
                        className='config-details-Headline'
                    >
                        {
                            step !== group.dataId ?
                                <div style={{display:"inline"}}>
                                    {group.title}
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
                        &nbsp; &nbsp;
                        <span onClick={()=> displayInput(group)}>
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
                            { inputContent(group) }
                        </div>
                    </div>
                </div>
            )
        })
    }

    useEffect(()=>{
        return () =>localStorage.removeItem('data')
    },[])

    return(
        <div className='config-details '>
            <ConfigTop/>
            <div className='config-details-content'>
                <div className='config-details-right'>
                    <div className='config-details-right-all'>
                        <div style={{textAlign:'right'}}>
                            <Button onClick={changeConfigSorts}>更改配置顺序</Button>
                        </div>
                        <div>
                            <Form
                                layout='vertical'
                                autoComplete = "off"
                                onFinish={formFinish}
                            >
                                <Config_code
                                    codeData={codeData}
                                    setCodeVisible={setCodeVisible}
                                />
                                { newStage()}

                                <div className='config-details-tail'>
                                    <div className='config-details-Headline'>新阶段</div>
                                    <div
                                        className='config-details-handle'
                                        onClick={()=> setNewStageVisible(true)}
                                    >新任务</div>
                                </div>
                                <Form.Item style={{marginTop:20}}>
                                    <Button htmlType="submit" type='primary'>保存</Button>
                                </Form.Item>
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

            </div>

        </div>
    )
}

export default withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(Config)))