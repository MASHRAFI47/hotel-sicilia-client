import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PendingOrders = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    const { data: appetites = [], isLoading, refetch } = useQuery({
        queryKey: ['appetites', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon(`/pending-orders`)
            return data
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (orderId) => {
            const { data } = await axiosCommon.delete(`/pending-order/${orderId}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Delivery Complete")
            refetch()
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })


    const handleDelivery = (appetiteId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delivery done!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(appetiteId)
                Swal.fire({
                    title: "Delivered!",
                    text: "Your delivery has been marked",
                    icon: "success"
                });
            }
        });
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Room Number</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            appetites?.map(appetite => <tr key={appetite?.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={appetite?.foodImage}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{appetite?.foodName}</div>
                                            {/* <div className="text-sm opacity-50">{appetite?.category}</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {appetite?.roomNumber}
                                </td>
                                <td>{appetite?.price}$</td>
                                <th>
                                    <button onClick={() => handleDelivery(appetite?.id)} className="btn btn-error text-white btn-xs">Deliver</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                    {/* foot */}
                </table>
            </div>
        </div>
    )
}

export default PendingOrders