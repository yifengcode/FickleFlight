# 测试文档

## 概述

为 FickleFlight 项目添加了 Jest 和 React Testing Library 单元测试框架。

## 已添加的测试文件

### 核心测试文件

1. **src/setupTests.ts** - Jest DOM 测试环境配置
2. **src/components/PortalPopup.test.tsx** - PortalPopup 组件测试
3. **src/reportWebVitals.test.tsx** - 性能指标报告测试
4. **src/utils.test.tsx** - 项目配置和工具测试

## 测试覆盖范围

### PortalPopup 组件测试
- ✅ 基本渲染测试
- ✅ 自定义样式应用 (overlay color, z-index)
- ✅ 不同位置配置测试
- ✅ Portal 容器创建测试

### reportWebVitals 工具测试
- ✅ 函数定义检查
- ✅ 参数处理测试
- ✅ 错误处理测试

### 项目配置测试
- ✅ React 库配置验证
- ✅ Date-fns 库可用性检查
- ✅ Jest 环境配置验证
- ✅ CSS 模块类型声明测试

## 测试运行命令

```bash
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm test -- --coverage

# 运行特定测试文件
npm test PortalPopup.test.tsx

# 静默模式运行测试
npm test -- --watchAll=false
```

## 测试覆盖率报告

当前测试覆盖率：
- 语句覆盖率: 37.33%
- 分支覆盖率: 45.28%
- 函数覆盖率: 20.58%
- 行覆盖率: 37.33%

主要覆盖的文件：
- PortalPopup.tsx: 72.97% 语句覆盖率
- reportWebVitals.tsx: 25% 语句覆盖率

## 技术栈

- **Jest**: 测试框架
- **React Testing Library**: React 组件测试工具
- **@testing-library/jest-dom**: DOM 测试匹配器
- **@testing-library/user-event**: 用户交互模拟

## 测试最佳实践

1. **组件隔离测试**: 使用 mock 避免依赖复杂性
2. **基本功能验证**: 确保组件能正常渲染和基本交互
3. **边界条件测试**: 测试各种输入参数和边界情况
4. **用户行为模拟**: 测试真实的用户交互场景

## 下一步改进

1. 为 Homepage 和 ResultsPage 组件添加更完整的测试
2. 增加集成测试覆盖路由功能
3. 添加端到端测试
4. 提高整体测试覆盖率到 80% 以上
5. 添加性能测试和无障碍性测试

## 注意事项

- 由于 react-router-dom 的模块解析问题，暂时未能完成路由相关组件的完整测试
- 建议在 CI/CD 流程中集成测试运行
- 测试文件遵循 `*.test.tsx` 命名约定