export default function VideoPlayer() {
    return (
        <div className="text-center my-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                App Demo Video
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Watch the video below to see how the app works. This video
                covers the main features, how to use, and benefits of our app.
            </p>

            <div className="flex justify-center my-8">
                <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden group">
                    {/* Border Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-70 rounded-lg blur-lg scale-105 transition-transform group-hover:scale-110"></div>

                    {/* Video Iframe */}
                    <iframe
                        className="relative w-full h-full rounded-lg border-4 border-gray-800 group-hover:border-indigo-400 transition-all"
                        src="https://www.youtube.com/embed/4nh_AqYz3Es"
                        title="Demo Aplikasi"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
