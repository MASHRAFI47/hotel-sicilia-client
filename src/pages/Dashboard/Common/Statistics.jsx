import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import GuestStatistics from "../../../components/Dashboard/Statistics/GuestStatistics";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";
import useRole from "../../../hooks/useRole";

const Statistics = () => {
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />


    return (
        <div>
            <title>Hotel Sicilia | Statistics</title>
            <meta name="statistics" content="hotel cicilia statistics" />
            <link rel="canonical" href="" />

            {
                (role === "admin") ?
                    <AdminStatistics />
                    :
                    <GuestStatistics />
            }
        </div>
    )
}

export default Statistics