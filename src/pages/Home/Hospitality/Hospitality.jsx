
//images
import { Link } from 'react-router-dom'
import hospitalityImg from '../../../assets/images/hospitality-images/1783.jpg'
import Titles from '../../../components/Titles'

const Hospitality = () => {
    return (
        <div className='container mx-auto py-20'>
            <div className='grid grid-cols-2 gap-20 items-center'>
                <div data-aos="zoom-in" data-aos-duration="2000">
                    <img src={hospitalityImg} className='h-150 w-full bg-cover' alt="" />
                </div>
                <div className='' data-aos="fade-in" data-aos-duration="2000">
                    <div>
                        <Titles heading={"Where Every Stay is a Hug of Hospitality"} para={"At Hoteller, we pride ourselves on providing a personalized and intimate experience for each guest. Our cozy rooms are thoughtfully designed to offer modern amenities while retaining the warmth and character of a home away from home. Whether you’re traveling for leisure or business, our comfortable accommodations ensure a restful night’s sleep."} />

                        <Link to={'/bookings'} className="btn bg-[#0c3988] text-white mt-10"><p>Book Your Stay Now</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hospitality