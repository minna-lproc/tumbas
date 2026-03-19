'use client'

interface TotalTranslationProps {
  total_translations: number;
}

export const TotalTranslations = ({total_translations}: TotalTranslationProps) => {
    return (
        <div className="rounded-xl p-6 shadow-md border border-border-gray bg-input-bg">
            <p className="text-sm font-medium ">
                Total Translations
            </p>
            <p className="mt-2 text-3xl font-bold">
                {total_translations}
            </p>
        </div>
    )
}