import Titles from "../../../components/Titles"

const Accordion = () => {
    return (
        <div className="container mx-auto py-10 pb-20">
            <div className="text-center">
                <Titles heading={"Frequently Asked Questions"} />
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title font-semibold">How do I create an account?</div>
                <div className="collapse-content text-sm">Click the "Book Us" button in the top right corner and follow the registration process.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">What time is check-in and check-out?</div>
                <div className="collapse-content text-sm">Check-in starts at 2:00 PM, and check-out is until 12:00 PM. Early check-in or late check-out may be available upon request.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">Do you offer free Wi-Fi?</div>
                <div className="collapse-content text-sm">Yes, complimentary high-speed Wi-Fi is available throughout the hotel, including all guest rooms and public areas.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">What types of rooms do you offer?</div>
                <div className="collapse-content text-sm">We offer Standard Rooms, Deluxe Rooms, Family Suites, and Luxury Suites to suit different needs and budgets.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">Do you provide room service?</div>
                <div className="collapse-content text-sm">Yes, room service is available 24/7, offering a variety of meals and beverages.</div>
            </div>
        </div>
    )
}

export default Accordion