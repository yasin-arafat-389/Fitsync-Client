import { useState } from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import {
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { ImSpinner9 } from "react-icons/im";
import "./BeATrainer.css";
import toast from "react-hot-toast";
import { imageUpload } from "../../Utilities/ImageUpload/ImageUpload";
import useAxios from "../../Hooks/useAxios";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../Hooks/useRole";
import { Helmet } from "react-helmet-async";

const BeATrainer = () => {
  let axios = useAxios();
  let navigate = useNavigate();
  let { user } = useAuth();
  let [role] = useRole();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: user?.email,
    age: "",
    experience: "",
    status: "requested",
    skills: [],
    availableDays: [],
    availableTime: [],
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (e.target.type === "number" && parseFloat(value) < 0) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, category) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [category]: prevData[category].includes(value)
        ? prevData[category].filter((item) => item !== value)
        : [...prevData[category], value],
    }));
  };

  const handleApply = async (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let image = form.image.files[0];
    let imgData = null;

    if (formData.skills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }
    if (formData.availableDays.length === 0) {
      toast.error("Please select at least one week day");
      return;
    }
    if (formData.availableTime.length === 0) {
      toast.error("Select at least one available time slot");
      return;
    }

    if (selectedFile) {
      let imageData = await imageUpload(image);
      imgData = imageData;
    }

    let uploadedImage = imgData?.data?.display_url;

    let res = { formData, uploadedImage };

    axios.post("/trainers", res).then(() => {
      toast.success("Successfull Applied. Wait for admin approval.");
      setLoading(false);
      navigate("/trainer");
    });
  };

  let { data = [] } = useQuery({
    queryKey: ["trainer", user?.email],
    queryFn: async () => {
      let res = await axios.get(`/trainers?email=${user?.email}`).then();
      return res.data;
    },
  });

  if (role === "trainer" || role === "admin") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>FitSync | Be A Trainer</title>
      </Helmet>

      {data.status === "requested" ? (
        <Navigate to="/" />
      ) : (
        <div>
          <PageTitle title="Be A Trainer" from="Trainer" link="/trainer" />

          <div>
            <div className="bg-orange-100">
              <div className="py-20">
                <div className=" w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md dark:bg-gray-800 bg-white">
                  <div className="px-6 py-4">
                    <p className="title-join">Become A Trainer </p>

                    <form id="regForm" onSubmit={handleApply}>
                      <div className="w-full mt-4">
                        <Input
                          color="blue"
                          label="Enter your Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="w-full mt-4">
                        <Input
                          color="blue"
                          label="Enter your email"
                          disabled={true}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="cursor-not-allowed"
                        />
                      </div>

                      <div className="w-full mt-4">
                        <Input
                          color="blue"
                          label="Enter your age"
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="w-full mt-4">
                        <Input
                          color="blue"
                          label="Years of experience"
                          name="experience"
                          type="number"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Image Upload */}
                      <div className="w-full mt-4">
                        <div>
                          <label className="flex gap-4 p-2 cursor-pointer border-2 border-gray-400 rounded-lg shadow-xl justify-center items-center">
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span className="text-base font-medium  ellipsis elipse">
                              {selectedFile
                                ? selectedFile.name
                                : "Select profile picture"}
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                              id="image"
                              name="image"
                              accept="image/*"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Check boxes for skills */}
                      <div className=" mt-10">
                        <h1 className="text-[18px] font-bold">
                          Select Your Skills
                        </h1>

                        <div>
                          <div className="w-full">
                            <List className="flex-col">
                              <ListItem className="p-0">
                                <label
                                  htmlFor="body-building"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="body-building"
                                      value="Body Building"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "skills")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Body Building
                                  </Typography>
                                </label>
                              </ListItem>

                              <ListItem className="p-0">
                                <label
                                  htmlFor="masculation"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="masculation"
                                      value="Masculation"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "skills")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Masculation
                                  </Typography>
                                </label>
                              </ListItem>

                              <ListItem className="p-0">
                                <label
                                  htmlFor="weight-lifting"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="weight-lifting"
                                      value="Weight Lifting"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "skills")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Weight Lifting
                                  </Typography>
                                </label>
                              </ListItem>

                              <ListItem className="p-0">
                                <label
                                  htmlFor="classic-yoga"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="classic-yoga"
                                      value="Classic Yoga"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "skills")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Classic Yoga
                                  </Typography>
                                </label>
                              </ListItem>
                            </List>
                          </div>
                        </div>
                      </div>

                      {/* Check boxes for available time in a week */}
                      <div className=" my-5">
                        <h1 className="text-[18px] font-bold">
                          Your Available time in a week
                        </h1>

                        <div>
                          <div className="w-full">
                            <List className="flex-col">
                              <ListItem className="p-0">
                                <label
                                  htmlFor="sat"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="sat"
                                      value="Saturday"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "availableDays")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Saturday
                                  </Typography>
                                </label>
                              </ListItem>

                              <ListItem className="p-0">
                                <label
                                  htmlFor="sun"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="sun"
                                      value="Sunday"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "availableDays")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Sunday
                                  </Typography>
                                </label>
                              </ListItem>

                              <ListItem className="p-0">
                                <label
                                  htmlFor="mon"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="mon"
                                      value="Monday"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "availableDays")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Monday
                                  </Typography>
                                </label>
                              </ListItem>

                              <ListItem className="p-0">
                                <label
                                  htmlFor="tue"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="tue"
                                      value="Tuesday"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "availableDays")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Tuesday
                                  </Typography>
                                </label>
                              </ListItem>

                              <ListItem className="p-0">
                                <label
                                  htmlFor="wed"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="wed"
                                      value="Wednesday"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "availableDays")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Wednesday
                                  </Typography>
                                </label>
                              </ListItem>

                              <ListItem className="p-0">
                                <label
                                  htmlFor="thu"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="thu"
                                      value="Thursday"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "availableDays")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Thursday
                                  </Typography>
                                </label>
                              </ListItem>

                              <ListItem className="p-0">
                                <label
                                  htmlFor="fri"
                                  className="flex w-full cursor-pointer items-center px-3 py-2"
                                >
                                  <ListItemPrefix className="mr-3">
                                    <Checkbox
                                      id="fri"
                                      value="Friday"
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, "availableDays")
                                      }
                                    />
                                  </ListItemPrefix>
                                  <Typography
                                    color="blue-gray"
                                    className="font-medium"
                                  >
                                    Friday
                                  </Typography>
                                </label>
                              </ListItem>
                            </List>
                          </div>
                        </div>
                      </div>

                      {/* Check boxes for available time in a day */}
                      <div className=" my-5">
                        <h1 className="text-[18px] font-bold">
                          Your Available time in a day
                        </h1>

                        <div>
                          <div className="w-full">
                            <List className="flex-col">
                              <div className="morning">
                                <h1 className="font-bold">Morning Shift</h1>
                                <ListItem className="p-0">
                                  <label
                                    htmlFor="mor-1"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                  >
                                    <ListItemPrefix className="mr-3">
                                      <Checkbox
                                        id="mor-1"
                                        value="7 AM - 8 AM"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            "availableTime"
                                          )
                                        }
                                      />
                                    </ListItemPrefix>
                                    <Typography
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      7 AM - 8 AM
                                    </Typography>
                                  </label>
                                </ListItem>

                                <ListItem className="p-0">
                                  <label
                                    htmlFor="mor-2"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                  >
                                    <ListItemPrefix className="mr-3">
                                      <Checkbox
                                        id="mor-2"
                                        value="9 AM - 10 AM"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            "availableTime"
                                          )
                                        }
                                      />
                                    </ListItemPrefix>
                                    <Typography
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      9 AM - 10 AM
                                    </Typography>
                                  </label>
                                </ListItem>
                              </div>

                              <div className="afternoon">
                                <h1 className="font-bold">Aftternoon Shift</h1>
                                <ListItem className="p-0">
                                  <label
                                    htmlFor="aft-1"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                  >
                                    <ListItemPrefix className="mr-3">
                                      <Checkbox
                                        id="aft-1"
                                        value=" 2 PM - 3 PM"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            "availableTime"
                                          )
                                        }
                                      />
                                    </ListItemPrefix>
                                    <Typography
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      2 PM - 3 PM
                                    </Typography>
                                  </label>
                                </ListItem>

                                <ListItem className="p-0">
                                  <label
                                    htmlFor="aft-2"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                  >
                                    <ListItemPrefix className="mr-3">
                                      <Checkbox
                                        id="aft-2"
                                        value="4 AM - 5 AM"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            "availableTime"
                                          )
                                        }
                                      />
                                    </ListItemPrefix>
                                    <Typography
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      4 PM - 5 PM
                                    </Typography>
                                  </label>
                                </ListItem>
                              </div>

                              <div className="night">
                                <h1 className="font-bold">Night Shift</h1>
                                <ListItem className="p-0">
                                  <label
                                    htmlFor="nig-1"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                  >
                                    <ListItemPrefix className="mr-3">
                                      <Checkbox
                                        id="nig-1"
                                        value=" 7 PM - 8 PM"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            "availableTime"
                                          )
                                        }
                                      />
                                    </ListItemPrefix>
                                    <Typography
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      7 PM - 8 PM
                                    </Typography>
                                  </label>
                                </ListItem>

                                <ListItem className="p-0">
                                  <label
                                    htmlFor="nig-2"
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                  >
                                    <ListItemPrefix className="mr-3">
                                      <Checkbox
                                        id="nig-2"
                                        value=" 9 PM - 10 PM"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            "availableTime"
                                          )
                                        }
                                      />
                                    </ListItemPrefix>
                                    <Typography
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      9 PM - 10 PM
                                    </Typography>
                                  </label>
                                </ListItem>
                              </div>
                            </List>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <button
                          type="submit"
                          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                          disabled={loading ? true : false}
                        >
                          {loading ? (
                            <div className="flex items-center justify-center gap-4">
                              <ImSpinner9 className="animate-spin text-[20px]" />
                              Applying
                            </div>
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BeATrainer;
