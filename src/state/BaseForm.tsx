import { useState, type SubmitEvent, type ChangeEvent } from 'react';


function submitForm(answer: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'wuhan';
      if (shouldError) {
        reject(new Error('error'));
      } else {
        resolve(answer);
      }
    }, 1500);
  });
}


export default function BaseForm() {
  const [status, setStatus] = useState("initial");
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState<Error | null>(null)
  if (status === "success") {
    return <h1>success</h1>
  }
  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setStatus("submitting")

    try {
      await submitForm(answer);
      setStatus('success');
    } catch (e) {
      setStatus("typing")
      setError(e instanceof Error ? e : new Error(String(e)))
    }

  }

  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value)
  }

  return (
    <>
      <h2>城市测验</h2>
      <p>哪个城市有把空气变成饮用水的广告牌？</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={answer.length === 0 || status === 'submitting'}>
          提交
        </button>
        {error !== null && <p className="Error">{error.message}</p>}
      </form>
    </>
  );
}
