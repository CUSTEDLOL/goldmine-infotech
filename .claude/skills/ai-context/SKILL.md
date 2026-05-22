Maintains a shared memory/context layer (.ai-context.md) so work can continue seamlessly across Claude Code, GitHub Copilot, and OpenAI Codex when switching AI tools mid-session. Use this skill whenever the user says "save context", "switch to Codex/Copilot", "save my progress", "pick this up later", "context checkpoint", or when a significant milestone is reached (feature implemented, bug fixed, refactor complete). Also trigger proactively at natural stopping points — before a long task ends, after a major file edit, or when the user seems to be wrapping up. The goal is zero-friction AI tool switching: the context file is the handoff.AI Context Skill
Maintains .ai-context.md in the repo root — a structured, human- and AI-readable
handoff file so any AI assistant can immediately understand where work left off.

When to trigger
SignalActionUser says "save context" / "checkpoint"Write/update .ai-context.mdUser says "switching to Codex/Copilot"Write context + print loading instructionsMajor milestone reached (feature done, bug fixed, refactor complete)Auto-update silently, notify userUser says "continue from context" / "load context"Read .ai-context.md and resumeSession start with existing .ai-context.mdOffer to load it

Context file format
Always write .ai-context.md using this exact structure:
markdown# AI Context — {project name}
_Last updated: {ISO timestamp} by {tool: Claude Code | Codex | Copilot}_

## 🎯 Current Goal
{One-paragraph summary of what is being worked on and why}

## 📁 Files Changed
| File | Change | Reason |
|------|--------|--------|
| path/to/file.ts | Added auth middleware | JWT tokens needed for /api routes |
| path/to/other.py | Refactored DB calls | Reduce N+1 queries |

## ✅ Next Steps
- [ ] {Next concrete action}
- [ ] {After that}
- [ ] {Then}

## ⚙️ Context for AI Tools
> Paste this section when starting a new AI session.

You are continuing work on **{project}**. The current goal is: {goal}.
Key files: {comma list of most important files}.
Pick up from: {first next step}.
Do not redo: {what's already done}.

Writing context — step by step

Scan the session — review files touched, goals stated, decisions made
Identify the goal — what was being built/fixed? Write 2-4 sentences
List changed files — use git diff --name-only or recall from session; include WHY each was changed
Write next steps — be specific and ordered; the next step should be something an AI can act on immediately
Write the AI Tools block — this is the paste-ready prompt for Codex/Copilot; keep it under 100 words, self-contained, action-oriented
Write the file — save to {repo_root}/.ai-context.md
Confirm to user — tell them the file is saved and show the "Context for AI Tools" block so they can copy it immediately


Loading context — step by step

Read .ai-context.md from the repo root
Summarize what you found: goal, last tool, key files, next steps
Ask: "Should I pick up from [first next step]?"
Proceed from there — do not repeat work already listed as done


Milestone auto-update rules
Trigger a silent context update (no interruption) when:

A new file is created and written with working code
A function/class is fully implemented and passes tests
A bug fix is confirmed working
A refactor touches 3+ files

After the silent update, say:

"📝 Context checkpoint saved to .ai-context.md"


Tool-specific loading instructions
When the user says they're switching tools, print the relevant block:
Switching to GitHub Copilot (VS Code)
1. Open your repo in VS Code
2. Open .ai-context.md
3. Copy the "Context for AI Tools" block
4. Open Copilot Chat and paste it as your first message
5. Copilot will continue from where Claude left off
Switching to OpenAI Codex (CLI or API)
1. Run: cat .ai-context.md
2. Copy the "Context for AI Tools" block
3. Paste it as the system or first user message in your Codex session
4. Codex will continue from the next steps listed
Returning to Claude Code
1. Run: claude (in your repo)
2. Say: "load context" or "continue from .ai-context.md"
3. Claude will read the file and resume automatically

Edge cases

No git repo: Save .ai-context.md in the current working directory
File already exists: Merge — preserve old next steps that aren't done, update goal and files
Multiple active goals: Create sections per goal, clearly labeled
Sensitive info: Never write API keys, secrets, or passwords into the context file


Example output
See references/example-context.md for a realistic filled-in example.