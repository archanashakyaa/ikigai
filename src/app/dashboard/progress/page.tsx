"use client";

"use client";
import { useState, useEffect, useMemo } from 'react';

// --- Interfaces ---
interface JournalEntry {
    id: number;
    text: string;
    mood: string | null; // '😢', '😟', '😐', '🙂', '😊'
    tags: string[];
    date: string;
    timestamp: number;
}

// --- Helpers ---
const moodValueMap: { [key: string]: number } = {
    '😢': 20, 'Tough': 20,
    '😟': 40, 'Hard': 40,
    '😐': 60, 'Okay': 60,
    '🙂': 80, 'Good': 80,
    '😊': 100, 'Great': 100
};

const getMoodValue = (mood: string | null): number => {
    if (!mood) return 50;
    return moodValueMap[mood] || 50;
};

// --- Components ---

const MentalBattery = ({ level }: { level: number }) => {
    const color = level < 30 ? '#fc8181' : level < 70 ? '#f6ad55' : '#68d391';
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#4a5568' }}>Mental Battery 🔋</div>
            <div style={{
                width: '60px', height: '100px', border: '3px solid #cbd5e0', borderRadius: '8px',
                padding: '4px', position: 'relative', display: 'flex', flexDirection: 'column-reverse'
            }}>
                <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '6px', background: '#cbd5e0', borderRadius: '2px 2px 0 0' }} />
                <div style={{
                    width: '100%', height: `${level}%`, background: color, borderRadius: '4px',
                    transition: 'height 0.5s ease, background 0.5s ease', boxShadow: `0 0 10px ${color}80`
                }} />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: color }}>{level}%</div>
        </div>
    );
};

