// App.jsx
import { ThemeProvider } from './ThemeContext';
import UserAvatar from './UserAvatar'; // 引入

export default function UseContextApp() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>Context 测试页面</h1>
        {/* 直接在这里渲染，验证数据是否能跨层级传递 */}
        <UserAvatar />
      </div>
    </ThemeProvider>
  );
}
