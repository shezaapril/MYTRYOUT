import React, { useState, useEffect } from 'react';
import { X, Check, Upload, RotateCcw, Sparkles } from 'lucide-react';

export interface MotivationConfig {
  imageUrl: string | null;
  campusTitle: string;
  campusSubtitle: string;
  quote: string;
}

interface EditMotivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: MotivationConfig;
  defaultImage: string;
  onSave: (config: MotivationConfig) => void;
  onReset: () => void;
}

export const EditMotivationModal: React.FC<EditMotivationModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  defaultImage,
  onSave,
  onReset
}) => {
  const [formData, setFormData] = useState<MotivationConfig>(currentConfig);
  const [imagePreview, setImagePreview] = useState<string>(
    currentConfig.imageUrl || defaultImage
  );

  useEffect(() => {
    if (isOpen) {
      setFormData(currentConfig);
      setImagePreview(currentConfig.imageUrl || defaultImage);
    }
  }, [isOpen, currentConfig, defaultImage]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setFormData(prev => ({ ...prev, imageUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImageToDefault = () => {
    setImagePreview(defaultImage);
    setFormData(prev => ({ ...prev, imageUrl: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleFullReset = () => {
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Ubah Foto & Keterangan Kampus Motivasi</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Sesuaikan foto gedung kampus impian, nama kampus, dan kata-kata motivasi Anda
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          {/* Image preview & upload */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Foto Kampus Impian (Format Rasio 4:3)
            </label>
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 mb-2">
              <img
                src={imagePreview}
                alt="Preview Foto Kampus"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="cursor-pointer px-3.5 py-2 font-semibold bg-[#93ABD9]/15 dark:bg-[#93ABD9]/20 text-slate-800 dark:text-slate-100 border border-[#93ABD9]/40 rounded-xl hover:bg-[#93ABD9]/25 transition-colors flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#93ABD9]" />
                <span>Unggah Foto dari Perangkat</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {formData.imageUrl && (
                <button
                  type="button"
                  onClick={handleResetImageToDefault}
                  className="px-3 py-2 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Gunakan Foto Bawaan
                </button>
              )}
            </div>
          </div>

          {/* Title: Nama Gedung / Kampus */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Nama Gedung / Tempat Kampus Impian
            </label>
            <input
              type="text"
              value={formData.campusTitle}
              onChange={e => setFormData({ ...formData, campusTitle: e.target.value })}
              placeholder="Contoh: Gedung T.P. Rachmat (Labtek V ITB) atau Gedung Rektorat UI"
              required
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93ABD9] text-slate-900 dark:text-white"
            />
          </div>

          {/* Subtitle: Keterangan Kampus */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Keterangan / Subjudul Kampus
            </label>
            <input
              type="text"
              value={formData.campusSubtitle}
              onChange={e => setFormData({ ...formData, campusSubtitle: e.target.value })}
              placeholder="Contoh: Institut Teknologi Bandung — Kampus Ganesha atau Universitas Indonesia"
              required
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93ABD9] text-slate-900 dark:text-white"
            />
          </div>

          {/* Motivational Quote */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Pesan / Kutipan Motivasi Personal
            </label>
            <textarea
              rows={3}
              value={formData.quote}
              onChange={e => setFormData({ ...formData, quote: e.target.value })}
              placeholder="Tuliskan kata-kata penyemangat pribadi untuk memotivasi belajarmu..."
              required
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#93ABD9] text-slate-900 dark:text-white leading-relaxed resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleFullReset}
              className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ke Awal</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-semibold text-white bg-[#F2619C] hover:bg-[#d84581] rounded-xl transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
