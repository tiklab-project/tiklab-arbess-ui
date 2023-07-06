import React, {useState,useEffect,useRef} from "react";
import {Tooltip} from "antd";
import "./DropdownMenu.scss";

export const PortalDropdown = props => {

    const {tooltip, children, Icon, width=140, onClick} = props

    const [visible,setVisible] = useState(false);

    const mf_dropdown_menu = useRef(null);

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(mf_dropdown_menu.current && mf_dropdown_menu.current.contains(e.target)) {
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
        <div className="mf_dropdown" ref={mf_dropdown_menu}>
            <div className="mf_dropdown_block">
                <span
                    className={`mf_dropdown_block_item ${visible? "mf_dropdown_block_linked": ''}`}
                    onClick={onClick? onClick : link}
                >
                    <Tooltip title={tooltip} mouseEnterDelay={0.3}>
                        <span className="mf_dropdown_block_icon">
                            { Icon }
                        </span>
                    </Tooltip>
                </span>
            </div>
            {
                children &&
                <div style={{width}} className={`mf_dropdown_menu ${visible?"":"mf_dropdown_hidden"}`} >
                    {children}
                </div>
            }
        </div>

    )
};

export const PipelineDropdown = props => {

    const {visible,setVisible,tooltip, children, Icon, width=140} = props

    const  mf_dropdown_menu = useRef(null);

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(mf_dropdown_menu.current && mf_dropdown_menu.current.contains(e.target)) {
            } else {
                setVisible(false)
            }
        });
        return() => window.removeEventListener('click', () => {
            setVisible(false)
        })
    },[visible])

    return(
        <div className="mf_dropdown" ref={mf_dropdown_menu}>
            <div className="mf_dropdown_block">
                <span className="mf_dropdown_block_title" onClick={()=>setVisible(!visible)}>
                    <Tooltip title={tooltip} mouseEnterDelay={0.3}>
                        <span className="mf_dropdown_block_icon">
                            { Icon }
                        </span>
                    </Tooltip>
                </span>
            </div>
            <div style={{width}} className={`mf_dropdown_menu ${visible?"":"mf_dropdown_hidden"}`} >
                {children}
            </div>
        </div>

    )
};
