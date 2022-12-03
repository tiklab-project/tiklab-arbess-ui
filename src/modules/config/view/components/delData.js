import React from "react";

export const del = (showItem,configStore) =>{

    const {formInitialValues,setFormInitialValues} = configStore

    const getId = name =>{
        return showItem.configId + "_" + name
    }

    switch (showItem.type) {
        case 31:
        case 32:
            formInitialValues[getId("localAddress")] = null
            formInitialValues[getId("deployAddress")] = null
            formInitialValues[getId("deployOrder")] = null
            formInitialValues[getId("startAddress")] = null
            formInitialValues[getId("authType")] = 1
            formInitialValues[getId("authName")] = null
            formInitialValues[getId("authId")] = null
            break
        case 41:
            formInitialValues[getId("projectName")] = null
            formInitialValues[getId("authName")] = null
            formInitialValues[getId("authId")] = null
            break
        case 51:
        case 52:
            formInitialValues[getId("groupId")] = null
            formInitialValues[getId("artifactId")] = null
            formInitialValues[getId("version")] = null
            formInitialValues[getId("fileType")] = null
            formInitialValues[getId("fileAddress")] = null
            formInitialValues[getId("authName")] = null
            formInitialValues[getId("authId")] = null
            break
        case "giteeName":
            formInitialValues[getId("codeName")] = null
            formInitialValues[getId("codeBranch")] = null
            break
        case "giteeBranch":
            formInitialValues[getId("codeBranch")] = null
            break
        default:
            formInitialValues[getId("codeName")] = null
            formInitialValues[getId("codeBranch")] = null
            formInitialValues[getId("codeAlias")] = null
            formInitialValues[getId("svnFile")] = null
            formInitialValues[getId("authName")] = null
            formInitialValues[getId("authId")] = null
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