import useAxios from "./useAxios";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";

const useTrainer = () => {
  let axios = useAxios();
  let { user } = useAuth();

  let [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/trainers?email=${user?.email}`).then((res) => {
      setData(res.data);
    });
  }, [axios, user]);

  return [data];
};

export default useTrainer;
