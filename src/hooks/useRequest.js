import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { BASEURL } from "../store/services/API";
import {updateLoading } from "../store/setting/action";

import { GlobalContext } from "@/store/services/GlobalContext";


const useRequest = (notShowLoading) => {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { loading, setLoading } = useContext(GlobalContext);

  const router = useRouter();
  useEffect(() => {
    if (notShowLoading) {
      setLoading(false);
    }
  }, [loading]);

  const startFetching = () => {
    setResponse(null);
    setLoading(true);
    setError(null);
  };

  const clear = () => {
    setResponse(null);
    setError(null);
  };

  const fetchedData = () => {
    setLoading(false);
    setError(null);
  };

  const requestData = (method, url, data) => {
    let config;
      config = {
        method,
        url: `${BASEURL}/${url}`,
        data,
      };
    startFetching();
    axios(config)
      .then((res) => {
        fetchedData();
        setResponse(res.data);
      })
      .catch((err) => {
        fetchedData();
        if (err.response) {
          if (err.response.status === 401) {
          } else if (err.response.status === 404) {
            router.push("/404");
          } else {
            toast.error(err.response.data.message);
          }
        } else if (err.request) {
          toast.error(t("Slow Network Speed. Try Again later."));
        } else {
          toast.error(t("Oops!! Unusual error occurred"));
        }
      });
  };

  return {
    loading,
    error,
    request: requestData,
    clear,
    response,
    setError,
  };
};

export default useRequest;
