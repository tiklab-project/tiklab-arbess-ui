/**
 * @Description: 懒加载
 * @Author: gaomengyuan
 * @Date: 2025/3/20
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/4/07
 */
import React,{Component} from "react";

export default function AsyncComponent (importComponent) {
    class LazyComponent extends Component{
        constructor(props) {
            super(props);
            this.state = {
                component: null,
            };
        }
        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component
            });
        }

        render() {
            const C =  this.state.component;
            return C && <C {...this.props} />
        }

    }
    return LazyComponent;
}

