"use client";

import React, { useState } from 'react';
import { 
  Clock,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  User,
  Check,
  X
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TaskBidPage = () => {
  const [showDenyReasons, setShowDenyReasons] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [responseSubmitted, setResponseSubmitted] = useState(false);

  // Staff member data
  const staffMember = {
    name: "John Smith",
    title: "Senior Maintenance Engineer",
    image: "/images/john-smith.jpg",
    stats: {
      completed: 128,
      pending: 3
    }
  };

  const denyReasons = [
    "Already assigned to another urgent task",
    "Not qualified for this specific repair",
    "Equipment/tools not available",
    "Outside of working hours",
    "On planned leave",
    "Health and safety concerns"
  ] as const;

  const handleAccept = () => {
    setResponseSubmitted(true);
    // Here you would typically make an API call to accept the task
  };

  const handleDeny = (reason: string) => {
    setSelectedReason(reason);
    setResponseSubmitted(true);
    // Here you would typically make an API call to deny the task with the reason
  };

  if (responseSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <Alert className={selectedReason ? "bg-orange-50" : "bg-green-50"}>
          <AlertDescription className="flex items-center gap-2">
            {selectedReason ? (
              <>
                <ThumbsDown className="h-4 w-4 text-orange-500" />
                <span>Task declined. Reason: {selectedReason}</span>
              </>
            ) : (
              <>
                <ThumbsUp className="h-4 w-4 text-green-500" />
                <span>Task accepted successfully!</span>
              </>
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Staff Member Header */}
      <div className="mb-8 flex items-center gap-4">
        <img
          src={staffMember.image}
          alt={staffMember.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-semibold">{staffMember.name}</h1>
          <p className="text-gray-600">{staffMember.title}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-3xl font-bold mb-1">{staffMember.stats.completed}</h2>
            <p className="text-gray-600">Completed Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-3xl font-bold mb-1">{staffMember.stats.pending}</h2>
            <p className="text-gray-600">Pending Tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Task Assignment Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-end gap-4 mb-6">
            <div className="text-right">
              <h3 className="font-medium">Assigned by</h3>
              <p className="text-sm text-gray-600">Ahmed Khan</p>
              <p className="text-xs text-gray-500">Maintenance Supervisor</p>
            </div>
            <img
              src="/images/ahmed-khan.jpg"
              alt="Ahmed Khan"
              className="w-12 h-12 rounded-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">AC Maintenance</h2>
              <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                High Priority
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-gray-700"><strong>Location:</strong> Suite 507</p>
              <p className="text-gray-700"><strong>Estimated Duration:</strong> 45 min</p>
              <p className="text-gray-700"><strong>Description:</strong> Guest reported AC making loud noise and not cooling properly. Temperature reading shows 26°C despite being set to 21°C.</p>
            </div>

            <div className="flex items-center gap-2 text-blue-600">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Response needed within: 15 min</span>
            </div>
          </div>

          {!showDenyReasons ? (
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAccept}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Check className="w-5 h-5" />
                Accept Task
              </button>
              <button
                onClick={() => setShowDenyReasons(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
                Deny Task
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Select reason for declining:</h3>
              <div className="space-y-2">
                {denyReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleDeny(reason)}
                    className="w-full text-left px-4 py-2 rounded-lg border hover:bg-gray-50"
                  >
                    {reason}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowDenyReasons(false)}
                className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskBidPage;