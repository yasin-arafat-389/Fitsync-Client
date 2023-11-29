import loaderGif from "./preloader.gif";

const DashboardLoader = () => {
  return (
    <div>
      <div className="h-[400px] flex justify-center items-center">
        <img src={loaderGif} />
      </div>
    </div>
  );
};

export default DashboardLoader;
