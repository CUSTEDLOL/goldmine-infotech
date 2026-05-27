import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import './ImageToPdfTool.css'

interface ImageItem {
  id: string
  file: File
  url: string
}

const PAGE_SIZES = ['a4', 'a3', 'letter', 'legal'] as const

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

export default function ImageToPdfTool() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [pageSize, setPageSize] = useState<typeof PAGE_SIZES[number]>('a4')
  const [fitMode, setFitMode] = useState<'fit' | 'fill' | 'stretch'>('fit')
  const [margin, setMargin] = useState(10)
  const [isConverting, setIsConverting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((files: FileList | File[]) => {
    const newItems: ImageItem[] = []
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return
      newItems.push({ id: `${Date.now()}-${Math.random()}`, file, url: URL.createObjectURL(file) })
    })
    setImages((prev) => [...prev, ...newItems])
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((img) => img.id === id)
      if (item) URL.revokeObjectURL(item.url)
      return prev.filter((img) => img.id !== id)
    })
  }

  const moveImage = (id: string, dir: 'up' | 'down') => {
    setImages((prev) => {
      const idx = prev.findIndex((img) => img.id === id)
      if (dir === 'up' && idx > 0) {
        const next = [...prev];
        [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
        return next
      }
      if (dir === 'down' && idx < prev.length - 1) {
        const next = [...prev];
        [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
        return next
      }
      return prev
    })
  }

  const convert = async () => {
    if (!images.length) return
    setIsConverting(true)
    try {
      const doc = new jsPDF({ orientation, format: pageSize, unit: 'mm' })
      const pageW = doc.internal.pageSize.getWidth()
      const pageH = doc.internal.pageSize.getHeight()
      const m = margin

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage()
        await new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => {
            const iw = img.naturalWidth, ih = img.naturalHeight
            const areaW = pageW - 2 * m, areaH = pageH - 2 * m
            let dx = m, dy = m, dw = areaW, dh = areaH

            if (fitMode === 'fit') {
              const scale = Math.min(areaW / iw, areaH / ih)
              dw = iw * scale; dh = ih * scale
              dx = m + (areaW - dw) / 2; dy = m + (areaH - dh) / 2
            } else if (fitMode === 'fill') {
              const scale = Math.max(areaW / iw, areaH / ih)
              dw = iw * scale; dh = ih * scale
              dx = m + (areaW - dw) / 2; dy = m + (areaH - dh) / 2
            }

            const canvas = document.createElement('canvas')
            canvas.width = iw; canvas.height = ih
            canvas.getContext('2d')!.drawImage(img, 0, 0)
            const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
            doc.addImage(dataUrl, 'JPEG', dx, dy, dw, dh)
            resolve()
          }
          img.src = images[i].url
        })
      }
      doc.save('images.pdf')
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="itpdf-root">

      <div className="itpdf-header">
        <div className="itpdf-breadcrumb">
          <Link to="/tools" className="itpdf-bc-link">Free Tools</Link>
          <span className="itpdf-bc-sep">›</span>
          <span>Image to PDF</span>
        </div>
        <span className="itpdf-eyebrow">Free Tool</span>
        <h1 className="itpdf-headline">Image to PDF Converter</h1>
        <p className="itpdf-sub">
          Convert JPEG, PNG, and WebP images into a single PDF.
          Arrange the order, choose page size, and download instantly — no upload required.
        </p>
      </div>

      <div className="itpdf-body">
        <div className="itpdf-panel">

          {/* Drop zone */}
          <div
            className={`itpdf-drop${isDragging ? ' itpdf-drop--drag' : ''}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => { if (e.target.files) addFiles(e.target.files) }}
            />
            <div className="itpdf-drop-icon">📁</div>
            <p className="itpdf-drop-text">Drop images here or click to upload</p>
            <p className="itpdf-drop-hint">Multiple files supported · JPEG · PNG · WebP</p>
          </div>

          {/* Image list */}
          {images.length > 0 && (
            <div className="itpdf-list">
              <p className="itpdf-list-head">
                {images.length} image{images.length !== 1 ? 's' : ''} · drag to reorder
              </p>
              {images.map((img, idx) => (
                <div key={img.id} className="itpdf-img-row">
                  <span className="itpdf-img-num">{idx + 1}</span>
                  <img src={img.url} alt={img.file.name} className="itpdf-img-thumb" />
                  <div className="itpdf-img-info">
                    <span className="itpdf-img-name">{img.file.name}</span>
                    <span className="itpdf-img-size">{formatBytes(img.file.size)}</span>
                  </div>
                  <div className="itpdf-img-actions">
                    <button className="itpdf-move-btn" onClick={() => moveImage(img.id, 'up')} disabled={idx === 0} aria-label="Move up">↑</button>
                    <button className="itpdf-move-btn" onClick={() => moveImage(img.id, 'down')} disabled={idx === images.length - 1} aria-label="Move down">↓</button>
                    <button className="itpdf-remove-btn" onClick={() => removeImage(img.id)} aria-label="Remove">×</button>
                  </div>
                </div>
              ))}
              <button className="itpdf-add-more-btn" onClick={() => inputRef.current?.click()}>
                + Add more images
              </button>
            </div>
          )}

          {/* Settings */}
          <div className="itpdf-settings">

            <div className="itpdf-settings-row">
              <div className="itpdf-field">
                <label className="itpdf-label">Page Size</label>
                <div className="itpdf-btns">
                  {PAGE_SIZES.map((s) => (
                    <button key={s}
                      className={`itpdf-opt-btn${pageSize === s ? ' itpdf-opt-btn--active' : ''}`}
                      onClick={() => setPageSize(s)}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="itpdf-field">
                <label className="itpdf-label">Orientation</label>
                <div className="itpdf-btns">
                  {(['portrait', 'landscape'] as const).map((o) => (
                    <button key={o}
                      className={`itpdf-opt-btn${orientation === o ? ' itpdf-opt-btn--active' : ''}`}
                      onClick={() => setOrientation(o)}
                    >
                      {o.charAt(0).toUpperCase() + o.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="itpdf-settings-row">
              <div className="itpdf-field">
                <label className="itpdf-label">Image Fit</label>
                <div className="itpdf-btns">
                  {([['fit', 'Fit (letterbox)'], ['fill', 'Fill (crop)'], ['stretch', 'Stretch']] as const).map(([v, l]) => (
                    <button key={v}
                      className={`itpdf-opt-btn${fitMode === v ? ' itpdf-opt-btn--active' : ''}`}
                      onClick={() => setFitMode(v)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="itpdf-field">
                <label className="itpdf-label">Margin — {margin}mm</label>
                <input type="range" className="itpdf-slider" min={0} max={30} step={2}
                  value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
              </div>
            </div>

            <button
              className="itpdf-convert-btn"
              onClick={convert}
              disabled={!images.length || isConverting}
            >
              {isConverting ? 'Converting…' : `Convert ${images.length} image${images.length !== 1 ? 's' : ''} to PDF →`}
            </button>
          </div>
        </div>

        <aside className="itpdf-info">
          <h3 className="itpdf-info-title">How it works</h3>
          <ol className="itpdf-info-steps">
            <li>Upload one or more JPEG, PNG, or WebP images</li>
            <li>Arrange them in the order you want</li>
            <li>Choose page size, orientation, and fit mode</li>
            <li>Click Convert — your PDF downloads immediately</li>
          </ol>
          <div className="itpdf-info-divider" />
          <h3 className="itpdf-info-title">Image Fit Modes</h3>
          <div className="itpdf-info-modes">
            <div className="itpdf-info-mode">
              <strong>Fit</strong>
              <span>Image fits entirely on the page with padding on two sides</span>
            </div>
            <div className="itpdf-info-mode">
              <strong>Fill</strong>
              <span>Image fills the page — edges may be cropped</span>
            </div>
            <div className="itpdf-info-mode">
              <strong>Stretch</strong>
              <span>Image stretches to fill the entire page area</span>
            </div>
          </div>
          <p className="itpdf-info-note">
            All processing happens locally in your browser.
            Your images are never uploaded to any server.
          </p>
        </aside>
      </div>
    </div>
  )
}
