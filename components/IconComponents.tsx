
import React from 'react';

export const TempIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16.5V3.5a2.5 2.5 0 00-5 0v13a4.5 4.5 0 105 0z" />
  </svg>
);

export const HumidityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.5c-2.4 0-4.5 2.1-4.5 4.5 0 2.4 2.1 4.5 4.5 4.5s4.5-2.1 4.5-4.5S14.4 6.5 12 6.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 15s1.5-2 5-2 5 2 5 2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v3.5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v3" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.5 12h3" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 12h3" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l2 2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 16l2 2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18l2-2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2" />
  </svg>
);

export const RainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-2-9.586A6 6 0 006 9c-3.314 0-6 2.686-6 6zM8 19v1m4-1v1m4-1v1" />
  </svg>
);

export const WindIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l.707-.707M19.778 19.778l-.707-.707M12 21v-1m-6.364-1.636l.707-.707M6.222 6.222l-.707.707" />
  </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9-3 4.03-3 9 1.343 9 3 9z" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const LocationMarkerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
