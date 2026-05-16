'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  src: string;
  alt: string;
  label: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
  interval?: number;
}

export default function HeroSlideshow({ slides, interval = 5000 }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <>
      {/* Images */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: active === i ? 1 : 0 }}
          aria-hidden={active !== i}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Category label */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        {slides.map((slide, i) => (
          <span
            key={slide.label}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-700"
            style={{
              opacity: active === i ? 1 : 0,
              transform: `translateX(-50%) translateY(${active === i ? 0 : 8}px)`,
              fontFamily: 'var(--font-cinzel), serif',
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.9)',
            }}
          >
            {slide.label}
          </span>
        ))}
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.62) 60%, rgba(10,10,11,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Indicator dots */}
      <div
        className="absolute bottom-8 right-8 z-10 flex items-center gap-2"
        role="tablist"
        aria-label="Slideshow navigation"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            role="tab"
            aria-selected={active === i}
            aria-label={`Show ${slide.label}`}
            onClick={() => setActive(i)}
            className="transition-all duration-300"
            style={{
              width: active === i ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background:
                active === i
                  ? 'var(--color-gold)'
                  : 'rgba(255,255,255,0.3)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </>
  );
}
