import React,{useRef,useEffect} from "react";
import {Drawer} from "antd";

const PipelineDrawer = props =>{

    const {requireRef,children,...res} = props

    const detailRef = useRef();

    useEffect(() => {
        window.addEventListener("mousedown", closeModal, false);
        return () => {
            window.removeEventListener("mousedown", closeModal, false);
        }
    }, [res.visible])

    const closeModal = (e) => {
        if (!detailRef.current || !requireRef) {
            return;
        }
        if (!detailRef.current.contains(e.target) && detailRef.current !== e.target) {
            res.onClose()
        }
    }

    return (
        <Drawer
            placement="right"
            closable={false}
            bodyStyle={{padding:0,overflow:"hidden"}}
            {...res}
        >
            <div ref={detailRef}>
                {children}
            </div>
        </Drawer>
    )
}

export default PipelineDrawer
