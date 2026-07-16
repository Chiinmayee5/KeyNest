import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';


const  Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
   
   const getPasswords = async() => {
    console.log("Fetching backend...");

     let req = await fetch("https://password-manager-backend-8tgs.onrender.com/")
     let passwords = await req.json()
            console.log(passwords)
            setPasswordArray(passwords)
   }
   
    useEffect(() => {
        getPasswords()

    }, [])


    const savePassword = async () => {
         if(form.site.length>3 && form.site.username>3 && form.site.password>3){

        //if any such id exists in db, delete it
         await fetch("https://password-manager-backend-8tgs.onrender.com/",{ method: "DELETE", headers: {"Content-Type":"application/json"},body: JSON.stringify({id: form.id})})
      
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        await fetch("https://password-manager-backend-8tgs.onrender.com/",{ method: "POST", headers: {"Content-Type":"application/json"},body: JSON.stringify({...form, id: uuidv4()})})
        //localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        //console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
         toast('Password Saved Successfully!',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
       }else{
        toast('Error: Password not saved');
       }
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
             setPasswordArray(passwordArray.filter(item=>item.id!=id))
       // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!=id)))
        let res = await fetch("https://password-manager-backend-8tgs.onrender.com/",{ method: "DELETE", headers: {"Content-Type":"application/json"},body: JSON.stringify({id})})
      
        toast('Password Deleted!',{
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

    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform({...passwordArray.filter(i=>i.id===id)[0], id: id})
        setPasswordArray(passwordArray.filter(item=>item.id!=id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="absolute top-0 -z-10 h-full w-full bg-teal-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-teal-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-3 md: p-0 md:mycontainer">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className="text-teal-400">&lt;</span>
                    <span>Pass</span>
                    <span className="text-teal-400">OP/&gt;</span>
                </h1>

                <p className='text-teal-900 text-lg text-center'>
                    Your own Password Manager</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-teal-500 w-full p-4 py-1 ' type="text" name="site" id="site" />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-teal-500 w-full p-4 py-1 ' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-teal-500 w-full p-4 py-1 ' type="password" name="password" id="password" />
                            
                        </div>

                    </div>
                    
                </div>
                <div className='passwords'>
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                         <thead className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white">
                            <tr className="border-b border-teal-100 hover:bg-teal-50 transition-all duration-200">
                                <th className="px-6 py-4 text-center font-semibold tracking-wide"> Site</th>
                                <th className="px-6 py-4 text-center font-semibold tracking-wide"> Username</th>
                                <th className="px-6 py-4 text-center font-semibold tracking-wide"> Password</th>
                                <th className="px-6 py-4 text-center font-semibold tracking-wide w-28"> Actions</th>
                                <th className="px-6 py-4 text-center font-semibold tracking-wide">Category</th>
                            </tr>
                        </thead>
                        <tbody className='bg-teal-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='px-5 py-2 border border-white text-center w-32'><a href={item.site} target='_blank'>{item.site}</a> </td>
                                    <td className='px-5 py-2 border border-white text-center w-32'>{item.username}</td>
                                    <td className='px-5 py-2 border border-white text-center w-32'>{item.password}</td>

                                    <td className=' justify-center py-2 border border-white text-center'>
                                        <span className="material-symbols-outlined cursor-pointer" onClick={()=>{editPassword(item.id)}}>
                                            edit
                                        </span>
                                        <span className='cursor-pointer mx-1 'onClick={()=>{deletePassword(item.id)}} >
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

}
export default Manager
