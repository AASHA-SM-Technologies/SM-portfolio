import { useEffect } from 'react';
import { useSite } from '../../context/SiteContext';

export default function SEO({ title, description, image, url }) {
  const { siteConfig } = useSite();

  const siteTitle = title 
    ? `${title} | ${siteConfig?.name || 'Aditya Jamdade'}`
    : siteConfig?.seoTitle || "Aditya Jamdade | Full-Stack Developer & Digital Solutions Specialist";
  
  const siteDesc = description || siteConfig?.seoDescription || "Full-stack developer and digital solutions specialist building high-performance websites, web applications, Razorpay payment flows, WhatsApp APIs, and AI automations.";

  useEffect(() => {
    document.title = siteTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', siteDesc);

    // OpenGraph Tags
    const ogTags = [
      { property: 'og:title', content: siteTitle },
      { property: 'og:description', content: siteDesc },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url || window.location.href }
    ];

    if (image) {
      ogTags.push({ property: 'og:image', content: image });
    }

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [siteTitle, siteDesc, image, url]);

  return null;
}
