import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { differenceInCalendarDays } from "date-fns";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";


const GuestBookingDetails = () => {
    const { loading } = useAuth();
    const { id } = useParams();

    const axiosCommon = useAxiosCommon();

    const { data: room = {}, isLoading } = useQuery({
        queryKey: ["room", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/singleroom/${id}`)
            return data
        }
    })

    console.log(room)

    if (isLoading || loading) return <LoadingSpinner />


    return (
        <div className="container mx-auto px-5 xl:px-0">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                <div className="xl:col-span-3">
                    <img src={room?.image} className="w-full rounded-2xl" alt="" />
                </div>
                <div className="xl:flex flex-col gap-5 mt-10">

                    <div className="xl:flex justify-around">
                        <div><h3 className="font-semibold">Total Price:</h3> </div>
                        <div><h3 className="font-semibold">${room?.totalPrice}</h3></div>
                    </div>



                </div>


            </div>


            <div className="py-10">
                <h1 className="text-2xl font-bold mb-4">Title: {room?.title}</h1>
                <p className="text-lg">{room?.description}</p>
            </div>
        </div>
    )
}

export default GuestBookingDetails