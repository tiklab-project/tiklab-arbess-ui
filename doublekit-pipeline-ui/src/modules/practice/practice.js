import React ,{useState } from "react";
import './practice.scss'
import OptDrawer from "./components/optDrawer";

const Practice = () =>{

    const [visible, setVisible] = useState(false)
    const [data,setData] = useState('')

    return(

        <div className='config-details task'>
            <span onClick={()=>setVisible(true)}>hhh</span>
            {data}
            <OptDrawer
                visible={visible}
                setVisible={setVisible}
                setData={setData}
            />
        </div>
    )
}

export default Practice