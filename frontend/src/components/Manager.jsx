import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { generatePassword } from "../utils/passwordGenerator";
import { checkPasswordStrength } from "../utils/passwordStrength";
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "", category: "" })
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordArray, setPasswordArray] = useState([])
    const [length, setLength] = useState(6);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
const [includeUpper, setIncludeUpper] = useState(true);
const [includeLower, setIncludeLower] = useState(true);
const [includeNumbers, setIncludeNumbers] = useState(true);
const [includeSymbols, setIncludeSymbols] = useState(true);
const [visiblePasswords, setVisiblePasswords] = useState({});
const strength = checkPasswordStrength(form.password);

useEffect(() => {
    console.log("Manager mounted");
    fetchPasswords();
}, []);
    
const fetchPasswords = async () => {
    try {
        const token = localStorage.getItem("token");

        console.log("Token:", token);

        const res = await fetch("https://keynest-api-f4w5.onrender.com/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Status:", res.status);

        const data = await res.json();
        console.log(data);

        setPasswordArray(data);

    } catch (error) {
        console.error(error);
    }
};



    const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
        ...prev,
        [id]: !prev[id],
    }));
};
    const handleGeneratePassword = () => {
    const password = generatePassword(
        length,
        includeUpper,
        includeLower,
        includeNumbers,
        includeSymbols
    );

    setform({
        ...form,
        password: password
    });
};
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            try {
                // Send to backend
               const token = localStorage.getItem("token");

const method = form.id ? "PUT" : "POST";

console.log("Method:", method);
console.log("Form id:", form.id);

const res = await fetch("https://keynest-api-f4w5.onrender.com/", {
    method,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
    ...form,
    id: form.id || uuidv4(),
}),
});
const data = await res.json();
console.log("Backend response:", data);


                // Save to localStorage
                await fetchPasswords();
                setform({
                    id: "",
    site: "",
    username: "",
    password: "",
    category: "",
});

                // Reset form
                setform({ id: "", site: "", username: "", password: "", category: "", });

                toast("Password Saved Successfully!", { position: "top-right", theme: "dark" });
            } catch (err) {
                console.error(err);
                toast("Error: Could not save password to backend");
            }
        } else {
            toast("Error: Fill all fields correctly");
        }
    };


  const deletePassword = async (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete this password?")
    if (c) {
    try {
        const token = localStorage.getItem("token");

        await fetch("https://keynest-api-f4w5.onrender.com/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id }),
        });

        await fetchPasswords();

        toast("Password Deleted!", {
            position: "top-right",
            theme: "dark",
        });

    } catch (error) {
        console.error(error);
    }
}
    }

    const editPassword = (id) => {
        console.log("Editing password with id", id)
        const passwordToEdit = passwordArray.find(item => item.id === id);
         console.log(passwordToEdit);
    setform(passwordToEdit);
}

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
   const filteredPasswords = passwordArray.filter((item) => {
    const matchesSearch =
        item.site.toLowerCase().includes(search.toLowerCase()) ||
        item.username.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

    return matchesSearch && matchesCategory;
});
    return (
        <>
            <div className="absolute top-0 -z-10 h-full w-full bg-teal-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-teal-400 opacity-20 blur-[100px]"></div></div>

           <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
  <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-teal-100 shadow-2xl p-6 md:p-10">

               <h1 className="mt-8 md:mt-16 text-center text-5xl md:text-5xl font-extrabold tracking-tight select-none">
    <span className="text-gray-900">Key</span>
    <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
        Nest
    </span>
</h1>

                <p className='text-teal-900 text-lg text-center'>
                    Your Digital Password Vault</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input
    value={form.site}
    onChange={handleChange}
    placeholder="🌐 Enter Website URL"
    className="w-full rounded-2xl border border-teal-300 bg-white/90 px-5 py-3 text-base placeholder:text-gray-400
    shadow-sm transition-all duration-300
    focus:border-teal-500 focus:ring-4 focus:ring-teal-200 focus:outline-none"
    type="text"
    name="site"
    id="site"
/><div className="w-full">
 

   <select
    value={form.category}
    onChange={handleChange}
    name="category"
    id="category"
    className="w-full rounded-2xl border border-teal-300 bg-white/90
    px-5 py-3 text-base
    shadow-sm transition-all duration-300
    focus:border-teal-500 focus:ring-4 focus:ring-teal-200
    focus:outline-none cursor-pointer"
>
    <option value="" disabled className="text-gray-200">
     Select Category
</option>
    <option value="Personal"> Personal</option>
    <option value="Work"> Work</option>
    <option value="Social"> Social</option>
    <option value="Banking"> Banking</option>
    <option value="Shopping"> Shopping</option>
    <option value="Others"> Others</option>
</select>
</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="w-full">
                    <input
  value={form.username}
  onChange={handleChange}
  placeholder="Enter Username"
  className="w-full rounded-xl border border-teal-500 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
  type="text"
  name="username"
  id="username"
/></div>
                        <div className="relative flex-1">
                           <input
  ref={passwordRef}
  value={form.password}
  onChange={handleChange}
  placeholder="Enter Password"
  className="w-full rounded-xl border border-teal-500 px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
 type={isPasswordVisible ? "text" : "password"}
  name="password"
  id="password"
/> <div className="mt-3">

    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

        <div
            className={`${strength.color} h-2 rounded-full transition-all duration-500`}
            style={{ width: strength.width }}
        ></div>

    </div>

    <div className="flex justify-between mt-2 text-xs">

        <span className="text-gray-500">
            Password Strength
        </span>

        <span
            className={`font-semibold ${
                strength.text === "Strong"
                    ? "text-teal-600"
                    : strength.text === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
            }`}
        >
            {strength.text}
        </span>

    </div>

</div>

                         <span
    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
    className="absolute right-4 top-2 cursor-pointer p-1 rounded-full hover:bg-teal-100 transition-all duration-200"
>
    <span className="material-symbols-outlined text-[22px] text-gray-600 hover:text-teal-600">
        {isPasswordVisible ? "visibility_off" : "visibility"}
    </span>
</span>
                        </div>

                    </div>
                  <div className="bg-white rounded-xl shadow-md p-5 border border-teal-100">

   <h3 className="text-2xl font-semibold text-center text-gray-800 mb-5">
    Password Generator
</h3>

    {/* Length */}
    <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600 font-medium">
           Length
        </span>

        <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {length}
        </span>
    </div>

    <input
        type="range"
        min="4"
        max="6"
         step="1"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      className="w-full accent-cyan-500 cursor-pointer hover:accent-teal-600 transition-all duration-300"
    />

    <button
        onClick={handleGeneratePassword}
       className="mt-4 w-full rounded-xl border border-teal-500 bg-white py-3 text-black font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl" >
        Generate Password
    </button>

</div>
                   <div className="flex justify-center mt-3">
    <button
        onClick={savePassword}
        className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 px-10 py-3.5 text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
    >
        <span className="material-symbols-outlined text-[22px] transition-transform duration-300 group-hover:rotate-12">
            save
        </span>

        Save Password
    </button>
</div>
                </div>
               </div>

<div className="passwords">

   <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 mb-6">

    <input
        type="text"
        placeholder="🔍 Search by website or username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:flex-1 border border-teal-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
    />

    <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full md:w-64 border border-teal-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400 bg-white"
    >
        <option value="All">All Categories</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Social">Social</option>
        <option value="Shopping">Shopping</option>
        <option value="Banking">Banking</option>
        <option value="Others">Others</option>
    </select>

</div>

    {filteredPasswords.length === 0 && (
    <div className="text-center text-gray-500 py-6">
        No matching passwords found.
    </div>
)}                  {filteredPasswords.length > 0 && (
    <div className="overflow-x-auto rounded-1xl border border-teal-100 bg-white shadow-xl mb-10">
        <table className="table-auto w-full">    
                     <thead className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white">
                           <tr>
                                <th className="w-[250px] px-6 py-4 text-center font-semibold tracking-wide"> Site</th>
                                <th className="w-[200px] px-6 py-4 text-center font-semibold tracking-wide"> Username</th>
                                <th className="w-[240px] px-6 py-4 text-center font-semibold tracking-wide"> Password</th>
                                <th className="w-[150px] px-6 py-4 text-center font-semibold tracking-wide w-28"> Actions</th>
                                <th className="px-6 py-4 text-center font-semibold tracking-wide">Category</th>

                            </tr>

                        </thead>
                        <tbody className='bg-teal-100'>
                            {filteredPasswords.map((item, index) => {
                                return <tr key={index}>
                                    <td className='px-5 py-2 border border-white text-center w-32'><a href={item.site} target='_blank'>{item.site}</a> </td>
                                    <td className='px-5 py-2 border border-white text-center w-32'>{item.username}</td>
                                   <td className="px-5 py-2 border border-white text-center">
    <div className="flex items-center justify-between w-[170px] mx-auto">

        <span className="text-center flex-1">
            {visiblePasswords[item.id]
                ? item.password
                : "••••••"}
        </span>

        <button
    onClick={() => togglePasswordVisibility(item.id)}
    className="ml-4 flex-shrink-0 p-1 rounded-full hover:bg-teal-100 transition"
>
    <span className="material-symbols-outlined text-[22px] text-gray-600 hover:text-teal-600">
        {visiblePasswords[item.id] ? "visibility_off" : "visibility"}
    </span>
</button>
    </div>
</td>

                                    <td className=' justify-center py-2 border border-white text-center w-24'>
                                        <span className="material-symbols-outlined cursor-pointer" onClick={() => { editPassword(item.id) }}>
                                            edit
                                        </span>
                                        <span className='cursor-pointer mx-1 ' onClick={() => { deletePassword(item.id) }} >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                trigger="hover"
                                                style={{ width: "25px", height: "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                    <td className="py-2 border border-white text-center">
    <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
        {item.category}
    </span>
</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
    </div>
)}
                </div>
                 </div>
        </>
    )
}

export default Manager
