"use client";

import { useState, ChangeEvent } from "react";

interface EspacePanelProps {
  setActiveTab: (tab: "dashboard" | "settings") => void;
}

export default function EspacePanel({ setActiveTab }: EspacePanelProps) {
  // États pour les informations du profil
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nom: "Kouassi",
    prenom: "jean",
    email: "jean.kouassi@exemple.com"
  });

  // États pour l'image et fichiers
  const [fileName, setFileName] = useState("Aucun fichier choisi");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulation de sauvegarde
    console.log("Données sauvegardées :", profile);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #1a0f30 0%, #0c0814 100%)",
      color: "white",
      fontFamily: "sans-serif",
      padding: "20px"
    }}>
      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 40px",
        borderBottom: "1px solid #ffffff10"
      }}>
        <div style={logoStyle}>S</div>
        <button onClick={() => setActiveTab("dashboard")} style={backButtonStyle}>
          ← Retour au Dashboard
        </button>
      </div>

      <h1 style={mainTitleStyle}>Mon espace</h1>

      <div style={containerStyle}>
        
        {/* --- CARTE 1 : PROFIL --- */}
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Profil</h2>
           
          <div style={{ display: "flex", gap: "30px", marginBottom: "30px", flexWrap: "wrap" }}>
            {/* Avatar Preview */}
            <div style={avatarContainerStyle}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={avatarImageStyle} />
              ) : (
                <span style={{ fontSize: "32px", color: "#6d28d9" }}>
                  {profile.prenom[0]}{profile.nom[0]}
                </span>
              )}
            </div>

            {/* Champs d'info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", flex: 1, minWidth: "250px" }}>
              <div>
                <span style={labelStyle}>NOM</span>
                {isEditing ? (
                  <input name="nom" value={profile.nom} onChange={handleInputChange} style={inputStyle} />
                ) : (
                  <div style={infoFieldStyle}>{profile.nom}</div>
                )}
              </div>
              <div>
                <span style={labelStyle}>PRÉNOM</span>
                {isEditing ? (
                  <input name="prenom" value={profile.prenom} onChange={handleInputChange} style={inputStyle} />
                ) : (
                  <div style={infoFieldStyle}>{profile.prenom}</div>
                )}
              </div>
              <div>
                <span style={labelStyle}>E-MAIL</span>
                {isEditing ? (
                  <input name="email" type="email" value={profile.email} onChange={handleInputChange} style={inputStyle} />
                ) : (
                  <div style={infoFieldStyle}>{profile.email}</div>
                )}
              </div>
            </div>
          </div>

          {/* Section Upload Photo (Visible seulement en mode édition) */}
          {isEditing && (
            <div style={{ marginBottom: "30px", borderTop: "1px solid #ffffff10", paddingTop: "20px" }}>
              <span style={labelStyle}>CHANGER LA PHOTO DE PROFIL</span>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px" }}>
                <input type="file" id="profile_pic" onChange={handleFileChange} style={{ display: "none" }} accept="image/*" />
                <label htmlFor="profile_pic" style={violetButtonStyle}>Choisir une image</label>
                <span style={{ color: "#ffffff60", fontSize: "12px" }}>{fileName}</span>
              </div>
            </div>
          )}

          {/* Boutons d'Action */}
          <div style={{ textAlign: "center" }}>
            {isEditing ? (
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button onClick={handleSave} style={violetButtonStyle}>Enregistrer</button>
                <button onClick={() => setIsEditing(false)} style={greyButtonStyle}>Annuler</button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} style={greyButtonStyle}>Modifier le profil</button>
            )}
          </div>
        </div>

        {/* --- CARTE 2 : NOTIFICATIONS --- */}
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Notifications</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={notificationItemStyle}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>Sécurité</span>
                <span style={badgeStyle}>Nouveau</span>
              </div>
              <p style={notifTextStyle}>Connexion réussie depuis un nouvel appareil.</p>
            </div>
          </div>
        </div>

        {/* --- CARTE 3 : MESSAGES --- */}
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Messages</h2>
          <div style={messageBoxStyle}>
            <h4 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>Équipe Synthèse</h4>
            <p style={{ margin: 0, color: "#ffffff80", fontSize: "14px" }}>
              Bienvenue sur votre espace personnel.
            </p>
          </div>
          <div style={{ color: "#ffffff40", fontSize: "14px", textAlign: "center", padding: "10px 0" }}>
            Pas d'autre message
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// OBJETS DE STYLE (Uniforme)
// ==========================================

const logoStyle = {
  width: "40px", height: "40px", backgroundColor: "#8b5cf6",
  borderRadius: "8px", display: "flex", justifyContent: "center",
  alignItems: "center", fontWeight: "bold" as const
};

const backButtonStyle = {
  color: "#ffffff80", background: "none", border: "none", cursor: "pointer", fontSize: "14px"
};

const mainTitleStyle = {
  textAlign: "center" as const, fontSize: "32px", margin: "60px 0", fontWeight: "600"
};

const containerStyle = {
  display: "flex", flexDirection: "column" as const, gap: "30px",
  alignItems: "center", maxWidth: "600px", margin: "0 auto", paddingBottom: "50px"
};

const cardStyle = {
  backgroundColor: "#161021", width: "100%", padding: "30px",
  borderRadius: "20px", border: "1px solid #4f46e520", boxShadow: "0 10px 30px #00000040"
};

const cardTitleStyle = { fontSize: "20px", fontWeight: "600", marginTop: "0", marginBottom: "30px" };

const labelStyle = { display: "block", color: "#ffffff50", fontSize: "11px", letterSpacing: "1px", marginBottom: "5px" };

const infoFieldStyle = { fontSize: "16px", color: "white", padding: "8px 0", borderBottom: "1px solid #ffffff05" };

const inputStyle = {
  width: "100%", backgroundColor: "#0c0814", border: "1px solid #4f46e540",
  borderRadius: "8px", padding: "8px 12px", color: "white", fontSize: "14px", outline: "none"
};

const avatarContainerStyle = {
  width: "120px", height: "120px", backgroundColor: "#2a1b4d",
  borderRadius: "16px", display: "flex", justifyContent: "center",
  alignItems: "center", border: "1px solid #4f46e540", overflow: "hidden" as const
};

const avatarImageStyle = { width: "100%", height: "100%", objectFit: "cover" as const };

const violetButtonStyle = {
  backgroundColor: "#6d28d9", color: "white", padding: "10px 20px",
  borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer", border: "none"
};

const greyButtonStyle = {
  backgroundColor: "#312e38", color: "white", padding: "10px 20px",
  borderRadius: "8px", fontSize: "14px", fontWeight: "600", border: "1px solid #ffffff15", cursor: "pointer"
};

const notificationItemStyle = {
  backgroundColor: "#2a1b4d30", padding: "15px", borderRadius: "12px", border: "1px solid #4f46e510"
};

const notifTextStyle = { margin: "5px 0 0 0", color: "#ffffff60", fontSize: "13px" };

const badgeStyle = {
  backgroundColor: "#6d28d9", color: "white", fontSize: "10px", padding: "2px 8px", borderRadius: "20px"
};

const messageBoxStyle = {
  backgroundColor: "#2a1b4d", padding: "20px", borderRadius: "12px",
  border: "1px solid #4f46e540", marginBottom: "20px"
};