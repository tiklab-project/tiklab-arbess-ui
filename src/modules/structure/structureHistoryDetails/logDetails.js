import React  from 'react'
import { Drawer } from 'antd';

const LogDetails = props =>{

    const {visible,setVisible,drawer} = props

    return(
        <Drawer
            placement='bottom'
            visible={visible}
            onClose={()=>setVisible(false)}
            style={{whiteSpace: 'pre-wrap'}}
        >
            {drawer}
        </Drawer>
   )
}

export default LogDetails