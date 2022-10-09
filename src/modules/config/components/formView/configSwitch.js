import React, {useState} from "react";
import {Tabs} from "antd";
import {inject,observer} from "mobx-react";
import Forms from "../configForm/forms";

const {TabPane} = Tabs

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
    const {setCodeType,setIsPrompt,data,setData,setBuildType,setDeployType} = configDataStore

    const changGit = value =>{
        setCodeType(value)
    }

    const changBuild = value => {
        // let arr = JSON.parse(JSON.stringify(data))
        // for(let i = 0 ;i<arr.length;i++){
        //     if( arr[i].dataType === 21 || arr[i].dataType === 22) {
        //         arr[i].dataType = value
        //         setIsPrompt(true)
        //     }
        // }
        setBuildType(value)
        // setData([...arr])
    }

    const changDeploy = value => {
        // let arr = JSON.parse(JSON.stringify(data))
        // for(let i = 0 ;i<arr.length;i++){
        //     if( arr[i].dataType === 31 || arr[i].dataType === 32) {
        //         arr[i].dataType = value
        //         setIsPrompt(true)
        //     }
        // }
        setDeployType(value)
        // setData([...arr])
    }

    return(
        <>
            {
                (()=>{
                    if(type===11){
                        return  <Tabs defaultActiveKey={type}>
                                    <TabPane tab={"单元测试"}><Forms type={11}/></TabPane>
                                </Tabs>
                    }
                    else if(type > 20 && type < 30){
                        return  <Tabs defaultActiveKey={type} onChange={changBuild}>
                                    {
                                        buildList.map(item=>{
                                            return <TabPane tab={item.tel} key={item.id}><Forms type={item.id}/></TabPane>
                                        })
                                    }
                                </Tabs>
                    }
                    else if(type > 30 && type < 40){
                        return  <Tabs defaultActiveKey={type} onChange={changDeploy}>
                                    {
                                        deployList.map(item=>{
                                            return <TabPane tab={item.tel} key={item.id}><Forms type={item.id}/></TabPane>
                                        })
                                    }
                                </Tabs>
                    }
                    else {
                        return   <Tabs onChange={changGit} defaultActiveKey={type}>
                                    {
                                        gitList.map(item=>{
                                            return  <TabPane tab={item.tel} key={item.id}>
                                                        <Forms type={item.id}/>
                                                    </TabPane>
                                        })
                                    }
                                </Tabs>
                    }
                })()
            }
        </>
    )
}

export default inject("configDataStore")(observer(ConfigSwitch))