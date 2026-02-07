export function Truncate({text, length, className = ""}) {
    if (text.length > length) 
      return <span className={className}>{text.slice(0, length)}  {"...."}</span>
  return (
    <span className={className}>{text}</span>
  )
};