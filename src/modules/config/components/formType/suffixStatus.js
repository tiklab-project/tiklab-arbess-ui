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
                            return  <LoadingOutlined style={{color:"#0063FF",fontSize:25}}/>

                        case 3:
                            return <CheckCircleOutlined style={{color:"#0063FF",fontSize:25}}/>
                        case 4:
                            return <CloseCircleOutlined style={{color:"#ff0000",fontSize:25}}/>
                    }
                })()
            }

        </>
    )
}

export default SuffixStatus