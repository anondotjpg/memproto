"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

const RecentBuys = () => {
  const [buys, setBuys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent buy activities
  const fetchRecentBuys = async () => {
    try {
      const response = await fetch('/api/activity?type=buy&limit=20');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setBuys(data.activities || []);
    } catch (err) {
      console.error('Error fetching buys:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentBuys();
    // Refresh every 30 seconds
    const interval = setInterval(fetchRecentBuys, 30000);
    return () => clearInterval(interval);
  }, []);

  // Format time ago
  const timeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  // Format SOL amount
  const formatSol = (amount) => {
    if (!amount) return '0';
    return parseFloat(amount).toFixed(4);
  };

  // Get activity icon based on type
  const getActivityIcon = (type) => {
    if (type?.includes('target')) {
      return (
        <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Image
                src="/print.png"
                alt="Print"
                width={16}
                height={16}
                className="object-contain"
            />
        </div>
      );
    }
    if (type?.includes('self')) {
      return (
        <div className="w-9 h-9 rounded-full bg-purple-500/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      );
    }
    if (type?.includes('combined')) {
      return (
        <div className="w-9 h-9 rounded-full bg-yellow-500/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      );
    }
    return (
      <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center">
        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  };

  // Get label for activity type
  const getActivityLabel = (type) => {
    if (type?.includes('target')) return 'MEME Buy';
    if (type?.includes('self')) return 'Buyback';
    if (type?.includes('combined')) return 'MEME Buy';
    return 'Buy';
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-[#0d0d0d] rounded-2xl border border-[#1c1c1e] overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1c1c1e]">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[13px] font-semibold text-[#86868b]">Recent Activity</span>
          </div>
          <div className="p-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-3 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-[#1c1c1e]"></div>
                <div className="flex-1">
                  <div className="h-3.5 bg-[#1c1c1e] rounded-md w-28 mb-1.5"></div>
                  <div className="h-2.5 bg-[#1c1c1e] rounded-md w-16"></div>
                </div>
                <div className="text-right">
                  <div className="h-3.5 bg-[#1c1c1e] rounded-md w-20 mb-1.5"></div>
                  <div className="h-2.5 bg-[#1c1c1e] rounded-md w-8 ml-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (buys.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-[#0d0d0d] rounded-2xl border border-[#1c1c1e] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1c1c1e]">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[13px] font-semibold text-[#f5f5f7]">Recent Activity</span>
          </div>
          <span className="text-[11px] text-[#86868b]">{buys.length} transactions</span>
        </div>

        {/* Scrollable List */}
        <div className="max-h-[420px] overflow-y-auto">
          <div className="p-1.5">
            <AnimatePresence>
              {buys.map((buy, index) => (
                <motion.a
                  key={buy.id || index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.2 }}
                  href={buy.transaction_signature ? `https://solscan.io/tx/${buy.transaction_signature}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1c1c1e]/50 active:bg-[#1c1c1e] transition-colors cursor-pointer group"
                >
                  {/* Icon */}
                  {getActivityIcon(buy.activity_type)}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-[#f5f5f7] truncate">
                      {buy.token_name || getActivityLabel(buy.activity_type)}
                    </div>
                    <div className="text-[12px] text-[#86868b]">
                      {getActivityLabel(buy.activity_type)}
                    </div>
                  </div>

                  {/* Amount & Time */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-[14px] font-semibold text-[#30d158]">
                      +{formatSol(buy.amount_sol)} SOL
                    </div>
                    <div className="text-[11px] text-[#48484a]">
                      {timeAgo(buy.created_at)}
                    </div>
                  </div>

                  {/* Chevron */}
                  <svg 
                    className="w-4 h-4 text-[#48484a] group-hover:text-[#86868b] transition-colors flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBuys;