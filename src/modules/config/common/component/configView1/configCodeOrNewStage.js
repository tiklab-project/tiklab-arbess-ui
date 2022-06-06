import React,{Fragment} from "react";

const ConfigCodeOrNewStage = props =>{

    const {lis,handleClick} = props

    return(
        <Fragment>
            {
                lis && lis.map(group=>{
                    return(
                        <div className='group' key={group.id}>
                            <div className='group-title'> {group.title} </div>
                            <div className='group-content'>
                                {
                                    group.desc.map((item,index)=>{
                                        return(
                                            <div
                                                onClick={()=>handleClick(group,item,index)}
                                                className='group-desc'
                                                key={item.type}
                                            >
                                                <div className='group-desc-tpl'>
                                                    <div className='group-tpl'> {item.tel} </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default ConfigCodeOrNewStage