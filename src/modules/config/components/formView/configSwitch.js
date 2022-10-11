import React from "react";
import {inject,observer} from "mobx-react";
import "./configSwitch.scss";

const gitList=[
    {id:1,title:"通用Git",icon:"git"} ,
    {id:2,title:"Gitee",icon:"gitee"},
    {id:3,title:"Github",icon:"github"},
    {id:4,title:"Gitlab",icon:"gitlab"},
    {id:5,title:"SVN",icon: "-_ssh"},
]

const testList=[
    {id:11,title:"单元测试",icon:"ceshi"}
]

const  buildList=[
    {id:21,title:"maven",icon:"quanxian"},
    {id:22,title:"node",icon:"nodejs"},
]

const deployList=[
    {id:31,title:"虚拟机",icon:"xuniji"},
    {id:32,title:"docker",icon:"docker"},
]

const ConfigSwitch = props =>{

    const {type,configDataStore} = props
    const {setCodeType,data,setData,setBuildType,setDeployType} = configDataStore

    const changeType = type =>{
        let arr = JSON.parse(JSON.stringify(data))
        if( type > 0 && type < 6) {
            setCodeType(type)
        }
        else if(type > 20 && type < 30){
            setBuildType(type)
            for(let i = 0 ;i<arr.length;i++){
                if( arr[i].dataType === 21 || arr[i].dataType === 22) {
                    arr[i].dataType = type
                }
            }
            setData([...arr])

        }
        else if(type > 30 && type < 40){
            setDeployType(type)
            for(let i = 0 ;i<arr.length;i++){
                if( arr[i].dataType === 31 || arr[i].dataType === 32) {
                    arr[i].dataType = type
                }
            }
            setData([...arr])
        }
    }

    const renderList = (list,type) =>{
        return list.map(item=>{
            return(
                <div className={`configCode-gitList-item ${type==item.id?"configCode-gitList-selected":""}`}
                     onClick={()=>changeType(item.id)}
                     key={item.id}
                >
                    <span className="configCode-gitList-item-icon">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon-${item.icon}`} />
                        </svg>
                    </span>
                    <span className="configCode-gitList-item-title">
                        {item.title}
                    </span>
                </div>
            )
        })
    }

    return(
        <div className="configCode-gitList">
            {
                (()=>{
                    if(type===11){
                        return  renderList(testList,type)
                    }
                    else if(type > 20 && type < 30){
                        return  renderList(buildList,type)
                    }
                    else if(type > 30 && type < 40){
                        return  renderList(deployList,type)
                    }
                    else {
                        return   renderList(gitList,type)
                    }
                })()
            }
        </div>
    )
}

export default inject("configDataStore")(observer(ConfigSwitch))