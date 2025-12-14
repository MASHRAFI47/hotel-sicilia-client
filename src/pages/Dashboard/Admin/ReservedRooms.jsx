import { useMutation, useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ReservedRooms = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    const { data: rooms = [], isLoading, refetch } = useQuery({
        queryKey: ['rooms', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon(`/reserved-rooms`)
            return data;
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (roomId) => {
            const { data } = await axiosCommon.delete(`/reserved-room/${roomId}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Checkout successful");
            refetch();
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })


    const handleCheckout = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, checkout!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(id)
                Swal.fire({
                    title: "Done!",
                    text: "Guest checkout successful",
                    icon: "success"
                });
            }
        });
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-20">
                {
                    rooms?.map(room => <div key={room?.id} className="card bg-base-100 image-full w-96 shadow-sm">
                        <figure>
                            <img
                                src={room?.image}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">ROOM: {room?.roomNumber}</h2>
                            <p className="text-lg">Guest: {room?.guestName}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-success" onClick={() => handleCheckout(room?.id)}>Checkout</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default ReservedRooms