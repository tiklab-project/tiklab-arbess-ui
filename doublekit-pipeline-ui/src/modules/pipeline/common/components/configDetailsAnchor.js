import React from 'react'

const ConfigDetailsAnchor = props =>{

    const {scrollToAnchor,anchor}=props

    return(
        <div className='config-details-anchor'>
            <div onClick={()=>scrollToAnchor('a')}
                 className={anchor==='a' ? 'config-details-anchor-d config-details-anchor-active' : 'config-details-anchor-d'}
            >
                源码管理
            </div>
            <div onClick={()=>scrollToAnchor('b')}
                 className={anchor==='b' ? 'config-details-anchor-d config-details-anchor-active' : 'config-details-anchor-d'}
            >
                单元测试
            </div>
            <div onClick={()=>scrollToAnchor('c')}
                 className={anchor==='c' ? 'config-details-anchor-d config-details-anchor-active' : 'config-details-anchor-d'}
            >
                构建
            </div>
            <div onClick={()=>scrollToAnchor('d')}
                 className={anchor==='d' ? 'config-details-anchor-d config-details-anchor-active' : 'config-details-anchor-d'}
            >
                部署
            </div>
        </div>
    )
}

export default ConfigDetailsAnchor