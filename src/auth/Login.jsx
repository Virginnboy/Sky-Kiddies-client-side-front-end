import Input from "../components/Input";
import { Link, Form, redirect, useActionData, useSearchParams, useNavigation } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { api } from "../api/axios";
import "../auth/Login.css"

export default function Login() {
  const [ searchParams ] = useSearchParams();
  const data = useActionData();
  const isSubmiting = useNavigation().state === "submitting"
  console.log(data)

  const isSuccess = searchParams.get("signup") === "success";

  useEffect(()=> {
    if(isSuccess) {
      toast.success("Signup Successfully🎉 please Login to continue")
    }
  }, [isSuccess])

useEffect(() => {
  if (data?.message) {
    toast.error(data.message);
  }
}, [data]);

  return (
    <Form method="post" className="login-container">
      <div className="mobile-container">
        <h1>Login</h1>
        <div>
          <Input 
            label="Email"
            name="email"
            id="email"
            className="input"
          />
          
          <Input 
            label="Password"
            name="password"
            id="password"
            type="password"
            autoComplete="password"
            className="input"
          />
        </div>

        <div className="button-container">
          <Link to="/forgot-password">Forgotten Password?</Link>
          <button type="submit">{isSubmiting? "Loging in..." : "Login"}</button>
        </div>
        <p>You don't have an account yet? <Link to="/signup">Signup here</Link></p>
      </div>
    </Form>
  )
}

export async function action({request}) {
  const data = await request.formData();
  const email = data.get("email")
  const password = data.get("password")
  try {
    const response = await api.post("user/login", {email, password})

    const user = response.data.user

    localStorage.setItem("user", JSON.stringify(user))

    return redirect("/dashboard/?login=success")
  }catch (err) {
    console.log(err)
    return err.response?.data || {message: "Login Failed"}
  }
}