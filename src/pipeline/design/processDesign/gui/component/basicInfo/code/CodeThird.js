import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsAuth from "../FormsAuth";
import FormsSelect from "../FormsSelect";
import codeThirdStore from "../../../store/CodeThirdStore";
import FormsTool from "../FormsTool";

/**
 * gitPuk | gitee | github | gitlab
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeThird = props =>{

    const {taskStore} = props

    const {
        findGittokRpy,findGittokBranch,
        findGiteeRpy,findGiteeBranch,
        findGithubRpy,findGithubBranch,
        findGitlabRpy,findGitlabBranch,
    } = codeThirdStore
    const {updateTask,dataItem} = taskStore

    // 分支选择器是否禁止
    const [prohibited,setProhibited] = useState(true);
    // 仓库获取加载
    const [isSpin,setSpin] = useState(false);
    // 分支获取加载
    const [isBranchSpin,setBranchSpin] = useState(false);
    // 仓库
    const [codeRpy,setCodeRpy] = useState([]);
    // 分支
    const [codeBranch,setCodeBranch] = useState([]);

    useEffect(()=>{
        // 分支是否禁止
        if(dataItem.task?.codeName){
            setProhibited(false)
        }
    },[dataItem.task?.codeName])

    /**
     * 切换仓库
     */
    const changeGitStoreHouse = (value) =>{
        const task = dataItem.task
        if(task?.houseId===value){return;}
        setProhibited(false)
        updateTask({houseId:value})
    }

    /**
     * 切换分支
     */
    const changeBranch = value => {
        const task = dataItem.task
        if(task?.codeBranch===value){return;}
        updateTask({codeBranch:value})
    }

    /**
     * 获取仓库
     */
    const findRpy = async () => {
        if(!dataItem.task?.authId) return;
        setSpin(true)
        const authId = dataItem.task.authId;
        let rpyRes;
        if(dataItem.taskType==='gitpuk'){
            rpyRes = await findGittokRpy(authId)
        } else if(dataItem.taskType==='gitee'){
            rpyRes = await findGiteeRpy(authId)
        } else if(dataItem.taskType==='github'){
            rpyRes = await findGithubRpy(authId)
        } else if(dataItem.taskType==='gitlab'){
            rpyRes = await findGitlabRpy(authId)
        }
        if(rpyRes.code===0){
            setCodeRpy(rpyRes.data)
        }
        setSpin(false)
    }

    /**
     * 获取分支
     */
    const findBranch = async () => {
        if(!dataItem.task?.authId || !dataItem.task?.houseId) return;
        setBranchSpin(true)
        const authId = {
            houseId:dataItem.task?.houseId,
            authId:dataItem.task?.authId,
        };
        let branchRes;
        if(dataItem.taskType==='gitpuk'){
            branchRes = await findGittokBranch(authId)
        } else if(dataItem.taskType==='gitee'){
            branchRes = await findGiteeBranch(authId)
        } else if(dataItem.taskType==='github'){
            branchRes = await findGithubBranch(authId)
        } else if(dataItem.taskType==='gitlab'){
            branchRes = await findGitlabBranch(authId)
        }
        if(branchRes.code===0){
            setCodeBranch(branchRes.data)
        }
        setBranchSpin(false)
    }

    return(
        <>
            <FormsTool
                scmType={'git'}
            />
            <FormsAuth />
            <FormsSelect
                rules={[{required:true, message:"仓库不能为空"}]}
                name={"codeName"}
                label="仓库"
                isSpin={isSpin}
                onFocus={findRpy}
                onChange={changeGitStoreHouse}
            >
                {
                    codeRpy && codeRpy.map(item=>(
                        <Select.Option key={item.id} value={item.id}>
                            {item.nameWithSpace}
                        </Select.Option>
                    ))
                }
            </FormsSelect>
            <FormsSelect
                name={"codeBranch"}
                label="分支"
                isSpin={isBranchSpin}
                disabled={prohibited}
                onFocus={findBranch}
                onChange={changeBranch}
            >
                {
                    codeBranch && codeBranch.map(item=>(
                        <Select.Option key={item.id} value={item.id}> {item.name} </Select.Option>
                    ))
                }
            </FormsSelect>
        </>
    )
}

export default observer(CodeThird)
