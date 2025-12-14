
const Titles = ({ heading, para }) => {
    return (
        <div className="space-y-5">
            <h1 className="font-bold text-5xl text-[#0c3988]">{heading}</h1>
            <p className="text-lg">{para}</p>
        </div>
    )
}

export default Titles