module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-transform-react-jsx",
        ["@babel/plugin-transform-react-jsx-source"],
        ["@babel/plugin-transform-arrow-functions"],

        ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css"
        }],

        ["import", {
            "libraryName": "tiklab-plugin-manager-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-plugin-manager-ui/es/${fullName}`;
            }
        }, "tiklab-plugin-manager-ui"],

        ["import", {
            "libraryName": "tiklab-eam-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-eam-ui/es/${fullName}`;
            }
        },"tiklab-eam-ui"],

        ["import", {
            "libraryName": "tiklab-privilege-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-privilege-ui/es/${fullName}`;
            }
        },"tiklab-privilege-ui"],

        ["import", {
            "libraryName": "tiklab-user-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-user-ui/es/${fullName}`;
            }
        },"tiklab-user-ui"],

        ["import", {
            "libraryName": "tiklab-integration-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-integration-ui/es/${fullName}`;
            }
        }, "tiklab-integration-ui"],

        ["import", {
            "libraryName": "tiklab-message-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-message-ui/es/${fullName}`;
            }
        }, "tiklab-message-ui"],

        ["import", {
            "libraryName": "tiklab-todotask-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-todotask-ui/es/${fullName}`;
            }
        }, "tiklab-todotask-ui"],

        ["import", {
            "libraryName": "tiklab-security-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-security-ui/es/${fullName}`;
            }
        }, "tiklab-security-ui"],

        ["import", {
            "libraryName": "tiklab-licence-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-licence-ui/es/${fullName}`;
            }
        }, "tiklab-licence-ui"],

        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : false }],
        ["dynamic-import-webpack"],
        "@babel/plugin-syntax-dynamic-import",
        "react-hot-loader/babel",
        "equire"
    ]
}
