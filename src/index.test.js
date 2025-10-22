import React from 'react';

describe('index.js', () => {
  test('React is available and importable', () => {
    expect(React).toBeDefined();
    expect(React.Fragment).toBeDefined();
  });

  test('React has createElement', () => {
    expect(typeof React.createElement).toBe('function');
  });

  test('ReactDOM should be available', () => {
    const ReactDOM = require('react-dom');
    expect(ReactDOM).toBeDefined();
    expect(ReactDOM.createRoot).toBeDefined();
  });

  test('ConfigProvider from antd should be available', () => {
    const antd = require('antd');
    expect(antd.ConfigProvider).toBeDefined();
  });

  test('environment is test', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  test('CSS file can be imported', () => {
    require('./index.css');
    expect(true).toBe(true);
  });
});
