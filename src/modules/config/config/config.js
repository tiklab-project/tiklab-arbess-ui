import React,{Fragment,useState,useEffect} from "react";
import '../common/style/config.scss';
import {Form} from "antd";
import {withRouter} from "react-router";
import ConfigTop from "./configTop";
import ConfigView2 from "../common/component/configCommon/configView2";
import ConfigView1 from "../common/component/configCommon/configView1";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import {getUrlParam} from '../common/component/configCommon/getUrlParam'
import {inject, observer} from "mobx-react";

const Config = props =>{

    const {ConfigStore,GiteeStore,StructureStore,ConfigDataStore} = props

    const {updateConfigure} = ConfigStore
    const {code} = GiteeStore
    const {pipelineStartStructure,findStructureState} = StructureStore

    const {setIsPrompt, codeName,codeBranch,codeData,setCodeData
    } = ConfigDataStore

    const [form] = Form.useForm();

    const [view,setView] = useState(0)
    const codeValue = getUrlParam('code')
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        return () =>{
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('deployProofId')
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

    const del = i => {
        switch (i) {
            case '单元测试' :
                test()
                break
            case 'maven' :
                structure()
                break
            case 'node':
                structure()
                break
            case 'linux':
                deploy()
                setCodeBlockContent('')
                break
            case 'docker':
                deploy()
                break
            default:
                git()
        }
        setFormInitialValues({...formInitialValues})
    }

    return (
        <Fragment >
            <ConfigTop/>
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


export default  withRouter(inject('ConfigStore', 'GiteeStore',
                    'StructureStore','ConfigDataStore','GithubStore')
                (observer(Config)))