import Axios from "axios";
import { toast } from "react-toastify";

export function getUserAvatar(name, size = 128) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&size=${size}`;
}

export function sentenceCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}

export async function uploadFilesToCloud(image) {
  const key = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
  const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  if (image === undefined) return;
  const formData = new FormData();
  formData.append("file", image);

  formData.append("upload_preset", key);
  try {
    const res = await Axios.post(url, formData);
    return await res;
  } catch (err) {
    console.log(err);
  }
}

export const alertBox = (message = "Something went wrong", type = "error") => {
  toast(message, { type: type });
};

export const getContest = async () => {
  const data = await Axios.get("https://kontests.net/api/v1/all");
  return data;
};

export const getNews = async (category) => {
  const cat = category ? category : "";
  const key = "1a4a4322685e4d95a0fcb55040905f68";
  const data = await Axios.get(
    `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=${key}`
  );
  return data;
};
