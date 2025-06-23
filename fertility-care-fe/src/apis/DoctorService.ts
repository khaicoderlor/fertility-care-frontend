import axios from "axios";

export const getDoctors = async (
  Page: number = 1,
  PageSize: number = 3
) => {
  const response = await axios.get(
    "https://localhost:7245/api/v1/doctors",
    {
      params: {
        Page,
        PageSize,
      },
    }
  );
  return response.data.data;
};


export const getScheduleSlotTime = async (
  doctorId: string,
  date: string
) => {
  const response = await axios.get(
    `https://localhost:7245/api/v1/doctor-schedules/slots/${doctorId}`,
    {
      params: {
        date
      }
    }
  );

  return response.data.data;
};





