import { useState, useEffect } from 'react';

// 子组件：负责倒计时
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('⏱️ 启动定时器');

    // 1. 启动定时器
    const intervalId = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // 2. 返回清理函数
    return () => {
      clearInterval(intervalId);
      console.log('🛑 已清除定时器（组件卸载）');
    };
  }, []);

  return <p>计时器已运行：{count} 秒</p>;
}

// 父组件：控制子组件的显示与隐藏
export default function TimerDemo() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div style={{ padding: '20px' }}>
      <h2>场景二：定时器清理</h2>
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? '停止并卸载计时器' : '重新启动计时器'}
      </button>

      {showTimer && <Timer />}

      <p style={{ color: 'gray' }}>
        提示：请打开浏览器控制台（F12）。点击卸载后，计时器会停止，控制台会打印清除日志。
      </p>
    </div>
  );
}
