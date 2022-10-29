import React from "react";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    LoadingOutlined
} from "@ant-design/icons";

const SuffixStatus = props =>{
    const {isLoading} = props
    return(
        <>
            {
                (()=>{
                    switch (isLoading) {
                        case 1:
                            return <span/>
                        case 2:
                            return  <LoadingOutlined style={{color:"#1890ff",fontSize:25}}/>

                        case 3:
                            return <CheckCircleOutlined style={{color:"#1890ff",fontSize:25}}/>
                        case 4:
                            return <CloseCircleOutlined style={{color:"red",fontSize:25}}/>
                    }
                })()
            }

        </>
    )
}

export default SuffixStatus