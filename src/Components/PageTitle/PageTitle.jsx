/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const PageTitle = ({ title, from, link }) => {
  return (
    <div>
      <div
        className="h-[230px]"
        style={{
          backgroundImage: `url("https://i.ibb.co/8z9xw8Y/title-bg.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex h-full text-[50px] font-bold flex-col justify-center items-center gap-4">
          <h1>{title}</h1>

          <nav
            className="flex bg-gray-300 text-gray-700 border border-gray-200 py-3 px-5 rounded-lg dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to={link ? link : "/"}
                  className="text-sm text-gray-700 hover:text-gray-900 inline-flex items-center dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  {from ? from : "Home"}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <a className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-bold dark:text-gray-400 dark:hover:text-white">
                    {title}
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
