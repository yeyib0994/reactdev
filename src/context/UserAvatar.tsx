// UserAvatar.jsx（注意：中间不需要任何 props 传递！）
import { useTheme } from './ThemeContext';

export default function UserAvatar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: theme === 'light' ? '#72e5bf' : '#333',
        color: theme === 'light' ? '#333' : '#72e5bf',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <p>当前主题: {theme}</p>
      <button onClick={toggleTheme}>🌓 切换主题</button>
    </div>
  );
}
