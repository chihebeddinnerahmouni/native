import { EAmenityType } from "../backend/casaikos-api";
import {
  AirConditioningIcon,
  BalconyIcon,
  GardenIcon,
  GymIcon,
  InternetIcon,
  LaundryIcon,
  MailServiceIcon,
  ParkingIcon,
  PetsIcon,
  SecurityIcon,
  SwimmingIcon,
  TvIcon,
} from "../icons";

export const amenitiesList = [
  {
    Icon: AirConditioningIcon,
    title: EAmenityType.AirConditioning,
  },
  {
    Icon: BalconyIcon,
    title: EAmenityType.Balcony,
  },
  {
    Icon: InternetIcon,
    title: EAmenityType.Internet,
  },
  {
    Icon: ParkingIcon,
    title: EAmenityType.Parking,
  },
  {
    Icon: GymIcon,
    title: EAmenityType.Gym,
  },
  {
    Icon: GardenIcon,
    title: EAmenityType.Garden,
  },
  {
    Icon: MailServiceIcon,
    title: EAmenityType.MaidService,
  },
  {
    Icon: LaundryIcon,
    title: EAmenityType.Laundry,
  },
  {
    Icon: TvIcon,
    title: EAmenityType.CableTV,
  },
  {
    Icon: SwimmingIcon,
    title: EAmenityType.SwimmingPool,
  },
  {
    Icon: PetsIcon,
    title: EAmenityType.PetsAllowed,
  },
  {
    Icon: SecurityIcon,
    title: EAmenityType.Security,
  },
];
