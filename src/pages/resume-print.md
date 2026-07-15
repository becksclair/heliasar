---
layout: ../layouts/ResumePrintLayout.astro
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

Staff systems software engineer with 15+ years building native applications, developer platforms, and AI infrastructure. I work at the boundaries between operating systems, browsers, devices, cloud services, and AI—finding the real failure boundary, defining the missing abstraction, and turning one-off technical wins into platforms teams can operate and extend.

Across roughly eight years of technical leadership, I have owned architecture and unblocked delivery for secure browser internals, confidential data platforms, and mission-critical RFID systems used by JPL (NASA) and Boeing. My strongest recent proof is Sky: a personal AI platform that connects browser, computer-use, vision, voice, and cross-channel memory as one production system.

[Personal Website](https://heliasar.com/)

[Email](mailto:rebecca@heliasar.com) – [GitHub](https://github.com/becksClair) – [LinkedIn](https://linkedin.com/in/rebecca-clair) – [X (Formerly Twitter)](https://x.com/becksClair) – [BlueSky](https://bsky.app/profile/becksclair.bsky.social)
 

## Projects

A personal AI-agent platform — browser, computer-use, and cross-channel memory — alongside standalone reverse-engineering and systems work. Full set at [heliasar.com/projects](https://heliasar.com/projects/).

### Skynet

Reimplemented the architecture behind OpenAI's Atlas browser from scratch: a native C++23/Qt shell, an out-of-process CEF runtime service, zero-copy GPU frame transport, and an authenticated control surface for AI agents.

**Highlights:** Architected a versioned two-process browser platform with a stateless Qt shell and CEF runtime, zero-copy dma-buf/Vulkan rendering on Intel and NVIDIA, authenticated crash-resilient CDP control, and a reverse-engineered runtime reusable across Skynet and Codex Desktop.

→ [Full write-up](https://heliasar.com/projects/skynet/)

### sky-cua

Designed and built a cross-platform computer-use platform for AI agents, spanning native desktop automation, browser control, Android integration, packaging, deployment, diagnostics, and developer tooling.

**Highlights:** Built a portable Rust client/service architecture and cut the agent tool surface from 66 tools to 34 schema-validated actions spanning semantic and physical desktop input, browser and Android control, native Linux and Windows backends, structured diagnostics, packaging, and VM-tested deployment across major MCP hosts.

→ [Full write-up](https://heliasar.com/projects/sky-cua/)

### Sky Smart Comms

Built the cross-channel memory system for a personal AI agent: it ingests email, WhatsApp, SMS, phone, LinkedIn, and postal mail and unifies them into durable topics with research, linked notes, and next actions.

**Highlights:** Designed a trigger-synchronized SQLite knowledge ledger combining hybrid retrieval and cross-channel identity resolution with adversarially verified triage, human-gated next actions, and closed-loop preference learning measured by shadow metrics and a layered evaluation harness.

→ [Full write-up](https://heliasar.com/projects/sky-smart-comms/)

### emeet-cam / EMEET PIXY Controller

Reverse engineered an undocumented USB camera protocol and turned it into an automation platform: native Linux tooling, browser interfaces, diagnostics, protocol replay, live preview pipelines, and workflows controllable by AI agents.

**Highlights:** Converted traced HID/libusb traffic into reusable Rust tooling and portable transport/device seams, then built repeatable observe/replay/verify workflows plus a live GPU enhancement pipeline spanning ONNX/TensorRT super-resolution, temporal denoising, and low-light correction.

→ [Full write-up](https://heliasar.com/projects/emeet-pixy-controller/)

## Experience

### Sumwall · Senior Software Engineer · 2025-2026
Worked on a secure Windows browser for enterprise SASE providers, bridging deep web platform knowledge with native C++ development, Chromium/CEF integration, and Windows systems behavior.

- Debugged and patched a custom CEF offscreen rendering pipeline, restoring reliable software rendering in virtualized environments where GPU acceleration was unavailable or constrained.

- Designed an AI-driven browser validation framework that automated complex end-to-end testing across native and web surfaces.

- Implemented Traffic Steering functionality to route browser activity through managed enterprise security policies, connecting browser behavior, networking constraints, and SASE product requirements.

- Turned a basic encrypted file store into a Chromium-backed VFS storage layer, securing browser profiles, local storage, and persistent web data without breaking Chromium storage expectations.

### Xplore Group Spain · Senior Backend Engineer, Consultant · 2024-2025
Consultant on a confidential data platform for a major automotive manufacturer, working under strict confidentiality and data-handling controls.

- Designed reliable high-volume data pipelines processing billions of records with robust recovery and operational safeguards.

- Collaborated within a distributed team (Belgium, Spain) to build scalable, highly tested, and modular solutions.

- Partnered with Cloud Infrastructure teams to enhance deployment pipelines, optimizing resource usage and achieving significant cost savings for the client.

### Latency Data · Senior Full-Stack Engineer · 2023-2024

- Delivered core product capabilities for an online investment analysis platform across frontend, backend, data visualization, and economic-model integration.

- Partnered with data science to translate complex economic algorithms into reliable product workflows and interactive analysis surfaces.

- Streamlined core project architecture, improving maintainability and making feature delivery faster across the stack.

### SEDDI · Senior Software Engineer · 2023

- Delivered 2D and 3D web tooling for clothing design, spanning interactive rendering, image-processing workflows, and product-facing UX.

- Led a progressive TypeScript migration with Playwright/Jest testing and linting to improve reliability, code quality, and development speed.

- Bootstrapped a centralized component architecture that made future design-tool development easier to extend.

### Voicemod · Technical Lead · 2021-2023

- Led the migration of a C# desktop application to a cross-platform C++/Qt architecture with ZeroMQ services and a Vue frontend.

- Coordinated delivery across multiple teams, unblocking architecture, build, packaging, and dependency-management issues.

- Created Python tooling and CI workflows for dependency management, multi-binary builds, and Apple Silicon support.

### NDA Protected Projects · Technical Lead · 2014-2020

- Served as Technical Lead for mission-critical RFID inventory-control systems used by high-stakes clients including JPL (NASA) and Boeing.

- Designed embedded-device control software, cloud integration, back-office/POS systems, and operational tooling across constrained and legacy environments.

- Solved severe field failures under unusual constraints, including retrofitting modern cloud software for RHEL 5 and debugging RFID readers remotely over satellite links.

### Earlier independent engineering and consulting · 2010-2014


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
