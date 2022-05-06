import React from "react";

const Config_newStage_drawer_left = props =>{

    const {leftLis,opt,changeAnchor} = props

    return(
        <div className="body-menu_left">
            <ul className="at-nav">
                {
                    leftLis && leftLis.map((item,index)=>{
                        return(
                            <li
                                key={item.id}
                                onClick={()=>changeAnchor(index+1)}
                                className={opt === index+1 ? 'at-nav-item at-nav-selected' : 'at-nav-item'}
                            >
                                <div className="at-nav-item-main">
                                    <div
                                        className={opt === index+1 ? "teamix-title" : null}
                                    >
                                        {item.title}
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Config_newStage_drawer_left