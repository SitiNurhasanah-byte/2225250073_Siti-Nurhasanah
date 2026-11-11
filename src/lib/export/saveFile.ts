/**
 * Menyimpan/membagikan file. Di HP (Android/iOS) memakai menu "Bagikan" bawaan bila tersedia,
 * sehingga file bisa dikirim ke WhatsApp, Drive, atau email. Di laptop, file diunduh.
 */
export async function saveFile(name: string, content: string, mime: string): Promise<'shared' | 'downloaded'> {
  const file = new File([content], name, { type: mime });
  const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean };
  if (nav.canShare?.({ files: [file] }) && navigator.share) {
    try {
      await navigator.share({ files: [file], title: name });
      return 'shared';
    } catch {
      // Dibatalkan pengguna atau tidak didukung: lanjut ke unduhan biasa.
    }
  }
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'downloaded';
}
