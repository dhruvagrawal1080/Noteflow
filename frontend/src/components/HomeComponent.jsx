import React from 'react';
import { FaPen } from "react-icons/fa";
import { FaCloudArrowUp, FaShareNodes } from "react-icons/fa6";
import homePageImage from '../assets/home-page-img.png';
import { Link } from 'react-router-dom';

const HomeComponent = () => {
    return (
        <>
            <section id='hero' className="flex flex-col md:flex-row items-center justify-between w-[90%] mx-auto px-6 mb-5 min-h-[650px]">

                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">

                    <h1 className="text-3xl sm:text-4xl pt-4 md:pt-0 md:text-5xl font-bold text-gray-900 mb-6">
                        Capture Your Thoughts, Organize Your Life
                    </h1>

                    <p className="text-lg text-gray-600 mb-8">
                        Create, save, and share your notes effortlessly.
                        <br />
                        Stay organized and boost your productivity with NoteFlow.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 text-center">
                        <Link to={'/login'} className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition">
                            Get Started Free
                        </Link>
                        <button
                            onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                            to={'#features'} className="px-6 py-3 border border-gray-300 rounded-lg text-lg hover:border-blue-600 hover:text-blue-600 transition">
                            Learn More
                        </button>
                    </div>

                </div>

                <img className="rounded-xl shadow-xl w-full md:w-[50%] max-w-[500px]" src={homePageImage} alt="Notebook illustration" />

            </section>

            <section id="features" className="py-30 bg-gray-50">

                <div className="mx-auto w-[90%] text-center">

                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Everything You Need for Note-Taking</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                            <FaPen className="text-blue-600 text-2xl mb-1 mx-auto" />
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Create Notes</h3>
                            <p className="text-gray-600">Write and format your notes with our intuitive editor. Add images, lists, and more.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                            <FaCloudArrowUp className="text-blue-600 text-2xl mb-1 mx-auto" />
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Auto-Save</h3>
                            <p className="text-gray-600">Never lose your work with automatic saving and cloud synchronization.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                            <FaShareNodes className="text-blue-600 text-2xl mb-1 mx-auto" />
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Share & Collaborate</h3>
                            <p className="text-gray-600">Share notes with teammates and collaborate in real-time.</p>
                        </div>

                    </div>

                </div>

            </section>

            <section id="cta" className="py-20 bg-blue-600">
                <div className="mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-lg text-white/90 mb-10">
                        Join thousands of users who trust <span className="font-semibold">NoteFlow</span> for their note-taking needs.
                    </p>
                    <Link to={'/signup'} className="px-8 py-4 bg-white text-blue-600 rounded-lg text-xl font-semibold shadow-lg hover:bg-gray-200 transition">
                        Create Your Free Account
                    </Link>
                </div>
            </section>
        </>
    )
}

export default HomeComponent