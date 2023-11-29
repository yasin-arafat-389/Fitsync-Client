import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useBalance = () => {
  let axios = useAxios();

  let { data: adminBalance = [] } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      let res = await axios.get(`/balance`).then();
      return res.data;
    },
  });

  let balance = adminBalance;

  return [balance];
};

export default useBalance;
