import React,{Fragment,useState,useEffect} from "react";
import '../common/style/config.scss';
import ConfigTop from "./configTop";
import Config_view1 from "../common/component/config_common/config_view1";
import Config_view2 from "../common/component/config_common/config_view2";
import Config_changeView from "../common/component/config_common/config_changeView";
import {Form, Modal} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {getUrlParam} from '../common/component/config_form/getUrlParam'

const Config = props =>{

    const {ConfigStore,ProofStore,GitAuthorizeStore,StructureStore,ConfigCommonStore} = props

    const {updateConfigure} = ConfigStore
    const {createProof,findAllGitProof,allGitProofList,findAllDeployProof,allDeployProofList
    } = ProofStore
    const {code} = GitAuthorizeStore
    const {pipelineStartStructure,findStructureState} = StructureStore
    const {isPrompt,setIsPrompt} = ConfigCommonStore

    const [form] = Form.useForm();
    const [formInitialValues, setFormInitialValues] = useState({})
    const [view,setView] = useState(0)
    const [codeData, setCodeData] = useState({})
    const [data,setData] = useState([])

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

        </Fragment>
    )
}

export default  withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore','StructureStore','ConfigCommonStore')(observer(Config)))