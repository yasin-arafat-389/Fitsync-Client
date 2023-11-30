import {
  Button,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Option,
  Radio,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import useTrainer from "../../Hooks/useTrainer";
import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { Helmet } from "react-helmet-async";

const AddNewClass = () => {
  const [data] = useTrainer();
  let axios = useAxios();
  let [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const [formData, setFormData] = useState({
    classTitle: "",
    classDescription: "",
    intensity: "",
    seatCapacity: "",
  });

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

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!formData.intensity) {
      toast.error("Please select the intensity");
      setLoading(false);
      return;
    }

    if (!selectedTime) {
      setLoading(false);
      toast.error("Please select a time");
      return;
    }

    const requestBody = {
      ...formData,
      time: selectedTime,
      name: data?.name,
    };

    await axios.post("/classes", requestBody).then(() => {
      setLoading(false);
      toast.success("Class Posted Successfully");

      e.target.reset();
      setSelectedTime("");
      setFormData({
        classTitle: "",
        classDescription: "",
        intensity: "",
        seatCapacity: "",
      });
    });
  };

  return (
    <div>
      <Helmet>
        <title>FitSync | Add New Class</title>
      </Helmet>
      <div color="transparent" className="ml-10">
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Input
              name="classTitle"
              value={formData.classTitle}
              onChange={handleInputChange}
              label="Class Title"
              required
            />
            <Textarea
              name="classDescription"
              value={formData.classDescription}
              onChange={handleInputChange}
              label="Class Description"
              required
            />
            <Select
              name="intensity"
              value={formData.intensity}
              onChange={(value) =>
                handleInputChange({ target: { name: "intensity", value } })
              }
              label="Intensity"
            >
              <Option value="Medium">Medium</Option>
              <Option value="Medium To Hard">Medium To Hard</Option>
              <Option value="Very Hard">Very Hard</Option>
            </Select>
            <Input
              name="seatCapacity"
              value={formData.seatCapacity}
              onChange={handleInputChange}
              label="Seat Capacity"
              type="number"
              required
            />

            <div>
              <Typography>Select Time From Your Available Time</Typography>

              <List>
                {data?.availableTime?.map((item, index) => (
                  <ListItem className="p-0" key={index}>
                    <label
                      htmlFor={item}
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Radio
                          name="vertical-list"
                          id={item}
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          onChange={() => handleTimeSelection(item)}
                        />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="font-medium text-blue-gray-400"
                      >
                        {item}
                      </Typography>
                    </label>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            {loading ? (
              <div className="flex items-center justify-center gap-4">
                <ImSpinner9 className="animate-spin text-[20px]" />
                Adding Class
              </div>
            ) : (
              "Add Class"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNewClass;
