import React from "react";

const Config_code = props =>{

    const {setCodeDrawer ,codeData,setNewStage,setTaskFormDrawer} = props

    const showDetailsDrawer = () => {
        if(codeData){
            setNewStage(codeData.desc)
            setTaskFormDrawer(true)
        }
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
                {
                    codeData.codeBranch === '' || codeData.codeBranch ===undefined
                        || codeData.codeBranch === null
                        ?
                        null :
                        <div className='configView2-sider_code_one_address'>
                            <div className='branch-title'>
                                {codeData.codeBranch}
                            </div>
                        </div>
                }
                {
                    codeData.codeName === ''  || codeData.codeName ===undefined
                        || codeData.codeName === null
                        ?
                        null :
                        <div className='configView2-sider_code_one_branch '>
                            <div className='branch-address'>
                                {codeData.codeName}
                            </div>
                        </div>
                }
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