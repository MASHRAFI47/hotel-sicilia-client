import { GrBlog } from "react-icons/gr";
import { FaBook } from "react-icons/fa";


import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import StatisticsCard from "../Cards/StatisticsCard";

const GuestStatistics = () => {
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon();

    // const { data, isPending } = useQuery({
    //     queryKey: ['order', user?.email],
    //     queryFn: async () => {
    //         const { data } = await axiosCommon.get(`/my-orders/${user?.email}`)
    //         return data
    //     },
    //     enabled: !!user?.email
    // })

    // if (loading || isPending) return <LoadingSpinner />



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
            <h2 className="text-red-600 text-2xl font-semibold">Statistics Data Available Soon...</h2>
            {/* <div>
                <StatisticsCard icon={FaBook} title={"Orders Booked"} amount={data?.pendingOrders?.length} bgColor={"bg-green-500"} />
            </div>

            <div>
                <StatisticsCard icon={GrBlog} title={"Total Delivered"} amount={data?.completedOrders?.length} bgColor={"bg-orange-500"} />
            </div> */}
        </div>
    )
}

export default GuestStatistics