import React from "react";
import {Select} from "antd";
import {inject,observer} from "mobx-react";

const {Option} = Select

const gitList=[
    {id:1,tel:"通用Git"},
    {id:2,tel:"Gitee"},
    {id:3,tel:"Github"},
    {id:4,tel:"Gitlab"},
    {id:5,tel:"SVN"},
]

const  buildList=[
    {id:21,tel:"maven"},
    {id:22,tel:"node"},
]

const deployList=[
    {id:31,tel:"虚拟机"},
    {id:32,tel:"docker"},
]

const ConfigSwitch = props =>{

    const {type,configDataStore} = props
    const {setCodeType,setIsPrompt,data,setData,setIsMavenOrNode,setIsVirOrDocker} = configDataStore

    const changGit = value =>{
        setCodeType(value)
    }

    const changBuild = value => {
        let arr = JSON.parse(JSON.stringify(data))
        for(let i = 0 ;i<arr.length;i++){
            if( arr[i].dataType === 21 || arr[i].dataType === 22) {
                arr[i].dataType = value
                setIsPrompt(true)
            }
        }
        setIsMavenOrNode(value)
        setData([...arr])
    }

    const changDeploy = value => {
        let arr = JSON.parse(JSON.stringify(data))
        for(let i = 0 ;i<arr.length;i++){
            if( arr[i].dataType === 31 || arr[i].dataType === 32) {
                arr[i].dataType = value
                setIsPrompt(true)
            }
        }
        setIsVirOrDocker(value)
        setData([...arr])
    }
    
    return(
        <>
            {
                (()=>{
                    switch (type){
                        case 1:
                        case 4:
                        case 2:
                        case 3:
                        case 5:
                            return  <Select defaultValue={type} onChange={changGit}>
                                        {
                                            gitList.map(item=>{
                                                return <Option value={item.id} key={item.id}>{item.tel}</Option>
                                            })
                                        }
                                    </Select>
                        case 11:
                            return  <Select defaultValue={type}>
                                        <Option value={type}>单元测试</Option>
                                    </Select>
                        case 21:
                        case 22:
                            return  <Select defaultValue={type} onChange={changBuild}>
                                        {
                                            buildList.map(item=>{
                                                return <Option value={item.id} key={item.id}>{item.tel}</Option>
                                            })
                                        }
                                    </Select>
                        case 31:
                        case 32:
                            return  <Select defaultValue={type} onChange={changDeploy}>
                                        {
                                            deployList.map(item=>{
                                                return <Option value={item.id} key={item.id}>{item.tel}</Option>
                                            })
                                        }
                                    </Select>
                    }
                })()
            }
        </>
    )
}

export default inject("configDataStore")(observer(ConfigSwitch))