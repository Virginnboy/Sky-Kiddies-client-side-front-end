import { useMutation } from "@tanstack/react-query";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { resetPassword } from "../auth/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../pages/ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const  [confirmedPassword, setConfirmedPassword ] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res)=> {
      setTimeout(()=> {
        toast.success(res?.message)
      },2000)
      navigate("/login")
    },
    onError: (err)=> {
      toast.error(err?.response?.data?.message)
    }
  });

  const handleResetPassword = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const newPassword = formData.get("newPassword")
    const confirmPassword = formData.get("confirmPassword")

    const resetToken = params.token

    
    if (newPassword !== confirmPassword) {
      setConfirmedPassword("Password do not match");
      return;
    }
    setConfirmedPassword("");
    mutate({resetToken, newPassword});
  }

  return (
<form
  method="POST"
  className="reset-password-container"
  onSubmit={handleResetPassword}
>
  <div className="reset-password-card">
    <h1>Reset Password</h1>

    <p className="reset-password-description">
      Create a new password for your account. Choose one that's secure and easy
      for you to remember.
    </p>

    {confirmedPassword && (
      <p className="reset-password-error">
        {confirmedPassword}
      </p>
    )}

    <Input
      label="New Password"
      name="newPassword"
      type="password"
      autoComplete="new-password"
    />

    <Input
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      autoComplete="new-password"
    />

    <div className="reset-password-btn">
      <button type="submit" disabled={isPending}>
        {isPending ? "Resetting Password..." : "Change Password"}
      </button>
    </div>
  </div>
</form>
  )
}

export default ResetPassword;