import React, { useState, useEffect } from 'react';
import { fetchPendingCases, fetchAllCases, fetchStats, reviewCase, logoutAdmin } from '../../api/adminApi';
import { sendVerificationEmail } from '../../services/emailService';
import './AdminDashboard.css';

interface AdminDashboardProps { onLogout: () => void; }

interface CaseData {
  id: number;
  symptoms: string;
  primary_symptom: string;
  patient_info: string | null;      // JSON string
  symptom_duration: string | null;
  ml_prediction: string;
  ml_confidence: number;
  llm_diagnosis: string | null;     // JSON string
  severity: string;
  status: string;
  doctor_comment: string | null;
  created_at: string | null;
}

interface PatientInfo {
  name?: string; age?: string; gender?: string; phone?: string; email?: string;
}

interface Stats { total_cases: number; pending: number; verified: number; rejected: number; }

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GROQ_MODEL   = 'llama-3.3-70b-versatile';

/** Call Groq to generate a brief, friendly doctor comment for the patient email */
async function generateDoctorComment(caseData: CaseData, patientInfo: PatientInfo, adminComment: string): Promise<string> {
  if (!GROQ_API_KEY) return 'Your case has been reviewed by our medical team. ' + adminComment;

  const symptoms = (() => {
    try { return JSON.parse(caseData.symptoms).join(', '); } catch { return caseData.symptoms; }
  })();

  const prompt = `You are a compassionate medical assistant. Write a brief (3-4 sentences), friendly email message for a patient whose symptom assessment has been verified.

Patient: ${patientInfo.name || 'Patient'}, Age: ${patientInfo.age || 'N/A'}, Gender: ${patientInfo.gender || 'N/A'}
Symptoms reported: ${symptoms}
AI Diagnosis: ${caseData.ml_prediction || 'Unknown'}
Severity: ${caseData.severity || 'Unknown'}

The reviewing doctor has explicitly provided this note to be included for the patient: "${adminComment || 'No specific doctor note provided.'}"

Write a concise, reassuring message summarizing the diagnosis and natively incorporating the doctor's specific note. Do not use medical jargon. Do not make specific medical recommendations beyond what the doctor noted. Ensure the tone is empathetic but professional, and strictly avoid repetitive phrasing.`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    })
  });

  if (!res.ok) return 'Your case has been reviewed. Please consult a qualified healthcare professional for further guidance.';
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || 'Your case has been reviewed by our team.';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'patients' | 'analytics'>('overview');
  const [cases, setCases] = useState<CaseData[]>([]);
  const [stats, setStats] = useState<Stats>({ total_cases: 0, pending: 0, verified: 0, rejected: 0 });
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [viewAllCase, setViewAllCase] = useState<CaseData | null>(null);  // "View All" modal
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [adminCommentInput, setAdminCommentInput] = useState('');

  const loadData = async () => {
    setLoading(true); setError('');
    try {
      const [statsData, casesData] = await Promise.all([
        fetchStats(),
        activeTab === 'requests' ? fetchPendingCases() : fetchAllCases()
      ]);
      setStats(statsData); setCases(casesData);
    } catch (err: any) { setError(err.message || 'Failed to load data'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, [activeTab]);

  const parsePatientInfo = (raw: string | null): PatientInfo => {
    if (!raw) return {};
    try { return JSON.parse(raw); } catch { return {}; }
  };

  const parseSymptomsArray = (raw: string): string[] => {
    try {
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [raw];
    } catch { return [raw]; }
  };

  const handleReview = async (caseData: CaseData, status: string) => {
    setVerifying(true);
    try {
      let doctorComment = caseData.doctor_comment || '';

      if (status === 'VERIFIED') {
        const patientInfo = parsePatientInfo(caseData.patient_info);

        // Generate Groq comment incorporating the manual admin comment
        const generatedComment = await generateDoctorComment(caseData, patientInfo, adminCommentInput);
        doctorComment = generatedComment;

        // Send email to patient
        if (patientInfo.email) {
          try {
            await sendVerificationEmail({
              patient_name:   patientInfo.name  || 'Patient',
              patient_email:  patientInfo.email,
              diagnosis:      caseData.ml_prediction || 'Unknown',
              severity:       caseData.severity || 'Unknown',
              doctor_comment: generatedComment,
              case_id:        caseData.id,
            });
          } catch (emailErr) {
            console.warn('Email sending failed:', emailErr);
            // Don't block — still mark case as verified
          }
        }
      }

      await reviewCase(caseData.id, { status, doctor_comment: doctorComment });
      await loadData();
      setSelectedCase(null);
      setAdminCommentInput('');
    } catch (err: any) {
      setError(err.message || 'Failed to review case');
    } finally {
      setVerifying(false);
    }
  };

  const handleLogout = () => { logoutAdmin(); onLogout(); };

  const col = {
    severity: (s: string) => ({ low: '#10b981', moderate: '#f59e0b', high: '#ef4444' }[s?.toLowerCase()] || '#6b7280'),
    status:   (s: string) => ({ pending: '#f59e0b', verified: '#10b981', rejected: '#ef4444' }[s?.toLowerCase()] || '#6b7280'),
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🏥</div><h1>CloverHeal Admin</h1>
          </div>
          <div className="header-actions">
            <div className="admin-info">
              <span className="admin-name">Admin User</span>
              <span className="admin-role">Healthcare Administrator</span>
            </div>
            <button className="btn-secondary logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            {(['overview','requests','patients','analytics'] as const).map(tab => (
              <button key={tab} className={`nav-item ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                <span className="nav-icon">{{ overview:'📊', requests:'📋', patients:'👥', analytics:'📈' }[tab]}</span>
                <span>{{ overview:'Overview', requests:'Pending Cases', patients:'All Cases', analytics:'Analytics' }[tab]}</span>
                {tab === 'requests' && stats.pending > 0 && <span className="badge">{stats.pending}</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="dashboard-main">
          {error && <div className="error-message" style={{margin:'1rem',padding:'1rem',background:'#fee2e2',borderRadius:'8px',color:'#dc2626'}}>{error}</div>}

          {loading ? (
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh',fontSize:'1.2rem',color:'#6b7280'}}>Loading...</div>
          ) : (
            <>
              {/* Overview */}
              {activeTab === 'overview' && (
                <div className="overview-section">
                  <h2>Dashboard Overview</h2>
                  <div className="stats-grid">
                    {[
                      { icon:'📝', bg:'#e0f2fe', val: stats.total_cases, label:'Total Cases' },
                      { icon:'⏳', bg:'#fef3c7', val: stats.pending,     label:'Pending Review' },
                      { icon:'✅', bg:'#dbeafe', val: stats.verified,    label:'Verified' },
                      { icon:'❌', bg:'#fee2e2', val: stats.rejected,    label:'Rejected' },
                    ].map(s => (
                      <div key={s.label} className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: s.bg }}>{s.icon}</div>
                        <div className="stat-content"><h3>{s.val}</h3><p>{s.label}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className="recent-activity">
                    <h3>Recent Cases</h3>
                    <div className="activity-list">
                      {cases.slice(0,5).map(c => (
                        <div key={c.id} className="activity-item">
                          <div className="activity-icon">📋</div>
                          <div className="activity-content">
                            <p><strong>Case #{c.id}</strong> — {c.ml_prediction || 'Pending analysis'}</p>
                            <span className="activity-time">{c.created_at?.split('T')[0] || 'N/A'}</span>
                          </div>
                          <span className="status-badge" style={{ backgroundColor: col.status(c.status) }}>{c.status}</span>
                        </div>
                      ))}
                      {cases.length === 0 && <p style={{color:'#6b7280',padding:'1rem'}}>No cases yet</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Pending / All Cases Table */}
              {(activeTab === 'requests' || activeTab === 'patients') && (
                <div className="requests-section">
                  <div className="section-header">
                    <h2>{activeTab === 'requests' ? 'Pending Cases' : 'All Cases'}</h2>
                  </div>
                  <div className="requests-table">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th><th>Patient</th><th>Prediction</th><th>Confidence</th>
                          <th>Severity</th><th>Status</th><th>Date</th><th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cases.map(c => {
                          const pi = parsePatientInfo(c.patient_info);
                          return (
                            <tr key={c.id}>
                              <td>#{c.id}</td>
                              <td className="patient-name">{pi.name || '—'}</td>
                              <td>{c.ml_prediction || '—'}</td>
                              <td>{c.ml_confidence ? `${c.ml_confidence.toFixed(1)}%` : '—'}</td>
                              <td><span className="severity-badge" style={{ backgroundColor: col.severity(c.severity) }}>{c.severity || '—'}</span></td>
                              <td><span className="status-badge" style={{ backgroundColor: col.status(c.status) }}>{c.status}</span></td>
                              <td>{c.created_at?.split('T')[0] || '—'}</td>
                              <td style={{display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
                                <button className="btn-view" onClick={() => setViewAllCase(c)}>View&nbsp;All</button>
                                {c.status === 'PENDING' && (
                                  <button className="btn-view" style={{background:'#dcfce7',color:'#166534'}}
                                    onClick={() => setSelectedCase(c)}>Review</button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {cases.length === 0 && <p style={{textAlign:'center',color:'#6b7280',padding:'2rem'}}>No cases found</p>}
                  </div>
                </div>
              )}

              {/* Analytics */}
              {activeTab === 'analytics' && (
                <div className="analytics-section">
                  <h2>Analytics &amp; Reports</h2>
                  <div className="coming-soon">
                    <div className="coming-soon-icon">📈</div>
                    <h3>Analytics Dashboard</h3>
                    <p>Detailed analytics and reporting features coming soon</p>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ── View All modal (full case details) ── */}
      {viewAllCase && (() => {
        const pi = parsePatientInfo(viewAllCase.patient_info);
        const symptoms = parseSymptomsArray(viewAllCase.symptoms);
        return (
          <div className="modal-overlay" onClick={() => setViewAllCase(null)}>
            <div className="modal-content modal-wide" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Case #{viewAllCase.id} — Full Details</h3>
                <button className="close-btn" onClick={() => setViewAllCase(null)}>×</button>
              </div>
              <div className="modal-body">

                {/* Patient Info */}
                <div className="detail-section">
                  <h4>👤 Patient Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item"><label>Name:</label><span>{pi.name || '—'}</span></div>
                    <div className="detail-item"><label>Age:</label><span>{pi.age || '—'}</span></div>
                    <div className="detail-item"><label>Gender:</label><span>{pi.gender || '—'}</span></div>
                    <div className="detail-item"><label>Phone:</label><span>{pi.phone || '—'}</span></div>
                    <div className="detail-item"><label>Email:</label><span>{pi.email || '—'}</span></div>
                    <div className="detail-item"><label>Duration:</label><span>{viewAllCase.symptom_duration || '—'}</span></div>
                  </div>
                </div>

                {/* Symptoms */}
                <div className="detail-section">
                  <h4>🩺 Reported Symptoms ({symptoms.length})</h4>
                  <div className="symptom-tags">
                    {symptoms.map((s, i) => {
                      const label = s.includes('_') ? s.split('_').slice(1).join(' ') : s;
                      return <span key={i} className="symptom-tag">{label}</span>;
                    })}
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="detail-section">
                  <h4>🤖 AI Analysis</h4>
                  <div className="detail-grid">
                    <div className="detail-item"><label>Prediction:</label><span>{viewAllCase.ml_prediction || '—'}</span></div>
                    <div className="detail-item"><label>Confidence:</label><span>{viewAllCase.ml_confidence ? `${viewAllCase.ml_confidence.toFixed(1)}%` : '—'}</span></div>
                    <div className="detail-item"><label>Severity:</label>
                      <span className="severity-badge" style={{ backgroundColor: col.severity(viewAllCase.severity) }}>{viewAllCase.severity || '—'}</span>
                    </div>
                    <div className="detail-item"><label>Status:</label>
                      <span className="status-badge" style={{ backgroundColor: col.status(viewAllCase.status) }}>{viewAllCase.status}</span>
                    </div>
                  </div>
                </div>

                {viewAllCase.doctor_comment && (
                  <div className="detail-section">
                    <h4>💬 Doctor Comment</h4>
                    <p>{viewAllCase.doctor_comment}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setViewAllCase(null)}>Close</button>
                {viewAllCase.status === 'PENDING' && (
                  <>
                    <button className="btn-primary" onClick={() => { setViewAllCase(null); setSelectedCase(viewAllCase); }}>
                      Open Review
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Review / Verify modal ── */}
      {selectedCase && (
        <div className="modal-overlay" onClick={() => !verifying && setSelectedCase(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Review Case #{selectedCase.id}</h3>
              <button className="close-btn" onClick={() => setSelectedCase(null)} disabled={verifying}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h4>AI Analysis</h4>
                <div className="detail-grid">
                  <div className="detail-item"><label>Prediction:</label><span>{selectedCase.ml_prediction || '—'}</span></div>
                  <div className="detail-item"><label>Confidence:</label><span>{selectedCase.ml_confidence ? `${selectedCase.ml_confidence.toFixed(1)}%` : '—'}</span></div>
                  <div className="detail-item"><label>Severity:</label>
                    <span className="severity-badge" style={{ backgroundColor: col.severity(selectedCase.severity) }}>{selectedCase.severity}</span>
                  </div>
                  <div className="detail-item"><label>Status:</label>
                    <span className="status-badge" style={{ backgroundColor: col.status(selectedCase.status) }}>{selectedCase.status}</span>
                  </div>
                </div>
              </div>
              {(() => {
                const pi = parsePatientInfo(selectedCase.patient_info);
                return pi.name ? (
                  <div className="detail-section mt-4">
                    <h4>Patient</h4>
                    <p>{pi.name} &bull; {pi.age}y &bull; {pi.gender} &bull; {pi.email}</p>
                  </div>
                ) : null;
              })()}
              <div className="detail-section" style={{marginTop:'1.5rem'}}>
                <h4>Custom Doctor Note (Optional)</h4>
                <textarea 
                  value={adminCommentInput}
                  onChange={(e) => setAdminCommentInput(e.target.value)}
                  placeholder="E.g. 'Please schedule an ECG immediately.' This note will be natively integrated into the generated patient email."
                  style={{width:'100%', padding:'0.75rem', border:'1px solid #d1d5db', borderRadius:'8px', marginTop:'0.5rem', fontFamily:'inherit'}}
                  rows={3}
                  disabled={verifying}
                />
              </div>
              {verifying && (
                <div style={{textAlign:'center',padding:'1rem',color:'#6b7280'}}>
                  ⏳ Generating AI comment &amp; sending email…
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedCase(null)} disabled={verifying}>Close</button>
              {selectedCase.status === 'PENDING' && (
                <>
                  <button className="btn-primary" disabled={verifying}
                    onClick={() => handleReview(selectedCase, 'VERIFIED')}>
                    {verifying ? '⏳ Verifying…' : '✅ Verify & Email Patient'}
                  </button>
                  <button className="btn-secondary" disabled={verifying}
                    style={{ backgroundColor: '#ef4444', color: 'white' }}
                    onClick={() => handleReview(selectedCase, 'REJECTED')}>
                    ❌ Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
