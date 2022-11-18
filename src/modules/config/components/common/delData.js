import React from "react";

export const del = (type,configDataStore) =>{

    const {formInitialValues,setFormInitialValues,
        setCodeType,setBuildType,setDeployType,setTestType,setScanType,setGoodsType,
        setUnitShellBlock,setBuildShellBlock,
        setVirShellBlock,setDeployShellBlock,setDeployOrderShellBlock,
    } = configDataStore

    switch (type) {
        case 11:
            setUnitShellBlock("")
            setTestType(type)
            break
        case 21:
        case 22:
            formInitialValues.buildAddress = null
            setBuildShellBlock("")
            setBuildType(type)
            break
        case 31:
        case 32:
            formInitialValues.deployAuthName = null
            formInitialValues.localAddress = null
            formInitialValues.deployAddress = null
            formInitialValues.deployOrder = null
            formInitialValues.startAddress = null
            formInitialValues.authType = 1
            formInitialValues.deployAuthId = 0
            setDeployType(type)
            setVirShellBlock("")
            setDeployShellBlock("")
            setDeployOrderShellBlock("")
            break
        case 41:
            formInitialValues.scanAuthName = null
            formInitialValues.scanAuthId = null
            formInitialValues.projectName = null
            setScanType(type)
            break
        case 51:
        case 52:
            formInitialValues.groupId = null
            formInitialValues.artifactId = null
            formInitialValues.version = null
            formInitialValues.fileType = null
            formInitialValues.fileAddress = null
            setGoodsType(type)
            break
        default:
            formInitialValues.codeName = null
            formInitialValues.codeBranch = null
            formInitialValues.gitAuthName = null
            formInitialValues.gitAuthId = null
            setCodeType(type)
    }
    
    setFormInitialValues({...formInitialValues})
}
