import React,{Component} from "react";

/**
 * 懒加载
 * @param importComponent
 * @returns {LazyComponent}
 * @constructor
 */
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

