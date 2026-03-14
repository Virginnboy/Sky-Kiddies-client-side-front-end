import Input from "../components/Input"
import "../auth/ForgotPassword.css"
import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "../store/auth"
import toast from "react-hot-toast"

export default function ForgotPassword() {
  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res)=> {
      toast.success(res?.message)
    },
    onError: (err)=> {
      toast.error(err.response?.data?.message)
    }
  })

  const handleForgotPassword =(e)=> {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get("email")
    mutate(email)
    e.target.reset();
  }

  return (
    <form method="post" className="forgot-password-container" onSubmit={handleForgotPassword}>
      <div id="forgot-pass-content">
        <div>
          <h1>Recover Your Password</h1>
          <p>You can request a password reset below. We will send a security code to the email address, please make sure it is correct.</p>
          <Input 
            label="Email"
            name="email"
          />
        </div>

        <div id="button-container">
          <button type="submit">{isPending ? "Sending..." : "Request Password Reset"}</button>
        </div>
      </div>
    </form>
  )
}