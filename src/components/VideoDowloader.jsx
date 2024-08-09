/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import TiktokDownloader from "../Api";

export default function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");

  console.log("videos", videos);
  console.log(url.split("/"));
  console.log(url.split("/").includes("shorts"));
  console.log(url.split("/")[4]?.split("?")[0]);
  console.log(
    "short ",
    url.split("/").includes("shorts")
      ? url.split("/")[4]?.split("?")[0]
      : url.split("/")[3]?.split("?")[0]
  );

  useEffect(() => {
    if (url.length < 1) {
      setVideos(null);
    }
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(url);

    if (!url) return;

    try {
      const response = await TiktokDownloader(url);

      console.log(response.data);

      // Assuming response.data contains an array of video data
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching video data:", error);
      setError("Failed to fetch video data");
      setVideos();
    }
  };

  return (
    <div className="container mx-auto p-4 border-red-300">
      <h1 className="text-3xl text-center mb-6">Video Downloader</h1>
      <div className="flex gap-4 justify-center my-4">
        {" "}
        <img src="/instagram.svg" alt="instagram" />
        <img src="/tiktok-icons.svg" alt="tiktok" />
        <img src="/facebook.svg" alt="facebook" />
        <img src="/youtube.svg" alt="youtube" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full gap-2  md:justify-center md:items-center my-4 flex-col md:flex-row "
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter video URL"
          className=" p-2 border w-full max-w-[600px] border-gray-300 rounded  outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Download
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {videos && <VideoDisplayer videos={videos} url={url} />}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function VideoDisplayer({ videos, url }) {
  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div className="w-[440px]">
          <video controls width={640} height={260}>
            <source src={videoRender(url, videos)} type="video/mp4" />
          </video>
          {(url.includes("https://youtu.be/") ||
            url.includes("https://www.youtube.com/")) &&
            videos?.videos?.items.map((video, index) => {
              return (
                <div key={index} className="flex flex-col gap-4">
                  <a
                    target="_blank"
                    href={video?.url}
                    className="flex gap-3"
                    download
                  >
                    {video?.quality}
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function videoRender(url, videos) {
  if (
    url.includes("https://youtu.be/") ||
    url.includes("https://www.youtube.com/")
  ) {
    return videos?.videos?.items[0].url;
  } else if (url.includes("https://www.tiktok.com/")) {
    return videos?.data?.play;
  } else if (url.includes("https://www.instagram.com/")) {
    return videos?.download_url;
  } else if (url.includes("https://www.facebook.com/")) {
    return videos?.links?.sdLink;
  }
}
