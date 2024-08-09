import axios from "axios";

const TiktokDownloader = async function (url) {
  let options;
  if (url.includes("https://www.facebook.com/")) {
    options = {
      method: "GET",
      url: "https://facebook-video-and-reel-downloader1.p.rapidapi.com/status",
      params: {
        url: url,
      },
      headers: {
        "x-rapidapi-key": "a26f9feb6fmshee2828919b06e7dp17c59cjsnd452b224e229",
        "x-rapidapi-host": "facebook-video-and-reel-downloader1.p.rapidapi.com",
      },
    };
  } else if (url.includes("https://www.tiktok.com/")) {
    options = {
      method: "GET",
      url: "https://tiktok-video-no-watermark2.p.rapidapi.com/",
      params: {
        url: url,
        hd: "0",
      },
      headers: {
        "x-rapidapi-key": "a26f9feb6fmshee2828919b06e7dp17c59cjsnd452b224e229",
        "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
      },
    };
  } else if (url.includes("https://www.instagram.com/")) {
    options = {
      method: "GET",
      url: "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi",
      params: {
        url: url,
      },
      headers: {
        "x-rapidapi-key": "a26f9feb6fmshee2828919b06e7dp17c59cjsnd452b224e229",
        "x-rapidapi-host":
          "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
      },
    };
  } else if (
    url.includes("https://youtu.be/") ||
    url.includes("https://www.youtube.com/")
  ) {
    options = {
      method: "GET",
      url: "https://youtube-media-downloader.p.rapidapi.com/v2/video/details",
      params: {
        videoId: url.split("/").includes("shorts")
          ? url.split("/")[4]?.split("?")[0]
          : url.split("/")[3]?.split("?")[0], //url.split("/").pop(),
      },
      headers: {
        "x-rapidapi-key": "a26f9feb6fmshee2828919b06e7dp17c59cjsnd452b224e229",
        "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
      },
    };
  } else {
    throw new Error(
      "Unsupported platform. Only Facebook, YouTube, Instagram and TikTok URLs are supported."
    );
  }

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Unsupported platform. Only Facebook, YouTube, Instagram and TikTok URLs are supported."
    );
  }
};

export default TiktokDownloader;
