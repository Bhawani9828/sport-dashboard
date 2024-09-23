
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from '../../images/login.jpg';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (e:any) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
    
      // Static superadmin credentials
      const superadminEmail = "superadmin@gmail.com";
      const superadminPassword = "super123";
    
      if (formData.email === superadminEmail && formData.password === superadminPassword) {
        // Set a mock JWT token with the role "superadmin"
        const mockToken = {
          user: {
            role: "superadmin",
          },
        };
    
        // Encode the token (simulated for static login)
        const encodedToken = btoa(JSON.stringify(mockToken));
        Cookies.set("token", `mock.${encodedToken}.signature`);
    
        toast.success("Superadmin signed in successfully!", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            navigate("/dashboard");
          },
        });
    
        // Reset form data
        setFormData({
          email: "",
          password: "",
        });
        return;
      }
    
      try {
        const response = await axios.post(
          "https://vclottery.in/sportshub/api/auth/login",
          formData
        );
        console.log("Admin signin successfully:", response.data);
    
        // Save token in cookies
        Cookies.set("token", response.data.token);
    
        // Fetch user role
        const token = response.data.token;
        const userResponse = await axios.get(
          "https://vclottery.in/vc/api/auth/protected",
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        );
        const role = userResponse.data.user.role;
        console.log("User role:", role);
    
        // Save user role in cookies
        Cookies.set("userRole", role);
    
        if (role === "superadmin") {
          toast.success("Superadmin signed in successfully!", {
            position: "top-right",
            autoClose: 2000,
            onClose: () => {
              navigate("/dashboard");
            },
          });
        } else {
          toast.success("Coach signed in successfully!", {
            position: "top-right",
            autoClose: 2000,
            onClose: () => {
              navigate("/event");
            },
          });
        }
    
        setFormData({
          email: "",
          password: "",
        });
      } catch (error: any) {
        console.log("data::::::", error);
        if (error.response) {
          console.error(
            "Server responded with error status:",
            error.response.status
          );
          console.error("Error details:", error.response.data);
          toast.error("Error adding admin signin. Please try again later.");
        } else if (error.request) {
          console.error("No response received from server:", error.request);
          toast.error(
            "No response received from server. Please check your internet connection."
          );
        } else {
          console.error("Error setting up the request:", error.message);
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
    };
    
    
  return (
   <>
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src="../../../public/favicon.ico" className="w-mx-auto" />
          </div>
          <div className=" px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#006666]">
                Login to your account
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="text"
                      autoComplete="email"
                      required
                      className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="flex w-full mb-5 justify-center rounded-md bg-[#ffbb40] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Sign in
                  </button>
                  <Link to="/register" className="mt-5 flex justify-center">  Not a member? <span className="text-[#ffbb40]">Create a Account</span></Link>
                </div>
             
              </form>
              
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[#e4572e24] text-center  lg:flex">
          <div
            className=" h-full  w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>
        </div>                            
      </div>
    </div>
   </>
  )
}

export default Login
