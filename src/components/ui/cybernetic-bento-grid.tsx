import React, { useRef, useEffect, useState } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Globe, Monitor, ShieldCheck, Cpu, Headphones } from 'lucide-react';
import './bento-animations.css';
import businessWebsiteImg from '@/assets/businesswebsite.png';
import portfolioImg from '@/assets/Portfolio.png';
import bookingImg from '@/assets/booking.png';
import app1Img from '@/assets/app1.png';
import app2Img from '@/assets/app2.png';
import app3Img from '@/assets/app3.png';
import fashionImg from '@/assets/fashion.png';
import hrImg from '@/assets/HR.png';

/* ================================================================
   1.  WEB COLLAGE  —  Web & Apps  (code + desktop + phone)
   ================================================================ */
export const WebCollageAnim = () => (
  <div className="ba-wrap ba-collage">

    {/* Code editor */}
    <div className="ba-code__win ba-collage__code">
      <div className="ba-code__bar">
        <div className="ba-code__dot" /><div className="ba-code__dot" /><div className="ba-code__dot" />
        <span className="ba-code__fname">app.tsx</span>
      </div>
      <div className="ba-code__body">
        <span className="ba-code__ln"><span className="tok-cm">{'// Goldmine Web Platform'}</span></span>
        <span className="ba-code__ln">
          <span className="tok-kw">const</span> <span className="tok-ky">app</span>
          <span className="tok-pu"> = </span><span className="tok-fn">build</span><span className="tok-pu">({'{'}</span>
        </span>
        <span className="ba-code__ln">
          &nbsp;&nbsp;<span className="tok-ky">stack</span><span className="tok-pu">:</span>{' '}
          <span className="tok-str">"React + Node"</span><span className="tok-pu">,</span>
        </span>
        <span className="ba-code__ln">
          &nbsp;&nbsp;<span className="tok-ky">scale</span><span className="tok-pu">:</span>{' '}
          <span className="tok-str">"enterprise"</span><span className="tok-pu">,</span>
        </span>
        <span className="ba-code__ln">
          &nbsp;&nbsp;<span className="tok-ky">deploy</span><span className="tok-pu">:</span>{' '}
          <span className="tok-num">true</span>
        </span>
        <span className="ba-code__ln">
          <span className="tok-pu">{'}'});</span><span className="ba-code__cursor" />
        </span>
      </div>
    </div>

    {/* Desktop / browser mockup */}
    <div className="ba-collage__desktop">
      <div className="ba-collage__desktop-bar">
        <div className="ba-code__dot" /><div className="ba-code__dot" /><div className="ba-code__dot" />
        <div className="ba-collage__desktop-url">goldmineinfotech.com</div>
      </div>
      <div className="ba-collage__desktop-body">
        <div className="ba-collage__desktop-nav" />
        <div className="ba-collage__desktop-hero" />
        <div className="ba-collage__desktop-row">
          <div className="ba-collage__desktop-block" />
          <div className="ba-collage__desktop-block" />
        </div>
        <div className="ba-collage__desktop-row">
          <div className="ba-collage__desktop-block ba-collage__desktop-block--wide" />
        </div>
      </div>
      {/* Monitor stand */}
      <div className="ba-collage__desktop-stand">
        <div className="ba-collage__desktop-neck" />
        <div className="ba-collage__desktop-base" />
      </div>
    </div>

    {/* Phone mockup */}
    <div className="ba-collage__phone">
      <div className="ba-collage__phone-notch" />
      <div className="ba-collage__phone-nav" />
      <div className="ba-collage__phone-hero" />
      <div className="ba-collage__phone-line" />
      <div className="ba-collage__phone-line ba-collage__phone-line--sm" />
      <div className="ba-collage__phone-cta" />
    </div>

  </div>
);

/* ================================================================
   2.  ELECTRONICS LIST  —  Electronics
   ================================================================ */
const ELECTRONICS = [
  { name: 'Laptops',       qty: 'x12', badge: 'In Stock' },
  { name: 'Desktops',      qty: 'x8',  badge: 'In Stock' },
  { name: 'Printers',      qty: 'x15', badge: 'Available' },
  { name: 'Televisions',   qty: 'x9',  badge: 'Active' },
  { name: 'Mobile Phones', qty: 'x24', badge: 'Online' },
];
export const ElectronicsAnim = () => (
  <div className="ba-wrap ba-inv">
    <div className="ba-inv__header">
      <span className="ba-inv__count">68</span>
      <span className="ba-inv__count-label">Products Online</span>
    </div>
    <div className="ba-inv__divider" />
    {ELECTRONICS.map((item) => (
      <div key={item.name} className="ba-inv__row">
        <div className="ba-inv__dot" />
        <span className="ba-inv__name">{item.name}</span>
        <span className="ba-inv__qty">{item.qty}</span>
        <span className="ba-inv__badge">{item.badge}</span>
      </div>
    ))}
  </div>
);

