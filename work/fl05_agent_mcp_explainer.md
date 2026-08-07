# FL-05 - Agent Concepts and MCP Basics

## Workflow or agent?

A workflow is a designed sequence. The steps, order, prompts, handoffs, and checks are mostly decided in advance. A workflow can still use an AI model at each step, but the model is completing bounded tasks inside a structure that a person designed.

An agent is a system that can choose actions while pursuing a goal. It usually has access to tools, observes the result of an action, decides what to do next, and continues until it reaches a stopping condition or needs a human. The important difference is not that an agent uses a better model or sounds more autonomous. The difference is who controls the next step. In a workflow, the designer controls the path. In an agent, the system can select or repeat actions based on what it observes.

My FL-04 evidence-card pipeline is a **workflow**, not an agent. Its four steps are fixed: gather and extract, synthesize evidence, draft the card, then review and format. Each handoff has a defined output contract. The model can write the text inside a step, but it does not decide to search for another source, rerun a notebook, open a pull request, or publish the result. The final human gate is also fixed. Calling it an agent would overstate what it currently does.

## What MCP adds

The Model Context Protocol, or MCP, is a standard way for an AI application to connect to external context and capabilities. It is useful because the model itself does not automatically have access to local files, a repository, a database, or a live service. An MCP server exposes a controlled interface, and the MCP client presents that interface to the model.

MCP has three core primitives:

- **Tools** are actions the model can request. Examples are reading a file, querying a database, creating an issue, or running a search. A tool can have inputs and a structured result. Because tools can change things, writes should require explicit approval.
- **Resources** are addressable context the client can retrieve, such as a document, schema, repository file, or database record. Resources are about supplying information, while tools are about taking an action.
- **Prompts** are reusable instruction templates exposed by a server or client. They help a user invoke a task consistently with the right arguments and expected format.

MCP is therefore not an agent by itself. It is an interoperability layer. A client can use MCP tools inside a workflow, inside an agent loop, or in ordinary chat. The protocol does not decide whether the system is autonomous, trustworthy, or well-designed. Those are properties of the surrounding application, permissions, prompts, stopping rules, and human review.

## How FL-04 would become an agent

The first concrete upgrade would be a **source-discovery and evidence-card agent**. Instead of receiving one pasted source, it would receive a request such as “prepare an evidence card for the latest validation work.” It could then use a repository MCP server to list relevant files, read the validation report and notebook, identify the newest committed version, and choose which source to inspect first. After extracting evidence, it could call a second tool to run a safe validation command or retrieve a rendered report. It would then draft the card and stop for human approval rather than publishing automatically.

That upgrade changes the control loop: the system chooses which files to inspect and whether another evidence-gathering action is needed. The fixed review rules from FL-04 should remain. The agent should not decide that a missing number is plausible, upload private data, or publish a claim. A safe design would use read-only repository tools first, allow notebook execution only in a sandbox, require confirmation for writes, and stop when the evidence is incomplete or conflicting.

The agent would need explicit guardrails: a maximum number of tool calls, an allowed-path list, no access to credentials or raw client data, source citations for every number, and a `HOLD FOR HUMAN REVIEW` state. Without those controls, adding tools would make the workflow more capable but not necessarily more reliable.

## MCP evidence plan

No MCP server configuration is currently committed in this repository, so I have not claimed that an MCP connection is already working. To complete the evidence requirement, connect one read-only repository or filesystem MCP server in an MCP client, then capture screenshots showing the tool name and returned result for these three tasks:

1. **Repository discovery:** ask the client to list the repository root and identify `work/fl04_automation_workflow_v2.md`.
2. **Source retrieval:** ask the client to read the `## Five real runs` section from that file and return the headings it finds.
3. **Deployment check:** ask the client to read `index.html` and verify that it references `./assets/dn-monogram.png` and contains the expected portfolio title.

These tasks could not be completed by plain chat from memory: they require live access to the repository files. The screenshots must show the MCP tool call and its result, not only the assistant's prose response. The configured filesystem server is intentionally read-only in how I use it for this assignment; Git history would require a separate GitHub MCP server or a separate approved connector.

## Human review boundary

