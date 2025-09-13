import { useState } from 'react';
import { X, Cookie, Globe, Monitor, Smartphone } from 'lucide-react';

const CookieInstructions = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('chrome');

  const instructions = {
    chrome: {
      icon: <Globe className="w-6 h-6" />,
      steps: [
        "Click the lock icon 🔒 in the address bar",
        "Go to 'Site settings'",
        "Set 'Cookies and site data' to 'Allowed'",
        "Refresh the page"
      ]
    },
    firefox: {
      icon: <Monitor className="w-6 h-6" />,
      steps: [
        "Click the shield icon 🛡️ in the address bar",
        "Turn off 'Enhanced Tracking Protection'",
        "Or click 'Manage Permissions'",
        "Set 'Cookies' to 'Allow'"
      ]
    },
    safari: {
      icon: <Smartphone className="w-6 h-6" />,
      steps: [
        "Go to Safari → Preferences → Privacy",
        "Uncheck 'Prevent cross-site tracking'",
        "Or add this site to exceptions",
        "Refresh the page"
      ]
    },
    edge: {
      icon: <Globe className="w-6 h-6" />,
      steps: [
        "Click the lock icon 🔒 in the address bar",
        "Go to 'Site permissions'",
        "Set 'Cookies and site data' to 'Allow'",
        "Refresh the page"
      ]
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Cookie className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Enable Cookies</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            To use all features of TSU Care, you need to enable cookies. 
            Follow these steps for your browser:
          </p>

          {/* Browser Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {Object.keys(instructions).map((browser) => (
              <button
                key={browser}
                onClick={() => setActiveTab(browser)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === browser
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {instructions[browser].icon}
                <span className="capitalize">{browser}</span>
              </button>
            ))}
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              {instructions[activeTab].icon}
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {activeTab} Instructions
              </h3>
            </div>
            <ol className="space-y-3">
              {instructions[activeTab].steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieInstructions;
