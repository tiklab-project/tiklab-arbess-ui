import React,{useEffect,useState} from 'react'
import  {Button ,Form} from "antd";
import  './configDetails.scss'
import {withRouter} from "react-router-dom";
import ConfigDetailsTop from "./configDetailsTop";
import ConfigDetailsSourceCode from "./configDetailsSourceCode";
import ConfigDetailsTest from "./configDetailsTest";
import ConfigDetailsStructure from "./configDetailsStructure";
import ConfigDetailsDeploy from "./configDetailsDeploy";
import {inject, observer} from "mobx-react";
import moment from "../../../../common/moment/moment";

//滚动
const handleScroll = () =>{
    //浏览器滚动的高度
    const scrollTop=document.body.scrollTop

    const lis=document.getElementsByClassName('config-details-anchor-d')
    const a=document.getElementById('a').offsetTop-55
    const b=document.getElementById('b').offsetTop-55
    const c=document.getElementById('c').offsetTop-55
    const d=document.getElementById('d').offsetTop-55

    if(scrollTop > a && scrollTop < b){
        lis.item(0).classList.add("config-details-anchor-active")
        lis.item(1).classList.remove("config-details-anchor-active")
        lis.item(2).classList.remove("config-details-anchor-active")
        lis.item(3).classList.remove("config-details-anchor-active")
    }

    if(scrollTop>=b && scrollTop<c){
        lis.item(1).classList.add("config-details-anchor-active")
        lis.item(0).classList.remove("config-details-anchor-active")
        lis.item(2).classList.remove("config-details-anchor-active")
        lis.item(3).classList.remove("config-details-anchor-active")
    }

    if(scrollTop>c && scrollTop<d){
        lis.item(2).classList.add("config-details-anchor-active")
        lis.item(0).classList.remove("config-details-anchor-active")
        lis.item(1).classList.remove("config-details-anchor-active")
        lis.item(3).classList.remove("config-details-anchor-active")
    }
    if(scrollTop>d){
        lis.item(3).classList.add("config-details-anchor-active")
        lis.item(0).classList.remove("config-details-anchor-active")
        lis.item(1).classList.remove("config-details-anchor-active")
        lis.item(2).classList.remove("config-details-anchor-active")
    }

}

//锚点
const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        const scrollTop=document.body
        const anchorElement = document.getElementById(anchorName)
        if (anchorElement) {
            scrollTop.scrollTop = anchorElement.offsetTop-55;
        }
    }
}

//获取code
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

    const {ConfigStore,ProofStore,GitAuthorizeStore}=props
    const {selectPipelineConfig,updatePipelineConfig}=ConfigStore
    const {createProof,findAllGitProof,findOneGitProof,oneGitProof,allGitProofList
        ,findAllDeployProof,findOneDeployProof,oneDeployProof,allDeployProofList,
        configureId} =ProofStore
    const {url,code} =GitAuthorizeStore

    const codeValue = getUrlParam('code') //code新值

    const [form] = Form.useForm();

    //初始化Radio单选框
    const [sourceValue,setSourceValue]=useState(1)
    const [structure,setStructure]=useState(1)
    const [test,setTest]=useState(1)

    const pipelineId=localStorage.getItem('pipelineId')

    //页面滚动加载
    useEffect(()=> {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll',handleScroll);
        };
    },[])

    //form表单初始化
    useEffect(()=>{
        selectPipelineConfig(pipelineId).then(res=>{
            if ( !res.data ) {
                return false
            }
            else {
                if ( res.data.configureCodeSource){
                    setSourceValue(res.data.configureCodeSource)
                }
                if (res.data.configureCodeStructure){
                    setStructure(res.data.configureCodeStructure)
                }
                if (res.data.configureTestType){
                    setTest(res.data.configureTestType)
                }
                if(res.data.gitProofId){
                    findOneGitProof(res.data.gitProofId)
                }
                if(res.data.deployProofId){
                    findOneDeployProof(res.data.deployProofId)
                }
                form.setFieldsValue(res.data)
            }
        })
        return ()=>{
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('deployProofId')
        }
    },[])

    //授权
    useEffect(() => {
        const se = setTimeout(()=>localStorage.removeItem('code'),500)
        if (codeValue && localStorage.getItem('code')) {
            code(codeValue)
        }
        return () => clearTimeout(se)
    }, [codeValue])

    const onFinish = values =>{
        const configure={
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureBranch:values.configureBranch,
            configureCodeStructure:values.configureCodeStructure,
            configureTestType:values.configureTestType,
            configureTestText:values.configureTestText,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
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
            <div className={'hidden'} />
            <ConfigDetailsTop/>
            <div className='config-details-offset'>
                <div className='config-details-anchor'>
                    <div onClick={()=>scrollToAnchor('a')} className='config-details-anchor-d config-details-anchor-active'>
                        源码管理
                    </div>
                    <div onClick={()=>scrollToAnchor('b')} className='config-details-anchor-d'>
                        单元测试
                    </div>
                    <div onClick={()=>scrollToAnchor('c')} className='config-details-anchor-d'>
                        构建
                    </div>
                    <div onClick={()=>scrollToAnchor('d')} className='config-details-anchor-d'>
                        部署
                    </div>
                </div>
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
                    <div id='a'>
                        <ConfigDetailsSourceCode
                            sourceValue={sourceValue}
                            createProof={createProof}
                            findAllGitProof={findAllGitProof}
                            allGitProofList={allGitProofList}
                            findOneGitProof={findOneGitProof}
                            oneGitProof={oneGitProof}
                            url={url}
                        />
                    </div>
                    <div id='b'>
                        <ConfigDetailsTest
                            test={test}
                        />
                    </div>
                    <div id='c'>
                        <ConfigDetailsStructure
                            structure={structure}
                        />
                    </div>
                    <div id='d'>
                        <ConfigDetailsDeploy
                            createProof={createProof}
                            findAllDeployProof={findAllDeployProof}
                            allDeployProofList={allDeployProofList}
                            findOneDeployProof={findOneDeployProof}
                            oneDeployProof={oneDeployProof}
                        />
                    </div>
                    <Form.Item >
                        <div className='bottom-sticker-inner' id='bottom-sticker'>
                            <Button htmlType='submit' type='primary' style={{marginRight:30}}>
                                保存
                            </Button>
                            <Button>取消</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}


export default withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(ConfigDetails)))
