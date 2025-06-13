import { Review } from "../interface";

export const sampleReviews: Review[] = [
  {
    name: "Raj Sharma",
    location: "Philippines",
    rating: 5,
    text: "This is my first request here in Fiverr and I am really amazed. Aside from product delivery quickly, he sent me different choices. I requested one revision only and within 10 minutes he delivered the product. The price is very cheap for me as he exceeded expectations. I hope he won’t increase the price offered as he is helping many business starters.",
    date: "1 week ago",
    price: "Up to $50",
    avatar: "https://via.placeholder.com/40",
    duration: "1 day",
  },
  {
    name: "Jane Doe",
    location: "Canada",
    rating: 5,
    text: "I was skeptical at first, but the results exceeded my expectations. The influencer was professional and delivered on time.",
    date: "3 weeks ago",
    price: "Up to $50",
    avatar: "https://via.placeholder.com/40",
    duration: "1 day",
  },
  {
    name: "Mark Tech",
    location: "United Kingdom",
    rating: 5,
    text: "Amazing job! The collaboration was seamless, and the influencer was very responsive to messages.",
    date: "1 month ago",
    price: "Up to $50",
    avatar: "https://via.placeholder.com/40",
    duration: "1 day",
  },
  {
    name: "Li Sam",
    location: "Australia",
    rating: 5,
    text: "Highly recommend. The content created was top-notch and aligned perfectly with our brand message.",
    date: "2 months ago",
    price: "Up to $100",
    avatar: "https://via.placeholder.com/40",
    duration: "1 day",
  },
];

export function getRatingBreakdown(reviews: Review[]) {
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const review of reviews) {
    if (review.rating >= 1 && review.rating <= 5) {
      breakdown[review.rating as keyof typeof breakdown]++;
    }
  }
  return breakdown;
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return total / reviews.length;
}