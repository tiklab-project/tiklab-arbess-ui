import React,{Fragment, useState} from "react";
import {Select } from "antd";
import { observer, inject } from "mobx-react";
import UserSelect from "./userSelect";
import SelfInput from "./input";
import SelfInputNumber from "./inputNumber";
import SelfSwitch from "./switch";
import SelfRadio from "./radio";
import SelfDatePicker from "./datePicker";
import SelfTextArea from "./textArea";
import SelfSelect from "./select";
import SelfCheckbox from "./checkbox";
import SelfTimePicker from "./timePicker";
import Area from "./area";
import SelfDateTimePicker from "./dateTimePicker";
import SelfRangePicker from "./dateRange";
const Forms = (props) => {
    const {formType,selectKey} = props;
    return (
        
        <Fragment>
            {
                (()=> {
                    switch(formType) {
                        case "UserSelect": 
                            return <UserSelect selectKey={selectKey} {...props}/>;
                        case "Input":
                            return <SelfInput {...props} />;
                        case "InputNumber": 
                            return <SelfInputNumber {...props} />;
                        case "Switch":
                            return <SelfSwitch {...props} />;
                        case "Radio": 
                            return <SelfRadio {...props} />;
                        case "DatePicker":
                            return <SelfDatePicker {...props} />;
                        case "TimePicker":
                            return <SelfTimePicker {...props} />;
                        case "TextArea":
                            return <SelfTextArea {...props} />;
                        case "Select":
                            return <SelfSelect {...props} />;
                        case "Checkbox":
                            return <SelfCheckbox {...props} />;
                        case "Area":
                            return <Area {...props}/>;
                        case "DateTime":
                            return <SelfDateTimePicker {...props}/>
                        case "DateRange": 
                            return <SelfRangePicker {...props}/>
                    }
                })()
            }
        </Fragment>
    )
    
}

export default Forms;