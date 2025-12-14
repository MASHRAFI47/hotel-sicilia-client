import { FaUsers } from "react-icons/fa";
import { GrBlog } from "react-icons/gr";
import { FaBook } from "react-icons/fa";


import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import StatisticsCard from "../Cards/StatisticsCard";
import useRole from "../../../hooks/useRole";

const AdminStatistics = () => {
    const [role, isLoading] = useRole();
    const axiosCommon = useAxiosCommon();

    const { data: usersCount, isPending } = useQuery({
        queryKey: ['users-stat', role],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/users/count`)
            return data
        }
    })

    const { data: roomsCount, loading } = useQuery({
        queryKey: ['rooms', role],
        queryFn: async () => {
            const { data } = await axiosCommon("/rooms/count")
            return data;
        }
    })
    const { data: pendingCount, pendingLoading } = useQuery({
        queryKey: ['pendingCount', role],
        queryFn: async () => {
            const { data } = await axiosCommon("/pending/count")
            return data;
        }
    })

    console.log(usersCount)

    if (isLoading || isPending || loading || pendingLoading) return <LoadingSpinner />


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
            <div>
                <StatisticsCard icon={FaUsers} title={"Total Users"} amount={usersCount} bgColor={"bg-green-500"} />
            </div>

            <div>
                <StatisticsCard icon={GrBlog} title={"Rooms Available"} amount={roomsCount} bgColor={"bg-orange-500"} />
            </div>

            <div>
                <StatisticsCard icon={FaBook} title={"Pending Orders"} amount={pendingCount} bgColor={"bg-pink-500"} />
            </div>
        </div>
    )
}

export default AdminStatistics