import React,{Fragment,useState,useEffect} from "react";
import '../common/style/config.scss'
import ConfigView1 from "../common/component/configCommon/configView1";
import ConfigView2 from "../common/component/configCommon/configView2";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import {Form} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {getUrlParam} from '../common/component/configCommon/getUrlParam'
import formResetFields from "../common/component/configForm/formResetFields";

const ConfigDetails = props =>{

    const {ConfigStore,GitAuthorizeStore,StructureStore,ConfigDataStore} = props

    const {updateConfigure,findAllConfigure} = ConfigStore

    const {code} = GitAuthorizeStore
    const {pipelineStartStructure,findStructureState} = StructureStore

    const {setIsPrompt,codeName,codeBranch,setCodeBlockContent,
        formInitialValues, setFormInitialValues,setData,codeData,setCodeData
    } = ConfigDataStore

    const [form] = Form.useForm();

    const [view,setView] = useState(0)
    const codeValue = getUrlParam('code')
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        return () =>{
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('giteeProofId')
            localStorage.removeItem('dockerProofId')
            localStorage.removeItem('linuxProofId')
            localStorage.removeItem('codeId')
            localStorage.removeItem('testId')
            localStorage.removeItem('structureId')
            localStorage.removeItem('deployId')
            // setCodeName('')
            // setCodeBranch('')
            // setCodeData('')
            // setData([])
        }
    },[])

    //Gitee授权
    useEffect(() => {
        const param = {
            code:codeValue
        }
        // const se = setTimeout(()=>localStorage.removeItem('code'),200)
        if (codeValue && localStorage.getItem('code')) {
            code(param).then(res=>{
                console.log(res,'res')
                localStorage.setItem('AccessToken',JSON.stringify(res.data))
                window.close()
            })
        }
        // return () => clearTimeout(se)
    }, [])

    useEffect(()=>{
        if(codeData){
            if(codeData.desc){
                const newCode = {
                    codeName:codeName,
                    codeBranch:codeBranch
                }
                Object.assign(codeData,newCode)
                setCodeData({...codeData})
            }
        }
    },[codeName,codeBranch])

    useEffect(()=>{
        const param = {
            pipelineId:pipelineId
        }
        let newCode = {}
        const newData = []
        findAllConfigure(param).then(res=>{
            const initialData = res.data
            if(initialData.length!==0){
                for (let i = 0;i<initialData.length;i++){
                    const j = initialData[i]
                    if(j.type===1){
                        newCode = {
                            codeId:j.codeId,
                            title:'源码管理',
                            desc: '通用Git' ,
                            codeName:j.codeName,
                            codeBranch:j.codeBranch
                        }
                        localStorage.setItem('gitProofId',j.proof && j.proof.proofId)
                        localStorage.setItem('codeId',j.codeId)
                        setCodeData(newCode)
                        const formValue = {
                            gitBranch:j.codeBranch,
                            gitCodeName:j.codeName,
                            gitProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofUsername + ")" ,
                        }
                        form.setFieldsValue(formValue)
                        Object.assign(formInitialValues,formValue)
                    }else if(j.type===2){
                        newCode = {
                            codeId:j.codeId,
                            title:'源码管理',
                            desc: 'Gitee'
                        }
                        localStorage.setItem('giteeProofId',j.proof && j.proof.proofId)
                        localStorage.setItem('codeId',j.codeId)
                        const formValue = {
                            giteeBranch:j.codeBranch,
                            giteeCodeName:j.codeName,
                        }
                        setCodeData(newCode)
                        form.setFieldsValue(formValue)
                        Object.assign(formInitialValues,formValue)
                    }
                    else if(j.type===11){
                        newData.push({
                            dataId:  j.testId,
                            title:j.testAlias,
                            desc: '单元测试'
                        })
                        localStorage.setItem('testId',j.testId)
                        const formValue = {
                            testOrder:j.testOrder
                        }
                        form.setFieldsValue(formValue)
                        Object.assign(formInitialValues,formValue)
                    } else if(j.type===21){
                        newData.push({
                            dataId: j.structureId,
                            title: j.structureAlias,
                            desc: 'maven'
                        })
                        localStorage.setItem('structureId',j.structureId)
                        const formValue = {
                            mavenAddress:j.structureAddress,
                            mavenOrder:j.structureOrder
                        }
                        form.setFieldsValue(formValue)
                        Object.assign(formInitialValues,formValue)
                    } else if(j.type===22){
                        newData.push({
                            dataId: j.structureId,
                            title: j.structureAlias,
                            desc: 'node'
                        })
                        localStorage.setItem('structureId',j.structureId)
                        const formValue = {
                            nodeAddress:j.structureAddress,
                            nodeOrder:j.structureOrder
                        }
                        form.setFieldsValue(formValue)
                        Object.assign(formInitialValues,formValue)
                    } else if(j.type===31){
                        newData.push({
                            dataId:  j.deployId,
                            title: j.deployAlias,
                            desc: 'linux'
                        })
                        localStorage.setItem('deployId',j.deployId)
                        localStorage.setItem('linuxProofId',j.proof && j.proof.proofId)
                        const formValue = {
                            linuxAddress:j.deployAddress,
                            linuxTargetAddress:j.deployTargetAddress,
                            linuxProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofIp + ")" ,
                        }
                        setCodeBlockContent(`${j.deployShell}`)
                        form.setFieldsValue(formValue)
                        Object.assign(formInitialValues,formValue)
                    } else if(j.type===32){
                        newData.push({
                            dataId:j.deployId,
                            title: j.deployAlias,
                            desc: 'docker'
                        })
                        localStorage.setItem('deployId',j.deployId)
                        localStorage.setItem('dockerProofId',j.proof && j.proof.proofId)
                        const formValue = {
                            dockerAddress:j.deployAddress,
                            dockerTargetAddress:j.deployTargetAddress,
                            dockerProofName:j.proof && j.proof.proofName+ "(" +j.proof.proofIp + ")",
                        }
                        form.setFieldsValue(formValue)
                        Object.assign(formInitialValues,formValue)
                    }
                    setData([...newData])
                    form.setFieldsValue({...j})
                    form.setFieldsValue({...j})
                    setFormInitialValues({...formInitialValues})
                }
            } else{
                setCodeData('')
                setData([])
                form.resetFields();
            }
        })
    },[pipelineId])
    
    const del = i => {
        switch (i) {
            case '单元测试' :
                setFormInitialValues({ ...formResetFields.unit})
                break
            case 'maven' :
                setFormInitialValues({...formResetFields.maven})
                break
            case 'node':
                setFormInitialValues({...formResetFields.node})
                break
            case 'linux':
                setFormInitialValues({...formResetFields.linux})
                break
            case 'docker':
                setFormInitialValues({...formResetFields.docker})
        }
    }

    return (
        <Fragment >
            <ConfigChangeView
                view={view}
                setView={setView}
                setIsPrompt={setIsPrompt}
                pipelineId={pipelineId}
                pipelineStartStructure={pipelineStartStructure}
                findStructureState={findStructureState}
            />
            {
                view === 0 ?
                    <ConfigView1
                        form={form}
                        del={del}
                        updateConfigure={updateConfigure}
                    />
                    :
                    <ConfigView2
                        form={form}
                        del={del}
                        updateConfigure={updateConfigure}
                    />
            }

        </Fragment>
    )
}

export default  withRouter(inject('ConfigStore', 'GitAuthorizeStore',
                'StructureStore','ConfigDataStore')
                (observer(ConfigDetails)))