import React, { useState, useEffect } from 'react';

const LiveStreamList = () => {
    const [liveStreams, setLiveStreams] = useState([]);

    // Mavjud jonli efirlarni olish
    useEffect(() => {
        const fetchLiveStreams = async () => {
            try {
                const response = await fetch('https://insta-2-e60y.onrender.com/live');
                const data = await response.json();
                setLiveStreams(data);
            } catch (error) {
                console.error("Jonli efirlarni olishda xatolik:", error);
            }
        };

        fetchLiveStreams();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-2xl font-bold mb-4">Jonli Efirlar</h1>
            {liveStreams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveStreams.map((stream) => (
                        <div key={stream.roomId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold">{stream.videoTitle}</h2>
                            <p>Foydalanuvchi: {stream.username}</p>
                            <p>Vaqt: {new Date(stream.startTime).toLocaleString()}</p>
                            <button
                                onClick={() => window.location.href = `/join/${stream.roomId}`}
                                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                            >
                                Jonli efirga qo'shilish
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Hozircha jonli efirlar mavjud emas</p>
            )}
        </div>
    );
};

export default LiveStreamList;