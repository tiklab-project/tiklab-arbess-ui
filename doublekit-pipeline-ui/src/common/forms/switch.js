import React,{ useState, useEffect } from "react";
import { Switch } from "antd";
import { observer, inject } from "mobx-react";

const SelfSwitch = (props) => {
    const { onChange,value } = props;
    const [switchValue,setSwitchValue] = useState()
    const onChangeSwitch = (checked) => {
        // setSwitchValue(values)
        onChange(checked)
        // value =  checked
    }
    useEffect(()=> {
        onChange(true);
        return
    },[])
    return (
        <Switch onChange={onChangeSwitch} defaultChecked/>
    )
    
}

export default SelfSwitch;
