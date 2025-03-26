import { FaHouse, FaCircleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col justify-center items-center px-6">
                {/* Error Code */}
                <div className="mb-4">
                    <span className="text-8xl font-bold text-gray-800 dark:text-gray-300">
                        404
                    </span>
                </div>

                {/* Error Icon */}
                <div className="mb-6">
                    <FaCircleExclamation className="text-6xl text-gray-500 dark:text-gray-400" />
                </div>

                {/* Error Message */}
                <h1 className="text-3xl font-semibold text-gray-800 text-center dark:text-white mb-4">
                    Page Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-center">
                    We couldn't find the page you're looking for. It might have been moved
                    or deleted.
                </p>

                {/* Back to Home Button */}
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
                >
                    <FaHouse />
                    Back to Homepage
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
