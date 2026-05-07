import { useState, useRef, useEffect, useLayoutEffect, useCallback, forwardRef } from 'react'
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

// ── ProjectCard (mini card inside folder) ──────────────────────────────────
const ProjectCard = forwardRef(
  ({ image, title, delay, isVisible, index, totalCount, onClick, isSelected }, ref) => {
    const middleIndex = (totalCount - 1) / 2
    const factor = totalCount > 1 ? (index - middleIndex) / middleIndex : 0
    const rotation = factor * 25
    const translationX = factor * 85
    const translationY = Math.abs(factor) * 12

    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          width: 80, height: 112,
          cursor: 'pointer',
          left: -40, top: -56,
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          zIndex: 10 + index,
          transform: isVisible
            ? `translateY(calc(-100px + ${translationY}px)) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
            : 'translateY(0px) translateX(0px) rotate(0deg) scale(0.4)',
          transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        }}
        onClick={(e) => { e.stopPropagation(); onClick() }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          background: '#1A1C20',
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          transition: 'all 0.4s ease',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-20px) scale(1.2)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(245,196,0,0.3)'
            e.currentTarget.style.outline = '2px solid #F5C400'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'
            e.currentTarget.style.outline = 'none'
          }}
        >
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent)' }} />
          <p style={{
            position: 'absolute', bottom: 6, left: 6, right: 6,
            fontSize: 9, fontWeight: 900, textTransform: 'uppercase',
            color: '#fff', letterSpacing: '-0.03em',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{title}</p>
        </div>
      </div>
    )
  }
)
ProjectCard.displayName = 'ProjectCard'

// ── Lightbox ───────────────────────────────────────────────────────────────
function ImageLightbox({ projects, currentIndex, isOpen, onClose, sourceRect, onCloseComplete, onNavigate }) {
  const [phase, setPhase] = useState('initial')
  const [closing, setClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [innerIdx, setInnerIdx] = useState(currentIndex)
  const [sliding, setSliding] = useState(false)
  const containerRef = useRef(null)

  const total = projects.length
  const hasNext = innerIdx < total - 1
  const hasPrev = innerIdx > 0
  const current = projects[innerIdx]

  useEffect(() => {
    if (isOpen && currentIndex !== innerIdx && !sliding) {
      setSliding(true)
      const t = setTimeout(() => { setInnerIdx(currentIndex); setSliding(false) }, 400)
      return () => clearTimeout(t)
    }
  }, [currentIndex, isOpen, innerIdx, sliding])

  useEffect(() => { if (isOpen) { setInnerIdx(currentIndex); setSliding(false) } }, [isOpen, currentIndex])

  const next = useCallback(() => { if (innerIdx < total - 1 && !sliding) onNavigate(innerIdx + 1) }, [innerIdx, total, sliding, onNavigate])
  const prev = useCallback(() => { if (innerIdx > 0 && !sliding) onNavigate(innerIdx - 1) }, [innerIdx, sliding, onNavigate])

  const handleClose = useCallback(() => {
    setClosing(true); onClose()
    setTimeout(() => { setClosing(false); setShouldRender(false); setPhase('initial'); onCloseComplete?.() }, 500)
  }, [onClose, onCloseComplete])

  useEffect(() => {
    const fn = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', fn)
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [isOpen, handleClose, next, prev])

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setShouldRender(true); setPhase('initial'); setClosing(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('animating')))
      const t = setTimeout(() => setPhase('complete'), 700)
      return () => clearTimeout(t)
    }
  }, [isOpen, sourceRect])

  if (!shouldRender || !current) return null

  const vw = window.innerWidth, vh = window.innerHeight
  const tw = Math.min(800, vw - 64), th = Math.min(vh * 0.85, 600)
  const tx = (vw - tw) / 2, ty = (vh - th) / 2
  const scaleX = sourceRect ? sourceRect.width / tw : 1
  const scaleY = sourceRect ? sourceRect.height / th : 1
  const scale = Math.max(scaleX, scaleY)
  const dx = sourceRect ? sourceRect.left + sourceRect.width / 2 - (tx + tw / 2) + window.scrollX : 0
  const dy = sourceRect ? sourceRect.top + sourceRect.height / 2 - (ty + th / 2) + window.scrollY : 0

  const initial = { transform: `translate(${dx}px,${dy}px) scale(${scale})`, opacity: 0.5, borderRadius: 12 }
  const final = { transform: 'translate(0,0) scale(1)', opacity: 1, borderRadius: 24 }
  const currentStyles = phase === 'initial' && !closing ? initial : final

  const btnStyle = (show, extra = {}) => ({
    opacity: phase === 'complete' && !closing && show ? 1 : 0,
    transition: 'opacity 400ms ease-out 600ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 600ms',
    ...extra,
  })

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
        opacity: closing ? 0 : 1, transition: 'opacity 500ms cubic-bezier(0.16,1,0.3,1)',
      }}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(17,18,20,0.92)', backdropFilter: 'blur(20px)',
        opacity: phase === 'initial' && !closing ? 0 : 1,
        transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1)',
      }} />

      {/* Close */}
      <button onClick={e => { e.stopPropagation(); handleClose() }} style={{
        position: 'absolute', top: 20, right: 20, zIndex: 10,
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', cursor: 'pointer', ...btnStyle(true),
      }}>
        <X size={18} strokeWidth={2.5} />
      </button>

      {/* Prev */}
      <button onClick={e => { e.stopPropagation(); prev() }} disabled={!hasPrev || sliding} style={{
        position: 'absolute', left: 12, zIndex: 10,
        width: 50, height: 50, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', cursor: 'pointer', ...btnStyle(hasPrev),
      }}>
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>

      {/* Next */}
      <button onClick={e => { e.stopPropagation(); next() }} disabled={!hasNext || sliding} style={{
        position: 'absolute', right: 12, zIndex: 10,
        width: 50, height: 50, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', cursor: 'pointer', ...btnStyle(hasNext),
      }}>
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      {/* Card */}
      <div
        ref={containerRef}
        style={{
          position: 'relative', zIndex: 1, width: '100%', maxWidth: 860,
          ...currentStyles,
          transform: closing ? 'translate(0,0) scale(0.93)' : currentStyles.transform,
          transition: phase === 'initial' && !closing
            ? 'none'
            : 'transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 600ms ease-out, border-radius 700ms ease',
          transformOrigin: 'center center',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          overflow: 'hidden', borderRadius: 'inherit',
          background: '#1A1C20', border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        }}>
          {/* Images */}
          <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
            <div style={{
              display: 'flex', width: '100%', height: '100%',
              transform: `translateX(-${innerIdx * 100}%)`,
              transition: sliding ? 'transform 500ms cubic-bezier(0.16,1,0.3,1)' : 'none',
            }}>
              {projects.map(p => (
                <div key={p.id} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=900' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, rgba(0,0,0,0.4) 100%)' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: '22px 28px',
            background: '#1A1C20', borderTop: '1px solid rgba(255,255,255,0.06)',
            opacity: phase === 'complete' && !closing ? 1 : 0,
            transform: phase === 'complete' && !closing ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 500ms ease-out 500ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 500ms',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                  {current?.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {projects.map((_, i) => (
                      <button key={i} onClick={() => onNavigate(i)} style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: i === innerIdx ? '#F5C400' : 'rgba(255,255,255,0.2)',
                        border: 'none', cursor: 'pointer', padding: 0,
                        transform: i === innerIdx ? 'scale(1.4)' : 'scale(1)',
                        transition: 'all 0.3s',
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {innerIdx + 1} / {total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main AnimatedFolder ────────────────────────────────────────────────────
export default function AnimatedFolder({ title, items, color = '#F5C400', icon }) {
  const [hovered, setHovered] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [sourceRect, setSourceRect] = useState(null)
  const [hiddenId, setHiddenId] = useState(null)
  const cardRefs = useRef([])

  const preview = items.slice(0, 5)

  const handleClick = (item, idx) => {
    const el = cardRefs.current[idx]
    if (el) setSourceRect(el.getBoundingClientRect())
    setSelectedIdx(idx)
    setHiddenId(item.id)
  }

  const darker = color + 'cc'
  const lighter = color + '22'

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '28px 24px 24px',
          borderRadius: 20,
          cursor: 'pointer',
          background: 'rgba(26,28,32,0.9)',
          border: `1px solid ${hovered ? color + '44' : 'rgba(255,255,255,0.07)'}`,
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
          transform: hovered ? 'scale(1.04) rotate(-1deg)' : 'scale(1)',
          boxShadow: hovered ? `0 30px 60px rgba(0,0,0,0.4), 0 0 40px ${color}22` : '0 4px 20px rgba(0,0,0,0.2)',
          minWidth: 240,
          perspective: '1200px',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 20,
          background: `radial-gradient(circle at 50% 70%, ${color} 0%, transparent 70%)`,
          opacity: hovered ? 0.1 : 0, transition: 'opacity 0.6s',
          pointerEvents: 'none',
        }} />

        {/* Folder 3D */}
        <div style={{ position: 'relative', height: 160, width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Back */}
          <div style={{
            position: 'absolute', width: 128, height: 96, borderRadius: 8,
            background: `linear-gradient(135deg, ${darker} 0%, ${color}88 100%)`,
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            transformOrigin: 'bottom center',
            transform: hovered ? 'rotateX(-20deg) scaleY(1.05)' : 'rotateX(0deg)',
            transition: 'transform 700ms cubic-bezier(0.16,1,0.3,1)',
            zIndex: 10,
          }} />
          {/* Tab */}
          <div style={{
            position: 'absolute', width: 48, height: 16, borderRadius: '6px 6px 0 0',
            background: color,
            top: 'calc(50% - 48px - 12px)',
            left: 'calc(50% - 64px + 16px)',
            transformOrigin: 'bottom center',
            transform: hovered ? 'rotateX(-30deg) translateY(-3px)' : 'rotateX(0deg)',
            transition: 'transform 700ms cubic-bezier(0.16,1,0.3,1)',
            zIndex: 10,
          }} />

          {/* Project cards (fan out on hover) */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 20 }}>
            {preview.map((item, i) => (
              <ProjectCard
                key={item.id}
                ref={el => { cardRefs.current[i] = el }}
                image={item.image}
                title={item.title}
                delay={i * 50}
                isVisible={hovered}
                index={i}
                totalCount={preview.length}
                onClick={() => handleClick(item, i)}
                isSelected={hiddenId === item.id}
              />
            ))}
          </div>

          {/* Front */}
          <div style={{
            position: 'absolute', width: 128, height: 96, borderRadius: 8,
            background: `linear-gradient(135deg, ${color} 0%, ${darker} 100%)`,
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: `0 12px 30px rgba(0,0,0,0.4), 0 0 20px ${color}44`,
            top: 'calc(50% - 48px + 4px)',
            transformOrigin: 'bottom center',
            transform: hovered ? 'rotateX(35deg) translateY(12px)' : 'rotateX(0deg)',
            transition: 'transform 700ms cubic-bezier(0.16,1,0.3,1)',
            zIndex: 30,
          }}>
            {/* Icon on folder front */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: hovered ? 0 : 0.9, transition: 'opacity 0.3s',
            }}>
              <div style={{ color: '#111', opacity: 0.7 }}>{icon}</div>
            </div>
          </div>
          {/* Shine */}
          <div style={{
            position: 'absolute', width: 128, height: 96, borderRadius: 8,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
            top: 'calc(50% - 48px + 4px)',
            transformOrigin: 'bottom center',
            transform: hovered ? 'rotateX(35deg) translateY(12px)' : 'rotateX(0deg)',
            transition: 'transform 700ms cubic-bezier(0.16,1,0.3,1)',
            zIndex: 31, pointerEvents: 'none',
          }} />
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1rem', fontWeight: 700,
          color: hovered ? color : '#fff',
          marginTop: 16, textAlign: 'center',
          transition: 'color 0.3s',
        }}>{title}</h3>
        <p style={{
          fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
          textAlign: 'center', marginTop: 4,
        }}>
          {items.length} imagen{items.length !== 1 ? 'es' : ''}
        </p>

        {/* Hover hint */}
        <p style={{
          position: 'absolute', bottom: 12,
          fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)',
          textTransform: 'uppercase', letterSpacing: '0.12em',
          opacity: hovered ? 0 : 1, transition: 'opacity 0.4s',
        }}>Hover</p>
      </div>

      <ImageLightbox
        projects={items}
        currentIndex={selectedIdx ?? 0}
        isOpen={selectedIdx !== null}
        onClose={() => { setSelectedIdx(null); setSourceRect(null) }}
        sourceRect={sourceRect}
        onCloseComplete={() => setHiddenId(null)}
        onNavigate={(i) => { setSelectedIdx(i); setHiddenId(items[i]?.id || null) }}
      />
    </>
  )
}
