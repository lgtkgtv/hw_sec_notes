---
layout: default
title: DataCenter Hardware Security - Interactive Course
description: Master datacenter hardware security through interactive learning, hands-on labs, and real-world scenarios
permalink: /
---

# DataCenter Hardware Security
## Interactive Masters-Level Course

Welcome to the comprehensive interactive course on DataCenter Hardware Security. This course is designed for experienced developers, graduate students, and security professionals who want to master hardware security concepts through hands-on learning.

### 🎯 Course Overview

**Target Audience**: Masters-level computer science students and experienced security professionals
**Duration**: 40-60 hours of comprehensive learning
**Format**: Interactive demonstrations, real-world scenarios, and practical exercises
**Prerequisites**: Professional development experience, basic security knowledge

### 📚 Course Modules

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="module-card" data-module-id="module-0">
    <h3>Module 0: Cryptography Fundamentals</h3>
    <p>Foundation concepts including public key cryptography, hash functions, digital signatures, and hardware root of trust.</p>
    <div class="module-meta">
      <span class="difficulty foundation">Foundation</span>
      <span class="duration">8-12 hours</span>
    </div>
    <a href="website/modules/module-0-crypto/" class="module-link">Start Learning →</a>
  </div>

  <div class="module-card" data-module-id="module-1">
    <h3>Module 1: Hardware Root of Trust</h3>
    <p>CPU security features, secure boot mechanisms, TPM, and hardware supply chain security.</p>
    <div class="module-meta">
      <span class="difficulty intermediate">Intermediate</span>
      <span class="duration">8-12 hours</span>
    </div>
    <a href="website/modules/module-1-hardware-rot/" class="module-link">Start Learning →</a>
  </div>

  <div class="module-card" data-module-id="module-2">
    <h3>Module 2: GPU & Accelerator Security</h3>
    <p>NVIDIA GPU security, firmware attestation, NVLink protocols, and AI/ML accelerator hardening.</p>
    <div class="module-meta">
      <span class="difficulty advanced">Advanced</span>
      <span class="duration">6-10 hours</span>
    </div>
    <a href="website/modules/module-2-gpu-security/" class="module-link">Coming Soon</a>
  </div>

  <div class="module-card" data-module-id="module-3">
    <h3>Module 3: Cloud Infrastructure Security</h3>
    <p>Oracle OCI, AWS Nitro, storage security, and multi-vendor hardware management.</p>
    <div class="module-meta">
      <span class="difficulty advanced">Advanced</span>
      <span class="duration">8-12 hours</span>
    </div>
    <a href="website/modules/module-3-cloud-security/" class="module-link">Coming Soon</a>
  </div>
</div>

### 🎮 Interactive Learning Features

- **Real-world Scenarios**: Hands-on security incident investigations
- **Interactive Demonstrations**: Live cryptography and hardware simulations
- **Assessment Tools**: Progress tracking and knowledge validation
- **Gamified Elements**: Achievement system and progress rewards

### 🚀 Quick Start Options

**Academic Study**: Complete 40-hour masters-level course
**Professional Development**: Focused 20-30 hour track for practitioners
**Interview Preparation**: Intensive 8-hour crash course

### 🔗 Additional Resources

- [Reference Materials](website/reference/) - Quick lookup guides and checklists
- [Interactive Games](website/games/) - Security detective scenarios and defense simulations
- [GitHub Repository](https://github.com/your-username/my_tech_notes) - Source code and course materials

---

**Ready to begin?** Start with [Module 0: Cryptography Fundamentals](website/modules/module-0-crypto/) or explore our [Interactive Games](website/games/) for a more engaging introduction.

<style>
.module-card {
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  border: 1px solid #4b5563;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.module-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.module-meta {
  display: flex;
  gap: 12px;
  margin: 12px 0;
  font-size: 14px;
}

.difficulty {
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.difficulty.foundation { background: #065f46; color: #10b981; }
.difficulty.intermediate { background: #1e40af; color: #3b82f6; }
.difficulty.advanced { background: #7c2d12; color: #f97316; }

.duration {
  color: #9ca3af;
}

.module-link {
  display: inline-block;
  margin-top: 16px;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.module-link:hover {
  background: #2563eb;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .grid-cols-1.md\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.gap-6 {
  gap: 1.5rem;
}

.my-8 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>