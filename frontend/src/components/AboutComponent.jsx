import React from 'react';
import { Link } from 'react-router-dom';

const AboutComponent = () => {
    // Features Array
    const features = [
        {
            title: "Create & Manage Notes",
            description: "Capture ideas effortlessly with our rich editor, supporting images, lists, and more.",
            icon: "📝",
        },
        {
            title: "Auto-Save & Cloud Sync",
            description: "Never lose progress with real-time saving and seamless cloud synchronization.",
            icon: "☁️",
        },
        {
            title: "Collaborate in Real-Time",
            description: "Share notes with team members and work together with ease.",
            icon: "🤝",
        },
        {
            title: "Organize with Tags & Favorites",
            description: "Sort notes efficiently with labels and pin important ones for quick access.",
            icon: "📌",
        },
        {
            title: "Secure & Private",
            description: "Your notes are protected with advanced security and encryption.",
            icon: "🔒",
        },
        {
            title: "Access Anytime, Anywhere",
            description: "Use NoteFlow across devices for a seamless note-taking experience.",
            icon: "📱",
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">

            {/* Hero Section */}
            <div className="mx-auto px-6 py-16 w-[85%] text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    Driving Innovation in Online Note Sharing
                </h1>
                <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
                    At <span className="font-semibold text-blue-600">NoteFlow</span>, we aim to revolutionize how individuals and teams capture ideas, stay organized, and collaborate seamlessly.
                    Whether you're managing tasks, brainstorming, or working on a team project, NoteFlow simplifies your workflow.
                </p>
            </div>

            {/* Features Section */}
            <div className="mx-auto px-6 pt-10 pb-16 w-[85%]">
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
                    Why Choose NoteFlow?
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Feature Card */}
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
                        >
                            <div className="flex justify-center items-center text-4xl text-blue-600 mb-4">
                                {feature.icon}
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                                {feature.title}
                            </h2>
                            <p className="text-gray-600 text-center">{feature.description}</p>
                        </div>
                    ))}

                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 py-20 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Start Using NoteFlow Today</h2>
                <p className="text-lg text-white mb-10">Experience the best way to take and manage your notes.</p>
                <Link
                    to={'/signup'}
                    className="px-8 py-4 bg-white text-blue-600 rounded-lg text-xl font-semibold shadow-lg hover:bg-gray-200 transition"
                >
                    Get Started for Free
                </Link>
            </div>

        </div>
    );
};

export default AboutComponent;
