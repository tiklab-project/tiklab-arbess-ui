import React, {useState,useEffect,useRef} from "react";
import {Tooltip} from "antd";
import "./PortalMenu.scss";

const PortalMenu = props => {

    const {tooltip, children, Icon, width=140, onClick} = props

    const [visible,setVisible] = useState(false);

    const  mf_portal_menu = useRef(null);

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(mf_portal_menu.current && mf_portal_menu.current.contains(e.target)) {
            } else {
                setVisible(false)
            }
        });
        return() => window.removeEventListener('click', () => {
            setVisible(false)
        })
    },[visible])

    const link = () =>{
        setVisible(!visible)
    }

    return(
        <div className="mf_portal" ref={mf_portal_menu}>
            <div className="mf_portal_block">
                <span
                    className={`mf_portal_block_item ${visible? "mf_portal_block_linked": ''}`}
                    onClick={onClick? onClick : link}
                >
                    <Tooltip title={tooltip} mouseEnterDelay={0.3}>
                        <span className="mf_portal_block_icon">
                            { Icon }
                        </span>
                    </Tooltip>
                </span>
            </div>
            {
                children &&
                <div
                    style={{width}}
                    className={`mf_portal_menu ${visible ? '' : "mf_portal_hidden"}`}
                >
                    {children}
                </div>
            }
        </div>

    )
};

export default PortalMenu;
