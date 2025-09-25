import React, { useEffect, useState } from "react";

const DeepDiveForm = ({
  initialValues = {},
  onChange,
  readOnly = false,
  className = "",
}) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [picture, setPicture] = useState(initialValues.picture || null);
  const [pdfFile, setPdfFile] = useState(initialValues.pdfFile || null);

  useEffect(() => {
    if (onChange) {
      onChange({ title, description, picture, pdfFile });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, picture, pdfFile]);

  return (
    <div
      className={`w-[80%] flex flex-col gap-5 border-2 border-blue-200 p-5 rounded-md bg-blue-50 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-liblack">
          Deep Dive Content
        </h2>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-liblack">Title</h3>
        <input
          type="text"
          placeholder="Deep Dive Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          disabled={readOnly}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-liblack">Description</h3>
        <textarea
          placeholder="Deep Dive Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border text-liblack border-gray-500 outline-none rounded-md p-2 h-32"
          disabled={readOnly}
        />
      </div>

      {/* Picture */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-liblack">Picture</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPicture(e.target.files?.[0] || null)}
          className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          disabled={readOnly}
        />

        {picture && typeof picture === "string" ? (
          <a
            href={picture}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 mt-1 underline"
          >
            View current picture
          </a>
        ) : picture ? (
          <p className="text-sm text-gray-600 mt-1">Selected: {picture.name}</p>
        ) : null}
      </div>

      {/* PDF */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-liblack">PDF</h3>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          className="border text-liblack border-gray-500 outline-none rounded-md p-2"
          disabled={readOnly}
        />

        {pdfFile && typeof pdfFile === "string" ? (
          <a
            href={pdfFile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 mt-1 underline"
          >
            View current PDF
          </a>
        ) : pdfFile ? (
          <p className="text-sm text-gray-600 mt-1">Selected: {pdfFile.name}</p>
        ) : null}
      </div>
    </div>
  );
};

export default DeepDiveForm;
