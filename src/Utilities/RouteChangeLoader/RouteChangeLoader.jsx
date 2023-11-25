import loader from "./preloader.gif";

const RouteChangeLoader = () => {
  return (
    <div>
      <div>
        <div className="flex h-screen justify-center items-center">
          <img src={loader} alt="" />
        </div>
      </div>
    </div>
  );
};

export default RouteChangeLoader;
