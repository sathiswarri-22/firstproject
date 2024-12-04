import React, { useEffect, useState } from 'react';

const FileDisplay = () => {
    const [files, setFiles] = useState({
        image: '',
        video: '',
        pdf: '',
    });
    const [error, setError] = useState('');

    const fileUrls = {
        image: 'http://localhost:5000/files/IMG-20200122-WA0006.jpg',
        video: 'http://localhost:5000/files/8d_alan_walker_faded_music(recommand_to_use_headphone)(read_desripetion).mp3',
        pdf: 'http://localhost:5000/files/3.1 47 - Mastering the Facebook Algorithm.pdf.pdf',
    };

    useEffect(() => {
        const fetchData = async () => {
            for (const [key, url] of Object.entries(fileUrls)) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`${key.charAt(0).toUpperCase() + key.slice(1)} not found`);
                    const blob = await response.blob();
                    const fileURL = URL.createObjectURL(blob);
                    setFiles((prev) => ({ ...prev, [key]: fileURL }));
                } catch (err) {
                    setError(err.message);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {files.image && <img src={files.image} alt="Uploaded" />}
            {files.video && (
                <video controls width="300">
                    <source src={files.video} type="audio/mpeg" />
                    Your browser does not support the video tag.
                </video>
            )}
            {files.pdf && (
                <iframe
                    src={files.pdf}
                    width="300"
                    height="200"
                    title="PDF Viewer"
                >
                    Your browser does not support iframes.
                </iframe>
            )}
        </div>
    );
};

export default FileDisplay;
