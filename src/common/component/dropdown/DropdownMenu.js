import React, {useEffect,useState,useRef} from "react";
import "./DropdownMenu.scss";

/**
 * 下拉菜单
 */

export const PortalDropdown = props => {

    const {visibility,tooltip, children, Icon, width=140, onClick} = props

    const [visible,setVisible] = useState(false);

    const mf_dropdown_menu = useRef(null);

    useEffect(() => {
        if (visible && visibility) {
            setVisible(!visibility)
        } else {
            setVisible(visibility)
        }
    }, [visibility]);

    useEffect(() => {
        window.addEventListener('click', clickDropdown,false);
        return() => {
            window.removeEventListener('click', clickDropdown,false)
        }
    },[visible])

    const clickDropdown = e => {
        if(!mf_dropdown_menu){
            return
        }
        if(mf_dropdown_menu.current && mf_dropdown_menu.current.contains(e.target)){
            return;
        }
        setVisible(false)
    }

    return(
        <div className="mf_dropdown" ref={mf_dropdown_menu}>
            <div className="mf_dropdown_block">
                <span
                    className={`mf_dropdown_block_item ${visible? "mf_dropdown_block_linked": ''}`}
                    onClick={onClick? onClick : ()=>setVisible(!visible)}
                >
                    <span className="mf_dropdown_block_icon" data-title-bottom={tooltip}>
                        { Icon }
                    </span>
                </span>
            </div>
            {
                children &&
                <div style={{width,top:48,right:0}} className={`mf_dropdown_menu ${visible?"":"mf_dropdown_hidden"}`} >
                    {children}
                </div>
            }
        </div>
    )
};

export const PipelineDropdown = props => {

    const {visible,setVisible, children, Icon, width=140,style} = props

    const mf_dropdown_pipeline_menu = useRef(null);

    useEffect(() => {
        window.addEventListener('click', clickDropdown,false);
        return() => {
            window.removeEventListener('click', clickDropdown,false)
        }
    },[visible])
    
    const clickDropdown = e => {
        if(!mf_dropdown_pipeline_menu){
            return
        }
        if(mf_dropdown_pipeline_menu.current && mf_dropdown_pipeline_menu.current.contains(e.target)){
            return;
        }
        setVisible(false)
    }

    return(
        <div className="mf_dropdown" ref={mf_dropdown_pipeline_menu}>
            <div className="mf_dropdown_block" onClick={()=>setVisible(!visible)}>
                { Icon }
            </div>
            <div style={{width,...style}} className={`mf_dropdown_menu ${visible?"":"mf_dropdown_hidden"}`} >
                {children}
            </div>
        </div>
    )
};

