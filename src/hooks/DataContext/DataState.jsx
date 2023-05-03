import { alertBox } from "@/utils";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axiosClient from "./../../services/axios-client";
import DataContext from "./dataContext";

function DataState({ children }) {
    const [data, setData] = useState(null);
    const [transcripts, setTranscripts] = useState();
    const [recommendations, setRecommendations] = useState();
    const cookies = new Cookies();
    const user_id = cookies.get("user") ? cookies.get("user").user_id : "test_user_1";

    const getData = async () => {
        await axiosClient
            .get("data")
            .then(function (response) {
                const res = response.data;
                setData(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const getTranscripts = async (data) => {
        console.log("get transcripts: ", user_id)
        await axiosClient
            .get(`gettranscripts`, { params: { user_id: user_id } })
            .then(function (response) {
                const res = response.data;
                console.log(res)
                setTranscripts(res);
            })
            .catch(function (error) {
                alertBox();
                console.log(error);
            });
    }
    const sendTranscripts = async (data) => {
        console.log("send transcripts: ", data)
        alertBox("Request in progress, we'll notify once it's done!", "success");
        await axiosClient
            .post("create", data)
            .then(function (response) {
                const res = response.data;
                setData(res);
                getTranscripts(data);
                alertBox("Transcript Generated", "success");
            })
            .catch(function (error) {
                alertBox();
                console.log(error);
            });
    }

    const getRecommendations = async (payload) => {
        console.log("Payload", payload)
        await axiosClient
            .get(`recommend_videos`, { params: { user_id : payload.user_id } })
            .then(function (response) {
                const res = response.data;
                setRecommendations(res.recommendations);
            })
            .catch(function (error) {
                alertBox();
                console.log(error);
            });
    }

    return (
        <DataContext.Provider
            value={{
                data,
                transcripts,
                recommendations,
                getTranscripts,
                getData,
                sendTranscripts,
                getRecommendations
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export default DataState;