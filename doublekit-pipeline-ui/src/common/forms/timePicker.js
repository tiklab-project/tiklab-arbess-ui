import React,{ useState, useEffect, Fragment } from "react";
import { TimePicker } from "antd";
import { observer, inject } from "mobx-react";
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';

const SelfTimePicker = (props) => {
    const { onChange,value } = props;
    const [datePickerValue,setTimePickerValue] = useState()
    const onChangeTimePicker = (value) => {
        if(value){
            console.log(value.format('HH:mm:ss'))
            onChange(value.format('HH:mm:ss'))
        }
    }
    useEffect(()=> {
        setTimePickerValue(value)
    },[value])
    return (
        <Fragment>
            <TimePicker 
                onChange={onChangeTimePicker} 
                placeholder="请选择时间"
                format= 'HH:mm:ss'
                value={
                    value === undefined ? value : moment(value, 'HH:mm:ss')
                    }
                
            />
        </Fragment>
        
    )
    
}

export default SelfTimePicker;
