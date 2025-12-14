import { NavLink } from "react-router-dom"


//images
import logo from '../../../public/logo.png'
import useAuth from "../../hooks/useAuth"
import { toast } from "react-toastify";

const Header = () => {
    const { user, logOut } = useAuth();

    const links = <>
        <li><NavLink to={'/'} className={({ isActive }) => isActive ? "underline underline-offset-6" : ""} style={({ isActive }) => ({ color: isActive ? "#0c3988" : "" })}><h3 className="font-semibold text-lg">Home</h3></NavLink></li>
        <li><NavLink to={'/bookings'} className={({ isActive }) => isActive ? "underline underline-offset-6" : ""} style={({ isActive }) => ({ color: isActive ? "#0c3988" : "" })}><h3 className="font-semibold text-lg">Bookings</h3></NavLink></li>
        <li><NavLink to={'/orders'} className={({ isActive }) => isActive ? "underline underline-offset-6" : ""} style={({ isActive }) => ({ color: isActive ? "#0c3988" : "" })}><h3 className="font-semibold text-lg">Orders</h3></NavLink></li>
    </>

    const handleLogOut = () => {
        logOut();
        toast.success("User logged Out")
    }

    return (
        <div className="container mx-auto">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="">
                        <img src={logo} className="w-28" alt="" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* profile dropdown */}
                    {user ?
                        <div>
                            <div className="dropdown dropdown-end bg-transparent! md:mr-4">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-gray-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li><NavLink to={'/dashboard'}><h1 className="text-black font-semibold">DASHBOARD</h1></NavLink></li>
                                    {/* <NavLink><h1 className="text-black font-semibold"></h1></NavLink> */}

                                    <li onClick={handleLogOut}><NavLink><h1 className="text-black font-semibold"><button onClick={handleLogOut}>LOG OUT</button></h1></NavLink></li>
                                </ul>
                            </div>
                        </div>
                        :
                        <NavLink to={'/login'} className="btn bg-[#0c3988] text-white">Book Us</NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header