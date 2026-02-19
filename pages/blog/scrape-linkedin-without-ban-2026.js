import Head from 'next/head';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "How to Scrape LinkedIn Without Getting Banned in 2026",
      "description": "Working guide to scraping LinkedIn profiles, companies, and job listings in 2026 without triggering rate limits or account bans. Uses residential proxy + mobile fingerprint.",
      "url": "https://humanbrowser.dev/blog/scrape-linkedin-without-ban-2026",
      "datePublished": "2026-02-19",
      "dateModified": "2026-02-19",
      "image": "https://humanbrowser.dev/og-image.jpg",
      "author": { "@type": "Organization", "name": "Virix Labs", "url": "https://virixlabs.com" },
      "publisher": { "@type": "Organization", "name": "Human Browser", "url": "https://humanbrowser.dev" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Can you scrape LinkedIn in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, LinkedIn can be scraped in 2026 using residential proxies and a realistic mobile browser fingerprint. LinkedIn's anti-bot system primarily checks IP reputation, request rate, and browser fingerprint consistency. A residential IP with iPhone fingerprint and human-like timing passes all three checks." } },
        { "@type": "Question", "name": "Does LinkedIn detect Playwright?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. LinkedIn detects vanilla Playwright via browser fingerprinting and IP checks. Using playwright-extra stealth alone is not sufficient — you also need a residential IP. The combination of a residential proxy + iPhone Safari fingerprint makes Playwright undetectable to LinkedIn's current detection system." } },
        { "@type": "Question", "name": "What is the rate limit for LinkedIn scraping?", "acceptedAnswer": { "@type": "Answer", "text": "LinkedIn allows approximately 80-100 profile views per day per IP address before throttling. With a rotating residential proxy pool, you can scale this to thousands of profiles per day by rotating IPs every 50-80 requests." } }
      ]
    }
  ]
};

export default function ScrapeLinkedinPage() {
  return (
    <>
      <Head>
        <title>Scrape LinkedIn Without Getting Banned in 2026 | Human Browser</title>
        <meta name="description" content="Working guide to scraping LinkedIn profiles, job listings, and company pages in 2026. Residential proxy + iPhone fingerprint = no bans." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="scrape linkedin without ban, linkedin scraping 2026, linkedin playwright, linkedin scraper python, linkedin scraping residential proxy, linkedin bot detection bypass" />
        <link rel="canonical" href="https://humanbrowser.dev/blog/scrape-linkedin-without-ban-2026" />
        <meta property="og:title" content="Scrape LinkedIn Without Getting Banned in 2026 | Human Browser" />
        <meta property="og:description" content="Residential proxy + iPhone fingerprint — scrape LinkedIn profiles without rate limits or bans." />
        <meta property="og:url" content="https://humanbrowser.dev/blog/scrape-linkedin-without-ban-2026" />
        <meta property="og:image" content="https://humanbrowser.dev/og-image.jpg" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}

const bodyContent = `
<style>
  .blog-nav { background: #050508; border-bottom: 1px solid #1a1a2e; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
  .blog-nav a { color: #00e5cc; text-decoration: none; font-size: 0.9rem; font-family: Inter, sans-serif; }
  .blog-nav .nav-links { display: flex; gap: 1.5rem; }
  .blog-wrap { max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem 5rem; font-family: Inter, sans-serif; color: #e8e8f0; line-height: 1.75; background: #050508; }
  body { background: #050508; margin: 0; }
  .blog-eyebrow { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.12em; color: #00e5cc; margin-bottom: 1rem; font-weight: 600; }
  .blog-wrap h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; line-height: 1.2; color: #fff; margin-bottom: 1.2rem; }
  .blog-meta { font-size: 0.85rem; color: #888; margin-bottom: 2.5rem; display: flex; gap: 1.5rem; flex-wrap: wrap; }
  .blog-wrap h2 { font-size: 1.4rem; font-weight: 700; color: #fff; margin: 2.5rem 0 1rem; border-left: 3px solid #00e5cc; padding-left: 0.75rem; }
  .blog-wrap h3 { font-size: 1.1rem; font-weight: 700; color: #e2e8f0; margin: 1.5rem 0 0.5rem; }
  .blog-wrap p { margin: 0 0 1.25rem; color: #bbb; }
  .blog-wrap ul, .blog-wrap ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
  .blog-wrap li { margin-bottom: 0.5rem; color: #bbb; }
  .blog-wrap code { background: #13131a; color: #a5b4fc; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.88em; }
  .blog-wrap pre { background: #13131a; border: 1px solid #222; border-radius: 8px; padding: 1.25rem; overflow-x: auto; font-size: 0.82rem; line-height: 1.6; margin: 1.25rem 0; }
  .blog-wrap pre code { background: none; padding: 0; color: #a5b4fc; }
  .warn-box { background: #1a120a; border: 1px solid #78350f; border-radius: 8px; padding: 1rem 1.25rem; margin: 1.5rem 0; }
  .warn-box p { color: #fcd34d; margin: 0; }
  .cta-box { background: linear-gradient(135deg, #13131a 0%, #1e1b4b 100%); border: 1px solid #6366f1; border-radius: 12px; padding: 1.5rem; margin: 2.5rem 0; text-align: center; }
  .cta-box h3 { color: #fff; margin: 0 0 0.5rem; font-size: 1.1rem; }
  .cta-box p { color: #888; margin: 0 0 1rem; font-size: 0.9rem; }
  .cta-box a { display: inline-block; background: #6366f1; color: #fff; text-decoration: none; padding: 0.7rem 1.5rem; border-radius: 8px; font-weight: 700; font-size: 0.9rem; }
  .blog-footer { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #1a1a2e; }
  .blog-footer a { color: #00e5cc; }
</style>

<nav class="blog-nav">
  <a href="/">← Human Browser</a>
  <div class="nav-links"><a href="/blog">Blog</a><a href="/#pricing">Pricing</a></div>
</nav>

<div class="blog-wrap">
  <div class="blog-eyebrow">LinkedIn Scraping · 2026</div>
  <h1>How to Scrape LinkedIn Without Getting Banned in 2026</h1>
  <div class="blog-meta">
    <span>Feb 19, 2026</span>
    <span>9 min read</span>
    <span>by Virix Labs</span>
  </div>

  <div class="warn-box">
    <p>⚠️ <strong>Legal note:</strong> This guide is for educational purposes. Always comply with LinkedIn's Terms of Service and applicable law. Scraping publicly available data for research is generally permitted under fair use principles, but commercial use at scale may require LinkedIn's permission.</p>
  </div>

  <p>LinkedIn is one of the hardest sites to scrape in 2026. It runs DataDome on top of its own anti-bot system, checks IP reputation on every request, and uses machine-learning behavioral analysis. Here's what actually works.</p>

  <h2>How LinkedIn detects scrapers</h2>

  <p>LinkedIn's detection system runs four layers:</p>

  <ol>
    <li><strong>IP reputation check</strong> — data center IPs are blocked before any page loads. Score checked against DataDome's threat intelligence database in &lt;1ms.</li>
    <li><strong>Browser fingerprint</strong> — checks navigator properties, WebGL renderer, audio context, canvas rendering. Vanilla Playwright fails this.</li>
    <li><strong>Behavioral analysis</strong> — mouse movement patterns, scroll timing, click coordinates. Linear/instant movements are flagged.</li>
    <li><strong>Session velocity</strong> — more than 80-100 profile views per day from one IP triggers rate limiting. More than 200 triggers permanent IP ban.</li>
  </ol>

  <h2>The working stack in 2026</h2>

  <h3>Requirements</h3>
  <ul>
    <li>Residential IP from a real ISP (not datacenter, not hosting ASN)</li>
    <li>Mobile Safari fingerprint (iPhone — lower bot score than desktop Chrome)</li>
    <li>Sticky session (same IP throughout a scraping session)</li>
    <li>Human-like delays: 3-8 seconds between page loads, random scroll patterns</li>
    <li>Session warm-up: start with a non-profile page before scraping target profiles</li>
  </ul>

  <h3>Working code example</h3>

  <pre><code>const { launchHuman } = require('human-browser');

async function scrapeLinkedInProfile(profileUrl) {
  const { page, humanScroll, humanRead, sleep } = await launchHuman({
    country: 'us',           // match target audience
    stickySession: true,     // same IP throughout
  });

  // Warm up: start from homepage, not profile directly
  await page.goto('https://linkedin.com', { waitUntil: 'networkidle' });
  await humanRead(page);   // random 2-5s read pause
  await humanScroll(page, 'down');

  // Navigate to search first (more human-like)
  await page.goto('https://linkedin.com/search/results/people/', { waitUntil: 'networkidle' });
  await sleep(2000 + Math.random() * 3000);

  // Then navigate to target profile
  await page.goto(profileUrl, { waitUntil: 'networkidle' });
  await humanRead(page);
  await humanScroll(page, 'down');

  // Extract data
  const name = await page.$eval('h1', el => el.textContent.trim()).catch(() => null);
  const headline = await page.$eval('.text-body-medium', el => el.textContent.trim()).catch(() => null);
  const location = await page.$eval('.text-body-small.inline', el => el.textContent.trim()).catch(() => null);

  await page.close();
  return { name, headline, location, url: profileUrl };
}

// Rate limiting: 50-80 profiles per IP, then rotate
const profiles = ['https://linkedin.com/in/profile-1', 'https://linkedin.com/in/profile-2'];
for (const url of profiles) {
  const data = await scrapeLinkedInProfile(url);
  console.log(data);
  // Random delay between profiles: 45-120 seconds
  await new Promise(r => setTimeout(r, 45000 + Math.random() * 75000));
}</code></pre>

  <h2>Rate limits and IP rotation strategy</h2>

  <h3>Per-IP limits (2026)</h3>
  <ul>
    <li><strong>Safe zone</strong>: 50-70 profile views/day per IP</li>
    <li><strong>Warning zone</strong>: 70-120 views/day — occasional CAPTCHA challenges</li>
    <li><strong>Ban zone</strong>: 120+ views/day — IP gets blocked for 24-48 hours</li>
    <li><strong>Permanent ban</strong>: 300+ views/day — IP added to permanent blocklist</li>
  </ul>

  <h3>Rotation strategy</h3>

  <pre><code>// Rotate IPs every 50 profiles
const PROFILES_PER_IP = 50;
let profileCount = 0;
let { page, humanRead, sleep } = await launchHuman({ stickySession: true });

for (const profileUrl of allProfiles) {
  if (profileCount >= PROFILES_PER_IP) {
    await page.close();
    // New session = new residential IP
    ({ page, humanRead, sleep } = await launchHuman({ stickySession: true }));
    profileCount = 0;
    // Longer break between IPs
    await sleep(10000 + Math.random() * 20000);
  }

  const data = await scrapeProfile(page, profileUrl, { humanRead, sleep });
  results.push(data);
  profileCount++;

  // Delay between profiles
  await sleep(45000 + Math.random() * 75000);
}</code></pre>

  <h2>Scraping LinkedIn without logging in</h2>

  <p>LinkedIn shows limited profile data to non-logged-in users, but it's often enough for lead generation:</p>
  <ul>
    <li>Full name ✅</li>
    <li>Headline/title ✅</li>
    <li>Location ✅</li>
    <li>Current company ✅</li>
    <li>Profile photo ✅</li>
    <li>Employment history ❌ (logged-in only)</li>
    <li>Contact info ❌ (connections only)</li>
  </ul>

  <p>For more data, you can use a logged-in account — but be careful, LinkedIn accounts used for automated scraping get restricted quickly if not managed carefully.</p>

  <h2>Scraping LinkedIn company pages</h2>

  <p>Company pages have lower detection sensitivity than profile pages. You can scrape company details, employee counts, and recent posts at 2-3x the rate of profile scraping:</p>

  <pre><code>await page.goto('https://linkedin.com/company/openai', { waitUntil: 'networkidle' });
await humanScroll(page, 'down');

const companyData = {
  name: await page.$eval('h1', e => e.textContent.trim()).catch(() => null),
  size: await page.$eval('[data-test-id="about-us__size"]', e => e.textContent.trim()).catch(() => null),
  industry: await page.$eval('[data-test-id="about-us__industry"]', e => e.textContent.trim()).catch(() => null),
  followers: await page.$eval('.org-top-card-summary__follower-count', e => e.textContent.trim()).catch(() => null),
};</code></pre>

  <div class="cta-box">
    <h3>Human Browser — residential proxy for LinkedIn scraping</h3>
    <p>iPhone fingerprint + Romania or US residential IP. Passes LinkedIn's DataDome detection out of the box.</p>
    <a href="https://humanbrowser.dev/#pricing">Get Started — from $13.99/mo →</a>
  </div>

  <div class="blog-footer">
    <p>Related: <a href="/blog/scrape-instagram-without-ban">Scrape Instagram Without Ban</a> · <a href="/blog/bypass-cloudflare-playwright-2026">Bypass Cloudflare with Playwright</a> · <a href="/blog">All articles →</a></p>
  </div>
</div>
`;
