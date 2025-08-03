import { Button } from "@/components/ui/button";
import { CreditCard, Package, CheckCircle } from "lucide-react";

export const Billing = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Billing</h1>
        <Button variant="outline" className="flex items-center gap-2 p-6">
          <CreditCard className="h-4 w-4" />
          Manage Payment Methods
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Plan */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
            <div className="flex items-center gap-2 text-blue-700 font-medium mb-1">
              <Package className="h-5 w-5" />
              Free Plan
            </div>
            <p className="text-sm text-gray-600">
              You are currently on the free plan with limited features.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">5 sessions per month</p>
                <p className="text-sm text-gray-500">Track your speaking performance</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Basic analytics</p>
                <p className="text-sm text-gray-500">Get insights on your speaking patterns</p>
              </div>
            </div>
          </div>
          <Button className="w-full mt-6 p-6">Upgrade to Pro</Button>
        </div>

        {/* Pro Plan */}
        <div className="border rounded-lg p-6 shadow-sm bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Pro Plan</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">Recommended</span>
          </div>
          <p className="text-3xl font-bold mb-1">499<span className="text-base font-normal text-gray-500">/month</span></p>
          <p className="text-sm text-gray-500 mb-4">Unlock all features and get unlimited sessions</p>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Unlimited sessions</p>
                <p className="text-sm text-gray-500">No monthly limits</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Advanced analytics</p>
                <p className="text-sm text-gray-500">Detailed performance insights</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Personalized recommendations</p>
                <p className="text-sm text-gray-500">AI-powered improvement suggestions</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Priority support</p>
                <p className="text-sm text-gray-500">Get help when you need it</p>
              </div>
            </div>
          </div>
          <Button className="w-full mt-6 p-6">Upgrade Now</Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="border rounded-lg p-6 shadow-sm mt-4">
        <h2 className="text-xl font-semibold mb-4">Billing History</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No billing history available</p>
        </div>
      </div>
    </div>
  );
};