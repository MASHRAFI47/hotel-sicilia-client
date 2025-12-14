import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { Link, useSearchParams } from "react-router-dom";
import Categories from "../../components/Categories/Categories";
import { toast } from "react-toastify";

const Bookings = () => {
    const axiosCommon = useAxiosCommon();

    const [params, setParams] = useSearchParams();
    const category = params.get('category');

    const { data: rooms = [], isLoading } = useQuery({
        queryKey: ["rooms", category],
        queryFn: async () => {

            const url = category;
            if (url == "All" || url == null) {
                const { data } = await axiosCommon.get(`/rooms`)
                return data
            }
            else {
                const { data } = await axiosCommon.get(`/rooms?category=${category}`)
                return data
            }

        }
    })


    // const { data: rooms = [], isLoading } = useQuery({
    //     queryKey: ['rooms'],
    //     queryFn: async () => {
    //         const { data } = await axiosCommon('/rooms');
    //         return data
    //     }
    // })

    console.log(rooms)

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="container mx-auto py-10" data-aos="fade-in" data-aos-duration="1000">
            <Categories />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
                {
                    rooms?.map(room => <div>
                        <div className="card bg-base-100 w-full shadow-sm border-gray-200 border-s-2">
                            <figure>
                                <img className="lg:h-50"
                                    src={room?.image}
                                    alt="room" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{room?.title}</h2>
                                <p>{room?.description.slice(0, 50).concat("...")}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/room/${room?.id}`} className="btn btn-primary">View</Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Bookings