import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { NavLink, useNavigate } from 'react-router-dom';

//react icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import imageUpload from '../../hooks/imageUpload';


const Register = () => {
    const { createUser, loading, setLoading, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password, fullName, image } = data;
        const photoImgUrl = image[0];
        const image_url = await imageUpload(photoImgUrl)

        try {
            await createUser(email, password);
            await updateUserProfile(fullName, image_url);
            await setLoading(false);
            toast.success("User succesfully created")
            navigate(location?.state ? location?.state : "/")
        } catch (error) {
            await setLoading(false);
            toast.error(error.message);
        }
    }

    const [showPass, setShowPass] = useState(false);

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
                        <h1 className='text-2xl text-center mt-5 font-bold'>Register Here</h1>
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" placeholder="Full name" className="input input-bordered" {...register("fullName", { required: true })} />
                                {errors.fullName && <span className='text-red-600'>This field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                                {errors.email && <span className='text-red-600'>This field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <input type="file" accept='image/*' className="file-input file-input-primary" {...register("image", { required: true })} />
                                {errors.image && <span className='text-red-600'>This field is required</span>}
                            </div>


                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPass ? "text" : "password"} placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
                                {errors.password && <span className='text-red-600'>This field is required</span>}

                                <span className='absolute right-5 bottom-8' onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <FaEye /> : <FaEyeSlash />}
                                </span>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>

                            <div>
                                <p>Not a user? <NavLink to={'/login'} className={"hover:text-blue-500 font-semibold"}>Login Now!</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register