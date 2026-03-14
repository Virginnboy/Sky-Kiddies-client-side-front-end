const Input =({id, label, textarea, className = "", ...props}) => {
  return (
    <div>
      <label htmlFor={id} className="input-label">{label}</label>
      {textarea ? (
        <textarea id={id} name={id} {...props} style={{width: "100%", height: "20px"}} className={className}/> 
      ) : ( 
        <input id={id} name={id} {...props} className={className}/>
      )}
    </div>
  )
}

export default Input;