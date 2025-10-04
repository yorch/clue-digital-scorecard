export const Legend = ({ t }) => (
  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-5 my-4 flex-wrap font-typewriter text-sm">
    <div className="flex items-center justify-center gap-2 text-sm p-2 sm:p-0 border sm:border-0 border-black bg-white sm:bg-transparent">
      <div className="legend-box w-5 h-5 border-2 border-black inline-flex items-center justify-center font-bold font-typewriter" />
      <span>{t('legendUnknown')}</span>
    </div>
    <div className="flex items-center justify-center gap-2 text-sm p-2 sm:p-0 border sm:border-0 border-black bg-white sm:bg-transparent">
      <div className="legend-box checked w-5 h-5 border-2 border-black inline-flex items-center justify-center font-bold font-typewriter bg-green-500 text-white" />
      <span>{t('legendHasCard')}</span>
    </div>
    <div className="flex items-center justify-center gap-2 text-sm p-2 sm:p-0 border sm:border-0 border-black bg-white sm:bg-transparent">
      <div className="legend-box crossed w-5 h-5 border-2 border-black inline-flex items-center justify-center font-bold font-typewriter bg-red-500 text-white" />
      <span>{t('legendNoCard')}</span>
    </div>
  </div>
);