// Interactive SVG Line Chart
const MoodChart = ({ data, labels }: { data: number[], labels: string[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const width = 600;
    const height = 200;
    const padding = 20;
    const startX = padding;
    const endX = width - padding;
    const maxY = 100;

    if (data.length < 2) {
        return (
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a0aec0', fontStyle: 'italic' }}>
                Not enough data to display chart yet. Start journaling!
            </div>
        );
    }

    const points = data.map((val, idx) => {
        const x = startX + (idx / (data.length - 1)) * (endX - startX);
        const y = height - (val / maxY) * height;
        return { x, y, val, label: labels[idx] };
    });

    const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const areaD = `${pathD} L ${endX},${height} L ${startX},${height} Z`;

    return (
        <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
            <svg width="100%" height={height + 40} viewBox={`0 0 ${width} ${height + 40}`} style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#667eea" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[0, 25, 50, 75, 100].map(gridY => {
                    const y = height - (gridY / maxY) * height;
                    return <line key={gridY} x1={startX} y1={y} x2={endX} y2={y} stroke="#e2e8f0" strokeDasharray="4" />;
                })}
                <path d={areaD} fill="url(#chartGradient)" />
                <path d={pathD} fill="none" stroke="#5a67d8" strokeWidth="3" strokeLinecap="round" />
                {points.map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="15" fill="transparent" style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} />
                        <circle cx={p.x} cy={p.y} r={hoveredIndex === i ? 6 : 4} fill="white" stroke="#5a67d8" strokeWidth="2" style={{ transition: 'all 0.2s' }} />
                        <text x={p.x} y={height + 25} textAnchor="middle" fontSize="12" fill="#718096" style={{ pointerEvents: 'none' }}>{p.label}</text>
                        {hoveredIndex === i && (
                            <g>
                                <rect x={p.x - 30} y={p.y - 45} width="60" height="35" rx="8" fill="#2d3748" />
                                <path d={`M ${p.x - 6},${p.y - 12} L ${p.x + 6},${p.y - 12} L ${p.x},${p.y - 6} Z`} fill="#2d3748" />
                                <text x={p.x} y={p.y - 22} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{Math.round(p.val)}%</text>
                            </g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default function ProgressPage() {
    const [viewMode, setViewMode] = useState<'overview' | 'analytics'>('overview');
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const stored = localStorage.getItem('journalEntries');
        if (stored) {
            try {
                setEntries(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse entries", e);
            }
        }
    }, []);

    // --- Real Analysis Logic ---

    const stats = useMemo(() => {
        const totalEntries = entries.length;
        // Simple XP: 100 XP per entry, plus bonus for length
        const xp = entries.reduce((acc, entry) => acc + 100 + (entry.text.length > 50 ? 50 : 0), 0);

        // Leveling: Level 1 = 0-1000, Level 2 = 1000-2500, etc. (Simple linear-ish scale)
        const nextLevelXp = Math.floor((Math.floor(xp / 1000) + 1) * 1000 * 1.5);
        const level = Math.floor(xp / 1000) + 1;

        let levelName = 'Novice';
        if (level > 2) levelName = 'Explorer';
        if (level > 5) levelName = 'Resilient';
        if (level > 10) levelName = 'Master';

        // Mental Battery: Avg of last 3 entries
        const recentEntries = entries.slice(0, 3);
        let battery = 80; // Default start
        if (recentEntries.length > 0) {
            const sum = recentEntries.reduce((acc, curr) => acc + getMoodValue(curr.mood), 0);
            battery = Math.round(sum / recentEntries.length);
        }

        return { level: levelName, levelNum: level, xp, nextLevelXp, streak: 0, mentalBattery: battery, totalEntries };
    }, [entries]);

    const chartData = useMemo(() => {
        if (!entries.length) return { data: [], labels: [] };
        // Sort by date ascending
        const sorted = [...entries].sort((a, b) => a.timestamp - b.timestamp);

        // Filter by time range
        const now = Date.now();
        const daysToShow = timeRange === '7d' ? 7 : 30;
        const cutoff = now - (daysToShow * 24 * 60 * 60 * 1000);
        const filtered = sorted.filter(e => e.timestamp > cutoff);

        // Group by day (simplified: take the last entry of the day for mood)
        const dailyMoods: { [key: string]: number } = {};

        filtered.forEach(e => {
            const dateKey = new Date(e.timestamp).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
            dailyMoods[dateKey] = getMoodValue(e.mood); // Could average if multiple
        });

        // Ensure we have at least scattered points
        const labels = Object.keys(dailyMoods);
        const data = Object.values(dailyMoods);

        return { labels, data };
    }, [entries, timeRange]);

    const tagAnalysis = useMemo(() => {
        const tagStats: { [key: string]: { count: number, totalMood: number } } = {};

        entries.forEach(e => {
            const val = getMoodValue(e.mood);
            e.tags.forEach(tag => {
                if (!tagStats[tag.replace('#', '')]) {
                    tagStats[tag.replace('#', '')] = { count: 0, totalMood: 0 };
                }
                tagStats[tag.replace('#', '')].count++;
                tagStats[tag.replace('#', '')].totalMood += val;
            });
        });

        // Convert to array and sort
        return Object.entries(tagStats).map(([tag, stat]) => ({
            tag,
            count: stat.count,
            avgMood: Math.round(stat.totalMood / stat.count)
        })).sort((a, b) => b.count - a.count); // Most frequent first
    }, [entries]);

    if (!isClient) return null; // Prevent hydration mismatch on localStorage

    return (
        <div>
            <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                        Analytics & Growth 📊
                    </h1>
                    <p style={{ color: '#718096' }}>Real-time analysis of your mental fitness journey.</p>
                </div>
                <div style={{ background: '#edf2f7', padding: '4px', borderRadius: '12px', display: 'flex' }}>
                    {(['overview', 'analytics'] as const).map(mode => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            style={{
                                padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                                background: viewMode === mode ? 'white' : 'transparent',
                                color: viewMode === mode ? '#2d3748' : '#718096',
                                boxShadow: viewMode === mode ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                textTransform: 'capitalize'
                            }}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </header>

            {/* Overview Section */}
            {viewMode === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Level Card */}
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '32px', borderRadius: '24px',
                            boxShadow: '0 10px 15px -3px rgba(118, 75, 162, 0.3)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ opacity: 0.9, marginBottom: '8px' }}>Level {stats.levelNum}</div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.level}</div>
                                    <div style={{ fontSize: '1rem', opacity: 0.9, marginTop: '4px' }}>
                                        {stats.totalEntries === 0 ? "Start journaling to gain XP!" : "Keep pushing forward!"}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '16px', backdropFilter: 'blur(5px)' }}>
                                    <div style={{ fontSize: '0.9rem' }}>Journal Entries</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>✍️ {stats.totalEntries}</div>
                                </div>
                            </div>
                            <div style={{ marginTop: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px' }}>
                                    <span>XP Progress</span>
                                    <span>{stats.xp} / {stats.nextLevelXp}</span>
                                </div>
                                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px', overflow: 'hidden' }}>
                                    <div style={{ width: `${(stats.xp / stats.nextLevelXp) * 100}%`, height: '100%', background: '#fff', borderRadius: '5px' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Mood Chart */}
                        <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2d3748' }}>Mood Trajectory 📈</h3>
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value as any)}
                                    style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                >
                                    <option value="7d">Last 7 Days</option>
                                    <option value="30d">Last 30 Days</option>
                                </select>
                            </div>
                            <MoodChart data={chartData.data} labels={chartData.labels} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Mental Battery & Insights */}
                        <div style={{
                            background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-around'
                        }}>
                            <MentalBattery level={stats.mentalBattery} />
                            <div style={{ maxWidth: '140px' }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#2d3748' }}>Current Energy</div>
                                <div style={{ fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>
                                    {stats.mentalBattery > 70 ? "You're charging high! Engage in creative hygiene." :
                                        stats.mentalBattery < 40 ? "Low battery. Consider doing a breathing exercise." : "Stable energy. Good for maintenance tasks."}
                                </div>
                            </div>
                        </div>

                        {/* Recent Badges */}
                        <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: '#2d3748' }}>Achievements</h3>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                {stats.totalEntries >= 1 && (
                                    <div style={{ background: '#ebf8ff', padding: '12px', borderRadius: '12px', border: '1px solid #bee3f8', textAlign: 'center', width: '80px' }}>
                                        <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🏁</div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#2c5282' }}>First Step</div>
                                    </div>
                                )}
                                {stats.totalEntries >= 5 && (
                                    <div style={{ background: '#f0fff4', padding: '12px', borderRadius: '12px', border: '1px solid #c6f6d5', textAlign: 'center', width: '80px' }}>
                                        <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>✍️</div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#276749' }}>Journal Pro</div>
                                    </div>
                                )}
                                {stats.mentalBattery > 80 && (
                                    <div style={{ background: '#fffaf0', padding: '12px', borderRadius: '12px', border: '1px solid #feeebc', textAlign: 'center', width: '80px' }}>
                                        <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>⚡</div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#744210' }}>High Energy</div>
                                    </div>
                                )}
                                {stats.totalEntries === 0 && <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>No badges yet. Start recording your journey!</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Analytics Section */}
            {viewMode === 'analytics' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                    {/* Tag Analysis */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', color: '#2d3748' }}>Understand Your Triggers 🧠</h3>
                        <p style={{ marginBottom: '24px', color: '#718096' }}>What topics impact your mood the most?</p>

                        {tagAnalysis.length === 0 ? (
                            <p style={{ color: '#a0aec0' }}>No tags found yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {tagAnalysis.map((item) => (
                                    <div key={item.tag} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ width: '80px', fontWeight: '600', color: '#4a5568' }}>#{item.tag}</div>
                                        <div style={{ flex: 1, height: '8px', background: '#edf2f7', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${item.avgMood}%`,
                                                height: '100%',
                                                background: item.avgMood < 40 ? '#fc8181' : item.avgMood > 70 ? '#68d391' : '#f6ad55'
                                            }} />
                                        </div>
                                        <div style={{ width: '40px', textAlign: 'right', fontWeight: 'bold', fontSize: '0.9rem', color: item.avgMood < 40 ? '#e53e3e' : item.avgMood > 70 ? '#38a169' : '#dd6b20' }}>
                                            {item.avgMood}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignContent: 'start' }}>
                        <div style={{ background: '#ebf8ff', padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>{stats.totalEntries}</div>
                            <div style={{ color: '#2c5282' }}>Total Thoughts Logged</div>
                        </div>
                        <div style={{ background: '#f0fff4', padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38a169' }}>{Math.round(chartData.data.reduce((a, b) => a + b, 0) / (chartData.data.length || 1))}%</div>
                            <div style={{ color: '#276749' }}>Average Mood</div>
                        </div>
                        <div style={{ background: '#fffaf0', padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gridColumn: 'span 2' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#744210', marginBottom: '8px' }}>🤖 AI Observation</div>
                            <p style={{ textAlign: 'center', color: '#975a16', fontSize: '0.95rem' }}>
                                {tagAnalysis.length > 0 ?
                                    `Your mood seems to be lowest when you mention #${tagAnalysis.reduce((min, p) => p.avgMood < min.avgMood ? p : min).tag}. Try to prepare for these situations.` :
                                    "Log more entries with tags to get personalized AI insights!"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
