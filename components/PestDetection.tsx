
import React, { useState } from 'react';
import { analyzeCropImage } from '../services/geminiService';
import { getTranslation } from '../constants';
import type { PestAnalysisResult, Language } from '../types';
import { UploadIcon } from './IconComponents';

interface PestDetectionProps {
  language: Language;
}

const PestDetection: React.FC<PestDetectionProps> = ({ language }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PestAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chemical' | 'organic' | 'prevention'>('chemical');
  const t = (key: string) => getTranslation(language, key);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError(t('noFileSelected'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeCropImage(selectedFile);
      setAnalysisResult(result);
    } catch (err) {
      setError(t('errorPestDetection'));
    } finally {
      setIsLoading(false);
    }
  };

  const UrgencyBadge: React.FC<{ level: string }> = ({ level }) => {
    const colors = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-orange-100 text-orange-800',
      Critical: 'bg-red-100 text-red-800',
    };
    return <span className={`px-3 py-1 text-sm font-medium rounded-full ${colors[level as keyof typeof colors]}`}>{level}</span>;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-agri-dark-green mb-2">{t('pestDiseaseDetection')}</h2>
      <p className="text-gray-500 mb-4">{t('uploadCropImage')}</p>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label htmlFor="crop-image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            {preview ? (
              <img src={preview} alt="Crop preview" className="h-full w-full object-contain p-2" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
              </div>
            )}
            <input id="crop-image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
          {selectedFile && <p className="text-sm text-gray-500 mt-2 truncate">File: {selectedFile.name}</p>}
          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || isLoading}
            className="w-full mt-4 bg-agri-green text-white font-bold py-3 px-4 rounded-lg hover:bg-agri-dark-green transition-colors disabled:bg-gray-400"
          >
            {isLoading ? t('analyzing') : t('upload')}
          </button>
        </div>

        <div className="flex-1">
          {isLoading && <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-agri-green"></div></div>}
          {error && <p className="text-red-500">{error}</p>}
          {analysisResult && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">{t('analysisResult')}</h3>
              <div className="p-4 bg-agri-light-gray rounded-lg">
                <p className="text-sm font-medium text-gray-500">{t('pestDiseaseName')}</p>
                <p className="text-xl font-semibold text-agri-dark-green">{analysisResult.pestOrDiseaseName}</p>
              </div>
              <div className="p-4 bg-agri-light-gray rounded-lg">
                 <p className="text-sm font-medium text-gray-500 mb-2">{t('urgencyLevel')}</p>
                 <UrgencyBadge level={analysisResult.urgencyLevel} />
              </div>

              <div>
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <button onClick={() => setActiveTab('chemical')} className={`${activeTab === 'chemical' ? 'border-agri-green text-agri-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}>{t('chemicalTreatment')}</button>
                    <button onClick={() => setActiveTab('organic')} className={`${activeTab === 'organic' ? 'border-agri-green text-agri-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}>{t('organicTreatment')}</button>
                    <button onClick={() => setActiveTab('prevention')} className={`${activeTab === 'prevention' ? 'border-agri-green text-agri-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}>{t('prevention')}</button>
                  </nav>
                </div>
                <div className="mt-4">
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {activeTab === 'chemical' && analysisResult.chemicalTreatment.map((item, i) => <li key={i}>{item}</li>)}
                    {activeTab === 'organic' && analysisResult.organicTreatment.map((item, i) => <li key={i}>{item}</li>)}
                    {activeTab === 'prevention' && analysisResult.prevention.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PestDetection;
