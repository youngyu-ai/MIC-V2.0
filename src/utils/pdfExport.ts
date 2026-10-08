import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Direct export to PDF using html2canvas and jsPDF
 */
export async function exportToPdfFile(
  containerSelector: string,
  filename: string = 'START_檢傷傷情卡_A4縱向六人版.pdf',
  onProgress?: (msg: string, percent: number) => void
): Promise<void> {
  const container = document.querySelector(containerSelector);
  if (!container) {
    throw new Error('找不到列印頁面容器');
  }

  // Find all page sheets
  const pageSheets = Array.from(container.querySelectorAll<HTMLElement>('.print-page-sheet'));
  if (pageSheets.length === 0) {
    throw new Error('目前沒有可列印的頁面');
  }

  // Temporarily reveal any hidden sheets for html2canvas capture
  const hiddenElements: { el: HTMLElement; prevDisplay: string; hadHiddenClass: boolean }[] = [];
  pageSheets.forEach((sheet) => {
    const parent = sheet.parentElement;
    if (parent && (parent.classList.contains('hidden') || window.getComputedStyle(parent).display === 'none')) {
      hiddenElements.push({
        el: parent,
        prevDisplay: parent.style.display,
        hadHiddenClass: parent.classList.contains('hidden'),
      });
      parent.classList.remove('hidden');
      parent.style.display = 'flex';
    }
  });

  try {
    onProgress?.('準備匯出 PDF...', 5);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    for (let i = 0; i < pageSheets.length; i++) {
      const sheet = pageSheets[i];
      onProgress?.(
        `正在處理第 ${i + 1} 頁 (共 ${pageSheets.length} 頁)...`,
        Math.round(10 + (i / pageSheets.length) * 80)
      );

      // Capture the A4 sheet with high-resolution scale
      const canvas = await html2canvas(sheet, {
        scale: 2.0, // High-DPI crisp rendering
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // A4 is 210 x 297 mm, fit sheet with 8mm margin
      pdf.addImage(imgData, 'JPEG', 8, 8, 194, 281, undefined, 'FAST');
    }

    onProgress?.('正在封裝下載 PDF 檔案...', 95);
    pdf.save(filename);
    onProgress?.('PDF 下載完成！', 100);
  } finally {
    // Restore any hidden parents
    hiddenElements.forEach(({ el, prevDisplay, hadHiddenClass }) => {
      el.style.display = prevDisplay;
      if (hadHiddenClass) el.classList.add('hidden');
    });
  }
}

/**
 * Trigger high-fidelity native browser print dialog (Vector sharp)
 */
export function triggerBrowserPrint(): void {
  window.print();
}
