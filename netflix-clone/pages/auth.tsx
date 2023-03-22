
import { useCallback, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import {signIn} from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';


const Auth = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [variant, setVariant] = useState("login");


    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);
    console.log(email, name, password);
    const login = useCallback(async () => {
        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl:'/profiles'
            })
        } catch (error) {
            console.log(error);
        }
    }, [email,password]);
    const register  = useCallback(async () => {
        try {
            await axios.post("/api/register", {
                email ,name, password
            }) 
            login();

        } catch (error) {
          console.log(error);  
            
        }
    }, [email, name, password,login]);

   

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg: bg-opacity-50">
            <nav className="px-12 py-5">
                <img src='/images/logo.png' alt='logo' className="h-12"/>
                </nav>
                <div className="flex justify-center  ">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center lg:w-2/5 lg:max-w-md rounded-md w-full  ">
                        <h2 className="text-white text-4xl mb-8 font-semibold" >{variant==='login' ? 'Sign in' : 'Register'}</h2>
                        <div className="flex flex-col gap-4 ">
                            {variant === "register" &&
                                <Input label="Name" id="name" type="name" onChange={(event: any) => { setName(event.target.value) }} value={name} />
                            }
                        <Input label="Email" id="email" type="email" onChange={(event: any) => { setEmail(event.target.value) }} value={email} />
                        
                        <Input label="Password" id="password" type="password" onChange={(event:any)=>{setPassword(event.target.value)}} value={password} />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 rounded-md w-full text-white mt-10 py-3 hover:bg-red-700">{variant === 'login' ? 'Login' : 'Sign Up'}</button>
                        

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center" >
                            <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className='w-10 h-10 bg-white rounded-full items-center justify-center flex cursor-pointer hover:opacity-80 transition' >
                            <FcGoogle size={32} />
                            </div>
                            <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className='w-10 h-10 bg-white rounded-full items-center justify-center flex cursor-pointer hover:opacity-80 transition' >
                            <FaGithub size={32} />
                            </div>
                        </div>


                        <p className="text-neutral-500 mt-12"> {variant == 'login' ? 'First time using Netflix?' : 'Alredy Have An Account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">{variant === 'login' ? 'Create account' : 'Login'}</span>
                            </p>    
                    </div>

                </div>
            </div>
            </div>
    )
}
export default Auth;