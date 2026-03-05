import Input from "../components/Input"
import "../auth/ForgotPassword.css"

export default function ForgotPassword() {
  return (
    <form method="post" className="forgot-password-container">
      <div id="forgot-pass-content">
        <div>
          <h1>Forgot Password</h1>
          <Input label="Email"/>
        </div>

        <div id="button-container">
          <button>Send</button>
        </div>
      </div>
    </form>
  )
}