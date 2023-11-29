import useAuth from "../../Hooks/useAuth";
import { MdOutlineMail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import useRole from "../../Hooks/useRole";

const Profile = () => {
  let { user } = useAuth();
  let [role] = useRole();

  return (
    <div className="bg-[#E5E7EB]">
      <div className=" dark:bg-gray-700 bg-gray-200 py-12">
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="border-b px-4 pb-6">
            <div className="text-center my-4">
              <img
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src={user?.photoURL || "https://i.ibb.co/HN9NtYY/user.png"}
                alt=""
              />
              <div className="py-2">
                <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                  {user?.displayName}
                </h3>

                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="inline-flex gap-3 text-gray-700 capitalize dark:text-gray-300 items-center">
                    <FiUser fontSize={"20"} />
                    {role}
                  </div>

                  <div className="inline-flex gap-3 text-gray-700 dark:text-gray-300 items-center">
                    <MdOutlineMail fontSize={"20"} />
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
