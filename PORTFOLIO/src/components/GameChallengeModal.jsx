import { useEffect, useMemo, useState } from 'react';

const LINKEDIN_URL = 'https://www.linkedin.com/in/nayak-d/';

const LEVELS = [
  {
    id: 1,
    title: 'Level 1: Core Sequence',
    subtitle: 'Warm-up chamber',
    description: 'Activate the glowing cores in the exact order: B → E → D',
    type: 'collect',
    answer: ['B', 'E', 'D'],
    nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
    difficulty: 'Easy',
  },
  {
    id: 2,
    title: 'Level 2: Dead-End Escape',
    subtitle: 'Maze pressure',
    description: 'Select the route that avoids the trap and reaches the exit.',
    type: 'choice',
    options: ['North', 'East', 'South', 'West'],
    answer: 'South',
    difficulty: 'Hard',
  },
  {
    id: 3,
    title: 'Level 3: Final Lock',
    subtitle: 'Boss chamber',
    description: 'Enter the final passcode to break the vault and reveal your profile access.',
    type: 'text',
    answer: 'NAYAK',
    difficulty: 'Extreme',
  },
];

export default function GameChallengeModal({ isOpen, onClose }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState('');
  const [completed, setCompleted] = useState(false);

  const level = useMemo(() => LEVELS[levelIndex], [levelIndex]);
  const progressValue = ((levelIndex + (completed ? 1 : 0)) / LEVELS.length) * 100;

  useEffect(() => {
    if (!isOpen) {
      setLevelIndex(0);
      setSelectedNodes([]);
      setSelectedChoice('');
      setPasscode('');
      setMessage('');
      setCompleted(false);
    }
  }, [isOpen]);

  const resetCurrentLevel = () => {
    setSelectedNodes([]);
    setSelectedChoice('');
    setPasscode('');
    setMessage('');
  };

  const handleNodeClick = (node) => {
    if (completed) return;
    setMessage('');
    setSelectedNodes((prev) => {
      const next = [...prev, node];
      if (next.length > level.answer.length) {
        return prev;
      }
      return next;
    });
  };

  const handleSubmit = () => {
    if (completed) return;

    if (level.type === 'collect') {
      const isCorrect = selectedNodes.join(',') === level.answer.join(',');
      if (!isCorrect) {
        setMessage('Incorrect sequence. Restart the route and try again.');
        setSelectedNodes([]);
        return;
      }
    }

    if (level.type === 'choice') {
      if (selectedChoice !== level.answer) {
        setMessage('Wrong route. The trap is still active.');
        setSelectedChoice('');
        return;
      }
    }

    if (level.type === 'text') {
      if (passcode.trim().toUpperCase() !== level.answer) {
        setMessage('Invalid passcode. The final gate remains locked.');
        setPasscode('');
        return;
      }
    }

    if (levelIndex === LEVELS.length - 1) {
      setCompleted(true);
      setMessage('Access granted. Redirecting to LinkedIn...');
      setTimeout(() => {
        window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer');
        onClose();
      }, 1200);
      return;
    }

    setMessage('Level cleared. Loading next challenge...');
    setTimeout(() => {
      setLevelIndex((prev) => prev + 1);
      resetCurrentLevel();
      setMessage('');
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#070d1a] shadow-[0_0_45px_rgba(59,130,246,0.25)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_55%)]" />

        <div className="relative p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-400">LevelDevil Challenge</p>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-[0.12em] text-white md:text-3xl">{level.title}</h2>
              <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-slate-400">{level.subtitle}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-200">
                {level.difficulty}
              </span>
              <button
                onClick={onClose}
                className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Exit
              </button>
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-slate-400">
              <span>Progress</span>
              <span>{Math.round(progressValue)}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-900">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-500"
                style={{ width: `${progressValue}%` }}
              />
            </div>
          </div>

          <div className="mb-6 rounded-xl border border-cyan-400/20 bg-black/20 p-4 text-sm text-slate-200">
            {level.description}
          </div>

          {level.type === 'collect' && (
            <div className="mb-6 grid grid-cols-3 gap-3 md:grid-cols-6">
              {level.nodes.map((node) => {
                const isSelected = selectedNodes.includes(node);
                return (
                  <button
                    key={node}
                    onClick={() => handleNodeClick(node)}
                    className={`h-14 rounded-xl border text-sm font-bold uppercase tracking-[0.2em] transition ${isSelected
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                      : 'border-white/10 bg-slate-900/60 text-white/70 hover:border-cyan-400/40 hover:text-cyan-200'
                      }`}
                  >
                    {node}
                  </button>
                );
              })}
            </div>
          )}

          {level.type === 'choice' && (
            <div className="mb-6 grid gap-3 md:grid-cols-2">
              {level.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedChoice(option)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.15em] transition ${selectedChoice === option
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                    : 'border-white/10 bg-slate-900/60 text-white/70 hover:border-cyan-400/40 hover:text-cyan-200'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {level.type === 'text' && (
            <div className="mb-6">
              <input
                type="text"
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
                placeholder="Enter passcode"
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-lg text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5">
            <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Level {levelIndex + 1} / {LEVELS.length}
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetCurrentLevel}
                className="rounded-lg border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-lg bg-cyan-500 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-950 transition hover:bg-cyan-400"
              >
                Unlock
              </button>
            </div>
          </div>

          {message && (
            <div className="mt-4 rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
