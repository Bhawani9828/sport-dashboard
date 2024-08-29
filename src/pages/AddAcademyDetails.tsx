import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

interface JwtPayload {
  exp?: number;
  iat?: number;
}

// Define your custom token payload interface
interface CustomJwtPayload extends JwtPayload {
  user: {
      id: string;
      role: string;
  };
}

function AddAcademyDetails() {
  
  const [formData, setFormData] = useState({
    academyID: "",
    details: "",
    acadmeyInfo: "",
    coachInfo: "",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [academyName, setAcademyName] = useState<string>('');
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const token = Cookies.get('token');
    
    if (token) {
        try {
            const decodedToken = jwtDecode<CustomJwtPayload>(token);
            setUserId(decodedToken.user.id);
        } catch (error) {
            console.error("Error decoding token:", error);
            // Handle the error appropriately (e.g., redirect to login)
        }
    }
    setIsLoading(false);
}, []);

  useEffect(() => {
  const fetchAcademyName = async () => {
    if (userId) {
      console.log("Fetching academy name for userId:", userId);
      try {
        const response = await axios.get(`http://192.168.1.9:7000/api/academy-name/${userId}`);
        console.log("API response:", response.data);
        setAcademyName(response.data.name);
        console.log("Set academyName:", response.data.name);
      } catch (error) {
        console.error("Error fetching academy name:", error);
      }
    } else {
      console.log("No userId")
      
    }
  

  };
  fetchAcademyName();
}, [userId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://192.168.1.9:7000/api/acadmey/addDetails/${userId}`,
        {
          details: formData.details,
          acadmeyInfo: formData.acadmeyInfo,
          coachInfo: formData.coachInfo,
        }
      );

      console.log("Academy details added successfully:", response.data);
      toast.success("Academy details added successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      // Reset the form data
      setFormData({
        academyID: "",
        details: "",
        acadmeyInfo: "",
        coachInfo: "",
      });

      
    } catch (error: any) {
      console.error("Error adding academy details:", error);
      if (error.response) {
        console.error(
          "Server responded with error status:",
          error.response.status
        );
        console.error("Error details:", error.response.data);
        toast.error("Error adding academy details. Please try again.");
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
      <Breadcrumb pageName="Add Academy Details" />

      <div className="w-full max-w-full rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form
          onSubmit={handleSubmit}
          className="shadow-md rounded-md px-8 pt-6 pb-8 border-2 border-[#17BEBB]"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="academyID"
            >
              Academy Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="academyID"
              type="text"
              placeholder="Enter Academy ID"
              value={academyName}
              onChange={(e) => setAcademyName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="details"
            >
              Details
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="details"
              placeholder="Enter details"
              value={formData.details}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="acadmeyInfo"
            >
              Academy Info
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="acadmeyInfo"
              placeholder="Enter academy info"
              value={formData.acadmeyInfo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="coachInfo"
            >
              Coach Info
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="coachInfo"
              placeholder="Enter coach info"
              value={formData.coachInfo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-[#ffbb40] hover:bg-[#006666] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Academy Details
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddAcademyDetails;
