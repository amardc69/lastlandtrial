"use client";

import React from "react";
import { useTimelineContext } from "../context/TimelineContext";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const TimelineManager: React.FC = () => {
  const { proposal } = useTimelineContext();

  if (!proposal) {
    return (
      <div className="w-4/6 flex flex-col items-center justify-center rounded-2xl border border-gray-300 p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Timeline Manager</h2>
        <p className="text-gray-600 text-center">
          Please select a proposal to view its timeline.
        </p>
      </div>
    );
  }

  return (
    <div className="w-4/6 flex flex-col items-start rounded-2xl border border-gray-300 p-6 shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Timeline Manager</h2>
      <div className="mb-4 space-y-1">
        <p className="text-gray-700">
          <strong>Proposal Text:</strong> {proposal.text}
        </p>
        <p className="text-gray-700">
          <strong>Date &amp; Time:</strong> {proposal.date}
        </p>
        <p className="text-gray-700">
          <strong>Proposal Verified:</strong> {proposal.proposalVerified ? "Yes" : "No"}
        </p>
        <p className="text-gray-700">
          <strong>Status:</strong> {proposal.status}
        </p>
        <p className="text-gray-700">
          <strong>Proposal Type:</strong> {proposal.proposalType}
        </p>
        <p className="text-gray-700">
          <strong>Package Negotiated:</strong> {proposal.packageNegotiated ? "Yes" : "No"}
        </p>
        <p className="text-gray-700">
          <strong>Content Promotion:</strong> {proposal.contentPromotion ? "Yes" : "No"}
        </p>
        <p className="text-gray-700">
          <strong>Content Type:</strong>{" "}
          {proposal.contentType === "normal" ? "Influencer Normal Content" : "Separate Post"}
        </p>
        <p className="text-gray-700">
          <strong>Time for Post:</strong> {proposal.timeForPost}
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Services</h3>
        <div className="mt-2 space-y-2">
          {proposal.services.map((service, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-2xl border border-gray-200">
              {service.name.toLowerCase().includes("instagram") ? (
                <FaInstagram className="w-8 h-8 mr-3 text-pink-500" />
              ) : service.name.toLowerCase().includes("facebook") ? (
                <FaFacebook className="w-8 h-8 mr-3 text-blue-600" />
              ) : (
                <img src={service.logoUrl} alt={service.name} className="w-8 h-8 mr-3" />
              )}
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-800">{service.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">${service.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineManager;
