import React,{ useState, useEffect, Fragment } from "react";
import { DatePicker } from "antd";
import { observer, inject } from "mobx-react";
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
const { RangePicker } = DatePicker;

const SelfRangePicker = (props) => {
    const { onChange,value } = props;
    const [datePickerValue,setRangePickerValue] = useState()
    const onChangeRangePicker = (value) => {
        if(value){
            console.log(value)
            onChange([value[0].format('YYYY-MM-DD'),value[1].format('YYYY-MM-DD')])
        }
    }
    useEffect(()=> {
        setRangePickerValue(value)
    },[value])

    return (
        <RangePicker  
            onChange={onChangeRangePicker} 
            placeholder="请选择时间"
            format= 'YYYY-MM-DD'
            value={
                value === undefined ? value : [moment(value[0], 'YYYY-MM-DD'), moment(value[1], 'YYYY-MM-DD')]
            }
        />
        
    )
    
}

export default SelfRangePicker;
