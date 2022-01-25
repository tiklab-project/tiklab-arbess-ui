import React,{ useState, useEffect } from "react";
import { Input } from "antd";
import { observer, inject } from "mobx-react";
const { TextArea } = Input;

const SelfTextArea = (props) => {
    const { onChange,value } = props;
    const [inputValue,setInputValue] = useState()
    const onChangeInput = (values) => {
        if(values) {
            setInputValue(values.target.value)
            onChange(values.target.value)
        }
    }

    return (
        <TextArea onChange={onChangeInput} placeholder="large size" value={ value|| inputValue }/>
    )
    
}

export default SelfTextArea;
