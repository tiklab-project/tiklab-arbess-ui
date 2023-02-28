import React from "react";

/**
 * 值是否更改
 * @param newValue
 * @param lastValue
 * @returns {boolean}
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
