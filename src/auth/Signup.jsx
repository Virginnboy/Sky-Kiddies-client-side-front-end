import Input from "../components/Input";
import { Link, Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { api } from "../api/axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import "../auth/Signup.css"

const Signup = ()=> {
  const data = useActionData();
  const isSubmiting = useNavigation().state === "submitting"
  
  useEffect(()=> {
    if (data?.message) {
      toast.error(data.message);
    }
  }, [data])

  return (
    <Form method="post" className="signup-container">
      <div className="signup-content-container">
        <h1>Signup</h1>
        <div>
          <Input 
          label="First Name"
          name="firstName"
          id="firstname"
          className="input"
          />
          <Input 
          label="Email" 
          type="email"
          name="email"
          id="email"
          className="input"
          />
          <Input 
          label="Password" 
          type="password"
          name="password"
          id="password"
          autoComplete="password"
          className="input"
          />

          <Input 
          label="Confirm Password" 
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          autoComplete="password"
          className="input"
          />
        </div>

        <div className="signup-button-container">
          <button>{isSubmiting? "Signing up..." : "Signup"}</button>
        </div>

        <p>Already have an account? <Link to="/login">Login here</Link></p>

      </div>
    </Form>
  )
}

export default Signup 

export const action = async ({request}) => {
  const data = await request.formData();

  const email = data.get("email");
  const password = data.get("password");
  const firstName = data.get("firstName") 
  const confirmPassword = data.get("confirmPassword")

  if (password !== confirmPassword) {
    return {message: "Password do not match"}
  }

  try {
    await api.post("user/signup", {email, password, firstName});
  
    return redirect("/login?signup=success")

  }catch (err) {
    console.log(err)
    return err.response?.data || { message: "Signup failed"}
  }
}