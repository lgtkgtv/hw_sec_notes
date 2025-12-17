# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a comprehensive masters-level DataCenter Hardware Security reference and course designed for experienced developers and graduate students. The content focuses on practical implementation patterns, threat models, and cross-industry security applications with emphasis on time-saving, organized reference materials.

### Course Format & Delivery
- **Masters-Level Reference**: Advanced content for graduate students and professionals
- **Time-Saving Organization**: Pre-researched, structured content for quick learning
- **Practical Focus**: Real-world implementations without theoretical mathematics
- **Cross-Industry Patterns**: Shows how datacenter concepts apply across domains
- **Quick Reference Format**: Organized for both learning and professional reference

### Course Objectives

**Module 0: Cryptography Fundamentals (Foundation)**
- Public key cryptography, hash functions, and digital signatures
- Key generation, exchange protocols, and certificate management
- Hardware Root of Trust and device provisioning concepts
- Remote attestation, device ownership transfer, and trust models
- Industry usage patterns (cloud, payments, IoT, blockchain)
- Transport Layer Security and confidential computing

**Module 1: Foundation Hardware Security**
- Hardware Root of Trust (RoT) and secure boot mechanisms
- CPU security features (Intel Boot Guard, AMD Secure Boot, SMM, TPM)
- UEFI firmware security and threat models
- Hardware supply chain security and provisioning

**Module 2: AI/ML Accelerator Security**
- NVIDIA GPU security architecture (Hopper, Ada Lovelace)
- GPU firmware security and attestation
- NVLink/NVSwitch fabric security protocols
- CUDA runtime security and memory protection
- GPU virtualization security (vGPU, MIG)

**Module 3: Storage and I/O Security**
- NVMe SSD security features (TCG Opal, eDrive)
- PCIe security protocols and DMA protection
- Storage encryption at rest and in transit
- Secure erase and data sanitization
- IOMMU and device isolation

**Module 4: Cloud Service Provider Security Practices**
- Oracle Cloud Infrastructure (OCI) hardware security model
- AWS Nitro System security architecture
- Google Cloud security chip implementations
- Microsoft Azure confidential computing
- Multi-vendor hardware management security

**Module 5: Datacenter Infrastructure Security**
- BMC (Baseboard Management Controller) hardening
- Out-of-band management security (RedFish, IPMI)
- Network fabric security (InfiniBand, Ethernet)
- Power and thermal management security
- Physical security and tamper detection

## Repository Structure

### 📚 Masters-Level Course Materials
- `masters_reference_guide.md` - **PRIMARY REFERENCE** - Comprehensive practical guide for advanced students
- `developer_focused_course.md` - Concise course overview for experienced developers
- `course_structure.md` - Original detailed course navigation and module organization
- `crypto_fundamentals_module.md` - Foundation cryptography concepts and cross-industry applications
- `detective_scenarios.md` - Interactive security investigation scenarios
- `progressive_learning_paths.md` - Structured learning progression from personal to enterprise scale
- `engaging_course_design.md` - Story-driven learning methodology
- `CLAUDE.md` - This file - course development and delivery guidance

### 📖 Core Study Materials
- `MUST_REMEMBER.md` - Key concepts and study roadmap for hardware security topics
- `secure_boot_detail.md` - Detailed explanations of secure boot concepts
- `secure_boot.md` - Core secure boot implementation details
- `motherboard_cpu_and_eFuses--*.md` - CPU architecture and eFuse security
- `What is -- *.md` - Foundational concept explanations (UEFI, SMM, etc.)

### 🛡️ Security Implementation Guides
- `Secure Boot *.md` files - Threat models and implementation details
- `BMC (Baseboard Management Controller) - Deep Dive.md` - BMC security architecture
- `Intel Boot Guard Location and Execution.md` - Boot Guard implementation specifics
- `HW Supply Chain Security.md` - Hardware supply chain threat analysis

### ☁️ Cloud Platform Security
- `Oracle Cloud Infrastructure (OCI) Data Center Management.md`
- `Multi-Vendor Hardware Management in Cloud Data Centers.md`
- `RedFish APIs Security.md` - Out-of-band management security

### 💻 Code Examples & Patterns
- `security_hardened__max_distinct.c` - Example of secure C coding patterns with overflow protection and input validation
- `14_patterns_*.md` - Security implementation patterns documentation

