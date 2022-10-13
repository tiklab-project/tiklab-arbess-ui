import React from "react";

const ConfigAddCodeLeftDrawer = props =>{

    const {leftLis,opt,setOpt,setType} = props

    const onClick = index => {
        setOpt(index)
        switch (index) {
            case 1:
                setType(1)
                break
            case 2:
                setType(5)
        }
    }

    return(
        <div className="body-menu_left">
            <ul className="at-nav">
                {
                    leftLis && leftLis.map((item,index)=>{
                        return(
                            <li key={item.id}
                                onClick={ ()=>onClick(index+1) }
                                className={opt === index+1 ? "at-nav-item at-nav-selected" : "at-nav-item"}
                            >
                                <div className="at-nav-item-main">
                                    <div className={opt === index+1 ? "teamix-title" : null}>
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

export default ConfigAddCodeLeftDrawer