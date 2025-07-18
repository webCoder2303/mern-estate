import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!listing?.userRef) return;

    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.error("Error fetching landlord:", error);
      }
    };

    fetchLandlord();
  }, [listing?.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  if (!listing) return null;

  const subject = encodeURIComponent(`Regarding ${listing.name}`);
  const body = encodeURIComponent(message);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
            name="message"
            id="message"
            rows="2"
            onChange={onChange}
            value={message}
          ></textarea>
          <a
            href={`mailto:${landlord.email}?subject=${subject}&body=${body}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send message
          </a>
        </div>
      )}
    </>
  );
}
