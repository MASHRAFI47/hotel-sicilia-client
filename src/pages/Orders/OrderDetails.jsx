import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { useState } from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const OrderDetails = () => {
    const { user, loading } = useAuth();
    const { paramId } = useParams();
    const axiosCommon = useAxiosCommon();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()



    const { data: order = {}, isLoading } = useQuery({
        queryKey: ["order", paramId],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/order/${paramId}`)
            return data
        }
    })

    console.log(paramId)


    const { mutateAsync } = useMutation({
        mutationFn: async (orderData) => {
            const { data } = await axiosCommon.post(`/pending-order`, orderData)
            return data
        },
        onSuccess: () => {
            toast.success("Room Reserved Successfully")
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })


    const { id, ...orderWithoutId } = order;
    const postData = {
        ...orderWithoutId,
        guestName: user?.displayName,
        guestImage: user?.photoURL,
        guestEmail: user?.email,
    }


    const onSubmit = (data) => {
        const { roomNumber } = data;
        mutateAsync({ ...postData, roomNumber })
    }


    const handleBuyNow = () => {
        if (!user?.email) {
            toast.error("Please login and book a room first");
            return;
        }

        document.getElementById(`${order?.id}`).showModal();
    }


    if (isLoading || loading) return <LoadingSpinner />




    return (
        <div className="container mx-auto px-5 xl:px-0 py-10">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                <div className="xl:col-span-3">
                    <img src={order?.foodImage} className="w-full rounded-2xl" alt="" />
                </div>
                <div className="xl:flex flex-col gap-5 mt-10">



                    <div className="">
                        <h1 className="text-lg font-bold mb-4">Food Name: {order?.foodName}</h1>
                        <p className="text-lg whitespace-pre-wrap">{order?.description}</p>
                    </div>

                    <div className="xl:flex justify-around">
                        <div><h3 className="font-semibold">Total Price:</h3> </div>
                        <div><h3 className="font-semibold">${order?.price}</h3></div>
                    </div>

                    {/* <button className="btn bg-[#0c3988] hover:bg-primary text-white" onClick={() => document.getElementById(`${order?.id}`).showModal()}>Buy Now</button> */}
                    <button className="btn bg-[#0c3988] hover:bg-primary text-white" onClick={handleBuyNow}>Buy Now</button>

                    {/* modal */}
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <dialog id={order?.id} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg text-center mb-3">Are you sure to order?</h3>

                                <div className='space-y-1 text-sm'>
                                    <label htmlFor='title' className='block text-gray-600'>
                                        Room Number
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                        name='roomNumber'
                                        id='roomNumber'
                                        type='text'
                                        placeholder='room number'
                                        {...register("roomNumber", { required: true })}
                                    />
                                    {errors.roomNumber && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div className="text-center">
                                    <button className="btn btn-sm btn-success text-white mt-3">Confirm</button>
                                </div>
                            </div>
                        </dialog>
                    </form>
                </div>


            </div>



        </div>
    )
}

export default OrderDetails