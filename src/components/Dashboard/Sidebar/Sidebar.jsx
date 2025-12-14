import { NavLink } from "react-router-dom"

import useAuth from "../../../hooks/useAuth"

import { RiArchiveDrawerLine } from "react-icons/ri";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import AdminMenu from "../Menu/AdminMenu";
import GuestMenu from "../Menu/GuestMenu";
import useRole from "../../../hooks/useRole";

const Sidebar = () => {
    const { logOut } = useAuth();
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />

    const links = <>
        <li><NavLink to={'/dashboard'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">Statistics</h1></NavLink></li>
        {
            (role === "admin") ?
                <>
                    <AdminMenu />
                </>

                :
                <GuestMenu />
        }
    </>

    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success("User logged out successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const commonLinks = <>
        <li><NavLink to={'/'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">Home</h1></NavLink></li>
        <li><NavLink to={'my-profile'} end className={({ isActive }) => isActive ? "bg-[#ddf246] text-black" : "text-white hover:bg-gray-600"}><h1 className="font-semibold text-lg">Profile</h1></NavLink></li>
        <li onClick={handleLogOut}><button className="w-full hover:bg-gray-600"><h1 className="font-semibold text-lg text-white ">Log Out</h1></button></li>
    </>


    return (
        <div>
            {/* Mobile Drawer */}
            <div className="drawer md:hidden">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-5 ml-5">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-transparent drawer-button"> <RiArchiveDrawerLine /> </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-gray-700 text-base-content min-h-full w-80 p-4">
                        <img src="/logo2.png" alt="" />
                        {/* Sidebar content here */}
                        {links}
                        {commonLinks}
                    </ul>
                </div>
            </div>


            {/* Desktop nav */}
            <nav className="menu w-full h-screen hidden md:flex flex-col justify-between">
                <div className="space-y-10">
                    <div className="mt-0 md:mt-5 flex justify-center">
                        <img src="/logo2.png" alt="logo" className="w-24" />
                    </div>
                    <ul className="space-y-3">
                        {links}
                    </ul>
                </div>

                <div>
                    <ul>
                        {commonLinks}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar