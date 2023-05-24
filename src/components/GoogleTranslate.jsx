import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const googleTranslateScript = document.createElement('script');
    googleTranslateScript.type = 'text/javascript';
    googleTranslateScript.innerHTML = `
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'vi',
          includedLanguages: 'vi,en,zh-CN',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google-translate-element');
      }
    `;
    document.head.appendChild(googleTranslateScript);

    const googleTranslateApiScript = document.createElement('script');
    googleTranslateApiScript.type = 'text/javascript';
    googleTranslateApiScript.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    googleTranslateApiScript.async = true;
    document.head.appendChild(googleTranslateApiScript);
  }, []);

  return <div id="google-translate-element" />;
};

export default GoogleTranslate;
