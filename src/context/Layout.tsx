// Layout.jsx
import UserAvatar from './UserAvatar';

export default function Layout() {
  return (
    <div>
      <header>
        {/* 在这里渲染 UserAvatar */}
        <UserAvatar />
      </header>
      <main>页面内容...</main>
    </div>
  );
}
