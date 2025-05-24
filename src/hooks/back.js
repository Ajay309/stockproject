import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { logout, updateLoading } from "../store/auth/action";
import { BASEURL } from "../api";

const useRequest = (notShowLoading) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const { token, language } = useSelector((state) => state.auth);

  const t = (a) => a;

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!notShowLoading) {
      dispatch(updateLoading({ loading }));
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

    if (token) {
      config = {
        method,
        url: `${BASEURL}/${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": language,
        },
        data,
      };
    } else {
      config = {
        method,
        url: `${BASEURL}/${url}`,
        headers: {
          "Accept-Language": language,
        },
        data,
      };
    }

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
            dispatch(logout());
          } else if (err.response.status === 404) {
            router.push("/404");
          }else if(err.response.status === 429) {
            toast.error("Too many login attempts, please try again later.");
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
