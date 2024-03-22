import "@/styles/global.css";
import React from 'react';
import CheckinForm from "@/components/dashboard/checkouyForm";
import { getReservationById } from "@/utils/reservationRepository";
import { getUserById } from "@/utils/userRepository";
import { getVehicleById } from "@/utils/vehicleRepository";