import React from "react";
import './firstMenu.scss';
import {withRouter} from "react-router-dom";
import {PrivilegeButton} from "doublekit-privilege-ui";

const FirstMenu = props =>{

    const {routers,nav} = props

    const changeNav = item=>{
        props.history.push(item.to)
    }

    return routers && routers.map(item=>{
        return(
            <PrivilegeButton code={item.enCode}  key={item.key}>
                <li
                    className={nav===item.to ? 'aside_content aside_link' : 'aside_content'}
                    onClick={()=>changeNav(item)}
                >
                    <div className='aside_content_icon'>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {item.icon}/>
                        </svg>
                    </div>
                    <div className='aside_content_title'>{item.title}</div>
                </li>
            </PrivilegeButton>

        )
    })
}

export default withRouter(FirstMenu)