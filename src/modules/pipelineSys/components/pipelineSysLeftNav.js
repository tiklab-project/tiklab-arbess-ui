import React,{useState,useEffect} from "react";

const PipelineSysLeftNav = props =>{

    const [nav,setNav] = useState('')
    const path = props.location.pathname

    useEffect(()=>{
        setNav(path)
    },[path])

    const route = [
        {
            id:1,
            to:'/index/task/assembly/role',
            title:'角色设置',
            icon:'#icon-fenleiguanli',
        },
        {
            id:2,
            to:'/index/task/assembly/membro',
            title:'成员设置',
            icon:'#icon-fenleiguanli',
        },
        {
            id:3,
            to:'/index/task/assembly/proof',
            title:'凭证设置',
            icon:'#icon-fenleiguanli'
        },
        {
            id:4,
            to:'/index/task/assembly/other',
            title:'其他设置',
            icon:'#icon-fenleiguanli',
        },
    ]
    
    const onclick = item => {
        props.history.push(item.to)
    }

    return(
        <div className='pipelineSys-content-left'>
            <div className='left-content'>
                {
                    route.map(item=>{
                        return(
                            <div
                                key={item.id}
                                className={nav===item.to ?
                                    'left-content-nav left-content-link' :'left-content-nav'
                            }
                                onClick={()=>onclick(item)}
                            >
                                <div className='left-content-nav-icon'>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref={item.icon}/>
                                    </svg>
                                </div>
                                <div className='left-content-nav-title'>{item.title}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PipelineSysLeftNav