import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select, { MultiValue } from 'react-select';
function Register() {
  const [formData, setFormData] = useState({
    academyName: '',
    phone: '',
    email: '',
    area: '',
    address: '',
    coachName: '',
    affiliations: '',
    fees: '',
    sports: [] as string[],
    batchTimings: [] as string[],
    password: '',
    role: 'coach',
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
    'źumaid chowk',
  ];

  const options = [
    { value: 'cricket', label: 'cricket' },
    { value: 'badminton', label: 'badminton' },
    { value: 'football', label: 'football' },
    { value: 'martialarts', label: 'martialarts' },
    { value: 'yoga', label: 'yoga' },
    { value: 'swimming', label: 'swimming' },
    { value: 'hockey', label: 'hockey' },
    { value: 'skate ', label: 'skate ' },
    { value: 'Wrestling', label: 'Wrestling' },
    // { value: 'Boxing', label: 'Boxing' },
    // { value: 'Table Tennis', label: 'Table Tennis' },
    // { value: 'Archery', label: 'Archery' },
    // { value: 'Weightlifting', label: 'Weightlifting' },
    // { value: 'Basketball', label: 'Basketball' },
    // { value: 'Volleyball', label: 'Volleyball' },
    // { value: 'Chess', label: 'Chess' },
    // { value: 'Golf', label: 'Golf' },
    // { value: 'Cycling', label: 'Cycling' },
    // { value: 'Gymnastics', label: 'Gymnastics' },
    // { value: 'Squash', label: 'Squash' },
    // { value: 'Rowing', label: 'Rowing' },
    // { value: 'Judo', label: 'Judo' },
    // { value: 'Karate', label: 'Karate' },
    // { value: 'Taekwondo', label: 'Taekwondo' },
  ];

  const styles = {
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: 'papayawhip',
      };
    },
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#ffbb40'
        : state.isFocused
          ? '#ffdd40'
          : '#ffffff',
      color: state.isSelected ? '#000000' : '#333333',
      marginBottom: 10,
    }),
  };

  const handleSportsChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>,
  ) => {
    setFormData({
      ...formData,
      sports: selectedOptions.map((option) => option.value),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    if (id === 'sports' || id === 'batchTimings') {
      setFormData({
        ...formData,
        [id]: value.split(',').map((item) => item.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log('Payload being sent:', JSON.stringify(formData));

      const response = await fetch(
        'https://vclottery.in/sportshub/api/register-academy',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json();

      if (response.ok) {
        toast.success('Signup successful!', {
          position: 'top-right',
          autoClose: 2000,
          onClose: () => {
            navigate('/');
          },
        });
      } else {
        console.error('Server responded with an error:', data);
        if (data.error && data.error.code === 11000) {
          // Duplicate key error
          let errorMessage = 'An academy with this ';
          if (data.error.keyValue.email) {
            errorMessage += 'email ';
          } else if (data.error.keyValue.phone) {
            errorMessage += 'phone number ';
          } else if (data.error.keyValue.academyName) {
            errorMessage += 'name ';
          } else {
            errorMessage += 'information ';
          }
          errorMessage += 'already exists.';
          toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 2000,
          });
        } else {
          toast.error(data.message || 'Signup failed. Please try again.', {
            position: 'top-right',
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Signup failed. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <section className="relative py-10 bg-gray-900 sm:py-16 lg:py-18">
        <div className="absolute inset-0">
          <img
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-gray-900/20" />
        <div className="relative max-w-3xl px-4 mx-auto sm:px-0">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#006666]">
                  Start Sports Hub Today
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  Already joined?{' '}
                  <Link
                    to="/"
                    className="text-[#ffbb40] transition-all duration-200 hover:underline hover:text-blue-700"
                  >
                    Login now
                  </Link>
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="academyName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Academy Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="academyName"
                      type="text"
                      value={formData.academyName}
                      onChange={handleChange}
                      className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="coachName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Coach Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="coachName"
                        type="text"
                        value={formData.coachName}
                        onChange={handleChange}
                        className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="area"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Area
                    </label>
                    <div className="mt-2">
                      <select
                        id="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="block w-full ps-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                      >
                        <option className="bg-[#006666] " value="">
                          Select Area
                        </option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap md:space-x-4 ">
                  <div className="w-full md:w-6/12 md:mb-0 mb-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-6/12  ">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap md:space-x-4">
                  <div className=" w-full md:w-6/12 md:mb-0 mb-5">
                    <label
                      htmlFor="batchTimings"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Batch Timings (Comma separated)
                    </label>
                    <div className="mt-2">
                      <input
                        id="batchTimings"
                        type="text"
                        value={formData.batchTimings.join(', ')}
                        onChange={handleChange}
                        className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                        placeholder="e.g., 9 AM - 11 AM, 4 PM - 6 PM"
                      />
                    </div>
                  </div>

                  <div className=" w-full md:w-6/12 ">
                    <label
                      htmlFor="sports"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Sports (Comma separated)
                    </label>
                    <div className="mt-2">
                      <Select
                        styles={styles}
                        id="sports"
                        value={formData.sports.map((sport) => ({
                          value: sport,
                          label: sport,
                        }))}
                        onChange={handleSportsChange}
                        closeMenuOnSelect={false}
                        isMulti
                        options={options}
                        className="block w-full  rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="fees"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Fees
                    </label>
                    <div className="mt-2">
                      <input
                        id="fees"
                        type="text"
                        value={formData.fees}
                        onChange={handleChange}
                        className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="affiliations"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Affiliations
                    </label>
                    <div className="mt-2">
                      <input
                        id="affiliations"
                        type="text"
                        value={formData.affiliations}
                        onChange={handleChange}
                        className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#006666] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffbb40] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#ffbb40] px-4 py-4 text-base font-semibold text-white transition-all duration-200 focus:outline-none hover:bg-[#006666] focus:bg-orange-700"
                >
                  Create free account
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
