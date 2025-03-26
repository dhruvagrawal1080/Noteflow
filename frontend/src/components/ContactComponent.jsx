import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { contactEndpoints } from "../services/apis";
import CountryCode from "../services/countrycode.json";

const ContactComponent = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    const submitContactForm = async (data) => {
        const toastId = toast.loading('Sending message...');
        setLoading(true);
        try {
            const response = await apiConnector("POST", contactEndpoints.CONTACT_API, data);
            // console.log("CONTACT API RESPONSE............", response);
            toast.success('Message sent successfully');
        } 
        catch (err) {
            // console.log("CONTACT API ERROR............", err);
            toast.error('Message sending failed');
        }
        setLoading(false);
        toast.dismiss(toastId);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ email: "", firstname: "", lastname: "", message: "", phoneNo: "", countrycode: "+91" });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-10 my-10 border border-gray-200">

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 text-center">Let's Connect</h1>
            <p className="text-center text-gray-600 mt-2">
                Have an idea? We'd love to hear about it.
            </p>

            {/* Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitContactForm)}>

                {/* Name Fields */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium" htmlFor="firstname">First Name</label>
                        <input type="text" placeholder="Enter first name" id="firstname"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("firstname", { required: true })} />
                        {errors.firstname && <p className="text-red-500 text-sm mt-1">Please enter your first name.</p>}
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-medium" htmlFor="lastname">Last Name</label>
                        <input type="text" placeholder="Enter last name" id="lastname"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("lastname", { required: true })} />
                        {errors.lastname && <p className="text-red-500 text-sm mt-1">Please enter your last name.</p>}
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-gray-700 font-medium" htmlFor="email">Email Address</label>
                    <input type="email" placeholder="Enter email" id="email"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("email", { required: true })} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">Please enter your email.</p>}
                </div>

                {/* Phone Number with Country Code */}
                <div>
                    <label className="block text-gray-700 font-medium" htmlFor="phoneNo">Phone Number</label>
                    <div className="flex gap-3">

                        {/* Country Code Dropdown */}
                        <select
                            className="w-24 p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("countrycode")}
                            defaultValue="+91"
                        >
                            {CountryCode.map((ele, i) => (
                                <option key={i} value={ele.code}>
                                    {ele.code} - {ele.country}
                                </option>
                            ))}
                        </select>

                        {/* Phone Number Input */}
                        <input type="number" placeholder="Enter phone number" id="phoneNo"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("phoneNo", {
                                minLength: { value: 10, message: "Invalid Phone Number" },
                                maxLength: { value: 12, message: "Invalid Phone Number" },
                            })}
                        />
                    </div>
                    {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo.message}</p>}
                </div>

                {/* Message */}
                <div>
                    <label className="block text-gray-700 font-medium" htmlFor="message">Message</label>
                    <textarea rows="5" placeholder="Enter your message" id="message"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        {...register("message", { required: true })}></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">Please enter your message.</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition cursor-pointer">
                    Send Message
                </button>

            </form>
        </div>
    );
}

export default ContactComponent;