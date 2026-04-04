"use client";

import { useEffect, useState } from "react";
import { profileService } from "@/services/profile/profile.service";
import "./profile.css";
import LoadingPage from "@/components/modules/loading/LoadingCompo";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: "ACTIVE" | "BLOCKED";
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);

      const result = await profileService.getProfile();

      if (result.data) {
        setUser(result.data);
        setForm({
          name: result.data.name || "",
          phone: result.data.phone || "",
          currentPassword: "",
          newPassword: "",
        });
      } else {
        console.error(result.error?.message);
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage("");

    const result = await profileService.updateProfile({
      name: form.name,
      phone: form.phone,
      currentPassword: form.currentPassword || undefined,
      newPassword: form.newPassword || undefined,
    });

    setSaving(false);

    if (result.data) {
      setMessage("Profile updated successfully.");

      setUser((prev) =>
        prev
          ? {
              ...prev,
              name: form.name,
              phone: form.phone,
            }
          : prev
      );

      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } else {
      setMessage(result.error?.message || "Update failed");
    }
  };

  if (loading) {
    return <LoadingPage></LoadingPage>
  }

  if (!user) {
    return <div className="profile-message">Profile not found</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <p className="profile-eyebrow">Customer Dashboard</p>
        <h1 className="profile-title">Profile Ledger</h1>
        <p className="profile-subtitle">
          View and update your account details
        </p>
      </div>

      <div className="profile-card">
        {/* PROFILE SECTION */}
        <div className="profile-section-head">
          <p className="profile-section-eyebrow">Account Details</p>
          <h2 className="profile-section-title">
            Profile Information
          </h2>
        </div>

        <div className="profile-grid">
          <div className="profile-field">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="profile-input"
            />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input
              value={user.email}
              disabled
              className="profile-input profile-input-readonly"
            />
          </div>

          <div className="profile-field">
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="profile-input"
            />
          </div>

          <div className="profile-field">
            <label>Status</label>
            <input
              value={user.status}
              disabled
              className="profile-input profile-input-readonly"
            />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="profile-divider" />

        {/* PASSWORD SECTION */}
        <div className="profile-section-head">
          <p className="profile-section-eyebrow">Security</p>
          <h2 className="profile-section-title">
            Change Password
          </h2>
        </div>

        <div className="profile-grid">
          <div className="profile-field">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="profile-input"
            />
          </div>

          <div className="profile-field">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
        </div>

        {message && <p className="profile-feedback">{message}</p>}

        <div className="profile-actions">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="profile-btn"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}