
const ErrorContent = ({title, children}) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

export default ErrorContent