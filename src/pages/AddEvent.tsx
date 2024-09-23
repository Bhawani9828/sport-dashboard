import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

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

function AddEvent() {
    // const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        eventName: "",
        eventDetails: "",
        eventDate: "",
        eventTime: "",
        eventSport: "",
        eventType: "" ,
        eventCities:"",
    });

    const cities = [
        'aauwa',
        'abhaneri',
        'abohar',
        'abu road',
        'achal gadh',
        'achrol',
        'ahor',
        'air force area',
        'ajit colony',
        'ajmer',
        'aklera',
        'alot',
        'alsisar',
        'alwar',
        'amar sagar pol',
        'ambah',
        'amer',
        'amet',
        'ani',
        'anjna',
        'anupgarh',
        'asind',
        'aspur',
        'atru',
        'bagar',
        'bagar meo',
        'bagidora',
        'bagru',
        'bah',
        'balesar',
        'bali',
        'balotra',
        'bamanwas',
        'bamora',
        'banar',
        'bandikui',
        'banera',
        'bansur',
        'banswara',
        'bap',
        'baran',
        'barar',
        'bari',
        'bari sadri',
        'barmer',
        'baseri',
        'bassi',
        'baswa',
        'bawal',
        'bayana',
        'begūn',
        'behror',
        'bera',
        'beāwar',
        'bhachau',
        'bhadesar',
        'bhadra',
        'bhagat ki kothi',
        'bhangarh',
        'bhanpura',
        'bharatpur',
        'bhehna',
        'bhiloda',
        'bhilwara',
        'bhim',
        'bhinai',
        'bhinmal',
        'bhiwadi',
        'bhopalgarh',
        'bhīndar',
        'bijaipur',
        'bijaynagar',
        'bijolia',
        'bikaner',
        'bilara',
        'bilonchi',
        'bilonā',
        'binawas',
        'bisalpur',
        'bishangarh',
        'bonali',
        'bundi',
        'bānkli',
        'chachaura',
        'chamboa sarjela',
        'chandan',
        'chandelao',
        'chandrawati',
        'chauhtan',
        'chhabra',
        'chhata',
        'chhipa barod',
        'chhoti sadri',
        'chikalwas',
        'chirawa',
        'chittorgarh',
        'chomu',
        'chopasni housing board',
        'churu',
        'chānod',
        'dabok',
        'dabwali',
        'daijar',
        'dakan kotra',
        'danta',
        'dantiwara',
        'dausa',
        'dechu',
        'dedha',
        'deeg',
        'degana',
        'delwara',
        'deshnoke',
        'desuri',
        'devgarh',
        'devli',
        'dhanera',
        'dhariyawad',
        'dhaulpur',
        'dheerpura',
        'dholpur',
        'dhānd',
        'didwana',
        'digod',
        'dudu',
        'dungargarh',
        'dungarpur',
        'eklingji',
        'elaka',
        'falna',
        'fatehabad',
        'fatehpur',
        'fazilka',
        'ferozpur jhirka',
        'gajner',
        'gangapur',
        'gangdhar',
        'gangrar',
        'gangānagar',
        'garhi',
        'garot',
        'ghanerao',
        'ghatol',
        'goga medi',
        'gogunda',
        'gosunda',
        'gudha gorji',
        'gulabpura',
        'guman',
        'guna',
        'gījgarh',
        'gūdha',
        'hanumangarh',
        'hindaun',
        'hindoli',
        'hisar',
        'honkra',
        'jahazpur',
        'jaipur',
        'jaipur district',
        'jairāmpura',
        'jaisalmer',
        'jaisamand',
        'jaitaran',
        'jalor',
        'jamwa ramgarh',
        'jawad',
        'jawai bandh',
        'jayal',
        'jhalamand',
        'jhalarapatan',
        'jhalawar',
        'jhalod',
        'jharol',
        'jhunjhunu',
        'jirapur',
        'jodhpur',
        'jojawar',
        'jora',
        'juliāsar',
        'kalakho',
        'kalinjara',
        'kaman',
        'kanooja',
        'kapasan',
        'karanpur',
        'karauli',
        'karlai',
        'karnu',
        'kekri',
        'ketu barabas',
        'khairagarh',
        'khandar',
        'khandela',
        'khandi',
        'khanjipeer',
        'khanpur',
        'kharda',
        'khed brahma',
        'khejarla',
        'kherli kalan',
        'kherwara',
        'khetri',
        'khichan',
        'khilchipur',
        'khimsar',
        'khiyansaria',
        'khonda',
        'khuri',
        'kiraoli',
        'kishanganj',
        'kishangarh',
        'kishangarh bas',
        'kivarli',
        'kolaras',
        'kolayat',
        'kolu',
        'kookas',
        'kota',
        'kotputli',
        'kotra',
        'kotri',
        'kuchaman',
        'kukas',
        'kuldhar',
        'kumbhalgarh',
        'kumher',
        'kālwāra',
        'kānota',
        'lachhmangarh',
        'ladnun',
        'lake swaroop sagar',
        'lakhau',
        'lakāwās',
        'lalsot',
        'lasadia',
        'loharu',
        'lunda',
        'luni',
        'lunkaransar',
        'mahamandir',
        'mahansar',
        'mahendragarh',
        'mahwah',
        'malhargarh',
        'malpura',
        'manasa',
        'mandai charnan',
        'mandal',
        'mandalgarh',
        'mandawa',
        'mandawar',
        'mandore',
        'mandsaur',
        'mangalwad',
        'mangrol',
        'mathura',
        'meghraj',
        'mehandipur',
        'menal',
        'merta',
        'mogana',
        'mogra',
        'morena',
        'mount abu',
        'māvli',
        'nadbai',
        'naenwa',
        'nagar',
        'nagaur',
        'nakoda',
        'nandauti',
        'naorangdesar',
        'narlai',
        'narnaul',
        'nasirabad',
        'nathdwara',
        'nathrau',
        'nawa',
        'nawalgarh',
        'neem ka thana',
        'neemrana',
        'neemuch',
        'nimaaj',
        'nimbahera',
        'niwai',
        'nohar',
        'nokha',
        'nuh',
        'nāi',
        'nīmri',
        'ordi',
        'osian',
        'pachpadra',
        'pachpahar',
        'padampur',
        'pal',
        'pali',
        'pallu',
        'paota',
        'parsoli',
        'parvatsar',
        'peharsar',
        'phagi',
        'phalodi',
        'phalsiya',
        'phulera',
        'pichiyak',
        'pichola',
        'pilani',
        'pilibangan',
        'pindwara',
        'pipalda kalan',
        'pirawa',
        'pohri',
        'pokhran',
        'poshina',
        'pratapgarh',
        'prempura',
        'punawali',
        'pushkar',
        'pākhar',
        'raghogarh',
        'raipur',
        'raisinghnagar',
        'rajawas',
        'rajgarh',
        'rajod',
        'rajsamand',
        'ramdevra',
        'ramganj mandi',
        'ramgarh',
        'ranakpur',
        'raniwara',
        'rashmi',
        'ratanada',
        'ratangarh',
        'ratanpur',
        'rathaia',
        'rawatbhata',
        'rawatsar',
        'rawla mandi',
        'rehandri',
        'relmagra',
        'revdar',
        'rewari',
        'rohat',
        'roop pura',
        'rughnathpura',
        'sadri',
        'sagwara',
        'salasar',
        'salumbar',
        'sambhar',
        'sanchore',
        'sanganer',
        'sangariya',
        'sangod',
        'sapotra',
        'sardarshahar',
        'sareri',
        'sarupa',
        'sarwar',
        'sawai madhopur',
        'sedri',
        'sekhawati',
        'sendra',
        'sehrawan',
        'serawa',
        'sewad',
        'shahpura',
        'shergarh',
        'shivganj',
        'siandri',
        'sikandra',
        'sikar',
        'sirohi',
        'sitamau',
        'sivad',
        'sivana',
        'siwana',
        'siāna',
        'sojat',
        'sojat road',
        'solankiya tala',
        'soni',
        'sri ganganagar',
        'sumerpur',
        'sumel',
        'sunel',
        'sunth',
        'suratgarh',
        'suratpura',
        'suroth',
        'suwa',
        'swaroopganj',
        'tahrawar',
        'takhatgarh',
        'tala',
        'talabgaon',
        'talara',
        'tambesara',
        'taoru',
        'taranagar',
        'tasol',
        'tijara',
        'tonk',
        'tordi',
        'udaipur',
        'udaipurwati',
        'udaipurwati tehsil',
        'udhamsingh nagar',
        'ujain',
        'ummaid chowk',
        'umrain',
        'unhel',
        'uniara',
        'vijaynagar',
        'vira',
        'viratnagar',
        'walgan',
        'zarbagh',
        'źumaid chowk'
    ];
    const [photos, setPhotos] = useState<File | null>(null);
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

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleFileChange = (e: any) => {
        setPhotos(e.target.files[0]);
    };

    const formatDate = (date: string): string => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };


 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) {
        toast.warning("Please wait while we load your information.");
        return;
    }

    if (!userId) {
        toast.error("User ID is not available. Please log in again.");
        return;
    }
 // Format the event date to dd-mm-yyyy
        const formattedEventDate = formatDate(formData.eventDate);
        
    const formDataToSend = new FormData();
    formDataToSend.append("eventName", formData.eventName);
    formDataToSend.append("eventDetails", formData.eventDetails);
    formDataToSend.append("eventDate", formattedEventDate);
    formDataToSend.append("eventTime", formData.eventTime);
    formDataToSend.append("eventSport", formData.eventSport);
