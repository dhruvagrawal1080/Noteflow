import React from 'react';
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub, FaPenToSquare } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-50 pt-12">

            <div className="mx-auto px-6 w-[85%] grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8">

                <div>
                    <div className="flex items-center justify-center mb-4">
                        <FaPenToSquare className="text-blue-600 text-2xl" />
                        <span className="ml-2 text-xl font-bold text-gray-800">NoteFlow</span>
                    </div>
                    <p className="text-gray-600 text-center">Your digital notebook for everything.</p>
                </div>

                <div className='text-center'>
                    <h4 className="text-gray-900 font-bold mb-4">Pages</h4>
                    <div className="flex flex-col gap-y-2">
                        <Link to={'/'} className="text-gray-600 hover:text-blue-600 cursor-pointer">Home</Link>
                        <Link to={'/about'} className="text-gray-600 hover:text-blue-600 cursor-pointer">About</Link>
                        <Link to={'/contact'} className="text-gray-600 hover:text-blue-600 cursor-pointer">Contact</Link>
                    </div>
                </div>

                <div>
                    <h4 className="text-gray-900 font-bold mb-4 text-center">Follow me</h4>
                    <div className="flex space-x-4">
                        <a href="https://www.linkedin.com/in/dhruv-agrawal-17aa26243" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
                        </a>
                        <a href="https://github.com/dhruvagrawal1080" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
                        </a>
                        <a href="mailto:dhruvagrawal1080@gmail.com">
                            <BiLogoGmail className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
                        </a>
                    </div>
                </div>

            </div>

            <div className="py-6">
                <div className="border-t border-gray-200 mt-12 pt-8 text-center w-[80%] mx-auto">
                    © {new Date().getFullYear()} NoteFlow. All rights reserved.
                </div>
            </div>

        </footer>
    )
}

export default Footer