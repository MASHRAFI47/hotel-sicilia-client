import { Outlet } from "react-router-dom"
import Sidebar from "../components/Dashboard/Sidebar/Sidebar"

const DashboardLayout = () => {
    return (
        <div>
            <div className="relative min-h-screen block md:flex">
                <div className="w-0 md:w-64 bg-[#162735] bg-blend-screen">
                    <Sidebar />
                </div>
                <div className="flex-1 mt-15 md:mt-0 p-5 md:p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout