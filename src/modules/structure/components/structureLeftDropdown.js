import React from "react";
import { Select  } from 'antd';

const { Option } = Select;

const lis = [
    {
        id:1,
        opt: [
            {   type:0,
                tpl:'状态',
            },
            {
                type:1,
                tpl:'失败',
            },
            {
                type:20,
                tpl:'停止',
            },
            {
                type:30,
                tpl:'成功',
            },
        ]
    },
    {
        id:2,
        opt: [
            {   type:0,
                tpl:'执行人',
            },
            {
                type:1,
                tpl:'admin',
            },
        ]
    },
    {
        id:3,
        opt:[
            {   type:0,
                tpl:'执行方式',
            },
            {
                type:1,
                tpl:'手动',
            },
            {
                type:2,
                tpl:'自动',
            },

        ]
    },
]

const StructureLeftDropdown = props =>{

    const {findLikeHistory,setLeftData} = props

    const changeOpt = (value,e,group)  => {
        console.log(e.key,value,group)
    }

    return(
        <div className='structure-content-left-dropdown'>
            <div className='dropdown'>
                {
                    lis.map((group,index)=>{
                        return (
                            <Select
                                bordered={false}
                                key={index}
                                style={{width:100}}
                                defaultValue={group.opt[0].tpl}
                                onChange={(value,e)=>changeOpt(value,e,group)}
                            >
                                {
                                    group.opt.map(item=>{
                                        return(
                                            <Option
                                                key={ item.type }
                                                value= {item.tpl}
                                                // onCli
                                            >
                                                {item.tpl}
                                            </Option>
                                        )

                                    })
                                }
                            </Select>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default StructureLeftDropdown