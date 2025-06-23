import { HeartIcon } from "@heroicons/react/24/outline";
import { ProgressTracker } from "../../components/progress/ProgressTracker";
import { StepCard } from "../../components/progress/StepCard";
import { StepDetail } from "../../components/progress/StepDetail";
import { useEffect, useState } from "react";
import type { Order } from "../../models/Order";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../apis/AxiosInstance";
import type OrderStep from "../../models/OrderStep";
import { STEP_COMPLETED } from "../../constants/StepStatus";

export default function ProgressPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");  
  const [order, setOrder] = useState<Order>();
  const [steps, setSteps] = useState<OrderStep[] | null>();
  const [selectedStep, setSelectedStep] = useState<OrderStep>();

  useEffect(() => {
    const fetchOrderDetail = async (orderid: string) => {
        try {
            const response = await axiosInstance.get(`/orders/${orderid}`);

            setOrder(response.data.data);
        } catch(error) {
            console.log(error);
        }
    }
    fetchOrderDetail(orderId??"")
  }) 

  useEffect(() => {
    const fetchOrderStepsByOrderId = async (orderid: string) => {
        try {
            const response = await axiosInstance.get(`/steps/${orderid}`);

            setSteps(response.data.data);
        } catch(error) {
            console.log(error);
        }
    }
    fetchOrderStepsByOrderId(orderId??"")
  })

  const totalSteps = steps?.length;
  const completedSteps = steps?.filter(x => x.status == STEP_COMPLETED).length;

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <HeartIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {order?.treatmentService?.name} progress{/* tên quá trình */}
            </h1>
            <p className="text-gray-600">Theo dõi tiến trình điều trị</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <ProgressTracker
          steps={steps??[]}
          completedSteps={completedSteps??0}
          totalSteps={totalSteps??0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Steps Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {steps?.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              isSelected={selectedStep?.id === step.id}
              onClick={() => setSelectedStep(step)}
            />
          ))}
        </div>

        {/* Step Details Panel */}
        <div>
          <StepDetail step={selectedStep ?? null} order={order ?? null} />
        </div>
      </div>
    </>
  );
}