/* ================================================================
   3.  CCTV CAMERA + RADAR  —  CCTV & Biometrics
   ================================================================ */
export const CctvAnim = () => (
  <div className="ba-wrap ba-cctv-wrap">
    {/* Panning CCTV camera */}
    <div className="ba-cctv">
      <div className="ba-cctv__cam">
        <div className="ba-cctv__body">
          <div className="ba-cctv__eye" />
        </div>
        <div className="ba-cctv__lens" />
      </div>
      <div className="ba-cctv__arm" />
      <div className="ba-cctv__mount" />
    </div>

    {/* Radar rings below */}
    <div className="ba-cctv__radar">
      <div className="ba-radar__ch ba-radar__ch--h" />
      <div className="ba-radar__ch ba-radar__ch--v" />
      <div className="ba-radar__ring ba-radar__ring--1" />
      <div className="ba-radar__ring ba-radar__ring--2" />
      <div className="ba-radar__ring ba-radar__ring--3" />
      <div className="ba-radar__sweep" />
      <div className="ba-radar__ping ba-radar__ping--1" />
      <div className="ba-radar__ping ba-radar__ping--2" />
      <div className="ba-radar__center" />
    </div>
  </div>
);

/* ================================================================
   4.  BIOMETRIC ACCESS  —  Access log with fingerprint + face scan
   ================================================================ */
const ACCESS_LOG = [
  { name: 'Ravi Sharma', type: 'Fingerprint', time: '08:42', status: 'Granted' },
  { name: 'Priya Mehta', type: 'Face ID', time: '08:51', status: 'Granted' },
  { name: 'Unknown', type: 'Fingerprint', time: '09:03', status: 'Denied' },
  { name: 'Suresh Nair', type: 'Face ID', time: '09:11', status: 'Granted' },
];

