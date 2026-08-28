import SampleBotton from './SampleBotton.tsx';
import { useState } from 'react';

export default function SampleApp() {
  const [count, setCount] = useState(0)

  function clickHandler() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>welcome</h1>
      <SampleBotton count = {count} onClick = {clickHandler} />
      <SampleBotton count = {count} onClick = {clickHandler} />
    </div>
  );
}
