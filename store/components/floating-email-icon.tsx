"use client";

import EmailIcon from "@/components/icons/email-icon"; // Import your custom email icon

const FloatingEmailIcon = () => {
  const handleClick = () => {
    const email = "info@cabimahadventures.com"; // Recipient's email address
    const subject = "Enquiry"; // Default email subject
    const body = "Hello, I have an enquiry. Can you assist me?"; // Default email body
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; // Create the mailto link
    window.open(mailtoUrl, '_blank'); // Open the link in a new tab
  };

  return (
    <div
      className="fixed bottom-20 right-8 z-[1000] cursor-pointer" // Positioned below the WhatsApp icon
      onClick={handleClick}
    >
      <div className="bg-[#D44638] p-3 rounded-full shadow-lg hover:bg-[#B33A2E] transition-colors">
        <EmailIcon size={32} className="text-white" /> {/* Adjust size as needed */}
      </div>
    </div>
  );
};

export default FloatingEmailIcon;