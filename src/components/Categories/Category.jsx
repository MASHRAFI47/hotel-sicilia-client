import queryString from "query-string"
import { useNavigate, useSearchParams } from "react-router-dom"

const Category = ({ id, name, icon }) => {
    const [params, setParams] = useSearchParams();
    const category = params.get("category");

    //
    const navigate = useNavigate();

    const handleClick = () => {
        let currentQuery = { category: name };
        const url = queryString.stringifyUrl({
            url: "/bookings",
            query: currentQuery,
        })

        navigate(url);
    }
    //

    return (
        <div className="overflow-x-auto pb-5 mb-5">
            <div onClick={handleClick} className="bg-fuchsia-800 text-white flex flex-col justify-center items-center py-2 rounded-xl">
                <h5>{icon}</h5>
                <h4 className={`${category === name && "border-b-2 border-b-neutral-800"} font-semibold`}>{name}</h4>
            </div>
        </div>
    )
}

export default Category