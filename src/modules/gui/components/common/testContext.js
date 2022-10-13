// 我们使用一个单独的文件来调用createContext
// 因为这个返回值会被Provider和Consumer在不同的地方引用
import React from 'react';

const TestContext = React.createContext();

export default TestContext;