export const BiometricAnim = () => (
  <div className="ba-wrap ba-bio">
    <div className="ba-bio__card">
      <div className="ba-bio__header">
        <span className="ba-bio__title">Access Log</span>
        <span className="ba-bio__live">● Live</span>
      </div>
      <div className="ba-bio__divider" />
      {ACCESS_LOG.map((entry) => {
        const statusColor = entry.status === 'Granted' ? 'green' : 'red';

        return (
          <div key={`${entry.name}-${entry.time}`} className="ba-bio__row">
            <div className={`ba-bio__dot ba-bio__dot--${statusColor}`} />
            <span className="ba-bio__name">{entry.name}</span>
            <span className="ba-bio__type">{entry.type}</span>
            <span className="ba-bio__time">{entry.time}</span>
            <span className={`ba-bio__badge ba-bio__badge--${statusColor}`}>
              {entry.status}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

/* ================================================================
   5.  BUSINESS TYPES  —  In-house Tailor Made Software
   ================================================================ */
const BUSINESSES = [
  { label: 'Jewellery & Gold Shops' },
  { label: 'Textile & Retail' },
  { label: 'Car Rental Agencies' },
];
export const BusinessSoftwareAnim = () => (
  <div className="ba-wrap ba-biz">
    {BUSINESSES.map((biz, i) => (
      <div key={biz.label} className={`ba-biz__row${i === 0 ? ' ba-biz__row--active' : ''}`}>
        <div className={`ba-biz__dot${i === 0 ? ' ba-biz__dot--active' : ''}`} />
        <span className="ba-biz__label">{biz.label}</span>
        {i === 0 && <span className="ba-biz__check">✓</span>}
      </div>
    ))}
    <div className="ba-biz__more">+ Photography, Schools &amp; more</div>
  </div>
);

/* ================================================================
   6.  IT SERVICES  —  IT Support & Service
   ================================================================ */
const IT_SERVICES = [
  { name: 'Tally ERP Setup',      status: 'Done',      dot: 'green' },
  { name: 'Email Configuration',  status: 'Done',      dot: 'green' },
  { name: 'Network Installation', status: 'Live',      dot: 'orange' },
  { name: 'Remote Support',       status: 'Scheduled', dot: 'blue' },
];
export const ITServicesAnim = () => (
  <div className="ba-wrap ba-itserv">
    <div className="ba-itserv__card">
      <div className="ba-itserv__header">
        <span className="ba-itserv__title">Active Services</span>
        <span className="ba-itserv__count">4 tasks</span>
      </div>
      <div className="ba-itserv__divider" />
      {IT_SERVICES.map((s) => (
        <div key={s.name} className="ba-itserv__row">
          <div className={`ba-itserv__dot ba-itserv__dot--${s.dot}`} />
          <span className="ba-itserv__name">{s.name}</span>
          <span className={`ba-itserv__badge ba-itserv__badge--${s.dot}`}>{s.status}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ================================================================
   PLATFORM FEATURES — Browser mockup visuals with real screenshots
   ================================================================ */

// Waypoints: x/y as 0–100 (% of viewport)
type Waypoint = { x: number; y: number; click?: boolean };

const CursorSVG = () => (
  <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
    <path d="M1 1l6.5 19.5 3.5-7 7 3.5L1 1z" fill="white" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const BrowserMockup = ({ url, img, waypoints }: { url: string; img: string; waypoints: Waypoint[] }) => {
  const cursorX = useMotionValue(waypoints[0].x);
  const cursorY = useMotionValue(waypoints[0].y);
  const left = useTransform(cursorX, v => `${v}%`);
  const top  = useTransform(cursorY, v => `${v}%`);
  const [rippleKey, setRippleKey] = useState(0);
  const [showRipple, setShowRipple] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        for (const wp of waypoints) {
          if (cancelled) return;
          await Promise.all([
            animate(cursorX, wp.x, { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }),
            animate(cursorY, wp.y, { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }),
          ]);
          if (wp.click && !cancelled) {
            setShowRipple(true);
            setRippleKey(k => k + 1);
            await new Promise(r => setTimeout(r, 600));
            setShowRipple(false);
          }
          await new Promise(r => setTimeout(r, 250));
        }
        await new Promise(r => setTimeout(r, 700));
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="bwa-wrap">
      <div className="bwa-browser">
        <div className="bwa-titlebar">
          <div className="bwa-dots">
            <span className="bwa-dot bwa-dot--red" />
            <span className="bwa-dot bwa-dot--yellow" />
            <span className="bwa-dot bwa-dot--green" />
          </div>
          <div className="bwa-urlbar">{url}</div>
        </div>
        <div className="bwa-viewport">
          <motion.img
            src={img}
            alt=""
            className="bwa-screenshot"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.div className="bwa-cursor" style={{ left, top }}>
            <CursorSVG />
            {showRipple && (
              <motion.div
                key={rippleKey}
                className="bwa-ripple"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const BusinessWebsiteAnim = () => (
  <BrowserMockup
    url="goldmineinfotech.com/business"
    img={businessWebsiteImg}
    waypoints={[
      { x: 60, y: 25 },
      { x: 35, y: 55, click: true },
      { x: 72, y: 65 },
      { x: 50, y: 40, click: true },
    ]}
  />
);

export const PortfolioAnim = () => (
  <BrowserMockup
    url="goldmineinfotech.com/portfolio"
    img={portfolioImg}
    waypoints={[
      { x: 25, y: 35 },
      { x: 55, y: 35, click: true },
      { x: 80, y: 60 },
      { x: 40, y: 65, click: true },
    ]}
  />
);

export const BookingAnim = () => (
  <BrowserMockup
    url="goldmineinfotech.com/booking"
    img={bookingImg}
    waypoints={[
      { x: 50, y: 22 },
      { x: 45, y: 50, click: true },
      { x: 62, y: 65, click: true },
      { x: 50, y: 78 },
    ]}
  />
);

export const AppDevelopmentAnim = () => (
  <div className="app-trio">
    {[app1Img, app2Img, app3Img].map((src, i) => (
      <motion.div
        key={i}
        className={`app-trio__phone${i === 1 ? ' app-trio__phone--raised' : ''}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: i === 1 ? -12 : 0 }}
        transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img src={src} alt="" className="app-trio__img" />
      </motion.div>
    ))}
  </div>
);

export const FashionAnim = () => (
  <BrowserMockup
    url="goldmineinfotech.com/fashion"
    img={fashionImg}
    waypoints={[
      { x: 30, y: 35 },
      { x: 65, y: 28, click: true },
      { x: 50, y: 62 },
      { x: 22, y: 70, click: true },
    ]}
  />
);

export const HRAnim = () => (
  <BrowserMockup
    url="goldmineinfotech.com/hr"
    img={hrImg}
    waypoints={[
      { x: 40, y: 28 },
      { x: 72, y: 45, click: true },
      { x: 35, y: 62 },
      { x: 60, y: 72, click: true },
    ]}
  />
);

/* ================================================================
   FEATURE DATA
   ================================================================ */
interface FeatureItem {
  title: string;
  description: string;
  anim: React.ReactNode;
  icon: React.ElementType;
  className?: string;
  large?: boolean;
}

const features: FeatureItem[] = [
  {
    title: 'Web & Apps',
    description: 'Custom websites and enterprise software built to scale — responsive, fast, and tailored to how your business works.',
    anim: <WebCollageAnim />,
    icon: Globe,
    className: 'md:col-span-2 md:row-span-2',
    large: true,
  },
  {
    title: 'Electronics',
    description: 'Sales and repair for all kinds of electronics — laptops, desktops, printers, televisions, and mobile phones.',
    anim: <ElectronicsAnim />,
    icon: Monitor,
    className: 'md:row-span-2',
  },
  {
    title: 'CCTV & Biometrics',
    description: 'Advanced surveillance and access control — from IP cameras to fingerprint and face recognition systems.',
    anim: <CctvAnim />,
    icon: ShieldCheck,
  },
  {
    title: 'In-house Tailor Made Software',
    description: 'Bespoke software for jewellers, textile retailers, car rentals, photographers, and many more industries.',
    anim: <BusinessSoftwareAnim />,
    icon: Cpu,
  },
  {
    title: 'IT Support & Service',
    description: 'Tally setup, email solutions, network installation, and dedicated remote support — zero downtime guaranteed.',
    anim: <ITServicesAnim />,
    icon: Headphones,
  },
];

/* ================================================================
   BENTO CARD
   ================================================================ */
const BentoCard = ({
  title, description, anim, icon: Icon, className, large, index, dark,
}: FeatureItem & { index: number; dark?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const zoneClass = dark
    ? 'rounded-xl overflow-hidden bg-[rgba(249,115,22,0.07)] ba-dark'
    : 'rounded-xl overflow-hidden bg-[rgba(249,115,22,0.03)]';

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        'relative overflow-hidden rounded-2xl flex flex-col group cursor-default',
        'border transition-all duration-300 ease-out',
        'hover:-translate-y-0.5',
        dark
          ? 'bg-[#161616] border-[rgba(255,255,255,0.07)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.15)]'
          : 'bg-white border-[#eaeaea] hover:shadow-[0_12px_40px_rgba(249,115,22,0.10)]',
        large ? 'p-7' : 'p-5',
        className,
      )}
    >
      {/* Mouse-tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(360px circle at var(--mx) var(--my), rgba(249,115,22,0.10), transparent 70%)' }}
      />
      {/* Inset border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(249,115,22,0.25)' }}
      />

      {/* Card number */}
      <span className={cn(
        'absolute top-4 right-5 font-mono text-[10px] tracking-[0.14em] select-none z-10',
        'transition-colors duration-300 group-hover:text-[#f97316]',
        dark ? 'text-[rgba(249,115,22,0.30)]' : 'text-[rgba(249,115,22,0.25)]',
      )}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10 flex flex-col h-full">

        {/* Animation zone */}
        <div className={cn('flex-1 min-h-0', zoneClass)}>
          {anim}
        </div>

        {/* Text zone — centered */}
        <div className={cn(
          'flex-shrink-0 flex flex-col items-center text-center',
          large ? 'pt-7 pb-1' : 'pt-5 pb-0.5',
        )}>
          <div className={cn(
            'inline-flex items-center justify-center rounded-xl mb-3',
            'bg-[rgba(249,115,22,0.12)] text-[#f97316]',
            large ? 'w-11 h-11' : 'w-9 h-9',
          )}>
            <Icon size={large ? 22 : 17} strokeWidth={1.75} />
          </div>

          <h3 className={cn(
            'font-bold tracking-tight leading-tight mb-2',
            large ? 'text-[21px]' : 'text-[15.5px]',
            dark ? 'text-white' : 'text-[#0a0a0a]',
          )}>
            {title}
          </h3>

          <p className={cn(
            'leading-[1.65]',
            large
              ? 'text-[13.5px] max-w-[480px]'
              : 'text-[12.5px] max-w-[88%] line-clamp-2',
            dark ? 'text-[rgba(255,255,255,0.45)]' : 'text-[#787878]',
          )}>
            {description}
          </p>
        </div>

      </div>
    </div>
  );
};

/* ================================================================
   GRID
   ================================================================ */
interface GridProps { dark?: boolean }

export const CyberneticBentoGrid = ({ dark }: GridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:auto-rows-[280px] w-full">
    {features.map((f, i) => (
      <BentoCard key={f.title} {...f} index={i} dark={dark} />
    ))}
  </div>
);
