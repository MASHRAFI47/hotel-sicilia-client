import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { differenceInCalendarDays } from "date-fns";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";


const BookingDetails = () => {
    const { user, loading } = useAuth();
    const { paramId } = useParams();
    const [totalPrice, setTotalPrice] = useState(0);

    const axiosCommon = useAxiosCommon();

    const { data: room = {}, isLoading } = useQuery({
        queryKey: ["room", paramId],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/room/${paramId}`)
            return data
        }
    })


    const { mutateAsync } = useMutation({
        mutationFn: async (roomData) => {
            const { data } = await axiosCommon.post(`/reserved-rooms`, roomData)
            return data
        },
        onSuccess: () => {
            toast.success("Room Reserved Successfully")
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })

    console.log(room)

    //DATE RANGE
    const [state, setState] = useState([
        {
            startDate: new Date(room?.from),
            endDate: new Date(room?.to),
            key: 'selection'
        }
    ]);


    const [selectedRange, setSelectedRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);


    //console.log(new Date(room?.from).toLocaleDateString());
    console.log(selectedRange)



    useEffect(() => {
        if (room?.price) {
            const days = differenceInCalendarDays(
                selectedRange[0].endDate,
                selectedRange[0].startDate
            ) + 1;
            setTotalPrice(days * room.price);
        }
    }, [selectedRange, room]);


    if (isLoading || loading) return <LoadingSpinner />



    //calculate total selected days
    // const totalDays = differenceInCalendarDays(
    //     new Date(room?.to),
    //     new Date(room?.from)
    // )

    // const totalPrice = (totalDays + 1) * room?.price;
    // console.log(totalPrice)


    const roomFrom = new Date(room?.from);
    const roomTo = new Date(room?.to);



    const { id, ...roomWithoutId } = room;
    const postData = {
        ...roomWithoutId,
        guestName: user?.displayName,
        guestImage: user?.photoURL,
        guestEmail: user?.email,
        startDate: selectedRange?.startDate,
        endDate: selectedRange?.endDate,
    }

    const handleReserve = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reserve it!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(postData)
            }
        });
    }


    return (
        <div className="container mx-auto px-5 xl:px-0">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                <div className="xl:col-span-3">
                    <img src={room?.image} className="w-full rounded-2xl" alt="" />
                </div>
                <div className="xl:flex flex-col gap-5 mt-10">
                    <div>
                        {/* showDateDisplay, rangeColors */}
                        <DateRange
                            editableDateInputs={true}
                            rangeColors={['#08c']}
                            onChange={item => setSelectedRange([item.selection])}
                            moveRangeOnFirstSelection={true}
                            ranges={selectedRange}
                            minDate={roomFrom}  // room available start
                            maxDate={roomTo}
                        />
                    </div>


                    <div className="xl:flex justify-around">
                        <div><h3 className="font-semibold">Total Price:</h3> </div>
                        <div><h3 className="font-semibold">${totalPrice}</h3></div>
                    </div>



                    <button className="btn bg-[#0c3988] hover:bg-primary text-white" onClick={handleReserve}>Reserve</button>
                </div>


            </div>


            <div className="py-10">
                <h1 className="text-2xl font-bold mb-4">Title: {room?.title}</h1>
                <p className="text-lg">{room?.description}</p>
            </div>
        </div>
    )
}

export default BookingDetails