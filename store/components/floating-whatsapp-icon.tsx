"use client";

import WhatsAppIcon from "@/components/icons/floaty-whatsapp-icon"; // Import your WhatsApp icon

const FloatingWhatsAppIcon = () => {
  const handleClick = () => {
    const phoneNumber = "+254113977338"; // Recipient's phone number
    const message = "Hello, I have an enquiry. Can you assist me?"; // Default message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`; // Create the WhatsApp share link
    window.open(whatsappUrl, '_blank'); // Open the link in a new tab
  };

  return (
    <div
      className="fixed bottom-8 right-4 z-[1000] cursor-pointer" // Increased z-index
      onClick={handleClick}
    >
      <div className="bg-[#25D366] p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors">
        <WhatsAppIcon size={32} className="text-white" /> {/* Adjust size as needed */}
      </div>
    </div>
  );
};

export default FloatingWhatsAppIcon;