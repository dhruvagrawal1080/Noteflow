import homeimage from "../assets/home-page-img.png";
import Signup from "./Signup";
import { NavLink } from "react-router-dom";

const Home = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen overflow-auto">
      {/* Hero Section */}

      <section id="hero" className="pt-24 pb-32 min-h-[600px]">
        <div className="container w-full mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Capture Your Thoughts, Organize Your Life
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Create, save, and share your notes effortlessly. Stay organized
                and boost your productivity with NoteFlow.
              </p>
              <div className="flex space-x-4">
                <NavLink
                  to={"/signup"}
                  className={({ isActive }) =>
                    `border px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 ${
                      isActive
                        ? "bg-[#2563eb] text-white border-2 font-semibold hover:text-white"
                        : ""
                    }`
                  }
                >
                  Get Started Free
                </NavLink>
                <button
                  onClick={scrollToFeatures}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                className="rounded-lg shadow-xl"
                src={homeimage}
                alt="Notebook Illustration"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 overflow-visible">
        <div className="container w-full mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need for Note-Taking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Create Notes Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-3">
                {/* Pencil Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="blue"
                  className="w-8 h-8"
                >
                  <path d="M2 22l1.5-6.5L14 5l5 5L8.5 20.5zM14 5l2-2 5 5-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Create Notes
              </h3>
              <p className="text-gray-600">
                Write and format your notes with our intuitive editor. Add
                images, lists, and more.
              </p>
            </div>

            {/* Auto-Save Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-3">
                {/* New Cloud Save Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="blue"
                  className="w-8 h-8"
                >
                  <path d="M19 16.9A5.002 5.002 0 0012 8V7a7 7 0 00-6.929 8H5a4 4 0 100 8h14a4 4 0 000-8zM8 20H5a2 2 0 010-4h3v4zm11 0h-9v-4h9a2 2 0 110 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Auto-Save
              </h3>
              <p className="text-gray-600">
                Never lose your work with automatic saving and cloud
                synchronization.
              </p>
            </div>

            {/* Share & Collaborate Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-3">
                {/* New Collaboration Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="blue"
                  className="w-8 h-8"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm6 1h-2.26c-.97 0-1.86.39-2.54 1.02a6.007 6.007 0 00-8.4 0A3.991 3.991 0 002 18v1h20v-1a3.991 3.991 0 00-4-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Share & Collaborate
              </h3>
              <p className="text-gray-600">
                Share notes with teammates and collaborate in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;