import { useState, useRef, useEffect } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function LazyImage({ src, alt, className }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className?.split(' ').filter(c => !c.startsWith('h-') && !c.startsWith('w-') && c !== 'overflow-hidden' && c !== 'rounded-2xl' && c !== 'rounded-xl' && c !== 'rounded-lg' && c !== 'rounded-full').join(' ')}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div className="w-full h-full bg-cream/40 animate-pulse" />
      )}
    </div>
  );
}
