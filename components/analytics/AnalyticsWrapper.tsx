"use client";

import React, { Suspense } from 'react';
import GoogleAnalytics from './GoogleAnalytics';
import FacebookPixel from './FacebookPixel';

const AnalyticsWrapper: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <GoogleAnalytics />
      <FacebookPixel />
    </Suspense>
  );
};

export default AnalyticsWrapper;
