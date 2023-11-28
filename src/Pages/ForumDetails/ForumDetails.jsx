import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import RouteChangeLoader from "../../Utilities/RouteChangeLoader/RouteChangeLoader";
import { Button } from "@material-tailwind/react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const ForumDetails = () => {
  let forumID = useParams();
  let axios = useAxios();
  let { user } = useAuth();

  //   states
  let [loading1, setLoading1] = useState(false);
  let [loading2, setLoading2] = useState(false);
  let [upvoteCount, setUpvoteCount] = useState();
  let [downvoteCount, setDownvoteCount] = useState();
  let [votedUser, setVotedUser] = useState();

  let { data = [], isLoading } = useQuery({
    queryKey: ["forumDetails", forumID.id],
    queryFn: async () => {
      let res = await axios.get(`/forum/details/${forumID.id}`).then();
      return res.data;
    },
  });

  let {
    data: vote = [],
    isVoteLoading,
    refetch,
  } = useQuery({
    queryKey: ["voteCount", forumID.id],
    queryFn: async () => {
      let res = await axios.get(`/forum/vote/${forumID.id}`).then();
      setUpvoteCount(res.data.upvoteCount);
      setDownvoteCount(res.data.downvoteCount);
      setVotedUser(res.data.votedUsers);
      return res.data;
    },
  });

  let handleVoteUp = async (type) => {
    setLoading1(true);
    if (votedUser?.includes(user?.email)) {
      setLoading1(false);
      return toast.error("You have already votted to this discussion!!");
    }

    await axios
      .post(`/forum/vote`, { id: forumID.id, type: type, user: user?.email })
      .then(() => {
        toast.success(`You ${type}votted this forum`);
        refetch();
        setLoading1(false);
      });
  };

  let handleVoteDown = async (type) => {
    setLoading2(true);
    if (votedUser?.includes(user?.email)) {
      setLoading2(false);
      return toast.error("You have already votted to this discussion!!");
    }

    await axios
      .post(`/forum/vote`, { id: forumID.id, type: type, user: user?.email })
      .then(() => {
        toast.success(`You ${type}votted this forum`);
        refetch();
        setLoading2(false);
      });
  };

  let handleAlert = () => {
    toast.error("You must login first");
  };

  if (isLoading || isVoteLoading) {
    return <RouteChangeLoader />;
  }

  return (
    <div>
      <div className="forum-blogs">
        <div className="bg-gray-300 my-10 rounded-lg w-[80%] mx-auto">
          <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg dark:bg-gray-900">
            <div className="flex items-center gap-2 font-bold">
              Discussed by:
              <div className="px-2 py-1 font-bold rounded bg-blue-700 capitalize text-white">
                {data?.role}
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-2xl font-bold ">{data?.discussionTitle}</h1>
              <p className="mt-2 ">{data?.discussionDescription}</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-5 py-5">
            {user ? (
              <Button
                onClick={() => handleVoteUp("up")}
                className="flex items-center gap-3 bg-transparent text-black border-2 border-blue-500 
                text-[15px]"
              >
                {loading1 ? (
                  <div className="flex gap-4">
                    <ImSpinner9 className="animate-spin text-[20px]" />
                    Votting
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <BiUpvote fontSize={"20"} />
                    <span>Upvote</span>
                    <span>({upvoteCount})</span>
                  </div>
                )}
              </Button>
            ) : (
              <Link to="/sign-in" state={location.pathname}>
                <Button
                  onClick={handleAlert}
                  className="flex items-center gap-3 bg-transparent text-black border-2 border-blue-500 
            text-[15px]"
                >
                  <BiUpvote fontSize={"20"} />
                  <span>Upvote</span>
                  <span>({upvoteCount})</span>
                </Button>
              </Link>
            )}

            {user ? (
              <Button
                onClick={() => handleVoteDown("down")}
                className="flex items-center gap-3 bg-transparent text-black border-2 border-blue-500 
              text-[15px]"
              >
                {loading2 ? (
                  <div className="flex gap-4">
                    <ImSpinner9 className="animate-spin text-[20px]" />
                    Votting
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <BiDownvote fontSize={"20"} />
                    <span>Downvote</span>
                    <span>({downvoteCount})</span>
                  </div>
                )}
              </Button>
            ) : (
              <Link to="/sign-in" state={location.pathname}>
                <Button
                  onClick={handleAlert}
                  className="flex items-center gap-3 bg-transparent text-black border-2 border-blue-500 
            text-[15px]"
                >
                  <BiDownvote fontSize={"20"} />
                  <span>Downvote</span>
                  <span>({downvoteCount})</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumDetails;
