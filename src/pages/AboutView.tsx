import { t } from '../i18n';
import logoPath from '../assets/erasmus_logo.jpg';

export function AboutView() {
  return (
    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-green-700">{t('aboutTitle')}</h2>
        <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
          {t('aboutDescription')}
        </p>
        <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
          {t('aboutDescriptionExtra')}
        </p>
      </div>

      <div class="mb-8 bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg sm:text-xl font-bold mb-4 text-gray-900">{t('features')}</h3>
        <ul class="space-y-2 text-gray-700 text-sm sm:text-base">
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold flex-shrink-0">✓</span>
            <span>{t('featureTrack')}</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold flex-shrink-0">✓</span>
            <span>{t('featureAdd')}</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold flex-shrink-0">✓</span>
            <span>{t('featureCalculate')}</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold flex-shrink-0">✓</span>
            <span>{t('featureCompare')}</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold flex-shrink-0">✓</span>
            <span>{t('featureLanguages')}</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold flex-shrink-0">✓</span>
            <span>{t('featurePWA')}</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600 font-bold flex-shrink-0">✓</span>
            <span>{t('featureExportImport')}</span>
          </li>
        </ul>
      </div>

      <div class="mb-8 bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg sm:text-xl font-bold mb-4 text-gray-900">{t('contributors')}</h3>
        <p class="text-gray-600 mb-4 text-sm sm:text-base">{t('contributorsDesc')}</p>
        <p class="text-gray-600 text-sm sm:text-base">
          {t('contributorsAck')}
        </p>
      </div>

      <div class="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 text-center">
        <h3 class="text-base sm:text-lg font-bold mb-4 text-gray-900">{t('supportedBy')}</h3>
        <img 
          src={logoPath} 
          alt="Erasmus+ Logo" 
          class="h-20 mx-auto"
        />
      </div>
    </div>
  );
}
