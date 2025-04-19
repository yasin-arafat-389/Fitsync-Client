import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { ImSpinner9 } from "react-icons/im";
import { Helmet } from "react-helmet-async";
import useRole from "../../Hooks/useRole";
import { imageUpload } from "../../Utilities/ImageUpload/ImageUpload";
import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  let { user, update } = useAuth();
  let [role] = useRole();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [yourName, setYourName] = useState("");
  let [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleProfilePictureChange = async (e) => {
    setLoading(true);
    e.preventDefault();
    let form = e.target;
    let image = form.image.files[0];

    let imgData = null;

    if (selectedFile) {
      let imageData = await imageUpload(image, setLoading);
      imgData = imageData;
    }

    update(user?.displayName, imgData)
      .then(() => {
        setLoading(false);
        setOpen1(!open1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpen1 = () => {
    setOpen1(!open1);
  };

  const handleChangeName = (e) => {
    e.preventDefault();
    setLoading(true);
    update(yourName)
      .then(() => {
        setLoading(false);
        setOpen(!open);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Helmet>
        <title>FitSync | Profile Settings</title>
      </Helmet>
      <div className="py-12 flex justify-center items-center">
        <div className="w-[50%] bg-[#EFF3EA] dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Cover Section */}
          <div className="h-32 bg-blue-500"></div>

          {/* Profile Section */}
          <div className="relative -mt-16 text-center">
            <div className="inline-block relative">
              <img
                className="h-[150px] w-[150px] rounded-full border-4 border-white dark:border-gray-800 object-cover"
                src={user?.photoURL || "https://i.ibb.co/HN9NtYY/user.png"}
                alt="Profile"
              />
              <FaEdit
                className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-1 text-gray-600 cursor-pointer"
                fontSize={35}
                onClick={handleOpen1}
              />
            </div>

            {/* Name and Edit Section */}
            <div className="mt-4">
              <div className="flex justify-center items-center gap-2">
                <Typography
                  variant="h5"
                  className="text-gray-800 dark:text-white font-bold"
                >
                  {user?.displayName}
                </Typography>
                <FaEdit
                  className="text-gray-600 cursor-pointer"
                  fontSize={20}
                  onClick={handleOpen}
                />
              </div>
              <Typography
                variant="small"
                className="text-gray-500 dark:text-gray-400 capitalize font-bold"
              >
                {role}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
