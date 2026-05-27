import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './ImageResizeTool.css'

const PRESETS = [
  { label: 'Passport Photo', sublabel: '35×45mm · 413×531px', width: 413, height: 531 },
  { label: 'Stamp Size',     sublabel: '1.5"×1.5" · 450×450px', width: 450, height: 450 },
  { label: 'Visa / OCI',     sublabel: '51×51mm · 600×600px', width: 600, height: 600 },
  { label: 'ID Card',        sublabel: '85.6×53.98mm · 1012×638px', width: 1012, height: 638 },
  { label: 'Square (800)',   sublabel: '800×800px', width: 800, height: 800 },
  { label: 'Custom',         sublabel: 'Set your own size', width: 0, height: 0 },
]

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

export default function ImageResizeTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState(0)
  const [activePreset, setActivePreset] = useState(0)
  const [customW, setCustomW] = useState(800)
  const [customH, setCustomH] = useState(600)
  const [quality, setQuality] = useState(90)
  const [format, setFormat] = useState<'jpeg' | 'png'>('jpeg')
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    setOriginalFile(file)
    setOriginalUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(file) })
    setResultUrl(null)
    setResultSize(0)
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleProcess = () => {
    if (!originalUrl || !canvasRef.current) return
    const preset = PRESETS[activePreset]
    const targetW = preset.width || customW
    const targetH = preset.height || customH
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = targetW
      canvas.height = targetH
      const ctx = canvas.getContext('2d')!
      const srcAR = img.naturalWidth / img.naturalHeight
      const dstAR = targetW / targetH
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight
      if (srcAR > dstAR) {
        sw = Math.round(img.naturalHeight * dstAR)
        sx = Math.round((img.naturalWidth - sw) / 2)
      } else {
        sh = Math.round(img.naturalWidth / dstAR)
        sy = Math.round((img.naturalHeight - sh) / 2)
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH)
      const mime = format === 'png' ? 'image/png' : 'image/jpeg'
      const q = format === 'png' ? undefined : quality / 100
      canvas.toBlob((blob) => {
        if (!blob) return
        setResultUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob) })
        setResultSize(blob.size)
      }, mime, q)
    }
    img.src = originalUrl
  }

  const handleDownload = () => {
    if (!resultUrl || !originalFile) return
    const a = document.createElement('a')
    a.href = resultUrl
    const ext = format === 'png' ? 'png' : 'jpg'
    const name = originalFile.name.replace(/\.[^.]+$/, '')
    a.download = `${name}-resized.${ext}`
    a.click()
  }

  const preset = PRESETS[activePreset]
  const targetW = preset.width || customW
  const targetH = preset.height || customH

  return (
    <div className="irt-root">
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="irt-header">
        <div className="irt-breadcrumb">
          <Link to="/tools" className="irt-bc-link">Free Tools</Link>
          <span className="irt-bc-sep">›</span>
          <span>Image Resize &amp; Compress</span>
        </div>
        <span className="irt-eyebrow">Free Tool</span>
        <h1 className="irt-headline">Image Resize &amp; Compress</h1>
        <p className="irt-sub">
          Crop to passport, stamp, or visa size. Compress to reduce file size.
          Runs entirely in your browser — nothing is uploaded.
        </p>
      </div>

      <div className="irt-body">
        <div className="irt-panel">

          {/* Upload zone */}
          <div
            className={`irt-upload${isDragging ? ' irt-upload--drag' : ''}${originalUrl ? ' irt-upload--filled' : ''}`}
            onClick={() => !originalUrl && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f) }}
            />
            {originalUrl ? (
              <div className="irt-preview-row">
                <div className="irt-preview-box">
                  <p className="irt-preview-label">Original</p>
                  <img src={originalUrl} alt="Original" className="irt-preview-img" />
                  <p className="irt-preview-meta">{originalFile?.name} · {formatBytes(originalFile?.size ?? 0)}</p>
                </div>
                {resultUrl && (
                  <div className="irt-preview-box">
                    <p className="irt-preview-label">Result ({targetW}×{targetH}px)</p>
                    <img src={resultUrl} alt="Result" className="irt-preview-img" />
                    <p className="irt-preview-meta">{formatBytes(resultSize)}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="irt-upload-placeholder">
                <div className="irt-upload-icon">🖼️</div>
                <p className="irt-upload-text">Drop an image here or click to upload</p>
                <p className="irt-upload-hint">JPEG · PNG · WebP supported</p>
              </div>
            )}
          </div>
          {originalUrl && (
            <button className="irt-change-btn" onClick={() => inputRef.current?.click()}>
              Change image
            </button>
          )}

          {/* Settings */}
          <div className="irt-settings">

            <div className="irt-field">
              <label className="irt-label">Preset Size</label>
              <div className="irt-preset-grid">
                {PRESETS.map((p, i) => (
                  <button
                    key={p.label}
                    className={`irt-preset-btn${activePreset === i ? ' irt-preset-btn--active' : ''}`}
                    onClick={() => setActivePreset(i)}
                  >
                    <span className="irt-preset-name">{p.label}</span>
                    <span className="irt-preset-sub">{p.sublabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {activePreset === PRESETS.length - 1 && (
              <div className="irt-field">
                <label className="irt-label">Custom Dimensions (pixels)</label>
                <div className="irt-dim-row">
                  <input type="number" className="irt-input" value={customW} min={1} max={8000}
                    onChange={(e) => setCustomW(Number(e.target.value))} placeholder="Width" />
                  <span className="irt-dim-x">×</span>
                  <input type="number" className="irt-input" value={customH} min={1} max={8000}
                    onChange={(e) => setCustomH(Number(e.target.value))} placeholder="Height" />
                </div>
              </div>
            )}

            <div className="irt-field">
              <label className="irt-label">Output Format</label>
              <div className="irt-format-row">
                {(['jpeg', 'png'] as const).map((f) => (
                  <button key={f}
                    className={`irt-format-btn${format === f ? ' irt-format-btn--active' : ''}`}
                    onClick={() => setFormat(f)}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {format === 'jpeg' && (
              <div className="irt-field">
                <label className="irt-label">
                  Quality — <strong>{quality}%</strong>
                  <span className="irt-label-hint">{quality >= 85 ? 'High quality' : quality >= 60 ? 'Balanced' : 'Max compression'}</span>
                </label>
                <input type="range" className="irt-slider" min={10} max={100} step={5}
                  value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
                <div className="irt-slider-labels">
                  <span>Smaller file</span><span>Best quality</span>
                </div>
              </div>
            )}

            <button className="irt-process-btn" onClick={handleProcess} disabled={!originalUrl}>
              Resize &amp; Compress →
            </button>

            {resultUrl && (
              <button className="irt-download-btn" onClick={handleDownload}>
                ↓ Download ({formatBytes(resultSize)})
              </button>
            )}
          </div>
        </div>

        <aside className="irt-info">
          <h3 className="irt-info-title">Standard Photo Sizes</h3>
          <div className="irt-info-list">
            {[
              ['Passport (India)', '35 × 45 mm', '413 × 531 px'],
              ['Stamp Size',       '1.5" × 1.5"', '450 × 450 px'],
              ['Visa / OCI',       '51 × 51 mm',  '600 × 600 px'],
              ['US Passport',      '2" × 2"',     '600 × 600 px'],
              ['ID Card (CR80)',   '85.6 × 54 mm','1012 × 638 px'],
            ].map(([lbl, mm, px]) => (
              <div key={lbl} className="irt-info-row">
                <span className="irt-info-label">{lbl}</span>
                <span className="irt-info-val">{mm}<br /><small>{px} @ 300 DPI</small></span>
              </div>
            ))}
          </div>
          <p className="irt-info-note">
            Images are processed locally in your browser.
            Nothing is sent to any server.
          </p>
        </aside>
      </div>
    </div>
  )
}
