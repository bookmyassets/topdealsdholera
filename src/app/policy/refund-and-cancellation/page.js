import React from "react";

export default function Copyright() {
  return (
    <>
      <div className="w-full bg-black">
        <div className="max-w-7xl mx-auto pt-44 bg-black">
          <div className="text-white">

            {/* Refund & Cancellation Policy Section */}
            <div className="mt-20">
              <h1 className="text-4xl font-bold max-sm:text-center">
                Refund & Cancellation Policy – Book My Assets
              </h1>
              <div className="mt-10 text-lg space-y-5 pb-8 max-sm:mr-4 max-sm:ml-4">
                <p>
                  In the event of a cancellation, customers may apply for a refund within 30 days.
                  Once the refund is initiated, the amount will be credited back within 7 working days.
                  (Please note: Timelines are subject to change without prior notice.)
                </p>
                <p>
                  The booking amount is ₹50,000. This amount may vary at the company's discretion without advance notice.
                </p>
                <p>
                  Plot pricing and additional charges are also subject to change at any time without prior notification.
                </p>
                <p>
                  Maintenance charges are to be paid once and are strictly non-refundable.
                </p>
                <p>
                  If applicable, a Preferred Location Charge (PLC) will be added to the total cost.
                </p>
                <p>
                  Buyers are required to complete the full payment within the specified time frame,
                  which is 30 days from the date of booking.
                </p>
                <p>
                  Stamp duty will be charged as per the current rates set by the Government of Gujarat—
                  4.90% for female buyers and 5.90% for male buyers—based on the total sale value.
                  These rates may be updated as per government announcements.
                </p>
                <p>
                  Goods and Services Tax (GST) will be levied in accordance with prevailing government regulations.
                </p>
                <p>
                  Legal fees include costs related to documentation and registration of the property.
                </p>
                <p>
                  For any further assistance please fill out the form to schedule a free consultation with our real estate experts.{" "}
                  <a href="mailto:info@Dholera Consultants.com" className="text-blue-400 underline">
                    info@Dholera Consultants.com
                  </a>{" "}
                  or call us at{" "}
                  <a href="tel:+918130371647" className="text-blue-400 underline">
                    +91 81 3037 1647
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
