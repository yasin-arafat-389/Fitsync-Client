import { useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../Components/PageTitle/PageTitle";
import "./Trainer.css";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import RouteChangeLoader from "../../Utilities/RouteChangeLoader/RouteChangeLoader";
import { Button } from "@material-tailwind/react";
import useRole from "../../Hooks/useRole";
import { Helmet } from "react-helmet-async";

const Trainer = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [role] = useRole();

  const [currentPage, setCurrentPage] = useState(1);
  const trainersPerPage = 6;

  // Filters
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const availableDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const availableTimes = [
    "7 AM - 8 AM",
    "9 AM - 10 AM",
    "2 PM - 3 PM",
    "4 PM - 5 PM",
    "7 PM - 8 PM",
    "9 PM - 10 PM",
  ];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (totalPages) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

 

  return (

  );
};

export default Trainer;
