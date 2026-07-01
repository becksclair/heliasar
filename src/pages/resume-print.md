---
layout: ../layouts/ResumePrintLayout.astro
title: 'Rebecca Clair'
subtitle: 'Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems'
pubDate: 2023-05-09
description: 'Rebecca Clair - Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems'
author: 'Rebecca Clair'
image:
    url: '/images/rebecca_clair5.webp'
    alt: 'Rebecca Clair'
---

## Introduction

Senior systems engineer with 20+ years of experience designing software that spans operating systems, native applications, distributed services, embedded devices, browsers, cloud infrastructure, and AI-enabled automation.

I specialize in understanding unfamiliar systems quickly, exposing clean abstractions around them, and turning them into reliable platforms that other engineers and AI agents can build upon. My work sits at the intersection of systems engineering, developer tooling, automation, and AI infrastructure, where many moving parts need to behave like one coherent product.

Equally effective working across the entire engineering stack, from protocol reverse engineering and systems debugging through product architecture, developer experience, and technical leadership.

[Personal Website](https://heliasar.com/)

[Email](mailto:rebecca@heliasar.com) – [GitHub](https://github.com/becksClair) – [LinkedIn](https://linkedin.com/in/rebecca-clair) – [X (Formerly Twitter)](https://x.com/becksClair) – [BlueSky](https://bsky.app/profile/becksclair.bsky.social)
 

## Projects

### sky-cua

Designed and built a complete cross-platform computer-use platform for AI agents, spanning native desktop automation, browser control, Android integration, packaging, deployment, diagnostics, and developer tooling.

**Architecture Highlights**

- Created a long-lived Rust client/service architecture with platform IPC, backend abstraction, structured diagnostics, and host-portable MCP tools for desktop, browser, and phone workflows.
- Defined an agent tool surface with schema-validated actions, semantic and physical input modes, screenshot delivery, browser tab control, Android ADB integration, and explicit readiness/fallback reporting.
- Architected native Linux and Windows automation foundations across AT-SPI, Wayland/X11 capture and input, browser native-host validation, Win32/UIA discovery, GDI capture, and SendInput.
- Packaged the runtime for Codex, OpenClaw, Claude Code, OpenCode, and other MCP hosts with installer validation and VM smoke-test workflows.

### emeet-cam / EMEET PIXY Controller

Reverse engineered an undocumented USB camera protocol and transformed it into a complete automation platform including native Linux tooling, browser interfaces, diagnostics, protocol replay, live preview pipelines, and workflows controllable by AI agents.

**Architecture Highlights**

- Traced vendor HID/libusb traffic from a native Qt application and codified confirmed camera mode and PTZ report sequences into reusable Rust tooling.
- Created platform seams for HID transport, camera discovery, preview orchestration, DirectShow/UVC/V4L2 controls, GStreamer video handling, and Linux `/dev/video*` to `/dev/hidraw*` device correlation.
- Designed repeatable observe/replay/verify workflows using protocol fixtures, JSONL capture logs, fakeable transport boundaries, CLI probes, browser controls, and a native GTK/libadwaita UI.
- Designed a real-time enhancement pipeline with GPU ONNX/TensorRT super-resolution, motion-adaptive temporal denoising, and low-light tone mapping/local contrast enhancement tuned for live-preview constraints.

### Voyager Golden Record Explorer

Created a Rust/egui signal-processing application and diagnostics suite for recovering the images encoded in NASA's Voyager Golden Record audio, turning noisy analog source material into inspectable, exportable image reconstructions.

**Architecture Highlights**

- Designed a baseband slow-scan video decoding pipeline with per-line sync detection, slant correction, anti-aliased resampling, polarity/gamma controls, and percentile normalization.
- Implemented audio-device-clock anchored playback, zero-copy WAV loading, waveform navigation, sync markers, live decode windows, and PNG export for responsive exploration of large audio assets.
- Created CLI and batch diagnostics for reproducible analysis, including decode, spectrogram generation, sync detection, signal classification, statistics, segmentation, and excerpt carving.
- Engineered worker orchestration with queue-depth tracking, health monitoring, restart logic, cancellation, stale-result suppression, and independent forward-model validation.


## Experience

### Sumwall

#### *SENIOR SOFTWARE ENGINEER | 2025 - 2026*
Worked on a secure Windows browser for enterprise SASE providers, bridging deep web platform knowledge with native C++ development, Chromium/CEF  integration, and Windows systems behavior.

- Debugged and patched a custom CEF offscreen rendering pipeline, restoring reliable software rendering in virtualized environments where GPU acceleration was unavailable or constrained.

- Implemented Traffic Steering functionality to route browser activity through managed enterprise security policies, connecting browser behavior, networking constraints, and SASE product requirements.

- Designed an AI-driven browser validation framework that automated complex end-to-end testing across native and web surfaces.

- Turned a basic encrypted file store into a Chromium-backed VFS storage layer, securing browser profiles, local storage, and persistent web data without breaking Chromium storage expectations.

### Xplore Group Spain

#### *SENIOR BACKEND ENGINEER | 2024 - 2025*

- Designed reliable high-volume data pipelines for a major automotive data warehouse, processing billions of records with robust recovery and operational safeguards.

- Collaborated effectively within a distributed team (Belgium, Spain) to build scalable, highly tested, and modular solutions.

- Partnered with Cloud Infrastructure teams to enhance deployment pipelines, optimizing resource usage and achieving significant cost savings for the company.

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

## Courses

- Deepened understanding of Accessibility Principles  
&rarr; 2016 **MICROSOFT ONLINE LECTURES**
- UX Design Best Practices  
&rarr; 2016 **MICROSOFT ONLINE LECTURES**
- Introduction to Neuroscience  
&rarr; 2013 **BERKELEY**
- Introduction to Artificial Intelligence  
&rarr; 2012 **STANFORD**
- iPad and iPhone App Development  
&rarr; 2012 **STANFORD**

## Languages

- **Spanish (Native)**
- **English (Bilingual)**
- **Catalan (Elementary)**
- **French (Basic)**
- **Norwegian (Basic)**

## Technologies

**Core Languages:** Rust, TypeScript, C++, Go, Python

**Strong Experience:** JavaScript, C, C#, SQL, D, Ruby

**Familiar / Legacy:** Java, Kotlin, PHP, Swift, Pascal, Delphi, Assembly

**Systems & Architecture:** Distributed systems, platform engineering, systems architecture, IPC, concurrency, protocol design, state machines, observability, reliability, fault tolerance, diagnostics, native desktop automation, browser automation

**AI Infrastructure & Automation:** MCP, AI-agent tool surfaces, computer-use automation, workflow orchestration, evaluation harnesses, browser control, Android ADB automation, CLI tooling

**Web & Product:** React, NextJS, Svelte, Vue, SolidJS, HTMX, HTML, CSS, WebSocket, REST APIs, D3, Three.js

**Data & Storage:** PostgreSQL, MySQL, SQLite, MongoDB, Elasticsearch, SQL

**Operating Systems & Cloud:** Linux, RedHat/RHEL, Windows, macOS, Android, iOS, AWS, Azure

**Embedded, Native & IoT:** Arduino, ESP32, RFID, MQTT, ZeroMQ, memory management, low-level programming, multithreading, Qt, QML, UWP, WPF, XAML, Xamarin

**Tools & Practices:** Git, CI/CD, code review, testing strategy, Playwright, Jest, ESLint, Conan, Bash, PowerShell, Agile/Scrum, technical leadership
