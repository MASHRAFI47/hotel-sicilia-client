import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { Link } from "react-router-dom";

const Orders = () => {
    const axiosCommon = useAxiosCommon();

    const { data: appetites = [], isLoading } = useQuery({
        queryKey: ['appetites'],
        queryFn: async () => {
            const { data } = await axiosCommon('/orders');
            return data
        }
    })

    console.log(appetites)

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="container mx-auto py-10" data-aos="fade-in" data-aos-duration="1000">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
                {
                    appetites?.map(appetite => <div>
                        <div className="card bg-base-100 w-full shadow-sm border-gray-200 border-s-2">
                            <figure>
                                <img className="lg:h-50"
                                    src={appetite?.foodImage}
                                    alt="foodImage" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{appetite?.foodName}</h2>
                                <p>{appetite?.description.slice(0, 50).concat("...")}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/order/${appetite?.id}`} className="btn btn-primary">View</Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Orders