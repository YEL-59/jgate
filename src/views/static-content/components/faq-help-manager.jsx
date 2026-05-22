"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Power, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationModal } from "./delete-confirmation-modal";
import { toast } from "sonner";
import {
  getFaqOrHelpData,
  createFaqOrHelpData,
  updateFaqOrHelpData,
  deleteFaqOrHelpData,
  getFaqOrHelpDataById,
  toggleFaqOrHelpStatus,
} from "@/services/dashboard/faq-help";

export function FaqHelpManager({ type, title }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItemData, setViewingItemData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    status: "active",
  });
  const [saving, setSaving] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const apiType = type === "faq" ? "faq" : "help-center";

  const fetchData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    const token = localStorage.getItem("token");
    const res = await getFaqOrHelpData(token, apiType);
    if (res?.success) {
      setData(res.data || []);
    } else {
      toast.error(res?.message || `Failed to fetch ${title}`);
    }
    if (showLoading) setLoading(false);
  };

  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiType]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        question: item.question || "",
        answer: item.answer || "",
        status: item.status || "active",
      });
    } else {
      setEditingItem(null);
      setFormData({ question: "", answer: "", status: "active" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ question: "", answer: "", status: "active" });
  };

  const handleViewDetails = async (item) => {
    setIsFetchingDetails(true);
    const token = localStorage.getItem("token");
    const res = await getFaqOrHelpDataById(token, apiType, item.id);

    if (res?.success && res?.data) {
      setViewingItemData({
        ...res.data,
        fallbackCreatedAt: item.created_at,
        fallbackUpdatedAt: item.updated_at,
      });
      setIsViewModalOpen(true);
    } else {
      toast.error(res?.message || "Failed to fetch details");
      // Fallback to local data
      setViewingItemData(item);
      setIsViewModalOpen(true);
    }
    setIsFetchingDetails(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("token");

    let res;
    if (editingItem) {
      res = await updateFaqOrHelpData(token, apiType, editingItem.id, formData);
    } else {
      res = await createFaqOrHelpData(token, apiType, formData);
    }

    if (res?.success) {
      toast.success(res.message || `${title} saved successfully!`);
      handleCloseModal();
      fetchData(false);
    } else {
      toast.error(res?.message || `Failed to save ${title}`);
    }
    setSaving(false);
  };

  const handleToggleStatus = async (item) => {
    const token = localStorage.getItem("token");
    const res = await toggleFaqOrHelpStatus(token, apiType, item.id);
    if (res?.success) {
      toast.success(res.message || "Status updated successfully!");
      fetchData(false);
    } else {
      toast.error(res?.message || "Failed to update status");
    }
  };

  const handleDelete = (item) => {
    setDeletingItem(item);
  };

  const confirmDelete = async (item) => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await deleteFaqOrHelpData(token, apiType, item.id);
      if (res?.success) {
        toast.success(res.message || "Item deleted successfully!");
        fetchData(false);
      } else {
        toast.error(res?.message || "Failed to delete item");
      }
    } finally {
      setIsDeleting(false);
      setDeletingItem(null);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1a1a1a",
            margin: 0,
          }}
        >
          Manage {title}
        </h2>
        <Button
          onClick={() => handleOpenModal()}
          style={{
            backgroundColor: "#301960",
            color: "white",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Plus size={16} /> Add New
        </Button>
      </div>

      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "40px" }}
        >
          <div style={{ display: "flex", gap: "6px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#301960",
                borderRadius: "50%",
                animation: "bounce 1.4s infinite ease-in-out both",
                animationDelay: "0s",
              }}
            ></div>
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#301960",
                borderRadius: "50%",
                animation: "bounce 1.4s infinite ease-in-out both",
                animationDelay: "0.2s",
              }}
            ></div>
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#301960",
                borderRadius: "50%",
                animation: "bounce 1.4s infinite ease-in-out both",
                animationDelay: "0.4s",
              }}
            ></div>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#666",
            border: "1px dashed #e5e5e5",
            borderRadius: "8px",
          }}
        >
          No items found. Click "Add New" to create one.
        </div>
      ) : (
        <div
          className="custom-scrollbar"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxHeight: "500px",
            overflowY: "auto",
            paddingRight: "4px",
          }}
        >
          <style>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 8px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: #F9FAFB;
                            border-radius: 4px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: #d1d5db;
                            border-radius: 4px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: #9ca3af;
                        }
                    `}</style>
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor:
                  item.status === "inactive" ? "#f9fafb" : "white",
                opacity: item.status === "inactive" ? 0.8 : 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1a1a1a",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {item.question}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#4b5563",
                      margin: 0,
                      lineHeight: "1.5",
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleViewDetails(item)}
                    title="View Details"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: "#8b5cf6",
                    }}
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(item)}
                    title={item.status === "active" ? "Deactivate" : "Activate"}
                    style={{
                      position: "relative",
                      width: "40px",
                      height: "22px",
                      borderRadius: "20px",
                      backgroundColor:
                        item.status === "active" ? "#10b981" : "#e5e7eb",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      padding: "3px",
                      marginTop: "2px",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        transform:
                          item.status === "active"
                            ? "translateX(18px)"
                            : "translateX(0)",
                        transition: "transform 0.3s ease",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => handleOpenModal(item)}
                    title="Edit"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: "#3b82f6",
                    }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    title="Delete"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: "#ef4444",
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "0 0 20px 0",
              }}
            >
              {editingItem ? "Edit" : "Add"}{" "}
              {title.includes("FAQ") ? "FAQ" : "Item"}
            </h3>

            <form
              onSubmit={handleSave}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Question
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "6px",
                    outline: "none",
                  }}
                  placeholder="Enter question"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Answer
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  required
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "6px",
                    outline: "none",
                    resize: "vertical",
                  }}
                  placeholder="Enter answer"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "6px",
                    outline: "none",
                    backgroundColor: "white",
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "16px",
                }}
              >
                <Button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    backgroundColor: "#f3f4f6",
                    color: "#4b5563",
                    border: "none",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  style={{
                    backgroundColor: "#301960",
                    color: "white",
                    border: "none",
                  }}
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && viewingItemData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
                View Details
              </h3>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor:
                    viewingItemData.status === "active" ? "#d1fae5" : "#f3f4f6",
                  color:
                    viewingItemData.status === "active" ? "#059669" : "#6b7280",
                }}
              >
                {viewingItemData.status || "Unknown"}
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <h4
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: "0 0 4px 0",
                  }}
                >
                  Question
                </h4>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#1a1a1a",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  {viewingItemData.question}
                </p>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: "0 0 4px 0",
                  }}
                >
                  Answer
                </h4>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#4b5563",
                    margin: 0,
                    lineHeight: "1.6",
                  }}
                >
                  {viewingItemData.answer}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  marginTop: "12px",
                  paddingTop: "16px",
                  borderTop: "1px solid #e5e5e5",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Created At
                  </h4>
                  <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                    {viewingItemData.created_at ||
                    viewingItemData.fallbackCreatedAt
                      ? new Date(
                          viewingItemData.created_at ||
                            viewingItemData.fallbackCreatedAt,
                        ).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Updated At
                  </h4>
                  <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                    {viewingItemData.updated_at ||
                    viewingItemData.fallbackUpdatedAt
                      ? new Date(
                          viewingItemData.updated_at ||
                            viewingItemData.fallbackUpdatedAt,
                        ).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <Button
                  onClick={() => setIsViewModalOpen(false)}
                  style={{
                    backgroundColor: "#f3f4f6",
                    color: "#4b5563",
                    border: "none",
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!deletingItem}
        title={`Delete ${title.includes("FAQ") ? "FAQ" : "Item"}`}
        message={`Are you sure you want to delete this ${title.includes("FAQ") ? "FAQ" : "item"}? This action cannot be undone.`}
        onConfirm={() => confirmDelete(deletingItem)}
        onCancel={() => setDeletingItem(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
