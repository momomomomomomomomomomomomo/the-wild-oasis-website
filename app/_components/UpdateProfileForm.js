"use client";

import { useState } from "react";
import { updateProfile } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ children, guest }) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest;
  const [flag, setFlag] = useState(countryFlag);

  return (
    <div>
      <h2 className="text-accent-400 mb-4 text-2xl font-semibold">
        Update your guest profile
      </h2>

      <p className="text-primary-200 mb-8 text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <form
        action={updateProfile}
        className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            name="fullName"
            defaultValue={fullName}
            disabled
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            name="email"
            defaultValue={email}
            disabled
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={flag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>

          <div
            onChange={(e) => {
              setFlag(e.target.value.split("%")[1]);
            }}
          >
            {children}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            defaultValue={nationalID}
            name="nationalID"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <SubmitButton updateLabel="Updating...">Update profile</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
