import React from "react";
import './firstMenu.scss';
import {withRouter} from "react-router-dom";

const FirstMenu = props =>{

    const {routers,nav} = props

    const changeNav = item=>{
        props.history.push(item.to)
    }

    return routers && routers.map(item=>{
        return(
            <li
                className={nav===item.to ? 'aside_content aside_link' : 'aside_content'}
                key={item.key}
                onClick={()=>changeNav(item)}
            >
                <div className='aside_content_icon'>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref= {item.icon}/>
                    </svg>
                </div>
                <div className='aside_content_title'>{item.title}</div>
            </li>
        )
    })
}

export default withRouter(FirstMenu)