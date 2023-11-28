import { Button } from "@material-tailwind/react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import RouteChangeLoader from "../../Utilities/RouteChangeLoader/RouteChangeLoader";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const Forum = () => {
  let axios = useAxios();
  const [page, setPage] = useState(0);

  let { data: forums = [], isLoading } = useQuery({
    queryKey: ["forums", page],
    queryFn: async () => {
      let res = await axios.get(`/forums?page=${page}`).then();
      return res.data;
    },
  });

  if (isLoading || !forums?.forumsCounts) {
    return <RouteChangeLoader />;
  }

  const totalPages = Math.ceil(forums?.forumsCounts / 6);
  const pages = [...new Array(totalPages).fill(0)];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <PageTitle title="Community" />

      <div className="my-10">
        <div className="forum-blogs">
          {forums?.result?.map((item, index) => (
            <div
              className="bg-gray-300 my-10 rounded-lg w-[60%] mx-auto"
              key={index}
            >
              <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div className="px-2 py-1 font-bold rounded bg-blue-700 capitalize text-white">
                    {item?.role}
                  </div>
                </div>
                <div className="mt-3">
                  <h1 className="text-2xl font-bold line-clamp-1">
                    {item.discussionTitle}
                  </h1>
                  <p className="mt-2 line-clamp-5">
                    {item.discussionDescription}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between mt-4">
                  <Button className=" dark:text-violet-400">Read more</Button>
                  <div className="flex gap-7">
                    <div className="flex justify-center items-center gap-2">
                      <BiUpvote fontSize={"25"} />
                      <span className="text-[20px] font-bold">5</span>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                      <BiDownvote fontSize={"25"} />
                      <span className="text-[20px] font-bold">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={() => handlePageChange(Math.max(page - 1, 0))}
            disabled={page === 0}
          >
            <FaArrowLeft strokeWidth={2} className="h-4 w-4" />
            Previous
          </Button>
          {pages.map((item, index) => (
            <button
              key={index}
              className={` px-3 py-1 font-bold text-[18px] hover:bg-[#2121211a] rounded-lg ${
                page === index
                  ? "bg-black text-white rounded-lg hover:bg-black"
                  : "bg-transparent"
              }`}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={() => handlePageChange(Math.min(page + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
          >
            Next
            <FaArrowRight strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Forum;
