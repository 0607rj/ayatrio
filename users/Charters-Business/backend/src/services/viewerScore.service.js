export function computeViewerScore({ visitCount, loggedIn, pagesNavigated, chatInteractions }) {
  // normalization caps (adjust whenever you want)
  const VISIT_CAP = 10;
  const PAGES_CAP = 8;
  const CHAT_CAP = 5;

  const visitPart = (Math.min(visitCount, VISIT_CAP) / VISIT_CAP) * 50;
  const loginPart = loggedIn ? 25 : 0;
  const pagesPart = (Math.min(pagesNavigated, PAGES_CAP) / PAGES_CAP) * 15;
  const chatPart = (Math.min(chatInteractions, CHAT_CAP) / CHAT_CAP) * 10;

  return Math.round((visitPart + loginPart + pagesPart + chatPart) * 100) / 100;
}