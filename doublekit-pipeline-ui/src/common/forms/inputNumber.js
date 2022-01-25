import React,{ useState, useEffect } from "react";
import { InputNumber } from "antd";
import { observer, inject } from "mobx-react";

const SelfInputNumber = (props) => {
    const { onChange,value } = props;
    const [inputValue,setInputValue] = useState()
    const onChangeInput = (values) => {
        setInputValue(values)
        onChange(values)
    }

    return (
        <InputNumber onChange={onChangeInput} placeholder="large size" value={ value|| inputValue }/>
    )
    
}

export default SelfInputNumber;
