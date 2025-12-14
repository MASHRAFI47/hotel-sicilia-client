import Category from "./Category"
import { FaCarSide, FaCity, FaReplyAll, FaUmbrellaBeach } from "react-icons/fa";
import { FaMountainCity } from "react-icons/fa6";
import { SiInfluxdb } from "react-icons/si";
import { GiModernCity } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";

const cats = [
    { id: 0, name: "All", icon: <FaReplyAll /> },
    { id: 1, name: "Beachfront", icon: <FaUmbrellaBeach /> },
    { id: 2, name: "Mountain", icon: <FaMountainCity /> },
    { id: 3, name: "City", icon: <FaCity /> },
    { id: 4, name: "Luxury", icon: <SiInfluxdb /> },
    { id: 5, name: "Modern", icon: <GiModernCity /> },
    { id: 6, name: "Family", icon: <MdFamilyRestroom /> },
    { id: 7, name: "Countryside", icon: <FaCarSide /> },
]

const Categories = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 justify-between gap-10">
            {
                cats?.map(cat => <Category key={cat.id} id={cat.id} name={cat.name} icon={cat.icon}></Category>)
            }
        </div>
    )
}

export default Categories