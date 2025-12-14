import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { Link } from "react-router-dom";

const MyListings = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    const { data: rooms = [], isLoading, refetch } = useQuery({
        queryKey: ['rooms', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon(`/my-listings/${user?.email}`)
            return data
        }
    })

    console.log(rooms)

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
                            rooms?.map(room => <tr>
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
                                <th>
                                    <Link to={`../update-room/${room?.id}`} className="btn btn-success text-white btn-xs">Edit</Link>
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

export default MyListings