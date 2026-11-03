import React, { useState, useEffect } from 'react';
import { Region } from '../types';
import { brandConfig } from '../config/brand';

interface BookingSectionProps {
  region: Region;
  initialQuoteData?: {
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    frequency: string;
    propertyType: string;
    addons: string[];
    totalPrice: number;
    currency: string;
    estimatedHours: number;
  } | null;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  region,
  initialQuoteData,
}) => {
  const isUS = region === 'US';
  const postalLabel = isUS ? brandConfig.contact.us.postalLabel : brandConfig.contact.uk.postalLabel;
  const unitLabel = isUS ? brandConfig.contact.us.unitLabel : brandConfig.contact.uk.unitLabel;

  // Form Fields
  const [serviceId, setServiceId] = useState<string>(
    initialQuoteData?.serviceId || brandConfig.services[0].id
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('08:30 AM');
  const [accessMethod, setAccessMethod] = useState('lockbox');
  const [notes, setNotes] = useState('');

  // UI States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  // Sync if quote data changes from calculator
  useEffect(() => {
    if (initialQuoteData?.serviceId) {
      setServiceId(initialQuoteData.serviceId);
    }
  }, [initialQuoteData]);

  // Generate the next 14 available dates (weekdays & Saturdays)
  const availableDates = Array.from({ length: 14 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() + idx + 1);
    // Format YYYY-MM-DD
    const isoString = d.toISOString().split('T')[0];
    const displayString = d.toLocaleDateString(isUS ? 'en-US' : 'en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    return { iso: isoString, display: displayString, isWeekend: d.getDay() === 0 };
  }).filter((d) => !d.isWeekend);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please provide a valid phone number';
    }
    if (!streetAddress.trim()) newErrors.streetAddress = 'Please enter your street address';
    if (!postalCode.trim()) newErrors.postalCode = `Please enter your ${postalLabel}`;
    if (!selectedDate) newErrors.selectedDate = 'Please select your preferred date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Realistic API submission simulation
    setTimeout(() => {
      const code = `HH-${Math.floor(1000 + Math.random() * 9000)}-${isUS ? 'US' : 'UK'}`;
      setConfirmedBookingId(code);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleDownloadCalendar = () => {
    const calData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Hearth and Home Cleaning Co.//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${confirmedBookingId}@hearthandhomeclean.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${selectedDate.replace(/-/g, '')}T090000Z
DTEND:${selectedDate.replace(/-/g, '')}T120000Z
SUMMARY:Hearth & Home Cleaning Visit (${confirmedBookingId})
DESCRIPTION:Dedicated 2-cleaner team visit. Address: ${streetAddress}
LOCATION:${streetAddress}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `hearth-home-${confirmedBookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="book" className="py-20 lg:py-28 bg-[#F6F2EA] border-b border-[#EDE6D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Calm Success View */}
        {isSuccess ? (
          <div className="bg-[#EDE6D8]/50 border border-[#dfd6c5] rounded-lg p-8 sm:p-12 text-left animate-in fade-in duration-300">
            <div className="inline-block text-xs uppercase tracking-widest text-[#1F3A34] font-semibold border-b border-[#1F3A34]/30 pb-1 mb-4">
              Booking Reserved
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#1F3A34] tracking-tight">
              We have reserved your team.
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#6B675E] leading-relaxed max-w-2xl">
              Thank you, {fullName.split(' ')[0]}. Confirmation code{' '}
              <strong className="text-[#1F3A34] font-mono">{confirmedBookingId}</strong> has been assigned to your service. We have dispatched your schedule request to our local team lead.
            </p>

            <div className="mt-8 p-6 bg-[#F6F2EA] rounded-md border border-[#EDE6D8] space-y-3 text-xs text-[#6B675E]">
              <div className="flex justify-between border-b border-[#EDE6D8] pb-2">
                <span>Selected Date & Arrival Window:</span>
                <span className="font-medium text-[#1C1C1A]">{selectedDate} ({timeSlot})</span>
              </div>
              <div className="flex justify-between border-b border-[#EDE6D8] pb-2">
                <span>Service Address:</span>
                <span className="font-medium text-[#1C1C1A]">{streetAddress}, {postalCode}</span>
              </div>
              <div className="flex justify-between border-b border-[#EDE6D8] pb-2">
                <span>Access Instructions:</span>
                <span className="font-medium text-[#1C1C1A] capitalize">{accessMethod}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Confirmation Notice Sent To:</span>
                <span className="font-medium text-[#1C1C1A]">{email}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="px-5 py-2.5 text-xs font-medium text-[#F6F2EA] bg-[#1F3A34] hover:bg-[#152723] rounded-md transition-colors text-center"
              >
                Add visit to calendar (.ics)
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setStreetAddress('');
                  setPostalCode('');
                  setSelectedDate('');
                }}
                className="px-5 py-2.5 text-xs font-medium text-[#6B675E] hover:text-[#1C1C1A] border border-[#dfd6c5] rounded-md transition-colors text-center"
              >
                Book another service
              </button>
            </div>
          </div>
        ) : (
          /* Normal Booking Form View */
          <div>
            <div className="text-left mb-12">
              <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
                Schedule Service
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F3A34] tracking-tight">
                Reserve your dedicated <span className="italic font-normal text-[#C4623A]">cleaners</span>.
              </h2>
              <p className="mt-2 text-sm text-[#6B675E]">
                No payment is taken today. You inspect our work first; invoices are sent after your team departs.
              </p>
            </div>

            {/* If quote data was passed from calculator, show calm summary banner */}
            {initialQuoteData && (
              <div className="mb-8 p-4 bg-[#EDE6D8]/60 border border-[#dfd6c5] rounded-md text-xs text-[#1F3A34] flex items-center justify-between">
                <div>
                  <span className="font-semibold">Attached Live Quote: </span>
                  <span>
                    {initialQuoteData.bedrooms} bed, {initialQuoteData.bathrooms} bath ({initialQuoteData.currency}{initialQuoteData.totalPrice})
                  </span>
                </div>
                <span className="text-[11px] text-[#6B675E]">Rate locked</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-[#EDE6D8]/30 p-6 sm:p-10 rounded-lg border border-[#EDE6D8]">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-2">
                  Service Selection
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full bg-[#F6F2EA] border border-[#dfd6c5] rounded-md p-3 text-xs text-[#1C1C1A] focus:outline-none focus:ring-1 focus:ring-[#1F3A34]"
                >
                  {brandConfig.services.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Clara Thompson"
                    className={`w-full bg-[#F6F2EA] border rounded-md p-3 text-xs text-[#1C1C1A] focus:outline-none focus:ring-1 focus:ring-[#1F3A34] ${
                      errors.fullName ? 'border-red-500' : 'border-[#dfd6c5]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className={`w-full bg-[#F6F2EA] border rounded-md p-3 text-xs text-[#1C1C1A] focus:outline-none focus:ring-1 focus:ring-[#1F3A34] ${
                      errors.email ? 'border-red-500' : 'border-[#dfd6c5]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isUS ? '(512) 000-0000' : '020 7000 0000'}
                    className={`w-full bg-[#F6F2EA] border rounded-md p-3 text-xs text-[#1C1C1A] focus:outline-none focus:ring-1 focus:ring-[#1F3A34] ${
                      errors.phone ? 'border-red-500' : 'border-[#dfd6c5]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-1.5">
                    Street Address & {unitLabel} Number *
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="142 South Congress Ave, Apt 4B"
                    className={`w-full bg-[#F6F2EA] border rounded-md p-3 text-xs text-[#1C1C1A] focus:outline-none focus:ring-1 focus:ring-[#1F3A34] ${
                      errors.streetAddress ? 'border-red-500' : 'border-[#dfd6c5]'
                    }`}
                  />
                  {errors.streetAddress && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.streetAddress}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-1.5">
                    {postalLabel} *
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder={isUS ? '78704' : 'N1 0PN'}
                    className={`w-full bg-[#F6F2EA] border rounded-md p-3 text-xs text-[#1C1C1A] focus:outline-none focus:ring-1 focus:ring-[#1F3A34] ${
                      errors.postalCode ? 'border-red-500' : 'border-[#dfd6c5]'
                    }`}
                  />
                  {errors.postalCode && <p className="text-[11px] text-red-600 mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-2">
                  Choose Preferred Date *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.slice(0, 6).map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => {
                        setSelectedDate(d.iso);
                        if (errors.selectedDate) {
                          setErrors((prev) => ({ ...prev, selectedDate: '' }));
                        }
                      }}
                      className={`p-2.5 rounded-md border text-center transition-all ${
                        selectedDate === d.iso
                          ? 'bg-[#1F3A34] text-[#F6F2EA] border-[#1F3A34]'
                          : 'bg-[#F6F2EA] text-[#1C1C1A] border-[#dfd6c5] hover:border-[#1F3A34]/40'
                      }`}
                    >
                      <div className="text-[11px] font-medium leading-tight">{d.display.split(',')[0]}</div>
                      <div className="text-xs font-serif mt-0.5">{d.display.split(',')[1]}</div>
                    </button>
                  ))}
                </div>
                {errors.selectedDate && <p className="text-[11px] text-red-600 mt-1">{errors.selectedDate}</p>}
              </div>

              {/* Time Slot & Access */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-2">
                    Arrival Window
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['08:30 AM', '12:00 PM', '03:30 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 px-1 text-[11px] font-medium rounded-md border text-center transition-all ${
                          timeSlot === slot
                            ? 'bg-[#1F3A34] text-[#F6F2EA] border-[#1F3A34]'
                            : 'bg-[#F6F2EA] text-[#1C1C1A] border-[#dfd6c5]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-2">
                    Property Access
                  </label>
                  <select
                    value={accessMethod}
                    onChange={(e) => setAccessMethod(e.target.value)}
                    className="w-full bg-[#F6F2EA] border border-[#dfd6c5] rounded-md p-2.5 text-xs text-[#1C1C1A] focus:outline-none focus:ring-1 focus:ring-[#1F3A34]"
                  >
                    <option value="lockbox">I have a lockbox / smart door code</option>
                    <option value="home">Someone will be home to greet the team</option>
                    <option value="concierge">Leave key with building concierge/porter</option>
                  </select>
                </div>
              </div>

              {/* Special notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-1.5">
                  Special Notes, Pets, or Fragile Surface Guidance
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Friendly border collie in study; please do not move desk audio equipment; kitchen marble has unsealed honed finish."
                  className="w-full bg-[#F6F2EA] border border-[#dfd6c5] rounded-md p-3 text-xs text-[#1C1C1A] focus:outline-none focus:ring-1 focus:ring-[#1F3A34]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-[#F6F2EA] bg-[#C4623A] hover:bg-[#b0532e] active:scale-[0.99] rounded-md transition-all duration-200 shadow-xs disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Verifying depot schedule...
                    </span>
                  ) : (
                    'Confirm visit reservation'
                  )}
                </button>
                <p className="text-[11px] text-[#6B675E] mt-3">
                  No upfront charge. Cancel or reschedule free of charge up to 48 hours prior.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
