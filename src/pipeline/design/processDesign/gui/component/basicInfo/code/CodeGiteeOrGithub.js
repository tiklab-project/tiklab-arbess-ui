import React,{useState,useEffect} from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsAuth from "../FormsAuth";
import FormsSelect from "../FormsSelect";
import authorizeStore from "../../../store/AuthorizeStore";

/**
 * gitee & github
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CodeGiteeOrGithub = props =>{

    const {taskStore} = props

    const {findAllStorehouse,findBranch} = authorizeStore
    const {updateTask,dataItem} = taskStore

    // 分支选择器是否禁止
    const [prohibited,setProhibited] = useState(true);

    // 仓库获取加载状态
    const [isSpin,setSpin] = useState(false);

    const [storehouseList,setStorehouseList] = useState([]);
    const [branchList,setBranchList] = useState([]);

    useEffect(()=>{
        // 分支是否禁止
        if(dataItem?.task?.codeName){
            setProhibited(false)
        }
    },[dataItem?.task?.codeName])

    /**
     * 切换仓库
     * @param value
     */
    const changeGitStoreHouse = value =>{
        setProhibited(false)
        updateTask({codeName:value})
    }

    /**
     * 切换分支
     * @param value
     */
    const changeBranch = value => {
        updateTask({codeBranch:value})
    }

    /**
     * 获取仓库||分支
     * @param name
     */
    const onFocus = name => {
        if(!dataItem.task?.authId) return;
        if(name==="codeName"){
            setSpin(true)
            findAllStorehouse(dataItem.task?.authId).then(r=>{
                setSpin(false)
                if(r.code===0){
                    setStorehouseList(r.data)
                }
            })
            return;
        }
        if(!dataItem.task?.codeName) return;
        findBranch({
            houseName:dataItem.task?.codeName,
            authId:dataItem.task?.authId,
        }).then(r=>{
            if(r.code===0){
                setBranchList(r.data)
            }
        })
    }

    return(
        <>
            <FormsAuth />
            <FormsSelect
                rules={[{required:true, message:"仓库不能为空"}]}
                name={"codeName"}
                label="仓库"
                isSpin={isSpin}
                onFocus={()=>onFocus("codeName")}
                onChange={changeGitStoreHouse}
            >
                {
                    storehouseList && storehouseList.map(item=>{
                        return <Select.Option key={item} value={item}> {item} </Select.Option>
                    })
                }
            </FormsSelect>
            <FormsSelect
                name={"codeBranch"}
                label="分支"
                isSpin={false}
                disabled={prohibited}
                onFocus={()=>onFocus("codeBranch")}
                onChange={changeBranch}
            >
                {
                    branchList && branchList.map(item=>{
                        return  <Select.Option key={item} value={item}> {item} </Select.Option>
                    })
                }
            </FormsSelect>
        </>
    )
}

export default observer(CodeGiteeOrGithub)
