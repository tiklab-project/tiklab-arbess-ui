import React from "react";

const ConfigCode = props =>{

    const {setCodeDrawer ,codeData,setNewStage,setTaskFormDrawer} = props

    const showDetailsDrawer = () => {
        if(codeData){
            setNewStage(codeData.codeType)
            setTaskFormDrawer(true)
        }
    }

    const codeType = () =>{
        if(codeData){
            switch (codeData.codeType){
                case 1:
                    return '通用Git'
                case 2:
                    return 'Gitee'
                case 3:
                    return 'Github'
                case 4:
                    return 'Gitlab'
            }
        }
        return codeData
    }


    const code = () => {
        return  codeData === '' ?
            <div
                className='configView2-sider_code_add'
                onClick={()=>setCodeDrawer(true)}
            >
                添加代码源
            </div> :
            <div className='configView2-sider_code_one'>
                <div
                    className='configView2-sider_code_one_name'
                    onClick={()=>showDetailsDrawer()}
                >
                    {codeType()}
                </div>
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

export default ConfigCode