import { useMutation } from "@tanstack/react-query";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { resetPassword } from "../store/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
      setConfirmedPassword("Password do not match")
    }
    mutate({resetToken, newPassword})
  }

  return (
    <form method="POST" onSubmit={handleResetPassword}>
      <h1>Reset Password</h1>
        {confirmedPassword}
      <div>
        <Input 
          label="New Password"
          name="newPassword"
        />
        <Input 
          label="Confirm Password"
          name="confirmPassword"
        />
      </div>

      <p>
        <button type="submit">{isPending? "Reseting Password..." : "Change Password"}</button>
      </p>
    </form>
  )
}

export default ResetPassword;