formDataToSend.append("eventType", formData.eventType);
formDataToSend.append("eventCities", formData.eventCities);

    if (photos) {
        formDataToSend.append("photos", photos);
    }
    

    try {
        const response = await axios.post(
            `https://vclottery.in/sportshub/api/events/${userId}`,
            formDataToSend,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("Event added successfully:", response.data);
        toast.success("Event added successfully!", {
            position: "top-right",
            autoClose: 2000,
        });

        setFormData({
            eventName: "",
            eventDetails: "",
            eventDate: "",
            eventTime: "",
            eventSport: "",
           eventType: "" ,
           eventCities:"",
    });
       
        setPhotos(null);
        // navigate('/');

    } catch (error: any) {
        console.error("Error:", error);
        console.error("Axios error details:", error.toJSON());
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            // Request was made but no response received
            console.error("Request data:", error.request);
        } else {
            // Something happened in setting up the request
            console.error("Error message:", error.message);
        }
        toast.error("Failed to add event. Please try again later.");
    }
};

    return (
        <>
            <Breadcrumb pageName="Add Event" />

            <div className="w-full max-w-full rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <form
                    onSubmit={handleSubmit}
                    className="shadow-md rounded-md px-8 pt-6 pb-8 border-2 border-[#17BEBB]"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="eventName"
                        >
                            Event Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="eventName"
                            type="text"
                            placeholder="Enter event name"
                            value={formData.eventName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="eventDetails"
                        >
                            Event Details
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="eventDetails"
                            placeholder="Enter event details"
                            value={formData.eventDetails}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="eventDate"
                        >
                            Event Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="eventDate"
                            type="date"
                            placeholder="Enter event date"
                            value={formData.eventDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="eventTime"
                        >
                            Event Time
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="eventTime"
                            type="time"
                            placeholder="Enter event time"
                            value={formData.eventTime}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="photos"
                        >
                            Photos
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="photos"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="mb-4">
    <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="eventSport"
    >
        Event Sport
    </label>
    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="eventSport"
        type="text"
        placeholder="Enter event sport"
        value={formData.eventSport}
        onChange={handleChange}
    />
</div>

<div className="mb-4">
    <label
        htmlFor="eventCities"
        className="block text-sm font-medium leading-6 text-gray-900"
    >
        City
    </label>
    <div className="mt-2">
        <select
            id="eventCities"
            value={formData.eventCities}
            onChange={handleChange}
            className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
        >
            <option className='bg-[#006666]' value="">Select a city</option>
            {cities.map((city) => (
                <option key={city} value={city}>
                    {city}
                </option>
            ))}
        </select>
    </div>
</div>

<div className="mb-4">
    <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="eventType"
    >
        Event Type
    </label>
    <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="eventType"
        value={formData.eventType}
        onChange={handleChange}
    >
        <option value="">Select event type</option>
        <option value="district">District</option>
        <option value="state">State</option>
        <option value="national">National</option>
    </select>
</div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-[#ffbb40] hover:bg-[#006666] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Add Event"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddEvent;
