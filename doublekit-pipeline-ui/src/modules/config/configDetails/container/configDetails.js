import React,{useEffect,useState} from 'react'
import { Form } from "antd";
import {withRouter} from "react-router-dom";
import  './configDetails.scss'
import ConfigDetailsTop from "../component/configDetailsTop";
import ConfigDetailsSourceCode from "../component/configDetailsSourceCode";
import ConfigDetailsTest from "../component/configDetailsTest";
import ConfigDetailsStructure from "../component/configDetailsStructure";
import ConfigDetailsDeploy from "../component/configDetailsDeploy";
import Anchor from "../../common/anchor";
import Conserve from "../../common/conserve";
import moment from "../../../../common/moment/moment";
import {inject, observer} from "mobx-react";


const getUrlParam = name => {
    // 取得url中?后面的字符
    const query = window.location.search.substring(1);
    // 把参数按&拆分成数组
    const param_arr = query.split("&");
    for (let i = 0; i < param_arr.length; i++) {
        let pair = param_arr[i].split("=");
        if (pair[0] === name) {
            return pair[1];
        }
    }
    return false;
}

const ConfigDetails = props =>{

    const {ConfigStore,GitAuthorizeStore}=props
    const {selectPipelineConfig,updatePipelineConfig,
       configureId,deployProofList,gitProofList}=ConfigStore
    const {code} = GitAuthorizeStore

    const [form] = Form.useForm();

    //初始化Radio单选框
    const [sourceRadio,setSourceRadio]=useState(1)
    const [testRadio,setTestRadio]=useState(1)
    const [structureRadio,setStructureRadio]=useState(1)
    //锚点样式
    const [anchor,setAnchor] = useState('a')

    const pipelineId=localStorage.getItem('pipelineId')

    //Gitee--code
    const codeValue = getUrlParam('code')

    //Gitee授权
    useEffect(() => {
        const se = setTimeout(()=>localStorage.removeItem('code'),100)
        if (codeValue && localStorage.getItem('code')) {
            code(codeValue).then(res=>{
                window.close()
            })
        }
        return () => clearTimeout(se)
    }, [])

    //页面滚动加载
    useEffect(()=> {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll',handleScroll)
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('deployProofId')
        };
    },[])

    //滚动
    const handleScroll = () =>{
        //浏览器滚动的高度
        const scrollTop=document.body.scrollTop
        const a=document.getElementById('a').offsetTop-55
        const b=document.getElementById('b').offsetTop-55
        const c=document.getElementById('c').offsetTop-55
        const d=document.getElementById('d').offsetTop-55
        if(scrollTop > a && scrollTop < b){
            setAnchor('a')
        }
        if(scrollTop>=b && scrollTop<c){
            setAnchor('b')
        }
        if(scrollTop>c && scrollTop<d){
            setAnchor('c')
        }
        if(scrollTop>d){
            setAnchor('d')
        }
    }
    //锚点
    const scrollToAnchor = (anchorName) => {
        const scrollTop=document.body
        if (anchorName) {
            setAnchor(anchorName)
            const anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                scrollTop.scrollTop = anchorElement.offsetTop-55;
            }
        }
    }

    //form表单初始化
    useEffect(()=>{
        selectPipelineConfig(pipelineId).then(res=>{
            if ( !res.data ) {
                return false
            }
            else {
                const data = res.data
                setSourceRadio(data.configureCodeSource)
                setStructureRadio(data.configureCodeStructure)
                setTestRadio(data.configureTestType)
                switch (data.configureCodeSource){
                    case 2:
                          form.setFieldsValue({
                              gitAddress:data.configureCodeSourceAddress,
                              gitBranch:data.configureBranch,
                              gitOpt:gitProofList.proofName+ "(" + gitProofList.proofUsername + ")" && gitProofList
                          })
                        break
                    case 3:
                        form.setFieldsValue({
                            giteeAddress:data.configureCodeSourceAddress,
                            giteeBranch:data.configureBranch,
                            SourceCode_Git:null,
                        })
                }

                switch (data.configureCodeStructure){
                    case 2:
                        form.setFieldsValue({
                            mavenAddress:data.configureStructureAddress,
                            mavenOrder:data.configureStructureOrder,
                        })
                        break
                    case 3:
                        form.setFieldsValue({
                            nodeAddress:data.configureStructureAddress,
                            nodeOrder:data.configureStructureOrder,
                        })
                }
                form.setFieldsValue({...res.data})
            }
        })
    },[])

    const onFinish = values =>{

        const CodeSourceRadioType = values => {
            switch (values.configureCodeSource ) {
                case 2:
                    return {
                        configureCodeSourceAddress: values.gitAddress,
                        configureBranch: values.gitBranch
                    }
                case 3:
                    return {
                        configureCodeSourceAddress: values.giteeAddress,
                        configureBranch: values.giteeBranch
                    }
            }
        }
        const StructureRadioType = values =>{
             switch (values.configureCodeStructure) {
                 case 2:
                     return {
                         configureStructureAddress: values.mavenAddress,
                         configureStructureOrder:values.mavenOrder
                     }
                 case 3:
                     return {
                         configureStructureAddress: values.nodeAddress,
                         configureStructureOrder:values.nodeOrder
                     }
             }
        }

        const CodeSource = CodeSourceRadioType(values)
        const Structure = StructureRadioType(values)

        const configure = {
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:CodeSource && CodeSource.configureCodeSourceAddress,
            configureBranch:CodeSource && CodeSource.configureBranch,
            configureCodeStructure:values.configureCodeStructure,
            configureStructureAddress:Structure && Structure.configureStructureAddress,
            configureStructureOrder: Structure && Structure.configureStructureOrder,
            configureTestType:values.configureTestType,
            configureTestText:values.configureTestText,
            configureTargetAddress: values.configureTargetAddress,
            configureDeployAddress:values.configureDeployAddress,
            configureShell:values.configureShell,
            configureCreateTime:moment.moment,
            pipelineId: pipelineId,
            configureId: configureId,
            deployProofId: localStorage.getItem('deployProofId'),
            gitProofId:localStorage.getItem('gitProofId'),
        }
        updatePipelineConfig(configure)
        props.history.push('/home/task/work')
    }

    return(
        <div className='config-details  task'>
            <div className='hidden' />
            <ConfigDetailsTop/>
            <div className='config-details-offset'>
                <Anchor
                    scrollToAnchor={scrollToAnchor}
                    anchor={anchor}
                />
                <Form
                    onFinish={onFinish}
                    form={form}
                    initialValues={{
                        "configureCodeStructure":1,
                        "configureCodeSource":1,
                        "configureTestType":1,
                       }}
                    layout="vertical"
                    autoComplete = "off"
                >
                    <ConfigDetailsSourceCode  sourceRadio={sourceRadio}/>
                    <ConfigDetailsTest testRadio={testRadio}/>
                    <ConfigDetailsStructure structureRadio={structureRadio}/>
                    <ConfigDetailsDeploy deployProofList={deployProofList}/>
                    <Conserve/>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject('ConfigStore','GitAuthorizeStore')(observer(ConfigDetails)))
