export function Truncate({text, length, className = ""}) {
    if (text.length > length) 
      return <div className={className}>
        <span >{text.slice(0, length)}  {"...."}</span>
      </div>
  return (
    <div className={className}>
      <span >{text}</span>
    </div>
  )
};