import { TbFidgetSpinner } from 'react-icons/tb'
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import imageUpload from '../../../hooks/imageUpload';
import useAuth from '../../../hooks/useAuth';

const UpdateRoom = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { user } = useAuth();

    //tanstack
    const axiosCommon = useAxiosCommon()


    const { data: room = {}, isLoading, refetch } = useQuery({
        queryKey: ['room', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon(`/room/${id}`)
            return data;
        }
    })

    console.log(room);


    const { mutateAsync } = useMutation({
        mutationFn: async (roomData) => {
            const { data } = await axiosCommon.put(`/room/${id}`, roomData)
            return data
        },

        onSuccess: (data) => {
            console.log(data)
            toast.success("Room Data Updated Successfully");
            navigate("/dashboard/manage-rooms")
            setLoading(false)
        },

        onError: (err) => {
            console.log(err.message)
            toast.error(err.message)
            setLoading(false)
        }
    })



    //image preview
    const [imagePreview, setImagePreview] = useState();
    // const [imageText, setImageText] = useState("Upload Image");


    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const response = await fetch(`${import.meta.env.VITE_Api_Url}/room/${id}`);
            const data = await response.json();

            setState([
                {
                    startDate: new Date(data?.from),
                    endDate: new Date(data?.to),
                    key: 'selection',
                }
            ])

            return {
                title: data?.title,
                description: data?.description,
                category: data?.category,
                roomNumber: data?.roomNumber,
                startDate: data?.startDate,
                endDate: data?.endDate,
                price: data?.price,
                total_guest: data?.total_guest,
                bedrooms: data?.bedrooms,
                bathrooms: data?.bathrooms,
                image: data?.image,
            }
        },
    })


    const onSubmit = async (data) => {
        setLoading(true)
        const { title, location, category, price, total_guest, image, bedrooms, bathrooms, description, roomNumber } = data;
        const from = state[0].startDate;
        const to = state[0].endDate;

        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        }

        const displayImage = image?.[0];
        let picture = room?.image;
        // if user select file
        if (displayImage instanceof File) {
            picture = await imageUpload(displayImage);
        }

        const roomData = { title, location, category, price, total_guest, image: picture, bedrooms, bathrooms, description, to, from, host, roomNumber };
        // console.table(roomData);
        await mutateAsync(roomData);
    }

    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-100 p-5 rounded-xl'>
                <h1 className='text-2xl text-center font-semibold'>Update Room</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='room_number' className='block text-gray-600'>
                                Room Number
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                name='roomNumber'
                                id='roomNumber'
                                type='text'
                                placeholder='Room Number'
                                {...register("roomNumber", { required: true })}
                            />
                            {errors.roomNumber && <span>This field is required</span>}
                        </div>


                        {/* <div className='space-y-1 text-sm'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Location
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                name='location'
                                id='location'
                                type='text'
                                placeholder='Location'
                                {...register("location", { required: true })}
                            />
                            {errors.location && <span>This field is required</span>}
                        </div> */}

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600'>
                                Category
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className='w-full px-4 py-3 border-primary focus:outline-primary rounded-md'
                                name='category'
                            >
                                <option value="Beachfront">Beachfront</option>
                                <option value="Mountain">Mountain</option>
                                <option value="City">City</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Modern">Modern</option>
                                <option value="Family">Family</option>
                                <option value="Countryside">Countryside</option>
                            </select>
                            {errors.category && <span>This field is required</span>}
                        </div>

                        <div className='space-y-1'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Select Availability Range
                            </label>
                            {/* Calander */}
                            <DateRange
                                rangeColors={['blue']}
                                editableDateInputs={true}
                                onChange={item => {
                                    setState([item.selection])
                                    console.log(item.selection.startDate);
                                    console.log(item.selection.endDate);
                                }}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                                minDate={new Date()}
                            />
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-gray-600'>
                                Title
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                name='title'
                                id='title'
                                type='text'
                                placeholder='Title'
                                {...register("title", { required: true })}
                            />
                            {errors.title && <span>This field is required</span>}
                        </div>

                        {imagePreview && <img className='w-full max-h-60 object-cover rounded-lg shadow' src={imagePreview} alt='image preview' />}


                        <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
                            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                        <input
                                            className='text-sm cursor-pointer'
                                            type='file'
                                            name='image'
                                            id='image'
                                            accept='image/*'

                                            {...register("image", { onChange: (e) => setImagePreview(URL.createObjectURL(e.target.files[0])) })}
                                        />
                                        <div className='bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary'>
                                            Upload Image
                                        </div>
                                    </label>
                                </div>
                            </div>
                            {errors.image && <span>This field is required</span>}
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600'>
                                    Price
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                    name='price'
                                    id='price'
                                    type='number'
                                    placeholder='Price'
                                    {...register("price", { required: true })}
                                />
                                {errors.price && <span>This field is required</span>}
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='guest' className='block text-gray-600'>
                                    Total guest
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                    name='total_guest'
                                    id='guest'
                                    type='number'
                                    placeholder='Total guest'
                                    {...register("total_guest", { required: true })}
                                />
                                {errors.total_guest && <span>This field is required</span>}
                            </div>
                        </div>

                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bedrooms' className='block text-gray-600'>
                                    Bedrooms
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                    name='bedrooms'
                                    id='bedrooms'
                                    type='number'
                                    placeholder='Bedrooms'
                                    {...register("bedrooms", { required: true })}
                                />
                                {errors.bedrooms && <span>This field is required</span>}
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bathrooms' className='block text-gray-600'>
                                    Bathrooms
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-md '
                                    name='bathrooms'
                                    id='bathrooms'
                                    type='number'
                                    placeholder='Bathrooms'
                                    {...register("bathrooms", { required: true })}
                                />
                                {errors.bathrooms && <span>This field is required</span>}
                            </div>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                                Description
                            </label>

                            <textarea
                                id='description'
                                placeholder='type here...'
                                className='block rounded-md focus:primary w-full h-32 px-4 py-3 text-gray-800  border border-primary focus:outline-primary '
                                name='description'
                                {...register("description", { required: true })}
                            ></textarea>
                            {errors.description && <span>This field is required</span>}
                        </div>
                    </div>
                </div>

                <button disabled={loading}
                    type='submit'
                    className={`w-full p-3 mt-5 text-center cursor-pointer font-medium text-white transition duration-200 rounded shadow-md bg-primary ${loading ? "bg-primary" : "bg-danger"}`}
                >
                    {loading ? (
                        <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                    ) : (
                        'Save & Continue'
                    )}
                </button>
            </form>
        </div>
    )
}

export default UpdateRoom