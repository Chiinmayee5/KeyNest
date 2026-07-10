import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])



    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/hide.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "icons/hide.png"
            passwordRef.current.type = "password"
        }

    }
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            try {
                // Send to backend
                const res = await fetch("https://password-manager-backend-8tgs.onrender.com/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                const data = await res.json();
                console.log("Backend response:", data);

                // Save to localStorage
                const newArray = [...passwordArray, { ...form, id: uuidv4() }];
                setPasswordArray(newArray);
                localStorage.setItem("passwords", JSON.stringify(newArray));

                // Reset form
                setform({ site: "", username: "", password: "" });

                toast("Password Saved Successfully!", { position: "top-right", theme: "dark" });
            } catch (err) {
                console.error(err);
                toast("Error: Could not save password to backend");
            }
        } else {
            toast("Error: Fill all fields correctly");
        }
    };


    const deletePassword = (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id != id))
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="absolute top-0 -z-10 h-full w-full bg-green-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-4 md:p-0 max-w-5xl mx-auto">

                <h1 className='mt-8 md:mt-16 text-4xl font-bold text-center'>

                    <span className="text-green-400">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-400">OP/&gt;</span>
                </h1>

                <p className='text-green-900 text-lg text-center'>
                    Your own Password Manager</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text" name="site" id="site" />

                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                      <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 md:w-1/2 w-full p-4 py-1' type="text" name="username" id="username" />

                        <div className="relative md:flex-1 w-full">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1 ' type="password" name="password" id="password" />
                            <p className="text-xs text-gray-500 mt-1">
                                Password must be 4-5 characters long and include at least one number.
                            </p>

                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt='eye' />

                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className='passwords'>
                    
                    {passwordArray.length === 0 && <div> No passwords to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2 w-24'>Actions</th>

                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center w-32'><a href={item.site} target='_blank'>{item.site}</a> </td>
                                    <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                                    <td className='py-2 border border-white text-center w-32'>{item.password}</td>

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
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
