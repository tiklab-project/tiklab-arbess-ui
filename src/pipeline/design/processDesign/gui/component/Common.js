import React from "react";
import {PlusOutlined} from "@ant-design/icons";

/**
 * 值是否相同
 */
export const WhetherChange = (newValue,lastValue) => {
    if (newValue == null){
        return false
    }
    if (newValue === ""  && lastValue == null){
        return false
    }
    return newValue !== lastValue
}
