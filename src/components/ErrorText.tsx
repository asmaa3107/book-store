
export default function ErrorText({ errorMessage }: { errorMessage: string }) {
  return (
    <span className="text-left text-sm text-red-500 mt-2" style={{ color: 'red' }}>
      {/* Your email is not correct */}
      {errorMessage}
    </span>
  );
}