### 🎮 Interactive Web Components
- HTML/CSS/JavaScript interactive demos and simulators
- Assessment tools and security checklists
- Progress tracking and gamification elements
- Multi-provider security architecture comparisons

## Development Notes

**Language Focus:** This repository is primarily documentation-focused with minimal code. The C code present demonstrates security-hardened programming patterns.

**Study Approach:** Content is structured for interview preparation with:
- "Like You're 12" explanations for complex concepts
- Detailed technical diagrams and flows
- "MUST REMEMBER" sections highlighting key points
- Step-by-step phase-based learning approach

**Security Focus Areas:**
- Hardware-based security primitives and attestation
- Firmware and boot security across CPU/GPU/storage
- AI/ML accelerator security (GPU, TPU, custom ASICs)
- High-performance storage security (NVMe, fabric-attached)
- Cloud datacenter hardware management and orchestration
- Out-of-band management security (BMC, RedFish, IPMI)
- Multi-vendor hardware integration security
- Confidential computing and TEE implementations

## Content Guidelines

When working with this repository:

### 📝 Educational Content
- Maintain the educational tone with clear analogies and explanations
- Preserve technical accuracy in security implementations across all hardware types
- Keep "MUST REMEMBER" summaries concise and actionable
- Use ASCII diagrams for complex security flows and hardware architectures
- Focus on practical datacenter implementation scenarios
- Emphasize AI/ML-specific hardware security considerations (GPU, accelerators, storage)

### 🌐 Web-Ready Formatting
- Structure all content for static site generation (Hugo, Jekyll, Gatsby)
- Include frontmatter metadata for proper categorization and navigation
- Use web-friendly markdown with proper heading hierarchy
- Embed interactive HTML/CSS/JavaScript components where appropriate
- Ensure mobile-responsive design principles
- Include alt-text for accessibility compliance

### 🎯 Interactive Learning
- Include real-world CSP implementation examples and best practices
- Structure content as progressive learning modules with practical exercises
- Cover both defensive security and threat modeling approaches
- Provide interactive quizzes and assessment tools
- Create hands-on lab exercises and simulations
- Implement progress tracking and achievement systems

### 👥 Community Features
- Design content for both self-study and instructor-led sessions
- Include discussion prompts and collaborative exercises
- Provide clear learning objectives and outcomes
- Create downloadable resources and reference materials
- Enable community contributions and feedback mechanisms

## Website Implementation

### 🚀 Recommended Static Site Generators
- **Hugo**: Excellent performance for large courses, built-in content management
- **Jekyll**: GitHub Pages integration, extensive plugin ecosystem
- **Gatsby**: React-based with rich interactive capabilities
- **Docusaurus**: Purpose-built for documentation and course sites

### 📦 Required Dependencies
```json
{
  "interactive-features": ["mermaid.js", "reveal.js", "d3.js"],
  "styling": ["tailwind-css", "bootstrap", "custom-theme"],
  "functionality": ["search", "progress-tracking", "quiz-system"],
  "community": ["github-discussions", "discord-integration"]
}
```

### 🎨 Design Considerations
- Dark mode support for security/technical content
- Syntax highlighting for code examples
- Responsive design for mobile learning
- Print-friendly versions for offline study
- Accessibility compliance (WCAG 2.1 AA)

## Target Audience & Usage

### Primary Audience
- **Masters-level computer science students** specializing in security
- **Experienced software/hardware developers** transitioning to security roles
- **Security professionals** needing datacenter hardware security knowledge
- **Industry practitioners** requiring cross-domain security understanding

### Usage Guidelines
- **Reference First**: Use `masters_reference_guide.md` as the primary learning resource
- **Quick Lookup**: Organized sections enable rapid information retrieval
- **Cross-Industry**: Apply datacenter patterns to automotive, IoT, payments, mobile domains
- **Practical Focus**: Emphasizes real implementations over theoretical concepts
- **No Prerequisites**: Advanced content assumes professional development experience

## Important Notes

- All content is for educational and professional reference purposes
- Security examples demonstrate defensive concepts and industry best practices
- No actual production keys, certificates, or sensitive data included
- Focus on practical implementation patterns and threat models
- Content is vendor-neutral while including real-world industry examples
- Designed for time-efficient learning without extensive research requirements
- Materials suitable for graduate-level coursework and professional development