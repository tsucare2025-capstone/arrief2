import { useState, useEffect } from 'react';
import { X, Cookie, HelpCircle } from 'lucide-react';
import CookieInstructions from './CookieInstructions';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    console.log('CookieConsent: consent =', consent);
    
    // Simple incognito detection
    const isIncognito = !window.indexedDB || navigator.webdriver || window.chrome?.runtime?.onConnect;
    console.log('CookieConsent: isIncognito =', isIncognito);
    
    // Test if cookies are working
    let cookiesWorking = false;
    try {
      document.cookie = "testCookie=test; path=/";
      cookiesWorking = document.cookie.includes("testCookie=test");
      // Clean up test cookie
      document.cookie = "testCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (e) {
      console.log('CookieConsent: cookie test failed', e);
    }
    console.log('CookieConsent: cookiesWorking =', cookiesWorking);
    
    // Show banner if no consent OR if cookies aren't working OR if incognito mode
    const shouldShow = !consent || !cookiesWorking || isIncognito;
    console.log('CookieConsent: shouldShow =', shouldShow);
    
    if (shouldShow) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    
    // Reload the page to ensure cookies work properly
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  if (!showBanner && !showInstructions) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="w-6 h-6 text-yellow-400" />
              <div>
                <h3 className="font-semibold text-lg">🍪 We use cookies</h3>
                <p className="text-sm text-gray-300">
                  This site uses cookies to keep you logged in and provide a better experience. 
                  Please allow cookies to use all features.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 text-sm bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Allow Cookies
              </button>
            </div>
            
            <button
              onClick={handleDecline}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      
      {showInstructions && (
        <CookieInstructions onClose={handleCloseInstructions} />
      )}
    </>
  );
};

export default CookieConsent;
