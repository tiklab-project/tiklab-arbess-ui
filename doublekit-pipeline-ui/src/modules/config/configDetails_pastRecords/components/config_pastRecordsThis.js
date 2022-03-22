import React from "react";

const lis=[
    {
        id:'1',
        title:"更改人",
        desc:"admin",
    },
    {
        id:'2',
        title:"更改时间",
        desc:" 2022年1月11：41：42",
    },
    {
        id:'3',
        title:"状态",
        desc:"成功",
    },
    {
        id:'4',
        title:"源码管理",
        desc:"git@192.168.2.101:devops/doublekit-jtest.git",
    },
    {
        id:'5',
        title:"部署",
        desc:" D:\idea\doublekit"
    }
]

const Config_pastRecordsThis = props =>{

    return(
        <div className='config_pastRecords-this' >
            {
                lis && lis.map((item,index)=>{
                    return(
                        <div key={item.id} className='config_pastRecords-compare'>
                            <div className='config_pastRecords-left'>{item.title}</div>
                            <div className='config_pastRecords-right '>{item.desc}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Config_pastRecordsThis