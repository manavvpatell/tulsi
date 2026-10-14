import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Star, ThumbsUp, CheckCircle2, MessageSquare, Plus, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, markReviewHelpful, products } = useShop();

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedPieceId, setSelectedPieceId] = useState<string>(products[0]?.id || '');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState<string>('');
  const [location, setLocation] = useState<string>('Mumbai, Maharashtra');
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const fiveStarPercent = Math.round(
    (reviews.filter((r) => r.rating === 5).length / (reviews.length || 1)) * 100
  );
  const fourStarPercent = Math.round(
    (reviews.filter((r) => r.rating === 4).length / (reviews.length || 1)) * 100
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim() || !authorName.trim()) return;

    const prod = products.find((p) => p.id === selectedPieceId) || products[0];

    addReview({
      productId: prod.id,
      productName: prod.name,
      authorName,
      rating,
      title,
      comment,
      verifiedPurchase: true,
      location
    });

    setIsWriteModalOpen(false);
    setTitle('');
    setComment('');
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7D6B] font-medium block mb-2">
            Patron Testimonials
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1A1816] font-normal tracking-tight">
            Verified Customer Reviews
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2 font-light">
            Read verified experiences from our patrons who entrusted their bridal celebrations and milestones to Tulsi Jewellers.
          </p>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Rating Overview Strip */}
        <div className="bg-[#FAF8F5] border border-[#EAE3D6] p-6 sm:p-8 rounded-sm mb-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Big Score */}
          <div className="md:col-span-4 text-center md:text-left md:border-r border-stone-200/70 md:pr-8">
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="font-editorial text-5xl font-bold text-stone-900 tabular-nums">
                {averageRating}
              </span>
              <span className="text-stone-400 text-base font-light">/ 5.0</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-1 text-[#D4AF37] my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <p className="text-xs text-stone-500">
              Based on <strong>{reviews.length} verified heirlooms</strong> purchased
            </p>
          </div>

          {/* Distribution Bars */}
          <div className="md:col-span-5 space-y-2 text-xs text-stone-600">
            <div className="flex items-center gap-3">
              <span className="w-12 text-stone-500">5 Stars</span>
              <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#1A1816]" style={{ width: `${fiveStarPercent}%` }} />
              </div>
              <span className="w-8 text-right font-medium tabular-nums">{fiveStarPercent}%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 text-stone-500">4 Stars</span>
              <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-stone-500" style={{ width: `${fourStarPercent}%` }} />
              </div>
              <span className="w-8 text-right font-medium tabular-nums">{fourStarPercent}%</span>
            </div>

            <div className="flex items-center gap-3 text-stone-400">
              <span className="w-12">3 Stars</span>
              <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-stone-300" style={{ width: '0%' }} />
              </div>
              <span className="w-8 text-right font-medium tabular-nums">0%</span>
            </div>
          </div>

          {/* Write Review CTA */}
          <div className="md:col-span-3 text-center md:text-right">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-6 py-3 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
            <p className="text-[10px] text-stone-400 mt-2">
              Requires order verification
            </p>
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-sm border border-[#EAE6DF] hover:border-stone-400 transition-colors flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-editorial text-base font-semibold text-stone-900">
                        {rev.authorName}
                      </span>
                      {rev.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded-sm font-medium border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Patron</span>
                        </span>
                      )}
                    </div>
                    {rev.location && (
                      <span className="text-[11px] text-stone-400 block">{rev.location}</span>
                    )}
                  </div>

                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-[#D4AF37] mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-stone-200'}`}
                    />
                  ))}
                </div>

                {/* Piece Tag */}
                <span className="text-[10px] uppercase tracking-wider text-[#8C7D6B] font-medium block mb-2">
                  Piece: {rev.productName}
                </span>

                {/* Title & Comment */}
                <h4 className="font-editorial text-base font-medium text-stone-900 mb-1.5">
                  &ldquo;{rev.title}&rdquo;
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              {/* Helpful footer */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-[11px]">Was this review helpful?</span>
                <button
                  onClick={() => markReviewHelpful(rev.id)}
                  className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors text-[11px] font-medium p-1"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="tabular-nums">Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL: WRITE REVIEW */}
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl border border-stone-200 overflow-hidden">
              <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#FAFAF8]">
                <h3 className="font-editorial text-xl font-medium text-stone-900">
                  Share Your Atelier Experience
                </h3>
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="p-6 space-y-4 text-xs">
                
                {/* Product Select */}
                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Select Your Piece *
                  </label>
                  <select
                    value={selectedPieceId}
                    onChange={(e) => setSelectedPieceId(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.goldPurity} Gold)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Stars */}
                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Overall Craftsmanship Rating *
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setRating(st)}
                        onMouseEnter={() => setHoverRating(st)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-[#D4AF37] hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            st <= (hoverRating || rating) ? 'fill-current' : 'text-stone-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold ml-2 text-stone-800">
                      {hoverRating || rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Author & City */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Radhika Singhania"
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      City, State
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bengaluru, Karnataka"
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Review Headline *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Magnificent bridal choker, flawless BIS hallmarking!"
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                    required
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Your Experience & Details *
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the gold luster, weight, gem quality, packaging and insured delivery..."
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm leading-relaxed"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-4 py-2 border border-stone-200 text-stone-600 rounded-sm uppercase tracking-wider font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1A1816] text-white rounded-sm uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors"
                  >
                    Publish Verified Review
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
