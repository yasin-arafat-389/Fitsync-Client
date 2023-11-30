import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useBookedSlots = () => {
  let axios = useAxios();
  let { user } = useAuth();

  let { data: bookedUser = [] } = useQuery({
    queryKey: ["bookedUser"],
    queryFn: async () => {
      let res = await axios.get(`/booked/trainer?email=${user?.email}`).then();
      return res.data;
    },
  });

  return [bookedUser];
};

export default useBookedSlots;
