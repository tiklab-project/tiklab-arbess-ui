import React, { useState} from "react";
import {inject,observer} from "mobx-react";
import {Form, Select} from "antd";

const {Option} = Select

const FindAllProof = props =>{

    const {proofStore,type}=props
    const {findAllProof} = proofStore
    const [allGitProofList,setAllGitProofList] = useState([])

    const clickFindAllGit = () =>{
        findAllProof(type).then(res=>{
            console.log('gitOrGitlab凭证',res)
            setAllGitProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeGitSelect = (value,e) =>{
        if(type < 6){
            localStorage.setItem('gitProofId',e.key)
        }else {
            localStorage.setItem('deployProofId',e.key)
        }
    }

    return(
        <Form.Item name={type < 6 ? 'gitProofName' : 'dockerProofName'} label="凭证">
            <Select
                style={{ width: 300 }}
                onClick={clickFindAllGit}
                onChange={(value,e)=>changeGitSelect(value,e)}
            >
                {
                    allGitProofList && allGitProofList.map(item=>{
                        return(
                            <Option key={item.proofId} value={item.proofName+ "(" + item.proofUsername + ")"}>
                                { item.proofName+ "(" + item.proofUsername + ")"}
                            </Option>
                        )
                    })
                }
            </Select>
        </Form.Item>
    )
}

export default inject('proofStore')(observer(FindAllProof))