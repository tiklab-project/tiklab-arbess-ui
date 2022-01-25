/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 16:45:10
 */
import React,{Fragment} from 'react';
import { DownOutlined } from '@ant-design/icons';
const wikirouter = [
        {
            title: '所有知识库',
            key: '1',
            icon: "icon1_light-bulb"
        },
        {
            title: '最近浏览的知识库',
            key: '2',
            icon: "icon1_megaphone-money"
        }
        ,
        {
            title: '我创建的知识库',
            key: '3',
            icon: "icon1_sun-clouds"
        }
        ,
        {
            title: '我参与的知识库',
            key: '4',
            icon: "icon1_light-bulb"
        }
        ,
        {
            title: '我关注的知识库',
            key: '5',
            icon: "icon1_cheese"
        }
    ]
class Wikiaside extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showMenu: true
        }
    }
    
    hiddenMenu=()=> {
        const timer = setTimeout(()=> {
            this.setState({
                showMenu : !this.state.showMenu
            })
        },300)
    }
    //选择菜单项
    selectMenu=(e)=> {
        const menu = e.target.parentNode.childNodes;
        menu.forEach((item)=> {
            item.classList.remove("wiki-menu-select")
        })
        e.target.classList.add("wiki-menu-select");

    }
    // 
    selectKey(key){
        // WikiStore.searchwikiList(key)
    }
    render(){
        const {showMenu}= this.state
        return(
            <Fragment>
                <div className="wiki-aside">
                    <div className="wiki-title" onClick={this.hiddenMenu}>
                        <div>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= "#icon1_cheese"></use>
                            </svg> 知识库
                        </div><DownOutlined style={{fontSize: "10px"}}/>
                    </div>
                    <ul className={`wiki-menu ${!showMenu? "hidden-menu": ""}`} onClick={this.selectMenu}>
                        {
                            wikirouter && wikirouter.map(Item=> {
                                return <li className="wiki-menu-submenu" key={Item.key} onClick={()=>this.selectKey(Item.key)}>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref= {`#${Item.icon}`}></use>
                                        </svg>
                                    {Item.title}
                                </li>
                            })
                        }
                    </ul>
                </div>
            </Fragment>
        )
    }
}
export default Wikiaside;