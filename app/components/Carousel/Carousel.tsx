'use client';
import { Carousel } from 'flowbite-react';

export const CarouselClient = () => {
  const quotes = [
    'The best websites are not those with less design, but those with less unnecessary design.',
    'Good content is not storytelling. It’s telling your story well.',
    'Design is not just what it looks like and feels like. Design is how it works.',
    'Content is the reason search began in the first place.',
  ];

  const authors = [
    'Jason Santa Maria',
    'Ann Handley',
    'Steve Jobs',
    'Lee Odden',
  ];

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-20 sm:mt-40">
      <Carousel>
        {quotes.map((quote, i) => (
          <div
            key={i}
            className="flex flex-col gap-14 h-full items-center justify-center bg-blue-site text-white p-8"
          >
            <h3 className="text-lg sm:text-4xl max-w-xs sm:max-w-3xl font-site">
              {quote}
            </h3>
            <p>{authors[i]}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
