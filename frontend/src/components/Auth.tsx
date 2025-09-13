//one of the main file that helps to understand about reusable components and how to arrange the componenets to work seperately

import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom"
import { useState, type ChangeEvent } from "react";
import { signUpInput } from "@verstappencodes/medium";
import { z } from "zod";
import { BACKEND_URL } from "../config";
import FadeLoader from "react-spinners/FadeLoader";
// flex-col helps you to keep the items 

// adding the input fields and title as reusable components

type SignUpInput = z.infer<typeof signUpInput>
export const Auth = ({type}:{type:"signup" | "signin"})=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name: "",
        username: "",
        password: ""
    });
    async function sendSignUpRequest(){
        try{
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs);
            const { jwt } = response.data;
            localStorage.setItem("token",jwt);
            localStorage.setItem("userName", response.data.name);
            console.log(response.data);
            navigate("/blogs")
        }catch(e){
            const error = e as AxiosError<{ message: string }>;
            alert(error.response?.data?.message || "Request failed. Please try again.");
        }
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="px-10">
                <div className="p-6">
                    <div className="text-3xl font-extrabold">
                        {type === "signup" ? "Create an account" : "Access your account"}
                    </div>
                    <div className="text-slate-500">
                        {type === "signup" ? "Already have an account?" : "Create an account"}
                        <Link to={type === "signup" ? "/signin" : "/signup"} className="underline pl-2">{type === "signin" ? "Sign Up" : "Sign In"}</Link>
                    </div>
                </div>
                <div>
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Harkirat Singh" onChange={(e)=>{
                        //giving a function as input to setPostInputs - that helps us to avoid race conditions
                        // only if the type is signup the page needs to have signup becuase signin page do
                        // not have the name field 
                        setPostInputs({
                            ...postInputs,
                            name:e.target.value
                        })
                    }}/>:null}
                    <LabelledInput label="email" placeholder="Harkirat@gmail.com" onChange={(e)=>{
                        //giving a function as input to setPostInputs - that helps us to avoid race conditions
                        setPostInputs(c => ({
                            ...c,
                            username:e.target.value
                        }))
                    }}/>
                    <LabelledInput label="password" type={"password"} onChange={(e)=>{
                        //giving a function as input to setPostInputs - that helps us to avoid race conditions
                        setPostInputs(c => ({
                            ...c,
                            password:e.target.value
                        }))
                    }}/>
                    <button type="button" onClick={sendSignUpRequest} disabled = {loading} className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 h-16">
                        {loading ? (
                            <FadeLoader
                            color="#ffffff"
                            height={9}
                            width={4}
                            margin={1}
                            radius={1}
                            loading={true}
                            speedMultiplier={1}
                            />
                        ):(type === "signup" ? "Sign Up" : "Sign In")}</button>
                </div>
            </div>
        </div>
    </div>
}
interface InputPayload{
    label : string;
    placeholder? : string;
    onChange : (e:ChangeEvent<HTMLInputElement> ) => void;
    type? : string;
}
function LabelledInput({label, placeholder, onChange, type}:InputPayload){
    return <div>
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white pt-2">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}