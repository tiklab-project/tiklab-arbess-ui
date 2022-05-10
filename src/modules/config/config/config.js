import React,{Fragment,useState,useEffect} from "react";
import '../common/style/config.scss';
import ConfigTop from "./configTop";
import Config_view1 from "../common/component/config_common/config_view1";
import Config_view2 from "../common/component/config_common/config_view2";
import Config_changeView from "../common/component/config_common/config_changeView";
import {Form, Modal} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Prompt} from "react-router-dom";
import {getUrlParam} from '../common/component/config_form/getUrlParam'

const Config = props =>{

    const {ConfigStore,ProofStore,GitAuthorizeStore,StructureStore} = props

    const {updateConfigure,findAllConfigure} = ConfigStore
    const {createProof,findAllGitProof,allGitProofList,findAllDeployProof,allDeployProofList
    } = ProofStore
    const {code} = GitAuthorizeStore
    const {pipelineStartStructure,findStructureState} = StructureStore

    const [form] = Form.useForm();
    const [formInitialValues, setFormInitialValues] = useState({})
    const [view,setView] = useState(0)
    const [codeData, setCodeData] = useState({})
    const [data,setData] = useState([])
    const [isPrompt, setIsPrompt] = useState(false);

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
        }
    },[])

    //Gitee授权
    useEffect(() => {
        const se = setTimeout(()=>localStorage.removeItem('code'),100)
        if (codeValue && localStorage.getItem('code')) {
            code(codeValue).then(res=>{
                localStorage.setItem('AccessToken',JSON.stringify(res.data))
                window.close()
            })
        }
        return () => clearTimeout(se)
    }, [])

    const confirmLeave = pathname =>{
        setIsPrompt(false)
        if(pathname!=='/home/task/config'){
            pathname && setTimeout(()=>{
                props.history.push(pathname)
            })
        }
    }

    return (
        <Fragment >
            <ConfigTop/>
            <Config_changeView
                view={view}
                setView={setView}
                pipelineId={pipelineId}
                pipelineStartStructure={pipelineStartStructure}
                findStructureState={findStructureState}
            />
            {
                view === 0 ?
                    <Config_view1
                        formInitialValues={formInitialValues}
                        codeData={codeData}
                        setCodeData={setCodeData}
                        data={data}
                        setData={setData}
                        isPrompt={isPrompt}
                        setIsPrompt={setIsPrompt}
                        form={form}
                        updateConfigure={updateConfigure}
                        createProof={createProof}
                        findAllGitProof={findAllGitProof}
                        allGitProofList={allGitProofList}
                        findAllDeployProof={findAllDeployProof}
                        allDeployProofList={allDeployProofList}
                    />
                    :null
            }
            {
                view === 1 ?
                    <Config_view2
                        formInitialValues={formInitialValues}
                        codeData={codeData}
                        setCodeData={setCodeData}
                        data={data}
                        setData={setData}
                        setIsPrompt={setIsPrompt}
                        form={form}
                        updateConfigure={updateConfigure}
                        createProof={createProof}
                        findAllGitProof={findAllGitProof}
                        allGitProofList={allGitProofList}
                        findAllDeployProof={findAllDeployProof}
                        allDeployProofList={allDeployProofList}
                    />
                    :null
            }

            <Prompt
                when={isPrompt}
                message={location =>{
                    if(!isPrompt){
                        return true
                    }
                    Modal.confirm({
                        title:'有编辑未保存，确定离开吗',
                        okText:'离开',
                        cancelText:'取消',
                        onOk:()=>confirmLeave(location.pathname)
                    })
                    return false
                }}
            />

        </Fragment>
    )
}

export default  withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore','StructureStore')(observer(Config)))