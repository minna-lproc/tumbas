'use client'

interface TranslationTodayProps {
  translations_today: number;
}

export const TranslationsToday = ({translations_today}: TranslationTodayProps) => {
    return (
        <div className="rounded-xl p-6 shadow-md border border-border-gray bg-input-bg">
            <p className="text-sm font-medium ">
                Translations Today
            </p>
            <p className="mt-2 text-3xl font-bold ">
                {translations_today}
            </p>
        </div>
    )
}