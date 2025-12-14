import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/Spinner/LoadingSpinner";

const Profile = () => {
    const { user, loading, resetPass } = useAuth();

    const handleResetPass = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Send!"
        }).then((result) => {
            if (result.isConfirmed) {
                resetPass(user?.email)
                Swal.fire({
                    title: "Success!",
                    text: "Check your Email",
                    icon: "success"
                });
            }
        });
    }

    if (loading) return <LoadingSpinner />

    return (
        <div>

            <title>Zeeoffline | Profile</title>
            <meta name="profile" content="zeeoffline profile" />
            <link rel="canonical" href="https://zeeoffline.com/profile" />

            <div className="h-screen block md:flex items-center justify-center">
                <div className="card bg-[#162735] w-96 shadow-sm p-5">
                    <h1 className="text-center font-semibold text-2xl mb-2 text-gray-200">USER PROFILE</h1>
                    <figure>
                        <div className="w-full flex justify-center">
                            <img
                                src={user?.photoURL} className="object-cover w-44 rounded-full h-44"
                                alt="Shoes" />
                        </div>
                    </figure>
                    <div className="card-body xl:flex justify-center items-center">
                        <h2 className="card-title text-gray-200">{user?.displayName}</h2>
                        <p className="text-gray-200"><h3 className="font-semibold">Email: {user?.email}</h3></p>
                        <div className="card-actions">
                            <button onClick={handleResetPass} className="btn bg-[#ddf246] hover:bg-[#b5c630] transform-fill">Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile