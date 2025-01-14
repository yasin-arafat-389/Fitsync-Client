import { useState } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import RouteChangeLoader from "../../Utilities/RouteChangeLoader/RouteChangeLoader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Classes = () => {
  let axios = useAxios();

  let { data = [], isLoading } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      let res = await axios.get("/classes").then();
      return res.data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  // Calculate the start and end index for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle next and previous page actions
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Helmet>
        <title>FitSync | Classes</title>
      </Helmet>

      <PageTitle title="Classes" />

      {/* All classes */}
      <div className="my-[100px]">
        <div className="w-[80%] mx-auto mt-[60px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-sm mx-auto bg-[#F0F0D7] border-2 border-blue-600 shadow-lg rounded-lg overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-48">
                <img
                  src={item.image}
                  alt={item.classTitle}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 mb-3">
                  {item.classTitle}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {item.classDescription}
                </p>

                {/* Button */}
                <div className="flex justify-center">
                  <Link to={`/class/details/${item._id}`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-16 space-x-3">
          {/* Previous button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classes;
