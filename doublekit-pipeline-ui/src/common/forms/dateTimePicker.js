import React,{ useState, useEffect, Fragment } from "react";
import { DatePicker } from "antd";
import { observer, inject } from "mobx-react";
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';

const SelfDateTimePicker = (props) => {
    const { onChange,value } = props;
    const [datePickerValue,setDatePickerValue] = useState()
    const onChangeDatePicker = (value) => {
        if(value){
            console.log(value.format('YYYY-MM-DD HH:mm:ss'))
            onChange(value.format('YYYY-MM-DD HH:mm:ss'))
        }
    }
    useEffect(()=> {
        setDatePickerValue(value)
    },[value])
    return (
        <DatePicker
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            onChange={onChangeDatePicker} 
            placeholder="请选择日期"
            format= 'YYYY-MM-DD HH:mm:ss'
            value={
                value === undefined ? value : moment('00:00:00', 'HH:mm:ss')
            }
        />
    )
    
}

export default SelfDateTimePicker;
