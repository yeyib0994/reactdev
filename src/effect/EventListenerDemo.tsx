import { useState, useEffect } from 'react';

// 子组件：负责监听窗口大小
function WindowSizeTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      console.log('当前窗口宽度:', window.innerWidth);
    };

    // 1. 添加事件监听
    window.addEventListener('resize', handleResize);
    console.log('🟢 已添加窗口大小监听器');

    // 2. 返回清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('🔴 已移除窗口大小监听器（组件卸载）');
    };
  }, []); // 空依赖数组，仅在挂载和卸载时执行

  return <p>当前窗口宽度：{width}px</p>;
}

// 父组件：控制子组件的显示与隐藏
export default function EventListenerDemo() {
  const [showTracker, setShowTracker] = useState(true);

  return (
    <div style={{ padding: '20px' }}>
      <h2>场景一：事件监听器清理</h2>
      <button onClick={() => setShowTracker(!showTracker)}>
        {showTracker ? '隐藏追踪器' : '显示追踪器'}
      </button>

      {showTracker && <WindowSizeTracker />}

      <p style={{ color: 'gray' }}>
        提示：请打开浏览器控制台（F12），缩放窗口查看日志。点击隐藏后，缩放窗口将不再触发日志。
      </p>
    </div>
  );
}
