"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

interface FormFields {
  nom: string;
  prenom: string;
  email: string;
  message: string;
}

interface FieldErrors {
  nom?: string;
  prenom?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactCTA() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fields, setFields] = useState<FormFields>({
    nom: "",
    prenom: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    if (!fields.nom.trim()) errors.nom = t("form.requiredField");
    if (!fields.prenom.trim()) errors.prenom = t("form.requiredField");
    if (!fields.email.trim()) {
      errors.email = t("form.requiredField");
    } else if (!EMAIL_REGEX.test(fields.email)) {
      errors.email = t("form.invalidEmail");
    }
    if (!fields.message.trim()) errors.message = t("form.requiredField");
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setErrorMessage(data.error || t("form.errorGeneric"));
        setStatus("error");
      }
    } catch {
      setErrorMessage(t("form.errorGeneric"));
      setStatus("error");
    }
  };

  const handleRetry = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  const inputBase =
    "w-full rounded-[12px] bg-white/10 border border-white/20 px-4 py-3 text-canvas text-[16px] font-[330] placeholder:text-canvas/30 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors";
  const labelBase = "block text-[12px] font-mono uppercase tracking-[0.06em] text-canvas/50 mb-1.5";
  const errorBase = "mt-1 text-[12px] text-[oklch(70%_0.2_25)]";

  return (
    <section id="contact" className="py-6 px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="rounded-[24px] bg-navy px-8 py-16 md:px-14 md:py-20">

          {/* Eyebrow */}
          <p className="font-eyebrow text-canvas/40 mb-8">{t("eyebrow")}</p>

          {/* Headline */}
          <h2 className="font-display-lg text-canvas mb-4 max-w-[18ch]">
            {t("title")}
          </h2>

          {/* Sous-titre */}
          <p className="text-[18px] font-[330] text-canvas/60 leading-[1.4] tracking-[-0.01em] mb-12 max-w-[40ch]">
            {t("subtitle")}
          </p>

          {status === "success" ? (
            <div className="rounded-[16px] bg-white/10 border border-white/20 px-8 py-10 max-w-[540px]">
              <p className="text-[20px] font-[540] text-canvas mb-2">
                {t("form.successTitle")}
              </p>
              <p className="text-[16px] font-[330] text-canvas/60 leading-[1.5]">
                {t("form.successBody")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="max-w-[540px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {/* Prénom */}
                <div>
                  <label htmlFor="prenom" className={labelBase}>
                    {t("form.prenom")}
                  </label>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    autoComplete="given-name"
                    placeholder={t("form.prenomPlaceholder")}
                    value={fields.prenom}
                    onChange={handleChange}
                    className={inputBase}
                    disabled={status === "loading"}
                  />
                  {fieldErrors.prenom && (
                    <p className={errorBase}>{fieldErrors.prenom}</p>
                  )}
                </div>

                {/* Nom */}
                <div>
                  <label htmlFor="nom" className={labelBase}>
                    {t("form.nom")}
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    autoComplete="family-name"
                    placeholder={t("form.nomPlaceholder")}
                    value={fields.nom}
                    onChange={handleChange}
                    className={inputBase}
                    disabled={status === "loading"}
                  />
                  {fieldErrors.nom && (
                    <p className={errorBase}>{fieldErrors.nom}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="email" className={labelBase}>
                  {t("form.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("form.emailPlaceholder")}
                  value={fields.email}
                  onChange={handleChange}
                  className={inputBase}
                  disabled={status === "loading"}
                />
                {fieldErrors.email && (
                  <p className={errorBase}>{fieldErrors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-8">
                <label htmlFor="message" className={labelBase}>
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t("form.messagePlaceholder")}
                  value={fields.message}
                  onChange={handleChange}
                  className={`${inputBase} resize-none`}
                  disabled={status === "loading"}
                />
                {fieldErrors.message && (
                  <p className={errorBase}>{fieldErrors.message}</p>
                )}
              </div>

              {status === "error" && errorMessage && (
                <p className="mb-5 text-[14px] text-[oklch(70%_0.2_25)]">
                  {errorMessage}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center px-7 py-3 rounded-[50px] bg-canvas text-ink text-[17px] font-[480] tracking-[-0.01em] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? t("form.submitting") : t("form.submit")}
                </button>

                {status === "error" && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center justify-center px-7 py-3 rounded-[50px] border border-canvas/30 text-canvas text-[17px] font-[480] tracking-[-0.01em] hover:border-canvas/60 transition-colors"
                  >
                    {t("form.retry")}
                  </button>
                )}

                <a
                  href="https://www.linkedin.com/in/julie-t-542a6215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-[50px] border border-canvas/30 text-canvas text-[17px] font-[480] tracking-[-0.01em] hover:border-canvas/60 transition-colors"
                >
                  {t("linkedin")} ↗
                </a>
              </div>
            </form>
          )}

          {/* Email discret */}
          <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.06em] text-canvas/25">
            julie.tyrode@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
