'use client'

export const TranslationsToday = ({stats}) => {
    return (
        <div className="rounded-xl p-6 shadow-md border border-border-gray bg-box-bg">
            <p className="text-sm font-medium ">
                Translations Today
            </p>
            <p className="mt-2 text-3xl font-bold ">
                {stats}
            </p>
        </div>
    )
}