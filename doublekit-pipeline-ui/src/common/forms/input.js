import React,{ useState, useEffect } from "react";
import { Input } from "antd";
import { observer, inject } from "mobx-react";

const SelfInput = (props) => {
    const { onChange,value } = props;
    const [inputValue,setInputValue] = useState()
    const onChangeInput = (values) => {
        setInputValue(values.target.value)
        onChange(values.target.value)
    }

    return (
        <Input onChange={onChangeInput} placeholder="large size" value={ value|| inputValue }/>
    )
    
}

export default SelfInput;
