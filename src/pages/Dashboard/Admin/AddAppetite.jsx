import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form"
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";
import imageUpload from "../../../hooks/imageUpload";

const AddAppetite = () => {
    const [loading, setLoading] = useState(false);
    const axiosCommon = useAxiosCommon();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true);
        const { foodName, foodImage, price, description } = data;


        const displayImage = foodImage[0];
        const image_url = await imageUpload(displayImage);

        const submitData = { foodName, foodImage: image_url, price, description }

        mutateAsync(submitData)
        reset();
    }


    const { mutateAsync } = useMutation({
        mutationFn: async (orderData) => {
            const { data } = await axiosCommon.post(`/orders`, orderData)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Appetite added in Orders")
            setLoading(false);
        },
        onError: (err) => {
            toast.error(err.message)
            setLoading(false)
        }
    })

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="font-semibold text-center text-lg">Add Appetite</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Food Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" {...register("foodName", { required: true })} />
                            {errors.foodName && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Food Image</span>
                            </label>
                            <input type="file" className="file-input file-input-primary" {...register("foodImage", { required: true })} />
                            {errors.foodImage && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" placeholder="20" className="input input-bordered" {...register("price", { required: true })} />
                            {errors.price && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea className="textarea" placeholder="..." {...register("description", { required: true })}></textarea>
                            {errors.description && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={loading}>{loading ? <TbFidgetSpinner className="animate-spin" /> : "Add"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAppetite