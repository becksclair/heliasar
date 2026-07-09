---
layout: ../layouts/ResumeLayout.astro
title: 'Rebecca Clair'
subtitle: 'Staff Systems Software Engineer · AI Infrastructure · Automation · Platform Engineering'
pubDate: 2026-07-07
description: 'Rebecca Clair - Staff Systems Software Engineer · AI Infrastructure · Automation · Platform Engineering'
author: 'Rebecca Clair'
image:
    url: '/images/rebecca_clair5.webp'
    alt: 'Rebecca Clair'
---

## Introduction

Staff-level systems software engineer with 15+ years of professional experience building native applications, developer platforms, and AI-enabled automation. I specialize in understanding unfamiliar systems quickly, exposing clean abstractions around them, and turning them into reliable platforms that other engineers and AI agents can build upon.

Most recently I've been building a complete platform for a personal AI agent — its own GPU-accelerated browser, computer-use automation, home vision, voice on the phone and the wrist, a cross-channel memory ledger, and the runtime that ties them together. It is the clearest demonstration of what I do: take many hard, unrelated systems and make them behave as one coherent product.

Organizations have repeatedly trusted me with their most sensitive systems: mission-critical RFID infrastructure for JPL (NASA) and Boeing, confidential data platforms for a major automotive manufacturer, and secure enterprise browser internals. Roughly eight of those years were spent as a technical lead, owning architecture and unblocking teams from protocol-level debugging up through product delivery.

[Personal Website](https://heliasar.com/)

[Email](mailto:rebecca@heliasar.com) – [GitHub](https://github.com/becksClair) – [LinkedIn](https://linkedin.com/in/rebecca-clair) – [X (Formerly Twitter)](https://x.com/becksClair) – [BlueSky](https://bsky.app/profile/becksclair.bsky.social)
 

## Projects

A personal AI-agent platform — browser, computer-use, and cross-channel memory — alongside standalone reverse-engineering and systems work. Full set at [heliasar.com/projects](https://heliasar.com/projects/).

### Skynet

Reimplemented the architecture behind OpenAI's Atlas browser from scratch: a native C++23/Qt shell, an out-of-process CEF runtime service, zero-copy GPU frame transport, and an authenticated control surface for AI agents.

→ [Full write-up](https://heliasar.com/projects/skynet/)

**Architecture Highlights**

- Designed a two-process browser: a Qt Quick shell owning no browser state and a runtime sidecar owning all CEF browsers, exposed through an OWL-compatible, versioned JSON-RPC 2.0 protocol over stdio, Unix sockets, or WebSocket.
- Engineered a zero-copy GPU frame lane — CEF off-screen frames cross the process boundary as DRM dma-buf descriptors with native-fence synchronization, presented directly in Qt's Vulkan scene graph on both Intel and NVIDIA under Linux.
- Built an authenticated Chrome DevTools Protocol gateway for AI agents with bearer tokens and an epoch-based replay guard, plus surface recovery that survives GPU-process and renderer crashes.
- Derived the protocol's object model by reverse engineering the Atlas application bundle, and embedded the same runtime into a patched Codex Desktop — handing an Electron app real GPU frames over a dma-buf file-descriptor socket, one runtime backing both hosts.

### sky-cua

Designed and built a cross-platform computer-use platform for AI agents, spanning native desktop automation, browser control, Android integration, packaging, deployment, diagnostics, and developer tooling.

→ [Full write-up](https://heliasar.com/projects/sky-cua/)

**Architecture Highlights**

- Created a long-lived Rust client/service architecture with platform IPC, backend abstraction, structured diagnostics, and host-portable MCP tools for desktop, browser, and phone workflows.
- Defined an agent tool surface with schema-validated actions, semantic and physical input modes, screenshot delivery, browser tab control, Android ADB integration, and explicit readiness/fallback reporting — consolidated from 66 tools to 34 through a unified action surface.
- Architected native Linux and Windows automation foundations across AT-SPI, Wayland/X11 capture and input, browser native-host validation, Win32/UIA discovery, GDI capture, and SendInput.
- Packaged the runtime for Codex, OpenClaw, Claude Code, OpenCode, and other MCP hosts with installer validation and VM smoke-test workflows.

### Sky Smart Comms

Built the cross-channel memory system for a personal AI agent: it ingests email, WhatsApp, SMS, phone, LinkedIn, and postal mail and unifies them into durable topics with research, linked notes, and next actions.

→ [Full write-up](https://heliasar.com/projects/sky-smart-comms/)

**Architecture Highlights**

- Designed a SQLite ledger with a case/item/entity/link/event schema and hybrid retrieval — full-text search, vector embeddings, and exact thread matching — kept in sync by database triggers.
- Built cross-surface entity resolution that unifies one person across mail, messaging, phone, and social identities, with alias and merge handling.
- Engineered a two-stage triage engine (per-item classification, then per-topic consolidation) with an adversarial verification step before destructive actions and a next-action queue gated by human confirmation.
- Created a closed-loop preference-learning pipeline — revealed preferences, induction proposals, human accept/reject, policy update, and drift-based retirement — measured by shadow metrics and a layered evaluation harness.

### emeet-cam / EMEET PIXY Controller

Reverse engineered an undocumented USB camera protocol and turned it into an automation platform: native Linux tooling, browser interfaces, diagnostics, protocol replay, live preview pipelines, and workflows controllable by AI agents.

→ [Full write-up](https://heliasar.com/projects/emeet-pixy-controller/)

**Architecture Highlights**

- Traced vendor HID/libusb traffic from a native Qt application and codified confirmed camera mode and PTZ report sequences into reusable Rust tooling.
- Created platform seams for HID transport, camera discovery, preview orchestration, DirectShow/UVC/V4L2 controls, GStreamer video handling, and Linux `/dev/video*` to `/dev/hidraw*` device correlation.
- Designed repeatable observe/replay/verify workflows using protocol fixtures, JSONL capture logs, fakeable transport boundaries, CLI probes, browser controls, and a native GTK/libadwaita UI.
- Designed a real-time enhancement pipeline with GPU ONNX/TensorRT super-resolution, motion-adaptive temporal denoising, and low-light tone mapping/local contrast enhancement tuned for live-preview constraints.

## Experience

### Sumwall

#### *SENIOR SOFTWARE ENGINEER | 2025 - 2026*
Worked on a secure Windows browser for enterprise SASE providers, bridging deep web platform knowledge with native C++ development, Chromium/CEF integration, and Windows systems behavior.

- Debugged and patched a custom CEF offscreen rendering pipeline, restoring reliable software rendering in virtualized environments where GPU acceleration was unavailable or constrained.

- Designed an AI-driven browser validation framework that automated complex end-to-end testing across native and web surfaces.

- Implemented Traffic Steering functionality to route browser activity through managed enterprise security policies, connecting browser behavior, networking constraints, and SASE product requirements.

- Turned a basic encrypted file store into a Chromium-backed VFS storage layer, securing browser profiles, local storage, and persistent web data without breaking Chromium storage expectations.

### Xplore Group Spain

#### *SENIOR BACKEND ENGINEER (CONSULTANT) | 2024 - 2025*
Consultant on a confidential data platform for a major automotive manufacturer, working under strict confidentiality and data-handling controls.

- Designed reliable high-volume data pipelines processing billions of records with robust recovery and operational safeguards.

- Collaborated within a distributed team (Belgium, Spain) to build scalable, highly tested, and modular solutions.

- Partnered with Cloud Infrastructure teams to enhance deployment pipelines, optimizing resource usage and achieving significant cost savings for the client.

### Latency Data

#### *SENIOR FULL-STACK ENGINEER | 2023 - 2024*

- Delivered core product capabilities for an online investment analysis platform across frontend, backend, data visualization, and economic-model integration.

- Partnered with data science to translate complex economic algorithms into reliable product workflows and interactive analysis surfaces.

- Streamlined core project architecture, improving maintainability and making feature delivery faster across the stack.

### SEDDI

#### *SENIOR SOFTWARE ENGINEER | 2023*

- Delivered 2D and 3D web tooling for clothing design, spanning interactive rendering, image-processing workflows, and product-facing UX.

- Led a progressive TypeScript migration with Playwright/Jest testing and linting to improve reliability, code quality, and development speed.

- Bootstrapped a centralized component architecture that made future design-tool development easier to extend.

### Voicemod

#### *SENIOR SOFTWARE ENGINEER - TECHNICAL LEAD | 2021 - 2023*

- Led the migration of a C# desktop application to a cross-platform C++/Qt architecture with ZeroMQ services and a Vue frontend.

- Coordinated delivery across multiple teams, unblocking architecture, build, packaging, and dependency-management issues.

- Created Python tooling and CI workflows for dependency management, multi-binary builds, and Apple Silicon support.

### (Private Corp. NDA Protected Projects)

#### SENIOR SOFTWARE ENGINEER - TECHNICAL LEAD | 2014-2020

- Served as Technical Lead for mission-critical RFID inventory-control systems used by high-stakes clients including JPL (NASA) and Boeing.

- Designed embedded-device control software, cloud integration, back-office/POS systems, and operational tooling across constrained and legacy environments.

- Solved severe field failures under unusual constraints, including retrofitting modern cloud software for RHEL 5 and debugging RFID readers remotely over satellite links.

### HeliaSar Productions

#### SENIOR FULL-STACK ENGINEER | 2010-2014

- Delivered full-stack products, internal tools, and business automations for clients across multiple industries.

- Managed projects end-to-end, from requirements and architecture through implementation, support, and business development.


## Awards

- CodeCrafters.io prize for building an HTTP server from scratch in Rust in 1 month

## Languages

- **Spanish (Native)**
- **English (Bilingual)**
- **Catalan (Elementary)**
- **French (Basic)**
- **Norwegian (Basic)**

## Technologies

**Core Languages:** Rust, TypeScript, C++, Go, Python

**Strong Experience:** JavaScript, C, C#, SQL

**Systems & Architecture:** Platform engineering, systems architecture, distributed systems, IPC, concurrency, protocol design, state machines, observability, reliability, fault tolerance, diagnostics, native desktop automation, browser automation

**AI Infrastructure & Automation:** MCP, AI-agent tool surfaces, computer-use automation, workflow orchestration, evaluation harnesses, browser control, Android ADB automation, CLI tooling

**Web & Product:** React, NextJS, Svelte, Vue, SolidJS, HTMX, HTML, CSS, WebSocket, REST APIs, D3, Three.js

**Data & Storage:** PostgreSQL, MySQL, SQLite, MongoDB, Elasticsearch

**Operating Systems & Cloud:** Linux, RedHat/RHEL, Windows, macOS, Android, iOS, AWS, Azure

**Embedded, Native & IoT:** Arduino, ESP32, RFID, MQTT, ZeroMQ, memory management, low-level programming, multithreading, Qt, QML, UWP, WPF, XAML, Xamarin

**Tools & Practices:** Git, CI/CD, code review, testing strategy, Playwright, Jest, ESLint, Conan, Bash, PowerShell, Agile/Scrum, technical leadership
