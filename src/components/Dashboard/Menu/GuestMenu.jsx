import { NavLink } from 'react-router-dom'

const GuestMenu = () => {
    return (
        <>
            <li><NavLink to={'my-bookings'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">My Booking</h1></NavLink></li>
        </>
    )
}

export default GuestMenu