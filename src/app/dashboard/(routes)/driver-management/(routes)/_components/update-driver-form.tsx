interface UpdateDriverFormProps {
  driverId: string;
  driverData: any; // Replace 'any' with the actual type of driver data
}

export const UpdateDriverForm = ({ driverId, driverData }: UpdateDriverFormProps) => {
  return <div>Update Driver Which ID is {driverId}</div>;
};
