import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, ThumbsUp } from 'lucide-react';
import ReactStars from 'react-rating-stars-component';
import { useTranslation } from 'react-i18next';

interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  professorRating: number;
  difficulty: number;
  likes: number;
  timestamp: Date;
  anonymous: boolean;
}

interface CourseReviewsProps {
  courseId: string;
  courseName: string;
  professor: string;
}

const CourseReviews: React.FC<CourseReviewsProps> = ({ courseId, courseName, professor }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    professorRating: 0,
    difficulty: 0,
    anonymous: false
  });
  const { t } = useTranslation();

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add review logic here
    const review = {
      ...newReview,
      id: Math.random().toString(36).substring(7),
      courseId,
      userId: 'anonymous',
      likes: 0,
      timestamp: new Date()
    };
    setReviews([review, ...reviews]);
    setNewReview({
      rating: 0,
      comment: '',
      professorRating: 0,
      difficulty: 0,
      anonymous: false
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-indigo-500" />
        {t('reviews.title')}
      </h2>

      <form onSubmit={handleSubmitReview} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Course Rating</label>
          <ReactStars
            count={5}
            onChange={(rating) => setNewReview({ ...newReview, rating })}
            size={24}
            activeColor="#4F46E5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Professor Rating</label>
          <ReactStars
            count={5}
            onChange={(rating) => setNewReview({ ...newReview, professorRating: rating })}
            size={24}
            activeColor="#4F46E5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Course Difficulty</label>
          <ReactStars
            count={5}
            onChange={(rating) => setNewReview({ ...newReview, difficulty: rating })}
            size={24}
            activeColor="#4F46E5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your Review</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows={4}
            placeholder="Share your experience..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={newReview.anonymous}
            onChange={(e) => setNewReview({ ...newReview, anonymous: e.target.checked })}
            className="rounded border-gray-300 text-indigo-600"
          />
          <label htmlFor="anonymous" className="text-sm">Post anonymously</label>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b dark:border-gray-700 pb-6 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <ReactStars
                    count={5}
                    value={review.rating}
                    edit={false}
                    size={20}
                    activeColor="#4F46E5"
                  />
                  <span className="text-sm text-gray-500">
                    {new Date(review.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2">{review.comment}</p>
              </div>
              <button className="flex items-center gap-1 text-gray-500 hover:text-indigo-600">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{review.likes}</span>
              </button>
            </div>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Professor: {review.professorRating}/5</span>
              <span>Difficulty: {review.difficulty}/5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviews;