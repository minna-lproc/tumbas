'use client';

import { formatDistanceToNow } from 'date-fns';


export const RecentReviews = () => {
  if (reviews.length === 0) {
    return (
      <div className="rounded-xl  p-6 shadow-md ">
        <h3 className="mb-4 text-lg font-semibold ">
          Recent Reviews
        </h3>
        <p className="">No reviews yet. Start reviewing!</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl px-6 pt-6 shadow-md bg-box-bg
    border border-border-gray">
      <h3 className="mb-4 text-lg font-semibold ">
        Recent Reviews
      </h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-border-gray py-4 last:border-0 ">
            <p className={`${review.status == 'approved' ?  'bg-emerald-500': 'bg-gold-500'} text-foreground p-1 text-xs`}> {review.status == 'approved' ? Approved : Modified}</p>
            <p className="text-sm font-normal">
              {review.source_texts?.text_content || 'Source text'}
            </p>
            <p className="mt-1 font-medium">{review.review_text}</p>
            <p className="mt-2 text-xs font-normal text-text-grey">
              {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
