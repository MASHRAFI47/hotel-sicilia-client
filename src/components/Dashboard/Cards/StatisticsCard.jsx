
const StatisticsCard = ({ icon: Icon, title, amount, bgColor }) => {
    return (
        <div>
            <div className="p-10 bg-base-100 shadow-xl rounded-xl relative flex justify-between">
                <div className="">
                    <div className={`p-5 absolute top-5 left-8 ${bgColor} rounded-xl`}>
                        <Icon className="text-white" size="20" />
                    </div>
                </div>

                <div className="text-end">
                    <h2 className="text-gray-600 text-lg">{title}</h2>
                    <p className="text-xl font-semibold">{amount}</p>
                </div>
            </div>
        </div>
    )
}

export default StatisticsCard