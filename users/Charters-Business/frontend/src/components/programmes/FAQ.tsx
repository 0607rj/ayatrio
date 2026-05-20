'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQData } from '@/data/programmes';

interface FAQProps {
  data: FAQData;
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(data.categories[0]?.id || '');
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;

    setIsTransitioning(true);
    setOpenQuestions(new Set());

    setTimeout(() => {
      setActiveCategory(categoryId);
      setIsTransitioning(false);
    }, 300);
  };

  const currentCategoryFAQs = data.categories.find((cat) => cat.id === activeCategory)?.faqs || [];

  return (
    <section className="bg-white pt-4 sm:pt-6 md:pt-8" aria-labelledby="faq-heading">
      <div className="mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wider mb-2 sm:mb-3">FAQS</p>
          <h2 id="faq-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-black mb-4 sm:mb-6">
            Have more Questions?
          </h2>

          {/* Tab Navigation */}
          <nav
            className="flex overflow-x-auto scrollbar-hide justify-start sm:justify-center gap-0 px-5 sm:mx-2"
            role="tablist"
          >
            {data.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`relative px-3 sm:px-4 py-3 sm:py-4 text-left focus:outline-none border-r border-gray-200 last:border-r-0 whitespace-nowrap ${activeCategory === category.id
                    ? "text-black"
                    : "text-black hover:bg-gray-100"
                  }`}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
              >
                <div className="text-xs sm:text-sm font-bold">
                  {category.name}
                </div>

                {activeCategory === category.id && (
                  <span className="absolute left-2 right-2 bottom-0 h-[2px] bg-black" />
                )}
              </button>
            ))}
          </nav>
        </header>

        {/* FAQ Content */}
        <div className="space-y-4">
          <div
            className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            role="tabpanel"
          >
            {currentCategoryFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white border-b border-b-gray-200 overflow-hidden transition-all duration-200 hover:border-b-gray-300"
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  type="button"
                  aria-expanded={openQuestions.has(faq.id)}
                >
                  <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openQuestions.has(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Dropdown Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openQuestions.has(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <div className="h-px bg-gray-200 mb-4"></div>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {currentCategoryFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No questions available for this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
