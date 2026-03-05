const Input =({id, label, textarea, className = "", ...props}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea id={id} name={id} {...props} style={{width: "100%", height: "20px"}}/> 
      ) : ( 
        <input id={id} name={id} {...props} style={{width: "100%", height: "20px"}}/>
      )}
    </div>
  )
}

export default Input;