import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import axios from "axios";
// Define the JwtPayload interface
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

function Gallery() {
  const [academyName, setAcademyName] = useState<string>('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos = Array.from(event.target.files);
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos].slice(-10)); // Keep only the last 10 images
    }
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('academyName', academyName);

    // Append all selected photos
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });

    // Append the selected logo
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const response = await fetch('http://192.168.1.9:7000/api/add-photos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Files uploaded successfully!');
      } else {
        alert('Failed to upload files.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('An error occurred while uploading the files.');
    }
  };

  return (
    <div>
      <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover" style={{backgroundImage: 
'url(https://plus.unsplash.com/premium_photo-1708696216220-8323ecdbca47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc3fHxzcG9ydCUyMGh1YnxlbnwwfHwwfHx8MA%3D%3D)'}}>
        <div className="absolute bg-[#0066664a] opacity-60 inset-0 z-0" />
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-[#006666]">
              Images Upload!
            </h2>
            <p className="mt-2 text-sm text-gray-400">Upload files/img to your academy.</p>
          </div>
          <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Academy Name</label>
              <input 
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006666]"  
                placeholder="name" 
                value={academyName}
                onChange={(e) => setAcademyName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Logo</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-20 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    {logo && (
                      <img className="has-mask h-20 object-center" src={URL.createObjectURL(logo)} alt="Logo preview" />
                    )}
                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> logo here <br /> or <a className="text-blue-600 hover:underline">select a logo</a> from your computer</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleLogoChange} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Photos</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="Upload placeholder" />
                    </div>
                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                  </div>
                  <input type="file" className="hidden" multiple onChange={handleFileChange} />
                </label>
              </div>
            </div>

            {/* Display Uploaded Photos */}
            {photos.length > 0 && (
              <div className={`grid grid-cols-2 gap-2 mt-4`}>
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <p className="text-sm text-gray-300">
              <span>File types: doc, pdf, image files</span>
            </p>
            <div>
              <button 
                type="submit" 
                className="my-5 w-full flex justify-center bg-[#006666] text-white p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-[#ffbb40] shadow-lg cursor-pointer transition ease-in duration-300">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: "\n\t.has-mask {\n\t\tposition: absolute;\n\t\tclip: rect(10px, 150px, 130px, 10px);\n\t}\n" }} />
    </div>
  );
}

export default Gallery;
