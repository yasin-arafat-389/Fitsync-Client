import { Button, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import useRole from "../../Hooks/useRole";

const AddNewForum = () => {
  let [loading, setLoading] = useState(false);
  let axios = useAxios();
  let [role] = useRole();

  const [formData, setFormData] = useState({
    discussionTitle: "",
    discussionDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const requestBody = {
      ...formData,
      role: role,
    };

    await axios.post("/forums", requestBody).then(() => {
      setLoading(false);
      toast.success("Forum Posted Successfully");

      e.target.reset();

      setFormData({
        discussionTitle: "",
        discussionDescription: "",
      });
    });
  };

  return (
    <div>
      <div>
        <div color="transparent" className="ml-10">
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Input
                name="discussionTitle"
                label="Discussion Title"
                value={formData.discussionTitle}
                onChange={handleInputChange}
                required
              />

              <Textarea
                name="discussionDescription"
                label="Discussion Description"
                value={formData.discussionDescription}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading && true}
              className="mt-6"
              fullWidth
            >
              {loading ? (
                <div className="flex items-center justify-center gap-4">
                  <ImSpinner9 className="animate-spin text-[20px]" />
                  Adding Forum
                </div>
              ) : (
                "Add Forum"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewForum;
