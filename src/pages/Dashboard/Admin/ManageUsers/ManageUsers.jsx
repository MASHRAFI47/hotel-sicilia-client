import { useMutation, useQuery } from "@tanstack/react-query"
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosCommon from "../../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../../components/Spinner/LoadingSpinner";

const ManageUsers = () => {
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon("/users")
            return data
        }
    })


    const { mutateAsync } = useMutation({
        mutationFn: async (userId) => {
            const { data } = await axiosCommon.patch(`/user/role/${userId}`, { role: "admin" })
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            refetch();
        }
    })

    if (loading || isLoading) return <LoadingSpinner />


    const handleAdmin = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(userId)
                Swal.fire({
                    title: "Successful!",
                    text: "User is now an admin.",
                    icon: "success"
                });
            }
        });
    }



    return (
        <div>

            <title>Hotel Sicilia | Manage Users</title>
            <meta name="manage users" content="Sicilia manage users" />
            <link rel="canonical" href="" />

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users?.map((user) =>
                                <tr key={user?.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.name ? user?.name : <p className="text-red-600">User Needs to refresh the page</p>}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.email}
                                    </td>
                                    <td>
                                        {user?.role === "owner" ? <span className="text-yellow-600">Owner</span> : user?.role === "admin" ? <span className="text-green-600">Admin</span> : <span className="text-red-400">Guest</span>}
                                    </td>
                                    <th>
                                        {user?.role === "owner" || user?.role === "admin" ? <p className="text-[12px]">Already an admin</p> : <button onClick={() => handleAdmin(user?.id)} className="btn btn-xs">Make Admin</button>}
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>
        </div>
    )
}

export default ManageUsers