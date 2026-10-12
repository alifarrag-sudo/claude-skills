# dialect-skill-builder: user config (example)

Copy this file to `user-config.md` in the same folder, or let the skill fill it on first run.
`user-config.md` is git-ignored: your details never get committed.

| Placeholder | What it means | Example |
|---|---|---|
| `{{PROJECT_ROOT}}` | Parent folder where each new dialect project gets its own folder. | `~/dialects` |
| `{{SKILLS_DIR}}` | Where finished skills are installed so the agent loads them. | `~/.claude/skills` |
| `{{TOOL_WEB_SEARCH}}` | Web search and page fetch for the literature, slang and raw-voice research. | Exa MCP, Brave Search, the agent's built-in web search |
| `{{TOOL_SPEECH_TO_TEXT}}` | Local speech-to-text that accepts a language code and a prompt, used by `tools/watch.py` through env `WHISPER_CMD`. | whisper.cpp `whisper-cli`, faster-whisper wrapper |
| `{{TOOL_SUBAGENTS}}` | How research and QA helpers are run, and on which cheaper model. | Claude Code Agent tool on Sonnet |
| `{{TOOL_SESSIONS}}` | How the one-session-per-dialect-family work is started (separate agent sessions with fresh context). | separate Claude Code sessions, a session manager MCP, tmux panes |
| `{{TOOL_GPU_QUEUE}}` | Optional wrapper that queues GPU jobs so transcription does not fight other work. Leave as `none` if not needed. | none, a local job queue script |
| `{{MAX_PARALLEL_SESSIONS}}` | How many dialect sessions may run at once on this machine. | 3 |

Command-line tools the scripts call (install before Phase 2): `yt-dlp`, `ffmpeg`/`ffprobe`, `curl`, Python 3.10+.

## My values

PROJECT_ROOT: {{PROJECT_ROOT}}
SKILLS_DIR: {{SKILLS_DIR}}
TOOL_WEB_SEARCH: {{TOOL_WEB_SEARCH}}
TOOL_SPEECH_TO_TEXT: {{TOOL_SPEECH_TO_TEXT}}
TOOL_SUBAGENTS: {{TOOL_SUBAGENTS}}
TOOL_SESSIONS: {{TOOL_SESSIONS}}
TOOL_GPU_QUEUE: {{TOOL_GPU_QUEUE}}
MAX_PARALLEL_SESSIONS: {{MAX_PARALLEL_SESSIONS}}
