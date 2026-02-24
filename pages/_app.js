import "@/styles/globals.css";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';

// Lightweight VPS tracker (mirrors Clawster analytics, site=hb)
function trackHB(event, page) {
  if (typeof window === 'undefined') return;
  const ref = new URLSearchParams(window.location.search).get('ref') || '';
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, page: page || window.location.pathname, ref }),
  }).catch(() => {});
}

const POSTHOG_KEY = 'phc_VHVdzWU7sO9QZ9SFFvGnrl2ap0ykEUn7nsVLCmV3YlF';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: false, // manual below
      capture_pageleave: true,
      autocapture: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.opt_out_capturing();
        ph.register({ app: 'humanbrowser' }); // tag all events from this site
      },
    });

    // Track initial pageview
    posthog.capture('$pageview', { $current_url: window.location.href });
    trackHB('page_view', window.location.pathname);

    // Track route changes
    const handleRouteChange = (url) => {
      posthog.capture('$pageview', { $current_url: url });
      trackHB('page_view', new URL(url, window.location.origin).pathname);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, []);

  return <Component {...pageProps} />;
}
