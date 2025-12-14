import Rooms from "../Rooms/Rooms"
import Accomodation from "./Accomodation/Accomodation"
import Accordion from "./Accordion/Accordion"
import Banner from "./Banner/Banner"
import Hospitality from "./Hospitality/Hospitality"

const Home = () => {
    return (
        <div>
            <Banner />
            <Accomodation />
            {/* <Rooms /> */}
            <Hospitality />
            <Accordion />
        </div>
    )
}

export default Home