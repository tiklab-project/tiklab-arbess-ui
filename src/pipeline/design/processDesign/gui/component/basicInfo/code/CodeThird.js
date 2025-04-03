/**
 * @Description: 第三方源码
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/28
 */
import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsAuth from "../FormsAuth";
import FormsSelect from "../FormsSelect";
import codeThirdStore from "../../../store/CodeThirdStore";
import FormsTool from "../FormsTool";
import {gitee, github, gitlab, gitpuk, pri_gitlab, toolGit} from "../../../../../../../common/utils/Constant";

const CodeThird = props =>{

    const {taskStore} = props

    const {
        findGittokRpy,findGittokBranch,
        findGiteeRpy,findGiteeBranch,
        findGithubRpy,findGithubBranch,
        findGitlabRpy,findGitlabBranch,
        findPriGitlabRpy,findPriGitlabBranch,
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
        const repoFinders = {
            [gitpuk]: findGittokRpy,
            [gitee]: findGiteeRpy,
            [github]: findGithubRpy,
            [gitlab]: findGitlabRpy,
            [pri_gitlab]: findPriGitlabRpy
        };
        const finder = repoFinders[dataItem.taskType];
        if (finder) {
            const rpyRes = await finder(authId);
            if (rpyRes.code === 0) {
                setCodeRpy(rpyRes.data);
            }
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
        const repoFinders = {
            [gitpuk]: findGittokBranch,
            [gitee]: findGiteeBranch,
            [github]: findGithubBranch,
            [gitlab]: findGitlabBranch,
            [pri_gitlab]: findPriGitlabBranch
        };
        const finder = repoFinders[dataItem.taskType];
        if(finder){
            const branchRes = await finder(authId);
            if(branchRes.code===0){
                setCodeBranch(branchRes.data)
            }
        }
        setBranchSpin(false)
    }

    return(
        <>
            <FormsTool
                scmType={toolGit}
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
