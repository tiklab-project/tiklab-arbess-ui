import React from "react";

const AddDrawerLeft = props =>{

    const {lis,opt,onClick} = props

    
    const renderLeftLis = lis => {
        return lis && lis.map((item,index)=>{
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
    
    return(
        <div className="guiViewAddDrawerLeft">
            <ul className="at-nav">
                {
                    renderLeftLis(lis)
                }
            </ul>
        </div>
    )
}

export default AddDrawerLeft