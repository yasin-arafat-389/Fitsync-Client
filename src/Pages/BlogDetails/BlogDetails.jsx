import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import RouteChangeLoader from "../../Utilities/RouteChangeLoader/RouteChangeLoader";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
  let blogID = useParams();
  let axios = useAxios();

  let [blogData, setBlogData] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/blog/details/${blogID.id}`).then((res) => {
      setBlogData(res.data);
      setLoading(false);
    });
  }, [axios, blogID.id]);

  return (
    <div>
      <Helmet>
        <title>FitSync | Blog Details</title>
      </Helmet>

      {loading ? (
        <RouteChangeLoader />
      ) : (
        <main className="mt-10 w-[80%] mx-auto">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="px-4 lg:px-0">
              <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                {blogData.title}
              </h2>
            </div>

            <img
              src={blogData.image}
              className="w-full object-cover rounded mt-5"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
              <p className="pb-6">{blogData.description}</p>
            </div>

            <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
              <div className="p-4 border-t border-b md:border md:rounded">
                <div className="flex py-2">
                  <img
                    src="https://randomuser.me/api/portraits/men/97.jpg"
                    className="h-10 w-10 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">
                      {" "}
                      Mike Sullivan{" "}
                    </p>
                    <p className="font-semibold text-gray-600 text-xs">
                      {" "}
                      Editor{" "}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 py-3">
                  Mike writes about fitness, workout and meditation in our
                  community to keep you updated with the tips and tricks and all
                  you need to know about health care and fitness.
                </p>
                <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                  Follow
                  <i className="bx bx-user-plus ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default BlogDetails;
