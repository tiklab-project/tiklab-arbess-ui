import React,{useState,useEffect} from "react";
import {Form,message} from "antd";
import {getUser} from "tiklab-core-ui";
import moment from "../../../common/moment/moment";
import ConfigTop from "../components/configTop";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUrlParam} from "../../../common/getUrlParam/getUrlParam";
import ConfigView from "../components/configView";

const ConfigDetails = props =>{

    const {configStore,giteeStore,configDataStore,githubStore,pipelineStore} = props

    const {updateConfigure,findAllConfigure} = configStore
    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {pipelineId,pipelineName} = pipelineStore

    const {setIsPrompt,setData,data,formInitialValues,setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock,setMavenShellBlock,setNodeShellBlock,setCodeType,setOrderShellBlock,setShellBlock,
        mavenShellBlock,linuxShellBlock,shellBlock,deployProofId,setDeployProofId,
        gitProofId,setGitProofId,orderShellBlock,unitShellBlock,codeType,setIsMavenOrNode,
        setIsVirOrDocker,nodeShellBlock,isMavenOrNode,isVirOrDocker} = configDataStore

    const [form] = Form.useForm()
    const [view,setView] = useState("forms")
    const [visible,setVisible] = useState(false)
    const codeValue = getUrlParam("code")
    const codeError = getUrlParam("error")
    const userId = getUser().userId

    // Gitee和Github授权
    useEffect(() => {
        if(codeValue){
            setVisible(true)
            const params = {
                code:codeValue,
                state:1,
            }
            if(localStorage.getItem("giteeCode")){
                code(codeValue).then(res=>{
                    localStorage.setItem("giteeToken",JSON.stringify(res.data))
                    localStorage.removeItem("giteeCode")
                    window.close()
                })
            }
            else if(localStorage.getItem("githubCode")){
                getAccessToken(codeValue).then(res=>{
                    localStorage.setItem("githubToken",res.data)
                    localStorage.removeItem("githubCode")
                    window.close()
                })
            }
            getState(params)
        }
        if(codeError){
            setVisible(true)

            const params = {
                code:codeError,
                state:1,
            }
            getState(params)
            window.close()
        }
    }, [])

    const lists = [1,2,3,4,5,11,21,22,31,32]
    // 表单初始化
    const newData = []
    useEffect(()=>{
        if(pipelineId){
            findAllConfigure(pipelineId).then(res=>{
                const initialData = res.data
                if(res.code===0){
                    if(initialData.length === 0 ){
                        setData([])
                        form.resetFields()
                        setFormInitialValues({})
                        setUnitShellBlock("")
                        setMavenShellBlock("")
                        setLinuxShellBlock("")
                        setOrderShellBlock("")
                        setGitProofId("")
                        setDeployProofId("")
                    }
                    else {
                        nonForm(initialData)
                        renderFormData(initialData)
                    }
                }
            })
        }
    },[pipelineId])

    // pipeline切换form数据渲染问题
    const nonForm = initialData =>{
        for (let i=0; i<initialData.length;i++){
            for (let j=0; j<lists.length;j++) {
                const type = parseInt(initialData[i].type/10)
                if (type*10 < lists[j] && (type+1) *10 > lists[j]) {
                    lists.splice(j, 1)
                    j--
                }
            }
        }
        // return lists.map(item=>{del(item,"111")})
    }

    // 表单数据渲染
    const renderFormData = initialData => {
        for (let i = 0;i<initialData.length;i++){
            const data = initialData[i]
            if(data.type < 6){
                renderCodeData(data)
            }
            else if(data.type > 10 && data.type < 20){
                renderTestData(data)
            }
            else if(data.type > 20 && data.type < 30 ){
                renderBuild(data)
                setIsMavenOrNode(data.type)
            }
            else if(data.type > 30 || data.type < 40 ){
                renderDeploy(data)
                setIsVirOrDocker(data.type)
            }
            setData([...newData])
            Object.assign(formInitialValues,data)
            setFormInitialValues({...formInitialValues})
        }
    }

    const renderCodeData = data => {
        let formValue
        switch (data.type) {
            case 1:
                formValue = {
                    gitCodeName:data.codeName,
                    gitCodeBranch:data.codeBranch,
                    gitCodeProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")",
                    proofName:data.proof && data.proof.proofName ,
                }
                break
            case 2:
                formValue = {
                    giteeCodeName:data.codeName,
                    giteeCodeBranch:data.codeBranch,
                    giteeCodeProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")",
                    proofName:data.proof && data.proof.proofName ,
                }
                break
            case 3:
                formValue = {
                    githubCodeName:data.codeName,
                    githubCodeBranch:data.codeBranch,
                    githubCodeProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")",
                    proofName:data.proof && data.proof.proofName ,
                }
                break
            case 4:
                formValue = {
                    gitlabCodeName:data.codeName,
                    gitlabCodeBranch:data.codeBranch,
                    gitlabCodeProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")",
                    proofName:data.proof && data.proof.proofName ,
                }
                break
            case 5:
                formValue = {
                    svnCodeName:data.codeName,
                    svnCodeProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")",
                    proofName:data.proof && data.proof.proofName ,
                }
        }
        Object.assign(formInitialValues,formValue)
        setGitProofId(data.proof && data.proof.proofId)
        setCodeType(data.type)
    }

    const renderTestData = data =>{
        newData.push({
            dataId:data.testId,
            dataType:data.type,
        })
        setUnitShellBlock(`${data.testOrder ? data.testOrder :""}`)
    }
    
    const renderBuild = data => {
        let formValue
        newData.push({
            dataId: data.buildId,
            dataType:data.type,
        })
        switch (data.type){
            case 21:
                formValue={
                    mavenBuildAddress: data.buildAddress
                }
                setMavenShellBlock(`${data.buildOrder ? data.buildOrder : ""}`)
                break
            case 22:
                formValue={
                    nodeBuildAddress: data.buildAddress
                }
                setNodeShellBlock(`${data.buildOrder ? data.buildOrder : ""}`)
        }
        Object.assign(formInitialValues,formValue)
    }
    
    const renderDeploy = data => {
        let formValue
        newData.push({
            dataId:data.deployId,
            dataType:data.type,
        })
        switch (data.type) {
            case 31:
                formValue={
                    virProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")" ,
                }
                if(data.deployType===0){
                    setLinuxShellBlock(`${data.startShell ? data.startShell : ""}`)
                }else {
                    setShellBlock(`${data.startShell ? data.startShell : ""}`)
                }
                break
            case 32:
                formValue={
                    dockerSourceAddress:data.sourceAddress,
                    dockerSshIp:data.sshIp,
                    dockerSshPort:data.sshPort,
                    dockerDeployAddress:data.deployAddress,
                    dockerDeployOrder:data.deployOrder,
                    dockerProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")" ,
                }
        }
        Object.assign(formInitialValues,formValue)
        setDeployProofId(data.proof && data.proof.proofId)
        setOrderShellBlock(`${data.deployOrder ? data.deployOrder : ""}`)
    }

    const onFinish = values => {
        //排序
        let codeSort, testSort,buildSort, deploySort = 0
        //配置类型
        let testType,buildType,deployType
        // 源码管理
        let codename,codeBranch

        switch (codeType) {
            case 1:
                codename = values.gitCodeName
                codeBranch = values.gitCodeBranch
                break
            case 2:
                codename = values.giteeCodeName
                codeBranch = values.giteeCodeBranch
                break
            case 3:
                codename = values.gitlabCodeName
                codeBranch = values.gitlabCodeBranch
                break
            case 4:
                codename = values.githubCodeName
                codeBranch = values.githubCodeBranch
                break
            case 5:
                codename = values.gitCodeName
                codeBranch = values.gitCodeBranch
                break
        }

        switch (codeType){
            case "":
                codeSort = 0
                break
            default:codeSort = 1
        }

        data && data.map((item,index)=>{
            if(item.dataType > 10 && item.dataType < 20 ){
                testSort = index + 2
                testType = item.dataType
            }
            if(item.dataType > 20 && item.dataType < 30){
                buildSort = index + 2
                buildType = item.dataType
            }
            if(item.dataType > 30 && item.dataType < 40){
                deploySort = index + 2
                deployType = item.dataType
            }
        })

        const configureList = {
            pipelineCode:{
                codeId:formInitialValues && formInitialValues.codeId,
                sort:codeSort,
                type:codeType,
                codeBranch:codeBranch,
                codeName:codename,
                proof:{proofId:gitProofId},
                pipeline:{pipelineId:pipelineId},
            },
            pipelineTest:{
                testId:formInitialValues && formInitialValues.testId,
                sort:testSort,
                type:testType,
                testOrder:unitShellBlock,
                pipeline:{pipelineId:pipelineId},
            },
            pipelineBuild:{
                buildId:formInitialValues && formInitialValues.buildId,
                sort:buildSort,
                type:buildType,
                buildAddress:isMavenOrNode===21?values.mavenBuildAddress:values.nodeBuildAddress,
                buildOrder:isMavenOrNode===21?mavenShellBlock:nodeShellBlock,
                pipeline:{pipelineId:pipelineId},
            },
            pipelineDeploy:{
                deployId:formInitialValues && formInitialValues.deployId,
                sort:deploySort,
                type:deployType,
                deployType:values.deployType,
                proof:{proofId:deployProofId},
                pipeline:{pipelineId:pipelineId},
            }
        }
        updateConfigure(configureList).then(res=>{
            setIsPrompt(false)
            if(res.code!==0){
                message.error({content:"配置失败",className:"message"})
            }else {
                message.success({content:"配置成功",className:"message"})
            }
        })
    }

    if(visible){return  null}

    return (
        <div className="home-limited">
            <div className="config-top home-limited">
                <ConfigTop
                    userId={userId}
                    view={view}
                    setView={setView}
                    pipelineId={pipelineId}
                    pipelineName={pipelineName}
                />
            </div>
            <ConfigView
                view={view}
                form={form}
                onFinish={onFinish}
                pipelineStore={pipelineStore}
                configDataStore={configDataStore}
            />
        </div>
    )
}

export default  withRouter(inject("configStore","giteeStore","configDataStore",
                "githubStore","pipelineStore")(observer(ConfigDetails)))