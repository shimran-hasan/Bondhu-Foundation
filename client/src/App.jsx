
import React, { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import {
  Activity,
  BadgeCheck,
  Droplet,
  HeartPulse,
  LogOut,
  Plus,
  Printer,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  X,
  ShoppingBag,
} from "lucide-react";

import api from "./api";

const empty = {
  donorId: "",
  name: "",
  phone: "",
  bloodGroup: "B+",
  membership: "Silver",
  joinDate: new Date().toISOString().slice(0, 10),
  expiryDate: "",
  photoUrl: "",
  signature: "Authorized Signature",
  status: "Active",
  notes: "",
};

const org = {
  name: "bondhu Foundation",
  slogan: "Give blood, save life.",
  phone: "09606116000",
  website: "www.ebondhu.com.bd",
  terms: [
    "This card is the identity of a registered donor of Bondhu Foundation.",
    "This card cannot be transferred to anyone else.",
    "Please ensure your health condition before donating blood.",
    "No one can be forced to donate blood.",
    "Scan the QR Code to verify the donor's identity.",
    "If you lose this card, please inform the Foundation.",
    "Providing false information may result in cancellation.",
    "This card is valid for 1 year from the join date.",
  ],
};

const fmt = (v) =>
  v
    ? new Date(v).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@bondhu.local");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();

    setBusy(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("bondhu_token", data.token);
      onLogin(data.admin);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not connect to API. Check server and MongoDB."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <div className="logo">✦</div>

        <p className="kicker">BONDHU FOUNDATION</p>

        <h1>Admin sign in</h1>

        <p className="muted">
          Sign in to manage blood donor records.
        </p>

        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter admin password"
          />
        </label>

        {error && <div className="error">{error}</div>}

        <button className="btn primary full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in to dashboard"}
        </button>

        <small className="muted">
          Create your admin account with the server seed command.
        </small>

        <a className="text-button" href="/studio">
          Customer? Design and order an ID card →
        </a>
      </form>
    </div>
  );
}

function DonorCard({ donor, side }) {
  const qr = JSON.stringify({
    donorId: donor.donorId,
    name: donor.name,
    bloodGroup: donor.bloodGroup,
    status: donor.status,
  });

  return (
    <div className={`id-card ${side}`}>
      <div className="card-head">
        <div className="brand-symbol">✦</div>

        <div>
          <b>
            <span>bondhu</span> Foundation
          </b>
          <small>{org.slogan}</small>
        </div>

        {side === "front" && (
          <div className="seal">
            {donor.membership}
            <small>MEMBER</small>
          </div>
        )}
      </div>

      {side === "front" ? (
        <>
          <div className="ribbon">Blood Donor ID Card</div>

          <div className="card-main">
            <div className="portrait">
              {donor.photoUrl ? (
                <img src={donor.photoUrl} alt="Donor" />
              ) : (
                <Users />
              )}
            </div>

            <div className="drop">
              <Droplet fill="#c51e2b" size={72} />
              <b>{donor.bloodGroup}</b>
              <small>Blood Group</small>
            </div>

            <Activity className="pulse" />
          </div>

          <div className="card-id">{donor.donorId}</div>
          <div className="card-name">●　{donor.name}</div>
          <div className="card-phone">☎　{donor.phone}</div>

          <div className="signature">
            {donor.signature}
            <small>Authorized Signature</small>
          </div>
        </>
      ) : (
        <>
          <div className="qr">
            <QRCodeSVG value={qr} size={126} level="H" />
          </div>

          <div className="dates">
            <span>
              Join Date <b>{fmt(donor.joinDate)}</b>
            </span>

            <span>
              Expire Date <b>{fmt(donor.expiryDate)}</b>
            </span>
          </div>

          <div className="ribbon">Terms &amp; Conditions</div>

          <ol className="terms">
            {org.terms.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </>
      )}

      <div className="card-footer">
        <span>
          ♡　☎ {org.phone}
          <br />
          　　{org.website}
        </span>

        <i>
          Together for a
          <br />
          Blood-Saving Bangladesh
        </i>
      </div>
    </div>
  );
}
