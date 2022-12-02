import React from "react";

export const del = (type,configStore) =>{

    const {formInitialValues,setFormInitialValues,setTestType,
        setUnitShellBlock,
    } = configStore

    switch (type) {
        case 11:
            setUnitShellBlock("")
            setTestType(type)
            break
        case 21:
        case 22:
            formInitialValues.buildAddress = null
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
            break
        case 41:
            formInitialValues.scanAuthName = null
            formInitialValues.scanAuthId = null
            formInitialValues.projectName = null
            break
        case 51:
        case 52:
            formInitialValues.groupId = null
            formInitialValues.artifactId = null
            formInitialValues.version = null
            formInitialValues.fileType = null
            formInitialValues.fileAddress = null

            break
        case 61:
            formInitialValues.typeList = []
            break
        case "giteeName":
            formInitialValues.codeName = null
            formInitialValues.codeBranch = null
            break
        case "giteeBranch":
            formInitialValues.codeBranch = null
            break
        default:
            formInitialValues.codeName = null
            formInitialValues.codeBranch = null
            formInitialValues.gitAuthName = null
            formInitialValues.gitAuthId = null
    }
    
    setFormInitialValues({...formInitialValues})
}

export const x = (newValue,lastValue) => {
    if (newValue == null){
        return false
    }
    if (newValue === ""  && lastValue == null){
        return false
    }
    return newValue !== lastValue
}