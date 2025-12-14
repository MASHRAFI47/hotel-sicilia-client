import { useMutation, useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookings = () => {
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon()
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/my-bookings/${user?.email}`)
            return data
        }
    })


    const { mutateAsync } = useMutation({
        mutationFn: async (roomId) => {
            const { data } = await axiosCommon.delete(`/reserved-room/${roomId}`)
            return data;
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Booking cancelled successfully")
            refetch();
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })



    const handleCancelBooking = (bookingId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(bookingId);
                Swal.fire({
                    title: "Cancelled!",
                    text: "Your booking cancelled successfully.",
                    icon: "success"
                });
            }
        });
    }

    if (loading || isLoading) return <LoadingSpinner />
    return (
        <div className="container mx-auto">

            <title>Hotel Sicilia | My Bookings</title>
            <meta name="services" content="My Bookings" />
            <link rel="canonical" href="" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
                {
                    bookings?.map(booking => <div>
                        <div className="card bg-base-100 w-full shadow-sm border-gray-200 border-s-2">
                            <figure>
                                <img className="lg:h-50"
                                    src={booking?.image}
                                    alt="room" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{booking?.title}</h2>
                                <p>{booking?.description.slice(0, 50).concat("...")}</p>
                                <div className="card-actions justify-center mt-2">
                                    <button onClick={() => handleCancelBooking(booking?.id)} className="btn btn-error btn-sm text-white">Cancel Booking</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default MyBookings