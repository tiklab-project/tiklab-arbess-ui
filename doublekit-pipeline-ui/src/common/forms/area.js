import React,{Fragment, useState} from "react";
import { Cascader } from 'antd';
const area = require("@wikivince-city-china/level/level.json")

const Area = (props) => {
    const {value,onChange} = props;
    const onChangeArea = (value) => {
        onChange(value)
    }
    return (
        <Cascader 
            options={area} 
            onChange={onChangeArea} 
            placeholder="Please select" 
            value = {value} 
            fieldNames={{ label: 'name', value: 'code', children: 'children' }}
        />
    )
}
export default Area;