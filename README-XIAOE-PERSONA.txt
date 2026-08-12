XiaoE Persona V1

Purpose
-------
This module defines XiaoE's personality, tone and operating modes.

Files
-----
xiaoe-persona-v1.json
  Main persona configuration.

xiaoe-persona.js
  Lightweight loader for future AI/API/UI integration.

Architecture
------------
XiaoE Core -> Persona -> Tone -> Role

Important
---------
Persona must never override:
- security
- privacy
- permissions
- factual accuracy
- database safety
- least privilege

Current recommended default mode:
Gentle

Available modes:
- professional
- gentle
- playful
- developer

This module is intentionally independent from Admin / Partner / Staff business logic.
