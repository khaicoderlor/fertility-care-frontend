import axiosInstance from "./AxiosInstance";

export const getDoctors = async (Page: number = 1, PageSize: number = 3) => {
  const response = await axiosInstance.get("/doctors", {
    params: {
      Page,
      PageSize,
    },
  });
  return response.data.data;
};

export const getScheduleSlotTime = async (doctorId: string, date: string) => {
  const response = await axiosInstance.get(
    `/doctor-schedules/slots/${doctorId}`,
    {
      params: {
        date,
      },
    }
  );

  return response.data.data;
};
