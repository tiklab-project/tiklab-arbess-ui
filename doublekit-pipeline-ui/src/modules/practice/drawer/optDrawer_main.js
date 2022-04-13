import React ,{useState} from "react";

const lis=[
    {
        id:'a',
        title:'测试',
        desc:[
            {
                tpl:'单元测试'
            }
        ]
    },
    {
        id:'b',
        title: '构建',
        desc:[
            {
                tpl: 'maven',
            },
            {
                tpl: 'node',
            }
        ]
    },
    {
        id:'c',
        title: '部署',
        desc:[
            {
                tpl:'linux'
            },
            {
                tpl:'docker'
            },
        ]
    }
]

const OptDrawer_main = props =>{

    const {setData,data,drawerType,aa,setNewStageVisible} = props

    const handleClick = (group,item,index)=>{
        console.log(group,item,index)
        const newData = [...data]
        if(drawerType==='large'){
            newData.push({
                title:group.title,
                desc:item.tpl
            })
        }
        setData(newData)
        setNewStageVisible(false)
    }



    const group = ( ) =>{

        return lis && lis.map(group=>{
                return(
                    <div className='group' id={group.id} key={group.id}>
                        <div className='group-title'>{group.title}</div>
                        <div className='group-content'>
                            {
                                group.desc &&  group.desc.map((item,index)=>{
                                    return(
                                        <div
                                            onClick={()=>handleClick(group,item,index)}
                                            className='group-desc'
                                            key={item.tpl}
                                        >
                                            <div className='group-desc-tpl'>
                                                <div className='tpl'>
                                                    {item.tpl}
                                                </div>
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

    return(
        <div className='opt_drawer-main' id='content'>
            <div className='opt_drawer-main-content' >
                <div className='opt_drawer-main-content-loading'>
                    <div className='opt_drawer-main-content-group'>
                        {group()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OptDrawer_main