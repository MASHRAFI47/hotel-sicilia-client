import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <li><NavLink to={'manage-users'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">Manage Users</h1></NavLink></li>
            <li><NavLink to={'add-room'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">Add Room</h1></NavLink></li>
            <li><NavLink to={'manage-rooms'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">Manage Rooms</h1></NavLink></li>
            <li><NavLink to={'my-listings'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">My Listings</h1></NavLink></li>
            <li><NavLink to={'add-appetite'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">Add Appetite</h1></NavLink></li>
            <li><NavLink to={'reserved-rooms'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">Reserved Rooms</h1></NavLink></li>
            <li><NavLink to={'pending-orders'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">Pending Orders</h1></NavLink></li>
        </>
    )
}

export default AdminMenu