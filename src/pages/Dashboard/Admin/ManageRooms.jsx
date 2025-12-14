import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth"
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageRooms = () => {
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon();

    const { data: rooms = [], isPending, refetch } = useQuery({
        queryKey: ['rooms', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon("/rooms")
            return data;
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (roomId) => {
            const { data } = await axiosCommon.delete(`room/${roomId}`)
            return data
        },
        onSuccess: (data) => {
            refetch();
            console.log(data)
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    console.log(rooms)

    if (loading || isPending) return <LoadingSpinner />


    const handleRoomDelete = (roomId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(roomId)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="container mx-auto">
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Room Number</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                rooms?.map(room => <tr key={room?.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={room?.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{room?.title}</div>
                                                <div className="text-sm opacity-50">{room?.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {room?.roomNumber}
                                    </td>
                                    <td>{room?.price}$</td>
                                    <th className="">
                                        <Link to={`../update-room/${room?.id}`} className="btn btn-success btn-xs mb-1 text-white lg:mb-0 lg:mr-2">Edit</Link>
                                        <button className="btn btn-error text-white btn-xs" onClick={() => handleRoomDelete(room?.id)}>Delete</button>
                                    </th>
                                </tr>
                                )
                            }

                        </tbody>
                        {/* foot */}
                        <tfoot>
                            {/* <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th></th>
                            </tr> */}
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageRooms