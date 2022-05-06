import React from "react";

const Config_code = props =>{

    const {setCodeDrawer ,codeData,setCodeDetailsDrawer} = props

    const showDetailsDrawer = () => {
        setCodeDetailsDrawer(true)
    }

    const code = () => {
        return  codeData === '' ?
            <div
                className='configView2-sider_addCode'
                onClick={()=>setCodeDrawer(true)}
            >
                添加代码源
            </div> :
            <div className='configView2-sider_code_one'>
                <div
                    className='configView2-sider_code_one_name'
                    onClick={()=>showDetailsDrawer()}
                >
                    {codeData.desc}
                </div>
            </div>
    }

    return(
        <div className='configView2-sider'>
            <div className='configView2-sider_head'>
                源码管理
            </div>
            <div className='configView2-sider_code'>
                {
                    code()
                }
            </div>
        </div>
    )
}

export default Config_code