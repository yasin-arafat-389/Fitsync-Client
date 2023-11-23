import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useRole = () => {
  let axios = useAxios();
  let { user } = useAuth();

  let { data = [], isLoading: isAdminLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      let res = await axios.get(`/users?email=${user?.email}`).then();
      return res.data;
    },
  });

  let userRole = [data.role, isAdminLoading];

  return userRole;
};

export default useRole;
