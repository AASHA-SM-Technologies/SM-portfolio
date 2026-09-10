/**
 * Media Compression & Watermarking Engine (Client-Side)
 * Strictly zero Firebase Storage requirement.
 * Compresses images to optimized WebP/JPEG Base64 data URLs with Canvas resizing
 * and validates small video clips to ensure safety within Firestore document limits (<1MB).
 */

export const MAX_SAFE_IMAGE_BYTES = 650 * 1024; // 650 KB limit for safe single field in Firestore
export const MAX_SAFE_VIDEO_BYTES = 700 * 1024; // 700 KB limit for short promo video clips

/**
 * Format bytes into human readable string (KB, MB)
 */
export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Calculate the approximate byte size of a Base64/DataURL string
 */
export function getBase64SizeInBytes(base64String) {
  if (!base64String) return 0;
  const stringLength = base64String.length - (base64String.indexOf(',') + 1);
  return Math.ceil((stringLength * 3) / 4);
}

/**
 * Compress and resize an image file in the browser using HTML5 Canvas.
 * Converts to WebP (fallback to JPEG) at target max dimensions and quality.
 * 
 * @param {File} file - The uploaded image file
 * @param {Object} options - Compression options
 * @returns {Promise<{dataUrl: string, originalSize: number, compressedSize: number, width: number, height: number, format: string}>}
 */
export async function compressImage(file, options = {}) {
  const {
    maxWidth = 1280,
    maxHeight = 1280,
    quality = 0.78,
    format = 'image/webp',
    watermark = null // { text: 'AASHA-SM Technologies Pvt Ltd', position: 'bottom-right', opacity: 0.25, fontSize: 16 }
  } = options;

  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
  }

  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio-preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Canvas 2D context unavailable.'));
        }

        // Draw image with smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Apply optional watermark if specified
        if (watermark && watermark.enabled !== false && watermark.text) {
          applyWatermarkToCanvas(ctx, width, height, watermark);
        }

        // Try WebP first, fallback to JPEG if browser doesn't support WebP export
        let dataUrl = canvas.toDataURL(format, quality);
        if (!dataUrl.startsWith(`data:${format}`)) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const compressedSize = getBase64SizeInBytes(dataUrl);

        if (compressedSize > MAX_SAFE_IMAGE_BYTES) {
          // If still over limit, attempt aggressive compression pass
          const retryQuality = 0.55;
          const aggressiveDataUrl = canvas.toDataURL('image/jpeg', retryQuality);
          const aggressiveSize = getBase64SizeInBytes(aggressiveDataUrl);

          if (aggressiveSize > MAX_SAFE_IMAGE_BYTES) {
            return reject(
              new Error(
                `Image is too large (${formatBytes(aggressiveSize)}). Firestore limits require media under ${formatBytes(
                  MAX_SAFE_IMAGE_BYTES
                )}. Please choose a smaller image.`
              )
            );
          }

          return resolve({
            dataUrl: aggressiveDataUrl,
            originalSize,
            compressedSize: aggressiveSize,
            width,
            height,
            format: 'image/jpeg'
          });
        }

        resolve({
          dataUrl,
          originalSize,
          compressedSize,
          width,
          height,
          format
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Apply canvas-based watermark
 */
function applyWatermarkToCanvas(ctx, width, height, watermark) {
  const text = watermark.text || 'AASHA-SM Technologies Pvt Ltd';
  const fontSize = watermark.fontSize || Math.max(14, Math.round(width * 0.025));
  const opacity = watermark.opacity !== undefined ? watermark.opacity : 0.35;
  const position = watermark.position || 'bottom-right';

  ctx.save();
  ctx.font = `600 ${fontSize}px sans-serif`;
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const padding = 20;

  let x = padding;
  let y = height - padding;

  if (position === 'bottom-right') {
    x = width - textWidth - padding;
    y = height - padding;
  } else if (position === 'bottom-left') {
    x = padding;
    y = height - padding;
  } else if (position === 'top-right') {
    x = width - textWidth - padding;
    y = padding + fontSize;
  } else if (position === 'top-left') {
    x = padding;
    y = padding + fontSize;
  } else if (position === 'center') {
    x = (width - textWidth) / 2;
    y = height / 2;
  }

  ctx.fillText(text, x, y);
  ctx.restore();
}

/**
 * Validate and process small video file for Base64 storage in Firestore.
 * Strictly verifies file size < MAX_SAFE_VIDEO_BYTES and duration < 30 seconds.
 */
export async function validateAndProcessVideo(file) {
  if (!file || !file.type.startsWith('video/')) {
    throw new Error('Please select a valid video file (MP4, WEBM).');
  }

  if (file.size > MAX_SAFE_VIDEO_BYTES) {
    throw new Error(
      `Video size is ${formatBytes(file.size)}. Firestore documents must remain under 1MB. Maximum allowed short video size is ${formatBytes(MAX_SAFE_VIDEO_BYTES)}. Please compress or shorten the video clip.`
    );
  }

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const duration = video.duration;

      if (duration > 30) {
        return reject(
          new Error(`Video duration is ${Math.round(duration)}s. Only short preview clips under 30 seconds are permitted for direct Firestore storage.`)
        );
      }

      // Convert video file to base64 data url
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read video file.'));
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const totalBytes = getBase64SizeInBytes(dataUrl);

        if (totalBytes > MAX_SAFE_VIDEO_BYTES) {
          return reject(
            new Error(
              `Processed video Base64 size (${formatBytes(totalBytes)}) exceeds safe Firestore limits. Please use a smaller clip.`
            )
          );
        }

        resolve({
          dataUrl,
          size: totalBytes,
          duration: Math.round(duration * 10) / 10,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight,
          format: file.type
        });
      };
      reader.readAsDataURL(file);
    };

    video.onerror = () => {
      window.URL.revokeObjectURL(video.src);
      reject(new Error('Failed to parse video metadata. Format may be unsupported.'));
    };

    video.src = URL.createObjectURL(file);
  });
}
