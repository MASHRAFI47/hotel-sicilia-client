import Typewriter from 'typewriter-effect';

//css
import './banner.css'

//banner images
import banner1 from '../../../assets/images/banner/banner1.webp'
import banner2 from '../../../assets/images/banner/banner2.webp'
import banner3 from '../../../assets/images/banner/banner3.jpg'
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="container mx-auto min-h-screen">
            <div className="grid grid-cols-9 items-center relative">
                <div className="col-span-4 text-6xl font-bold text-[#0c3988]" data-aos="fade-right" data-aos-duration="2000">
                    <div className=''>
                        <h1 className='inline'>Book A Room </h1>
                        <Typewriter
                            options={{
                                strings: ['With Honeymoon Package', 'With A Sea View'],
                                autoStart: true,
                                loop: true,

                            }}
                        />
                    </div>
                    <div className='space-y-4 mt-4'>
                        <p className='text-lg'>
                            Discover a world of comfort, luxury, and unparalleled hospitality at Hoteller. Nestled in the heart of city, our exquisite hotel is your home away from home, where every stay is a memorable experience.Discover a world of comfort.
                        </p>

                        <Link to={'/bookings'} className="btn bg-[#0c3988] text-white text-lg rounded-xl"><p>Book Your Stay Now</p></Link>
                    </div>
                </div>
                <div className="col-span-5" data-aos="fade-in" data-aos-duration="1000">
                    <img src={banner1} className=' w-full rounded-lg' alt="banner image" />
                </div>

                {/* Absolute images */}
                <div className='hidden xl:block' data-aos="fade-in" data-aos-duration="1000">
                    <img src={banner2} className='absolute right-105 w-64 top-110 will-change-transform myAnimation' alt="banner image 2" />
                    <img src={banner3} className='absolute right-20 w-64 top-120 will-change-transform myAnimation2' alt="banner image 2" />
                </div>
            </div>

            {/* <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Banner