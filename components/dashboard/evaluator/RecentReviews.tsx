'use client';

import { formatDistanceToNow } from 'date-fns';
import type { Review } from '@/lib/types/translation';

interface RecentReviewsProps {
  reviews: Review[];
}

export const RecentReviews = ({reviews}: RecentReviewsProps) => {
  if (reviews.length === 0) {
    return (
      <div className="rounded-xl  p-6 shadow-md bg-input-bg
    border border-border-gray">
        <h3 className="mb-4 text-lg font-semibold ">
          Recent Reviews
        </h3>
        <p className="">No reviews yet. Start reviewing!</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl px-6 pt-6 shadow-md bg-input-bg
    border border-border-gray">
      <h3 className="mb-4 text-lg font-semibold ">
        Recent Reviews
      </h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-border-gray py-4 last:border-0 ">
            <p className={`${review.translations.source_texts.parallel_source_texts.status == 'reviewed' ?  'bg-emerald-600': 'bg-gold-600'} 
             text-btn-text mb-4 px-1 text-xs w-fit rounded-sm font-medium `}> 
              {review.translations.source_texts.parallel_source_texts.status == 'reviewed' ? 'Reviewed' : 'Modified'}
            </p>
            <p className="text-sm font-normal">
              {review.translations.source_texts.text_content || 'Source text'}
            </p>
            <p className="mt-1 font-medium">{review.modified_translation ? review.modified_translation : review.translations.translation_text}</p>
            <p className="mt-2 text-xs font-normal text-text-grey">
              {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
