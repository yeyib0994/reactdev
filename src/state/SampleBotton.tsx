
type SampleBottonProps = {
  count: number;
  onClick: () => void;
};

export default function SampleBotton({ count, onClick }: SampleBottonProps) {
  return (
    <button onClick={onClick}>sample button: {count}</button>
  );
}
