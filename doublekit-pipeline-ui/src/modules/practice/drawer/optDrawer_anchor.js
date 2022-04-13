import React from "react";
import { Anchor } from 'antd';

const { Link } = Anchor;

const OptDrawer_anchor = props =>{

    const handleClick = e =>{
        e.preventDefault()
    }

    const onChange = (link) => {
        console.log('Anchor:OnChange', link);
    }

    return(
        <div className='opt_drawer-anchor'>
            <Anchor
                onClick={handleClick}
                affix={false}
                onChange={onChange}
                getContainer={()=>document.getElementById('content')}
            >
                <Link href="#a" title='测试' />
                <Link href="#b" title='构建' />
                <Link href="#c" title='部署' />
            </Anchor>
        </div>
    )
}

export default OptDrawer_anchor