The agent may gather and organize evidence. I still decide whether the source is current, whether a number is safe to publish, whether a claim exceeds the evaluation design, and whether any file contains sensitive information. The useful progression is not “chat, then magic agent.” It is fixed workflow first, controlled tools second, selective autonomy last.

MCP CHECKS : 

2026-08-08 01:00:42.107 [info] Starting server io.github.github/github-mcp-server
2026-08-08 01:00:42.108 [info] Connection state: Starting
2026-08-08 01:00:42.112 [info] Starting server from LocalProcess extension host
2026-08-08 01:00:42.128 [info] Connection state: Running
2026-08-08 01:00:45.167 [info] Discovered resource metadata at https://api.githubcopilot.com/.well-known/oauth-protected-resource/mcp/
2026-08-08 01:00:45.168 [info] Using auth server metadata url: https://github.com/login/oauth
2026-08-08 01:00:45.977 [info] Discovered authorization server metadata at https://github.com/.well-known/oauth-authorization-server/login/oauth
2026-08-08 01:00:47.133 [info] Waiting for server to respond to `initialize` request...
2026-08-08 01:00:52.133 [info] Waiting for server to respond to `initialize` request...
2026-08-08 01:00:57.132 [info] Waiting for server to respond to `initialize` request...
2026-08-08 01:01:02.132 [info] Waiting for server to respond to `initialize` request...
2026-08-08 01:01:07.136 [info] Waiting for server to respond to `initialize` request...
2026-08-08 01:01:12.142 [info] Waiting for server to respond to `initialize` request...
2026-08-08 01:01:17.137 [info] Waiting for server to respond to `initialize` request...
2026-08-08 01:01:22.140 [info] Waiting for server to respond to `initialize` request...
2026-08-08 01:01:27.561 [info] Discovered 44 tools
2026-08-08 01:02:19.678 [info] Stopping server io.github.github/github-mcp-server
2026-08-08 01:02:21.381 [info] Connection state: Stopped
2026-08-08 01:02:58.635 [info] Starting server io.github.github/github-mcp-server
2026-08-08 01:02:58.637 [info] Connection state: Starting
2026-08-08 01:02:58.637 [info] Starting server from LocalProcess extension host
2026-08-08 01:02:58.638 [info] Connection state: Running
2026-08-08 01:03:01.739 [info] Discovered resource metadata at https://api.githubcopilot.com/.well-known/oauth-protected-resource/mcp/
2026-08-08 01:03:01.740 [info] Using auth server metadata url: https://github.com/login/oauth
2026-08-08 01:03:02.576 [info] Discovered authorization server metadata at https://github.com/.well-known/oauth-authorization-server/login/oauth
2026-08-08 01:03:06.059 [info] Discovered 44 tools
2026-08-08 01:03:39.833 [info] Stopping server io.github.github/github-mcp-server
2026-08-08 01:03:40.385 [info] Stopping server io.github.github/github-mcp-server
2026-08-08 01:03:40.917 [info] Connection state: Stopped
2026-08-08 01:04:41.169 [info] Stopping server io.github.github/github-mcp-server
2026-08-08 01:05:01.872 [info] Stopping server io.github.github/github-mcp-server
2026-08-08 01:06:16.869 [info] Stopping server io.github.github/github-mcp-server
2026-08-08 01:08:35.753 [info] Starting server io.github.github/github-mcp-server
2026-08-08 01:08:35.754 [info] Connection state: Starting
2026-08-08 01:08:35.764 [info] Starting server from LocalProcess extension host
2026-08-08 01:08:35.765 [info] Connection state: Running
2026-08-08 01:08:39.056 [info] Discovered resource metadata at https://api.githubcopilot.com/.well-known/oauth-protected-resource/mcp/
2026-08-08 01:08:39.057 [info] Using auth server metadata url: https://github.com/login/oauth
2026-08-08 01:08:39.574 [info] Discovered authorization server metadata at https://github.com/.well-known/oauth-authorization-server/login/oauth
2026-08-08 01:08:39.891 [info] Stopping server io.github.github/github-mcp-server
2026-08-08 01:08:40.472 [info] Stopping server io.github.github/github-mcp-server
2026-08-08 01:08:40.496 [info] Connection state: Stopped
