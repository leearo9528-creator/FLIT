'use client';

import { useEffect, useRef, useState } from 'react';
import QRCodeLib from 'qrcode';

/**
 * Toss-style QR Code with rounded dots and center logo.
 *
 * Props:
 *  - url        : string (QR data)
 *  - size       : number (px, default 240)
 *  - color      : string (module color, default '#000000')
 *  - logoText   : string (text for center logo, default '플릿')
 *  - accentColor: string (logo accent dot color, default '#3182F6')
 */
export default function TossQR({
    url,
    size = 240,
    color = '#000000',
    logoText = '플릿',
    accentColor = '#3182F6',
}) {
    const canvasRef = useRef(null);
    const [dataUrl, setDataUrl] = useState(null);

    useEffect(() => {
        if (!url) return;

        // Generate QR matrix
        const qr = QRCodeLib.create(url, { errorCorrectionLevel: 'H' });
        const modules = qr.modules;
        const moduleCount = modules.size;
        const moduleData = modules.data;

        // Canvas setup
        const canvas = canvasRef.current;
        const scale = 3; // hi-dpi
        const canvasSize = size * scale;
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        const cellSize = canvasSize / (moduleCount + 8); // padding
        const offset = cellSize * 4; // centering offset

        // ── Helper: is this cell part of a finder pattern? ──
        function isFinderPattern(row, col) {
            // Top-left
            if (row < 7 && col < 7) return true;
            // Top-right
            if (row < 7 && col >= moduleCount - 7) return true;
            // Bottom-left
            if (row >= moduleCount - 7 && col < 7) return true;
            return false;
        }

        // ── Helper: is this in the logo zone (center)? ──
        const logoZoneRadius = Math.floor(moduleCount * 0.18);
        const center = Math.floor(moduleCount / 2);
        function isLogoZone(row, col) {
            return (
                Math.abs(row - center) <= logoZoneRadius &&
                Math.abs(col - center) <= logoZoneRadius
            );
        }

        // ── Helper: draw rounded rect ──
        function roundedRect(x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        }

        // ── Draw finder patterns (Toss-style rounded) ──
        function drawFinder(ox, oy) {
            const s = cellSize;

            // Outer ring (rounded)
            ctx.fillStyle = color;
            roundedRect(ox, oy, s * 7, s * 7, s * 1.4);
            ctx.fill();

            // White inner
            ctx.fillStyle = '#ffffff';
            roundedRect(ox + s, oy + s, s * 5, s * 5, s * 1.0);
            ctx.fill();

            // Core dot (rounded)
            ctx.fillStyle = color;
            roundedRect(ox + s * 2, oy + s * 2, s * 3, s * 3, s * 0.8);
            ctx.fill();
        }

        // Draw 3 finder patterns
        drawFinder(offset, offset); // top-left
        drawFinder(offset + (moduleCount - 7) * cellSize, offset); // top-right
        drawFinder(offset, offset + (moduleCount - 7) * cellSize); // bottom-left

        // ── Draw data modules (rounded dots) ──
        const dotRadius = cellSize * 0.38;
        ctx.fillStyle = color;

        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (isFinderPattern(row, col)) continue;
                if (isLogoZone(row, col)) continue;
                if (!moduleData[row * moduleCount + col]) continue;

                const cx = offset + col * cellSize + cellSize / 2;
                const cy = offset + row * cellSize + cellSize / 2;

                ctx.beginPath();
                ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ── Draw center logo area ──
        const logoSize = logoZoneRadius * 2 * cellSize + cellSize * 2;
        const lx = offset + (center - logoZoneRadius) * cellSize - cellSize;
        const ly = offset + (center - logoZoneRadius) * cellSize - cellSize;

        // White background with rounded rect
        ctx.fillStyle = '#ffffff';
        roundedRect(lx, ly, logoSize, logoSize, cellSize * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = '#E5E8EB';
        ctx.lineWidth = scale * 1;
        roundedRect(lx, ly, logoSize, logoSize, cellSize * 2);
        ctx.stroke();

        // Logo text: "플릿"
        const logoCenter = lx + logoSize / 2;
        const logoCenterY = ly + logoSize / 2;

        ctx.fillStyle = color;
        ctx.font = `900 ${cellSize * 3.2}px -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(logoText, logoCenter - cellSize * 0.6, logoCenterY);

        // Accent dot (플릿 ●)
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        const dotX = logoCenter + cellSize * 2.1;
        const dotY = logoCenterY;
        ctx.arc(dotX, dotY, cellSize * 0.55, 0, Math.PI * 2);
        ctx.fill();

        setDataUrl(canvas.toDataURL('image/png'));
    }, [url, size, color, logoText, accentColor]);

    return (
        <div style={{ display: 'inline-block', lineHeight: 0 }}>
            <canvas ref={canvasRef} style={{ display: dataUrl ? 'none' : 'block' }} />
            {dataUrl && (
                <img
                    src={dataUrl}
                    alt="QR Code"
                    width={size}
                    height={size}
                    style={{ display: 'block' }}
                />
            )}
        </div>
    );
}
