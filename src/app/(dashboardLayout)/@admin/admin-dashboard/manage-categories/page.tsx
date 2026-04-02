"use client";

import { useEffect, useMemo, useState } from "react";
import { adminService } from "@/services/admin/admin.service";
import "./categories.css";
import { toast } from "sonner";
import { AdminCategory } from "@/types/admin";



function formatDate(dateString?: string | null) {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminManageCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLogo, setEditLogo] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    setMessage("");

    const result = await adminService.getAllCategories();

    if (result.data) {
      setCategories(result.data || []);
    } else {
      setMessage(result.error?.message || "Failed to fetch categories.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Category name is required.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const payload = {
      name: name.trim(),
      slug: (slug.trim() || makeSlug(name)) || undefined,
      description: description.trim() || undefined,
      logo: logo.trim() || undefined,
    };

    const result = await adminService.createCategory(payload as any);

    if (result.data) {
      setMessage("Category created successfully.");
      setName("");
      setSlug("");
      setDescription("");
      setLogo("");
      await loadCategories();
    } else {
      setMessage(result.error?.message || "Failed to create category.");
    }

    setSubmitting(false);
  };

  const handleEditStart = (category: AdminCategory) => {
    setEditingId(category.id);
    setEditName(category.name || "");
    setEditSlug(category.slug || "");
    setEditDescription(category.description || "");
    setEditLogo(category.logo || "");
    setMessage("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditName("");
    setEditSlug("");
    setEditDescription("");
    setEditLogo("");
  };

  const handleUpdateCategory = async (categoryId: string) => {
    if (!editName.trim()) {
      setMessage("Category name is required.");
      return;
    }

    setUpdatingId(categoryId);
    setMessage("");

    const payload = {
      name: editName.trim(),
      slug: (editSlug.trim() || makeSlug(editName)) || undefined,
      description: editDescription.trim() || undefined,
      logo: editLogo.trim() || undefined,
    };

    const result = await adminService.updateCategory(categoryId, payload as any);

    if (result.data) {
      setMessage("Category updated successfully.");
      handleEditCancel();
      await loadCategories();
    } else {
      setMessage(result.error?.message || "Failed to update category.");
    }

    setUpdatingId(null);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    toast.warning("Delete this category?", {
      position:"top-center",
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          setDeletingId(categoryId);
          setMessage("");

          const result = await adminService.deleteCategory(categoryId);

          if (result.success) {
            setMessage("Category deleted successfully.");
            toast.success("Category deleted successfully.");
            await loadCategories();
          } else {
            const errorMessage =
              result.error?.message || "Failed to delete category.";

            setMessage(errorMessage);
            toast.error(errorMessage);
          }

          setDeletingId(null);
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => { },
      },
    });
  };

  const totalCategories = categories.length;

  const withLogosCount = useMemo(
    () => categories.filter((category) => !!category.logo).length,
    [categories]
  );

  const withDescriptionCount = useMemo(
    () => categories.filter((category) => !!category.description).length,
    [categories]
  );

  if (loading) {
    return <div className="admin-categories-message">Loading categories...</div>;
  }

  return (
    <div className="admin-categories-page">
      <div className="admin-categories-header">
        <p className="admin-categories-eyebrow">Admin Dashboard</p>
        <h1 className="admin-categories-title">Category Ledger</h1>
        <p className="admin-categories-subtitle">
          Create, update, and manage meal categories in one place
        </p>
      </div>

      {message && <p className="admin-categories-feedback">{message}</p>}

      <div className="admin-categories-stats">
        <div className="admin-categories-stat-card">
          <p className="admin-categories-stat-label">Total Categories</p>
          <h3 className="admin-categories-stat-value">{totalCategories}</h3>
        </div>

        <div className="admin-categories-stat-card">
          <p className="admin-categories-stat-label">With Logo</p>
          <h3 className="admin-categories-stat-value">{withLogosCount}</h3>
        </div>

        <div className="admin-categories-stat-card">
          <p className="admin-categories-stat-label">With Description</p>
          <h3 className="admin-categories-stat-value">
            {withDescriptionCount}
          </h3>
        </div>
      </div>

      <section className="admin-categories-create-section">
        <div className="admin-categories-section-head">
          <p className="admin-categories-section-eyebrow">Create</p>
          <h2 className="admin-categories-section-title">Add New Category</h2>
        </div>

        <form className="admin-categories-form" onSubmit={handleCreateCategory}>
          <div className="admin-categories-field-grid">
            <div className="admin-categories-field">
              <label className="admin-categories-label">Name</label>
              <input
                type="text"
                className="admin-categories-input"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  setName(value);
                  if (!slug.trim()) {
                    setSlug(makeSlug(value));
                  }
                }}
              />
            </div>

            <div className="admin-categories-field">
              <label className="admin-categories-label">Slug</label>
              <input
                type="text"
                className="admin-categories-input"
                placeholder="category-slug"
                value={slug}
                onChange={(e) => setSlug(makeSlug(e.target.value))}
              />
            </div>
          </div>

          <div className="admin-categories-field">
            <label className="admin-categories-label">Description</label>
            <textarea
              className="admin-categories-textarea"
              placeholder="Write a short category description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="admin-categories-field">
            <label className="admin-categories-label">Logo URL</label>
            <input
              type="text"
              className="admin-categories-input"
              placeholder="https://example.com/logo.png"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </div>

          {logo.trim() ? (
            <div className="admin-categories-logo-preview">
              <img
                src={logo}
                alt="Category logo preview"
                className="admin-categories-logo-image"
              />
            </div>
          ) : null}

          <div className="admin-categories-form-actions">
            <button
              type="submit"
              className="admin-categories-btn"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-categories-list-section">
        <div className="admin-categories-section-head">
          <p className="admin-categories-section-eyebrow">Manage</p>
          <h2 className="admin-categories-section-title">
            All Categories ({categories.length})
          </h2>
        </div>

        <div className="admin-categories-list">
          {categories.length > 0 ? (
            categories.map((category) => {
              const isEditing = editingId === category.id;

              return (
                <div key={category.id} className="admin-categories-card">
                  {isEditing ? (
                    <>
                      <div className="admin-categories-edit-grid">
                        <div className="admin-categories-field">
                          <label className="admin-categories-label">Name</label>
                          <input
                            type="text"
                            className="admin-categories-input"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                        </div>

                        <div className="admin-categories-field">
                          <label className="admin-categories-label">Slug</label>
                          <input
                            type="text"
                            className="admin-categories-input"
                            value={editSlug}
                            onChange={(e) => setEditSlug(makeSlug(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="admin-categories-field">
                        <label className="admin-categories-label">
                          Description
                        </label>
                        <textarea
                          className="admin-categories-textarea"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                      </div>

                      <div className="admin-categories-field">
                        <label className="admin-categories-label">Logo URL</label>
                        <input
                          type="text"
                          className="admin-categories-input"
                          value={editLogo}
                          onChange={(e) => setEditLogo(e.target.value)}
                        />
                      </div>

                      {editLogo.trim() ? (
                        <div className="admin-categories-logo-preview small">
                          <img
                            src={editLogo}
                            alt="Updated logo preview"
                            className="admin-categories-logo-image"
                          />
                        </div>
                      ) : null}

                      <div className="admin-categories-card-actions">
                        <button
                          type="button"
                          className="admin-categories-btn"
                          disabled={updatingId === category.id}
                          onClick={() => handleUpdateCategory(category.id)}
                        >
                          {updatingId === category.id ? "Saving..." : "Save"}
                        </button>

                        <button
                          type="button"
                          className="admin-categories-btn secondary"
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="admin-categories-card-top">
                        <div className="admin-categories-card-main">
                          <div className="admin-categories-name-row">
                            {category.logo ? (
                              <div className="admin-categories-card-logo">
                                <img
                                  src={category.logo}
                                  alt={category.name}
                                  className="admin-categories-card-logo-image"
                                />
                              </div>
                            ) : (
                              <div className="admin-categories-card-logo placeholder">
                                {category.name?.charAt(0)?.toUpperCase() || "C"}
                              </div>
                            )}

                            <div>
                              <h3 className="admin-categories-card-title">
                                {category.name}
                              </h3>
                              <p className="admin-categories-card-slug">
                                {category.slug || "No slug"}
                              </p>
                            </div>
                          </div>

                          <p className="admin-categories-card-description">
                            {category.description || "No description added yet."}
                          </p>
                        </div>

                        <div className="admin-categories-card-meta">
                          <div className="admin-categories-mini-card">
                            <p className="admin-categories-mini-label">Created</p>
                            <h4 className="admin-categories-mini-value">
                              {formatDate(category.createdAt)}
                            </h4>
                          </div>

                          <div className="admin-categories-mini-card">
                            <p className="admin-categories-mini-label">Updated</p>
                            <h4 className="admin-categories-mini-value">
                              {formatDate(category.updatedAt)}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="admin-categories-card-actions">
                        <button
                          type="button"
                          className="admin-categories-btn"
                          onClick={() => handleEditStart(category)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="admin-categories-btn danger"
                          disabled={deletingId === category.id}
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          {deletingId === category.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <div className="admin-categories-empty-card">
              No categories found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}