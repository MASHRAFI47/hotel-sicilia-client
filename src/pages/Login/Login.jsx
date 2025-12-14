import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

//react icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const Login = () => {
    const location = useLocation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const { signInUser, setLoading } = useAuth();
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await signInUser(email, password);
            toast.success("User logged in")
            setLoading(false);
            navigate(location?.state ? location?.state : "/");
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    return (
        <div className='container mx-auto py-20'>
            <div className="grid grid-cols-5 items-center">
                <div className='col-span-3'>
                    <DotLottieReact
                        src="/Login.lottie"
                        loop
                        autoplay
                    />
                </div>
                <div className='col-span-2'>
                    <div className="card bg-base-100 w-full max-w-sm border shrink-0 shadow-2xl">
                        <h1 className='text-2xl text-center mt-5 font-bold'>Login Here</h1>
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
                                {errors.email && <span className='text-red-600'>This field is required</span>}
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPass ? "text" : "password"} placeholder="password" className="input input-bordered" {...register("password")} />
                                {errors.password && <span className='text-red-600'>This field is required</span>}

                                <span className='absolute right-5 bottom-8' onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <FaEye /> : <FaEyeSlash />}
                                </span>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>

                            <div>
                                <p>Not a user? <NavLink to={'/register'} className={"hover:text-blue-500 font-semibold"}>Register Now!</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login