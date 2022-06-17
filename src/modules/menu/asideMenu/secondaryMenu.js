import React from "react";
import './secondaryMenu.scss';
import {withRouter} from "react-router-dom";
import {PrivilegeButton} from "doublekit-privilege-ui";

const SecondaryMenu = props =>{

    const {router,nav} = props
    const onclick = item => {
        props.history.push(item.to)
    }

    return (
        <div className='left'>
            <div className='left-content'>
                {
                    router.map(item=>{
                        return(
                            <PrivilegeButton code={item.enCode} key={item.key}>
                                <div
                                    className={nav===item.to?
                                        'left-content-nav left-content-active':'left-content-nav'
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
                            </PrivilegeButton>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default withRouter(SecondaryMenu)