import React from 'react'

const Anchor = props =>{

    const {scrollToAnchor,anchor}=props

    return(
        <div className='config-anchor' id='scrollA'>
            <div onClick={()=>scrollToAnchor('a')}
                 className={anchor==='a' ? 'config-anchor-d config-anchor-active' : 'config-anchor-d'}
            >
                源码管理
            </div>
            <div onClick={()=>scrollToAnchor('b')}
                 className={anchor==='b' ? 'config-anchor-d config-anchor-active' : 'config-anchor-d'}
            >
                单元测试
            </div>
            <div onClick={()=>scrollToAnchor('c')}
                 className={anchor==='c' ? 'config-anchor-d config-anchor-active' : 'config-anchor-d'}
            >
                构建
            </div>
            <div onClick={()=>scrollToAnchor('d')}
                 className={anchor==='d' ? 'config-anchor-d config-anchor-active' : 'config-anchor-d'}
            >
                部署
            </div>
        </div>
    )
}

export default Anchor