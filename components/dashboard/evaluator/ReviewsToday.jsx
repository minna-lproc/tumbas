'use client'

export const ReviewsToday = ({stats}) => {
    return (
        <div className="rounded-xl p-6 shadow-md border border-border-gray bg-input-bg">
            <p className="text-sm font-medium ">
                Reviews Today
            </p>
            <p className="mt-2 text-3xl font-bold ">
                {stats}
            </p>
        </div>
    )
}