import React from "react";
import './secondaryMenu.scss';
import {withRouter} from "react-router-dom";

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
                            <div
                                className={nav===item.to?
                                    'left-content-nav left-content-active':'left-content-nav'
                                }
                                key={item.key}
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

export default withRouter(SecondaryMenu)