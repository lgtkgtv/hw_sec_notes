/**
 * Interactive Hardware Root of Trust Demo - Module 1
 * Provides hands-on demonstrations of hardware security concepts
 */

// ===== TRUST PROBLEM DEMONSTRATIONS =====
function demonstrateTrustProblem() {
    const resultDiv = document.getElementById('trust-demo-result');
    const outputDiv = document.getElementById('trust-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
🦠 Software-Only Security: Attack Vector Analysis
================================================

💻 Scenario: Standard Enterprise Server (No Hardware RoT)

Attack Vector 1: Evil Maid Attack
   👤 Physical Access: Attacker gains server room access
   🔓 UEFI Modification: Replaces firmware with malicious version
   📝 Malicious Code: Installs persistent rootkit
   ✅ SUCCESS: Attacker achieves persistent access
   🚨 Detection: Nearly impossible - runs below OS level

Attack Vector 2: Supply Chain Compromise
   🏭 Manufacturing: Malicious firmware installed during assembly
   📦 Distribution: Legitimate-looking servers with hidden backdoors
   🏢 Deployment: Customer unknowingly installs compromised hardware
   ✅ SUCCESS: Long-term persistent access established
   🚨 Detection: Extremely difficult - appears legitimate

Attack Vector 3: Remote Firmware Attack
   🌐 Network Access: Attacker gains network access to BMC/UEFI
   💾 Firmware Flash: Overwrites legitimate firmware remotely
   🦠 Persistence: Survives OS reinstallation, antivirus scans
   ✅ SUCCESS: Complete system compromise
   🚨 Detection: Standard security tools cannot detect

📊 Impact Assessment:
   💰 Financial: $4.45M average breach cost (IBM 2024)
   ⏱️ Dwell Time: 207 days average before detection
   🎯 Privilege: Complete system control, kernel-level access
   📈 Spread: Can replicate to other systems via network
   🔄 Recovery: Requires complete hardware replacement

❌ Why Software Security Alone Fails:
   • Software can be modified by attackers
   • No immutable trust anchor
   • Boot process not verified
   • Firmware attacks below OS visibility
   • Anti-virus cannot detect hardware-level threats

🔧 Solution Required: Hardware Root of Trust
    `;
}

function demonstrateHardwareSolution() {
    const resultDiv = document.getElementById('trust-demo-result');
    const outputDiv = document.getElementById('trust-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
🛡️ Hardware Root of Trust: Attack Prevention Analysis
===================================================

🔧 Scenario: Enterprise Server with Hardware RoT (Intel Boot Guard + TPM)

Attack Vector 1: Evil Maid Attack - BLOCKED ❌
   👤 Physical Access: Attacker gains server room access
   🔓 Attempts Firmware Mod: Tries to replace UEFI firmware
   🛡️ Boot Guard Check: CPU verifies firmware signature against eFused keys
   ❌ FAILURE: Unsigned firmware rejected, boot halted
   🚨 Alert: Tampering detected and logged in TPM
   📱 Response: Security team notified immediately

Attack Vector 2: Supply Chain Compromise - BLOCKED ❌
   🏭 Manufacturing Attack: Malicious firmware attempted during assembly
   📝 Signing Process: Only manufacturer can sign firmware (private key in HSM)
   🔐 Key Protection: Signing keys protected by FIPS 140-2 Level 3 HSMs
   ❌ FAILURE: Attackers cannot forge valid signatures
   🛡️ Boot Guard: CPU rejects any firmware without valid signature

Attack Vector 3: Remote Firmware Attack - BLOCKED ❌
   🌐 Network Access: Attacker gains BMC/network access
   💾 Flash Attempt: Tries to overwrite firmware remotely
   🔒 Write Protection: Hardware write protection enabled
   🛡️ Signature Check: New firmware must be properly signed
   ❌ FAILURE: Cannot bypass hardware signature verification
   📊 Attestation: Remote monitoring detects integrity violation

🔗 Hardware Root of Trust Defense Mechanisms:

1. eFused Keys (CPU Level):
   ✅ Immutable: Cannot be changed after manufacturing
   ✅ Unique: Each platform has unique keys
   ✅ Verified: Boot Guard verifies first firmware component

2. Chain of Trust:
   ✅ Stage 1: CPU Boot Guard verifies Initial Boot Block
   ✅ Stage 2: IBB verifies UEFI firmware components
   ✅ Stage 3: UEFI Secure Boot verifies OS loader
   ✅ Stage 4: OS verifies drivers and applications

3. Platform Configuration Registers (TPM):
   ✅ Measurement: Each boot component measured and stored
   ✅ Attestation: Remote verification of boot integrity
   ✅ Sealing: Secrets only released to verified platform
   ✅ Tamper Detection: Any modification detected

📈 Security Improvements:
   🛡️ Attack Surface: Reduced by 95%+ (hardware vs software)
   ⏱️ Detection Time: Immediate (vs 207 days average)
   🔒 Persistence: Impossible for attackers to achieve
   💰 Breach Cost: $1.2M average savings vs software-only
   🏆 Compliance: Meets highest security standards

✅ Why Hardware RoT Works:
   • Immutable trust anchor in silicon
   • Cryptographic verification of all components
   • Tamper detection and evidence
   • Remote attestation capabilities
   • Cannot be bypassed by software attacks
    `;
}

function showRealWorldExamples() {
    const resultDiv = document.getElementById('trust-demo-result');
    const outputDiv = document.getElementById('trust-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
📰 Real-World Hardware Security Attacks & Defenses
=================================================

🦠 ACTUAL ATTACKS (Software-Only Defense Failures):

1. SolarWinds Supply Chain Attack (2020)
   📦 Attack: Trojanized software updates to 18,000+ organizations
   💰 Impact: $100M+ in damages, nation-state attribution
   🛡️ Hardware RoT Prevention: Code signing + attestation would block
   📝 Lesson: Software-only signing insufficient

2. CCleaner Backdoor (2017)
   🎯 Attack: Compromised software installer with malware
   📊 Scope: 2.27 million users affected
   🛡️ Hardware RoT Prevention: Firmware-level verification
   📝 Lesson: User-mode security tools cannot protect boot process

3. ASUS Live Update Attack (2019)
   🔄 Attack: Hijacked software update mechanism
   📈 Scale: 1 million+ computers compromised
   🛡️ Hardware RoT Prevention: Platform attestation before updates
   📝 Lesson: Need hardware verification of update authenticity

4. LoJax UEFI Rootkit (2018)
   🏭 Attack: First known UEFI rootkit in the wild
   💾 Persistence: Survives OS reinstallation, disk formatting
   🛡️ Hardware RoT Prevention: Secure Boot blocks unsigned UEFI
   📝 Lesson: Firmware-level protection essential

✅ SUCCESSFUL HARDWARE ROT IMPLEMENTATIONS:

1. Google Titan Security Chip
   🏢 Deployment: All Google Cloud servers
   📊 Results: Zero firmware compromise incidents since 2017
   🔧 Features: Verified boot, tamper detection, key storage
   💡 Impact: Customer trust, regulatory compliance

2. Microsoft Azure Sphere
   🌐 Deployment: IoT device security platform
   🛡️ Features: Hardware RoT + OS + cloud security service
   📈 Adoption: 90+ partners, millions of devices
   💰 ROI: Reduced security incident costs by 75%

3. Apple T2 Security Chip
   💻 Deployment: Mac computers (2018-2020)
   🔒 Features: Secure boot, Touch ID, storage encryption
   📊 Results: Significant reduction in firmware attacks
   🏆 Recognition: Industry best practices adoption

4. AWS Nitro System
   ☁️ Deployment: EC2 instances across global infrastructure
   🛡️ Features: Hardware-based isolation and attestation
   📈 Scale: Millions of virtual machines protected
   💼 Business: Enables confidential computing services

📊 Industry Statistics (Hardware RoT vs Software-Only):

Security Metrics:
   🎯 Firmware Attack Success Rate:
      Software-Only: 78% (when attempted)
      Hardware RoT: <2% (with proper implementation)

   ⏱️ Mean Time to Detection:
      Software-Only: 207 days average
      Hardware RoT: <1 hour (automatic alerts)

   💰 Average Breach Cost:
      Software-Only: $4.45M per incident
      Hardware RoT: $1.2M per incident (73% reduction)

Compliance Benefits:
   📋 Regulatory Requirements:
      • NIST SP 800-147: BIOS protection
      • ISO 27001: Hardware security controls
      • Common Criteria: EAL4+ requirements
      • FedRAMP: Firmware integrity verification

💡 Key Lessons Learned:
   1. Software-only security has fundamental limitations
   2. Hardware RoT provides immutable trust foundation
   3. Early detection is critical for incident response
   4. Compliance requirements increasingly mandate hardware security
   5. ROI is positive within 12-18 months for most organizations
    `;

    trackDemoCompletion('real-world-examples', { score: 100, timeSpent: 8000 });
}

// ===== TPM AND IMPLEMENTATION DEMONSTRATIONS =====
function exploreTPM() {
    const resultDiv = document.getElementById('impl-demo-result');
    const outputDiv = document.getElementById('impl-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
🔲 Trusted Platform Module (TPM) 2.0 Deep Dive
=============================================

🔧 TPM Architecture Overview:

Hardware Components:
   🎲 True Random Number Generator (TRNG)
      • Hardware entropy source
      • Cryptographic seed generation
      • Key material randomness

   🔐 Cryptographic Processor
      • RSA-2048, ECDSA P-256/384 support
      • SHA-1, SHA-256, SHA-384/512 hashing
      • HMAC message authentication
      • AES symmetric encryption

   💾 Non-Volatile Storage
      • Platform Configuration Registers (PCRs)
      • Persistent keys and certificates
      • Policy settings and counters
      • Owner/hierarchy authentication data

📊 Platform Configuration Registers (PCR) Usage:

   PCR[0]: BIOS/UEFI Core firmware
      • Initial Boot Block measurements
      • Core system firmware components
      • Critical security policy settings

   PCR[1]: Platform configuration data
      • Hardware configuration information
      • ACPI tables and device configs
      • Platform-specific measurements

   PCR[2]: Option ROM code and data
      • Network card option ROMs
      • Storage controller firmware
      • Graphics card BIOS/UEFI drivers

   PCR[3]: Option ROM configuration
      • Option ROM configuration data
      • Device-specific settings
      • Security policy configurations

   PCR[4]: Master Boot Record (MBR) / Boot Manager
      • Primary boot sector contents
      • Boot manager code and data
      • Partition table information

   PCR[5]: Boot Manager configuration and data
      • Boot configuration data (BCD)
      • Boot manager settings
      • Boot policy information

   PCR[8-15]: Operating System Components
      • OS kernel and critical drivers
      • Security policy settings
      • Runtime configuration data

🔑 TPM Key Hierarchy:

   Storage Root Key (SRK):
   ├── Endorsement Key (EK)
   │   ├── Platform Certificate
   │   └── Privacy CA Certificate
   ├── Attestation Identity Keys (AIK)
   │   ├── Attestation Certificate
   │   └── Platform Credential
   └── Storage Keys
       ├── Application Keys
       └── User Data Keys

🛠️ Common TPM Operations:

1. Key Generation:
   tpm2_createprimary -c primary.ctx
   tpm2_create -g sha256 -G rsa -C primary.ctx -u key.pub -r key.priv

2. PCR Operations:
   tpm2_pcrread                    # Read current PCR values
   tpm2_pcrextend 16:sha256=abc123 # Extend PCR with measurement
   tpm2_pcrlist                    # List all PCR banks

3. Attestation:
   tpm2_quote -c key.ctx -l sha256:0,1,2 -q nonce -m quote.msg

4. Sealing/Unsealing:
   tpm2_create -g sha256 -G keyedhash -L policy.dat -i secret.txt
   tpm2_unseal -c sealed.ctx -o secret.txt

📈 TPM Performance Characteristics:

   RSA-2048 Operations:
      Key Generation: ~800ms
      Signing: ~15ms per operation
      Verification: ~2ms per operation
      Maximum: ~100 signatures/second

   PCR Operations:
      Read: <1ms
      Extend: 2-5ms
      Reset: 10-20ms
      Quote Generation: 10-25ms

   Random Number Generation:
      Quality: True hardware randomness
      Speed: ~1000 bytes/second
      Entropy: Full entropy (not pseudo-random)

🔒 Security Properties:

   Tamper Resistance:
   ✅ Physical: Secure packaging, tamper detection
   ✅ Logical: Authenticated commands only
   ✅ Timing: Constant-time cryptographic operations
   ✅ Side-channel: Resistant to power/timing analysis

   Key Protection:
   ✅ Generation: Keys generated inside TPM only
   ✅ Storage: Never exposed in plaintext
   ✅ Usage: Controlled by authentication/policy
   ✅ Destruction: Secure deletion of key material

💼 Enterprise Deployment Considerations:

   Provisioning:
   🔧 TPM Ownership: Establish during initial deployment
   🔑 Key Enrollment: Generate and certify platform keys
   📋 Policy Setup: Configure access policies and PCR policies
   🌐 CA Integration: Connect to enterprise certificate authority

   Management:
   📊 Monitoring: PCR drift detection, key lifecycle tracking
   🔄 Updates: Firmware updates with measurement validation
   📝 Backup: Secure backup of critical policy data
   🚨 Incident Response: Tamper detection and response procedures
    `;

    trackDemoCompletion('tpm-exploration', { score: 100, timeSpent: 6000 });
}

function exploreBootGuard() {
    const resultDiv = document.getElementById('impl-demo-result');
    const outputDiv = document.getElementById('impl-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
🔧 Intel Boot Guard Deep Dive
============================

🏗️ Architecture Overview:

Hardware Components:
   🔐 CPU eFuses: Immutable key storage in silicon
   🧮 Crypto Engine: Hardware cryptographic verification
   🛡️ Boot Policy: Fused security policy settings
   📊 Error Handling: Secure failure modes and logging

🔑 eFused Key Management:

   Key Fusing Process (One-time, irreversible):
   1. 🏭 Manufacturing: Intel fuses public key hash into CPU
   2. 🔒 Validation: Corresponding private key held by OEM
   3. ✅ Verification: CPU validates against fused hash
   4. 🚫 Immutable: Cannot be changed after manufacturing

   Key Types:
   📝 Boot Policy Key (BPM): Controls boot policy settings
   🛡️ Key Manifest Key (KM): Verifies initial boot block
   🔗 Usage Model: Hierarchical verification chain

⚙️ Boot Guard Operation Flow:

Phase 1: CPU Reset and Initialization
   ⚡ Power-On Reset: CPU begins execution
   🔧 Microcode Load: Intel microcode initialization
   📊 Fuse Check: Read Boot Guard configuration from eFuses
   🛡️ Policy Load: Load and validate boot policy

Phase 2: Initial Boot Block (IBB) Verification
   📄 IBB Location: Find Initial Boot Block in flash memory
   🔍 Hash Calculation: Calculate SHA-256 hash of IBB
   🔐 Signature Check: Verify IBB signature with fused public key
   ✅ Validation: Allow execution only if signature valid

Phase 3: Verified Boot Handoff
   🎯 Execute IBB: Transfer control to verified Initial Boot Block
   📏 Measurement: Extend TPM PCR[0] with IBB measurement
   🔗 Chain Continue: IBB verifies next boot components

🛠️ Configuration Options:

Boot Guard Profiles:
   Profile 1: Verified Boot Only
      🔍 Verification: Cryptographic verification of IBB
      ⚠️ Action: Log errors but continue boot
      🎯 Use Case: Development, debugging environments

   Profile 2: Measured Boot Only
      📏 Measurement: Measure IBB into TPM PCR[0]
      📊 Attestation: Enable remote attestation
      🎯 Use Case: Enterprise attestation requirements

   Profile 3: Verified + Measured Boot
      🔍 Verification: Cryptographic verification of IBB
      📏 Measurement: Measure IBB into TPM PCR[0]
      🎯 Use Case: High security environments

   Profile 4: Verified Boot + Enforcement
      🔍 Verification: Cryptographic verification of IBB
      🚫 Enforcement: Halt system if verification fails
      🎯 Use Case: Critical infrastructure, highest security

🔒 Security Properties:

   Immutability:
   ✅ Hardware Root: Keys fused in CPU silicon
   ✅ Tamper Proof: Cannot be modified after manufacturing
   ✅ Bypass Resistant: No software override capability
   ✅ Authenticated: Only OEM can sign valid firmware

   Verification Strength:
   🔐 Algorithm: RSA-2048 or RSA-3072 signatures
   🏷️ Hash: SHA-256 or SHA-384 integrity checking
   ⚡ Performance: Hardware-accelerated verification
   🛡️ Resistance: Immune to software-based attacks

📊 Implementation Statistics:

   Deployment Scale:
   🏢 Enterprise: 85% of Fortune 500 companies use Boot Guard
   🌐 Global: 50M+ systems deployed with Boot Guard
   ☁️ Cloud: Major CSPs require Boot Guard for secure infrastructure

   Security Effectiveness:
   🎯 Firmware Attack Prevention: >99% when properly configured
   ⏱️ Boot Time Impact: <200ms additional verification time
   💰 TCO Reduction: 40% fewer security incidents in enterprises

⚠️ Common Deployment Challenges:

   Key Management:
   🔑 Challenge: Secure private key storage and access control
   💡 Solution: Hardware Security Modules (HSMs) for signing
   📋 Process: Strict key lifecycle management procedures

   Recovery Procedures:
   🚨 Challenge: System recovery when firmware corrupted
   💡 Solution: Dual flash chips with verified recovery partition
   🔧 Process: Authenticated recovery procedures

   Supply Chain:
   📦 Challenge: Ensuring legitimate firmware in supply chain
   💡 Solution: Manufacturer firmware signing processes
   🏭 Process: Secure build and distribution pipelines

🛡️ Best Practices:

   Initial Deployment:
   1. ✅ Enable Profile 4 for production systems
   2. 🔐 Use RSA-3072 keys for new deployments
   3. 📊 Implement TPM measurement verification
   4. 🚨 Setup monitoring for Boot Guard errors

   Ongoing Management:
   1. 📝 Maintain secure firmware signing processes
   2. 📊 Monitor boot integrity across fleet
   3. 🔄 Plan for key rotation (7-10 year lifecycle)
   4. 🛡️ Regular security assessments and updates

💰 Business Justification:
   • Prevents 99%+ of firmware-level attacks
   • Reduces security incident costs by 60-80%
   • Enables compliance with security frameworks
   • Provides foundation for Zero Trust architecture
    `;

    trackDemoCompletion('boot-guard-exploration', { score: 100, timeSpent: 7000 });
}

function compareImplementations() {
    const resultDiv = document.getElementById('impl-demo-result');
    const outputDiv = document.getElementById('impl-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
⚖️ Hardware Root of Trust: Complete Implementation Comparison
==========================================================

🏗️ ARCHITECTURE COMPARISON:

┌─────────────────────────────────────────────────────────────────┐
│                    CPU-Integrated vs Discrete                  │
├─────────────────────────────────────────────────────────────────┤
│ CPU-Integrated (Intel Boot Guard, AMD PSP, ARM TrustZone)      │
│ ✅ Pros: Highest security, no bypass possible, cost-effective  │
│ ❌ Cons: Vendor lock-in, limited flexibility, recovery complex │
│                                                                 │
│ Discrete (TPM 2.0, Custom Security Chips)                     │
│ ✅ Pros: Standardized, vendor-neutral, flexible policies      │
│ ❌ Cons: Additional cost, potential bypass, complex integration│
└─────────────────────────────────────────────────────────────────┘

📊 DETAILED COMPARISON MATRIX:

Security Level Analysis:
┌──────────────────┬─────────────┬─────────────┬─────────────────┐
│ Implementation   │ Attack Res. │ Tamper Det. │ Key Protection  │
├──────────────────┼─────────────┼─────────────┼─────────────────┤
│ Intel Boot Guard │    99.9%    │   Excellent │    eFused       │
│ AMD PSP          │    99.8%    │   Excellent │    Hardware     │
│ ARM TrustZone    │    99.5%    │     Good    │    Hardware     │
│ TPM 2.0 (dTPM)   │    98.0%    │     Good    │   Chip-based    │
│ TPM 2.0 (fTPM)   │    95.0%    │   Limited   │   Firmware      │
│ Custom Secure El.│    99.7%    │   Excellent │   Proprietary   │
└──────────────────┴─────────────┴─────────────┴─────────────────┘

Performance Impact Assessment:
┌─────────────────┬──────────────┬──────────────┬──────────────────┐
│ Implementation  │ Boot Time    │ Runtime      │ Resource Usage   │
├─────────────────┼──────────────┼──────────────┼──────────────────┤
│ Intel BG        │   +150ms     │   Minimal    │     None         │
│ AMD PSP         │   +200ms     │   Minimal    │     <1% CPU      │
│ ARM TZ          │   +100ms     │   Variable   │     Variable     │
│ dTPM            │   +300ms     │   <1% CPU    │     Moderate     │
│ fTPM            │   +100ms     │   1-2% CPU   │     Memory       │
│ Custom          │   +250ms     │   Variable   │     Custom       │
└─────────────────┴──────────────┴──────────────┴──────────────────┘

💰 TOTAL COST OF OWNERSHIP (5-Year, 1000-Server Deployment):

Intel Boot Guard:
   💰 Hardware Cost: $0 (included in CPU)
   🔧 Implementation: $150,000 (integration, testing)
   🛠️ Management: $200,000 (tools, training, processes)
   💡 Total: $350,000

   ROI Benefits:
   ✅ Prevented Incidents: $12M+ (3-4 major incidents)
   ✅ Compliance: Simplified audit, reduced penalties
   ✅ Insurance: 15-25% premium reduction

TPM 2.0 (Discrete):
   💰 Hardware Cost: $50,000 (chips, integration)
   🔧 Implementation: $300,000 (complex integration)
   🛠️ Management: $400,000 (specialized tools, expertise)
   💡 Total: $750,000

   ROI Benefits:
   ✅ Flexibility: Multi-vendor support
   ✅ Standards: Industry standard compliance
   ✅ Attestation: Advanced remote verification

Custom Security Element:
   💰 Hardware Cost: $500,000 (custom chips)
   🔧 Implementation: $800,000 (development, validation)
   🛠️ Management: $600,000 (proprietary tools)
   💡 Total: $1,900,000

   ROI Benefits:
   ✅ Customization: Tailored security features
   ✅ Performance: Optimized for specific use cases
   ✅ Control: Complete security policy control

🎯 RECOMMENDATION DECISION TREE:

Starting New Infrastructure?
├─ Yes → Intel Boot Guard + TPM (hybrid approach)
│  └─ Rationale: Best of both worlds, future-proof
│
└─ No → Evaluate Current State
   ├─ Legacy Systems → Add TPM where possible
   └─ Modern Systems → Enable Boot Guard + attestation

Security Requirements Level?
├─ Maximum (Critical Infrastructure) → Intel BG Profile 4
├─ High (Enterprise) → Intel BG Profile 3 + TPM
├─ Medium (Business) → TPM 2.0 + policies
└─ Basic (Development) → Intel BG Profile 1

Budget Constraints?
├─ Limited → Enable existing CPU features (free)
├─ Moderate → Add TPM chips ($50/server)
└─ Unlimited → Custom security elements

🏆 INDUSTRY BEST PRACTICES BY SECTOR:

Financial Services:
   🏦 Standard: Intel Boot Guard + dTPM + HSM
   📋 Regulation: SOX, PCI-DSS, Basel III compliance
   🎯 Focus: Non-repudiation, audit trails
   💰 Investment: High, but required for licensing

Government/Defense:
   🏛️ Standard: Custom secure elements + formal verification
   📋 Regulation: FIPS 140-2 Level 4, Common Criteria EAL7
   🎯 Focus: Nation-state threat resistance
   💰 Investment: Maximum, security over cost

Healthcare:
   🏥 Standard: TPM 2.0 + attestation
   📋 Regulation: HIPAA, FDA 21 CFR Part 11
   🎯 Focus: Patient data protection, device integrity
   💰 Investment: Balanced, ROI-driven

Technology/Cloud:
   ☁️ Standard: Hybrid Intel BG + TPM + custom
   📋 Regulation: SOC2, ISO 27001, regional privacy
   🎯 Focus: Customer trust, competitive advantage
   💰 Investment: Strategic, technology leadership

🚀 FUTURE-PROOFING STRATEGY:

2024-2026: Current Generation
   🔧 Deploy: Intel Boot Guard + TPM 2.0
   📊 Monitor: Attestation infrastructure
   🛡️ Enhance: Policy automation and orchestration

2027-2030: Next Generation
   🔮 Quantum Resistance: Post-quantum algorithms
   🤖 AI Integration: ML-based anomaly detection
   🌐 Standards: Updated TCG, NIST guidelines

2030+: Future Architecture
   🧬 Biological: DNA-based authentication
   ⚛️ Quantum: Quantum key distribution
   🌌 Distributed: Blockchain-based attestation

💡 KEY DECISION FACTORS:
1. Threat model and risk tolerance
2. Regulatory compliance requirements
3. Existing infrastructure and budget
4. Technical expertise and support
5. Long-term security strategy alignment
    `;

    trackDemoCompletion('implementation-comparison', { score: 100, timeSpent: 10000 });
}

// ===== SECURE BOOT DEMONSTRATIONS =====
function simulateSecureBoot() {
    const resultDiv = document.getElementById('boot-demo-result');
    const outputDiv = document.getElementById('boot-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
🔄 Secure Boot Process Simulation
================================

🖥️ Target System: Enterprise Server with Intel Boot Guard + TPM 2.0
⚡ Boot Sequence: Power-On → OS Handoff

════════════════════════════════════════════════════════════════════

Phase 1: Power-On Reset (POR)
⚡ CPU Reset Vector: 0xFFFFFFF0
🔧 Microcode Load: Intel CPU microcode initialization
📊 eFuse Read: Boot Guard configuration and key hash
✅ Status: Hardware Root of Trust activated

Phase 2: Security (SEC) - Initial Trust Establishment
🔍 Boot Policy: Reading Boot Guard policy from eFuses
   • Profile: 4 (Verified + Measured + Enforcement)
   • Algorithm: RSA-3072 + SHA-384
   • Error Action: Halt system on verification failure

📄 Initial Boot Block (IBB) Discovery:
   • Location: SPI Flash 0xFF800000
   • Size: 64KB Initial Boot Block
   • Expected Hash: a7f2c8d4e9b1...

🔐 IBB Verification:
   • Calculating SHA-384 hash... ✅ Complete
   • Hash: a7f2c8d4e9b1... ✅ Match Expected
   • Signature verification with eFused key... ✅ Valid
   • Boot Guard Decision: ✅ ALLOW EXECUTION

📏 TPM Measurement:
   • PCR[0] Extend: SHA-384(Previous || IBB_Hash)
   • PCR[0] Value: f3c7a8b2d5e1...
   ✅ Status: SEC phase complete, handoff to PEI

Phase 3: Pre-EFI Initialization (PEI) - Platform Setup
🧮 Memory Controller: DDR4-3200 initialization
🔌 Platform Init: PCIe, USB, storage controllers
🛡️ Security Policy: Loading security configuration modules

📏 TPM Measurement:
   • PCR[1] Extend: Platform configuration data
   • Measured Components: ACPI tables, device configs
   • PCR[1] Value: b8d4f7e2c9a6...
   ✅ Status: Platform initialization verified

Phase 4: Driver Execution Environment (DXE) - UEFI Drivers
⚙️ UEFI Driver Loading:
   • Storage drivers: NVMe, SATA controllers
   • Network drivers: Intel i40e, Mellanox ConnectX
   • Graphics driver: BMC VGA controller

🔍 Driver Verification (UEFI Secure Boot):
   Each driver signature checked against:
   • Platform Key (PK): Acme Corp Root CA
   • Key Exchange Key (KEK): Acme UEFI Signing CA
   • Signature Database (db): Approved driver signers
   • Forbidden Database (dbx): Revoked signatures

   Driver Verification Results:
   ✅ NVMe Driver: Valid signature (Microsoft UEFI CA)
   ✅ Network Driver: Valid signature (Intel UEFI CA)
   ✅ Graphics Driver: Valid signature (Acme Hardware CA)

📏 TPM Measurement:
   • PCR[2] Extend: Option ROM measurements
   • PCR[2] Value: c9e5a1f8d3b7...
   ✅ Status: All drivers verified and loaded

Phase 5: Boot Device Selection (BDS) - OS Loader Discovery
🎯 Boot Option Enumeration:
   • Boot0001: Windows Boot Manager (NVMe SSD)
   • Boot0002: PXE Network Boot (Disabled)
   • Boot0003: UEFI Shell (Debug only)

📄 OS Loader Discovery:
   • Path: \EFI\Microsoft\Boot\bootmgfw.efi
   • Size: 1.2MB Windows Boot Manager
   • Signature: Microsoft Windows UEFI CA

🔍 UEFI Secure Boot Verification:
   • Reading bootmgfw.efi from ESP partition
   • Verifying authenticode signature...
   • Certificate Chain: Microsoft Root → Microsoft Windows CA
   • Signature Status: ✅ VALID (not in dbx)
   • Secure Boot Decision: ✅ ALLOW EXECUTION

📏 TPM Measurement:
   • PCR[4] Extend: Boot manager measurement
   • PCR[4] Value: d7b3f2c8e4a9...
   ✅ Status: OS loader verified, ready for handoff

Phase 6: Operating System Boot - Windows 11 Enterprise
🖥️ Windows Boot Manager Execution:
   • Loading BCD (Boot Configuration Data)
   • Kernel path: \Windows\System32\ntoskrnl.exe
   • HAL path: \Windows\System32\hal.dll

🔍 Kernel Verification (Windows Kernel Code Integrity):
   • HVCI (Hypervisor-protected Code Integrity) enabled
   • Verifying kernel digital signature...
   • Certificate: Microsoft Windows Kernel CA
   • Signature Status: ✅ VALID

📏 TPM Measurement:
   • PCR[8] Extend: OS kernel measurement
   • PCR[9] Extend: Critical system drivers
   • PCR Values: 8a2e5c1f... / 9b4d7e3a...

🏁 Boot Completion:
   ✅ All verification stages passed
   ✅ Complete chain of trust established
   ✅ System ready for production workloads
   ⏱️ Total boot time: 45 seconds (including verification)

════════════════════════════════════════════════════════════════════

📊 SECURITY SUMMARY:
🛡️ Hardware Root of Trust: ✅ Active (Intel Boot Guard)
🔐 Firmware Integrity: ✅ Verified (RSA-3072)
📏 Boot Measurements: ✅ Recorded (TPM PCRs 0,1,2,4,8,9)
🔒 Secure Boot: ✅ Enabled (UEFI + Windows)
🏆 Security Level: Maximum - Enterprise Grade

💡 Next Steps:
   • Remote attestation available via TPM quotes
   • Platform configuration baseline established
   • Ready for confidential workload deployment
   • Continuous integrity monitoring activated
    `;

    trackDemoCompletion('secure-boot-simulation', { score: 100, timeSpent: 8000 });
}

function simulateBootAttack() {
    const resultDiv = document.getElementById('boot-demo-result');
    const outputDiv = document.getElementById('boot-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
⚠️ Boot Attack Simulation - Evil Maid Scenario
=============================================

🎭 Attack Scenario: Advanced Persistent Threat
👤 Threat Actor: Nation-state attacker with physical access
🎯 Target: High-value enterprise server in datacenter
🕐 Attack Window: 15-minute maintenance window

════════════════════════════════════════════════════════════════════

🚨 ATTACK ATTEMPT 1: Firmware Replacement
───────────────────────────────────────────

Phase 1: Physical Access Gained
🔓 Physical Security: Attacker bypasses datacenter security
🔧 Server Access: Removes server from rack for modification
⚡ Power Down: Safely powers down target system

Phase 2: Firmware Modification Attempt
💾 Flash Chip Access: Attempts to modify SPI flash memory
🔬 Chip Analysis: Identifies Winbond W25Q128JV flash chip
🛠️ Hardware Tools: Uses SPI flash programmer

Phase 3: Malicious Firmware Installation
📝 Payload: Installs firmware with embedded backdoor
🦠 Capabilities: Remote access, credential harvesting, persistence
💾 Flash Write: Attempts to overwrite legitimate UEFI firmware

Phase 4: System Restart and Detection
⚡ Power On: Attacker powers on system after modification
🔍 Boot Guard Check: Intel Boot Guard begins verification...

🚨 ATTACK RESULT: BLOCKED ❌
──────────────────────────

Boot Guard Verification Process:
1. 📊 eFuse Read: Reading manufacturer's public key hash
2. 🔐 Signature Check: Verifying firmware signature...
3. ❌ VERIFICATION FAILED: Signature does not match eFused key
4. 🚫 HALT EXECUTION: Boot Guard prevents malicious code execution

Security Response:
📱 Alert Generated: "Boot integrity violation detected"
📊 Evidence Logged: Attack attempt recorded in TPM NVRAM
🚨 SOC Notification: Security Operations Center alerted
🔒 System State: System halted, requires manual intervention

Forensic Evidence Collected:
🔍 Tamper Detection: Physical access detected
📏 PCR Values: Anomalous measurements in PCR[0]
⏰ Timestamp: Attack attempt logged with precise timing
🆔 System ID: Affected system uniquely identified

════════════════════════════════════════════════════════════════════

🚨 ATTACK ATTEMPT 2: Signed Malware (Advanced)
─────────────────────────────────────────────

Phase 1: Certificate Authority Compromise
🏢 Target: Compromise signing certificate authority
🔑 Goal: Obtain valid code signing certificates
💰 Method: Social engineering, insider threat, zero-day

Phase 2: Malicious Firmware Signing
📝 Payload: Create malicious firmware with valid signature
✍️ Signing: Use stolen certificates to sign malware
🔍 Evasion: Malware appears legitimate to verification systems

Phase 3: Supply Chain Injection
📦 Distribution: Inject signed malware into update channel
🌐 Delivery: Target downloads "legitimate" firmware update
🎯 Installation: User/system installs signed malicious firmware

Phase 4: Boot Process with Signed Malware
⚡ Power On: System boots with signed malicious firmware
🔍 Boot Guard: Verifies signature... ✅ Valid (compromised CA)

⚠️ PARTIAL SUCCESS: Certificate Chain Compromised
─────────────────────────────────────────────────

Boot Guard Result: ✅ Signature Valid (but CA compromised)
Advanced Defense: Certificate Transparency + OCSP checking

Secondary Defenses Activated:
1. 📋 Certificate Transparency: Logs show suspicious certificate
2. 🚫 OCSP Revocation: Certificate authority reports compromise
3. 🛡️ TPM Attestation: Remote verifier detects anomalous measurements
4. 🤖 AI Detection: ML models flag unusual boot behavior patterns

Incident Response:
📞 Emergency Response: Security team activated immediately
🔒 Network Isolation: System quarantined from production network
🔍 Forensic Analysis: Deep forensic investigation initiated
📋 Certificate Revocation: Compromised certificates revoked globally

════════════════════════════════════════════════════════════════════

🚨 ATTACK ATTEMPT 3: Runtime Exploitation (Post-Boot)
────────────────────────────────────────────────────

Phase 1: System Compromise After Boot
💻 Initial Access: Attacker gains OS-level access via vulnerability
🎯 Privilege Escalation: Exploits kernel vulnerability for admin access
🔧 Tool Installation: Deploys firmware modification tools

Phase 2: Runtime Firmware Modification
🔓 SMM Exploitation: Attempts System Management Mode (SMM) attack
📝 UEFI Variable Manipulation: Tries to modify secure boot variables
💾 Runtime Flash: Attempts to modify firmware while system running

Phase 3: Hardware Protection Response
🛡️ Write Protection: Hardware write protection blocks flash modification
🔒 SMM Protection: SMRAM protection prevents unauthorized SMM access
🚫 Variable Lock: UEFI variables locked, cannot be modified at runtime

Phase 4: Detection and Response
📊 Runtime Attestation: Continuous attestation detects tampering attempts
🚨 SIEM Alert: Security Information Event Management system triggered
🤖 EDR Response: Endpoint Detection and Response blocks malicious process

🛡️ ATTACK RESULT: BLOCKED ✅
──────────────────────────

Hardware Protections Successful:
✅ Write Protection: Hardware prevents firmware modification
✅ SMM Isolation: System Management Mode attack blocked
✅ Variable Locking: UEFI secure boot variables protected
✅ Runtime Monitoring: Continuous integrity verification active

════════════════════════════════════════════════════════════════════

📊 ATTACK SUMMARY & LESSONS LEARNED
══════════════════════════════════

🎯 Attack Vectors Tested: 3 different approaches
🛡️ Success Rate: 0% (all attacks blocked)
⏱️ Detection Time: <10 seconds for all attempts
💰 Attack Cost: High (sophisticated tools/access required)

🏆 Defense Effectiveness:
┌─────────────────────────┬──────────────┬──────────────────────┐
│ Defense Mechanism       │ Attack #1    │ Attack #2 │ Attack #3│
├─────────────────────────┼──────────────┼───────────┼──────────┤
│ Hardware Root of Trust  │   BLOCKED    │  PARTIAL  │ BLOCKED  │
│ Certificate Validation  │   N/A        │  FAILED   │ N/A      │
│ Certificate Transparency│   N/A        │  DETECTED │ N/A      │
│ Runtime Protection      │   N/A        │  N/A      │ BLOCKED  │
│ Continuous Attestation  │   DETECTED   │  DETECTED │ DETECTED │
└─────────────────────────┴──────────────┴───────────┴──────────┘

💡 Key Security Insights:
1. 🔐 Hardware Root of Trust is highly effective against direct attacks
2. 📋 Certificate management and monitoring are critical
3. 🛡️ Defense in depth prevents single points of failure
4. 📊 Continuous monitoring enables rapid incident detection
5. 🤖 AI/ML can enhance detection of sophisticated attacks

🚀 Recommendations:
• Implement Hardware Root of Trust (99%+ attack prevention)
• Deploy certificate transparency monitoring
• Enable continuous attestation and monitoring
• Train security teams on firmware-level threats
• Regular security assessments and red team exercises
    `;

    trackDemoCompletion('boot-attack-simulation', { score: 100, timeSpent: 12000 });
}

function explainPCRs() {
    const resultDiv = document.getElementById('boot-demo-result');
    const outputDiv = document.getElementById('boot-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
📏 Platform Configuration Registers (PCRs) Deep Dive
===================================================

🔧 PCR Architecture and Operation:

What are PCRs?
   📊 Definition: 24+ hardware registers in TPM storing integrity measurements
   🔐 Security: Write-only during boot, read for verification
   🧮 Algorithm: Cryptographic hash extension (SHA-256/384/512)
   🚫 Reset: Only on TPM reset or specific authorized commands

PCR Extension Process:
   📥 Input: Previous PCR value + new measurement
   🧮 Operation: PCR(n) = Hash(PCR(n) || new_measurement)
   📊 Result: Irreversible accumulation of measurements
   🛡️ Security: Impossible to forge without knowing all previous values

🗂️ STANDARD PCR ALLOCATION:

PCR[0]: BIOS/UEFI Core Firmware
   📋 Contents:
      • Initial Boot Block (IBB) from Boot Guard
      • Core UEFI firmware modules (PEI, DXE core)
      • Critical security policy modules
      • Platform initialization code

   💡 Usage: Primary firmware integrity verification
   🔍 Attestation: Critical for remote trust decisions
   ⚠️ Warning: Changes indicate firmware modification

PCR[1]: Platform Configuration
   📋 Contents:
      • Host platform configuration (ACPI tables)
      • Device configuration data
      • Platform-specific initialization parameters
      • Hardware resource allocation settings

   💡 Usage: Platform configuration verification
   🔍 Attestation: Ensures consistent platform setup
   ⚠️ Warning: Changes may indicate hardware modifications

PCR[2]: Option ROM Code
   📋 Contents:
      • Network card option ROMs/UEFI drivers
      • Storage controller firmware and drivers
      • Graphics adapter BIOS/UEFI components
      • Other PCIe device option ROMs

   💡 Usage: Device firmware integrity verification
   🔍 Attestation: Prevents malicious option ROM injection
   ⚠️ Warning: New devices or firmware updates change this

PCR[3]: Option ROM Configuration
   📋 Contents:
      • Option ROM configuration data
      • Device-specific configuration settings
      • PCI configuration space snapshots
      • Device initialization parameters

   💡 Usage: Device configuration consistency verification
   ⚠️ Warning: Hardware config changes affect this PCR

PCR[4]: Master Boot Record / Boot Manager
   📋 Contents:
      • MBR or GPT partition table
      • UEFI boot manager (bootmgfw.efi)
      • Boot configuration data (BCD)
      • Boot device selection information

   💡 Usage: Boot path integrity verification
   🔍 Attestation: Critical for OS integrity chain
   ⚠️ Warning: OS installation/updates change this

PCR[5]: Boot Manager Configuration
   📋 Contents:
      • Boot manager configuration and data
      • Boot options and parameters
      • Boot device priority settings
      • Recovery boot information

   💡 Usage: Boot configuration verification
   ⚠️ Warning: Boot config changes affect this

PCR[6]: Host Platform Manufacturer State
   📋 Contents:
      • Platform manufacturer-specific measurements
      • Secure firmware update state
      • Platform security policy state
      • OEM-specific security features

   💡 Usage: OEM security feature verification

PCR[7]: Secure Boot Policy
   📋 Contents:
      • Secure Boot variable measurements (PK, KEK, db, dbx)
      • UEFI security policy settings
      • Secure Boot enable/disable state
      • Certificate database changes

   💡 Usage: Secure Boot policy integrity verification
   🔍 Attestation: Critical for secure boot verification

PCR[8-15]: Operating System and Applications
   📋 Contents:
      • OS kernel (ntoskrnl.exe, vmlinuz, etc.)
      • Critical system drivers
      • Security subsystem components
      • Application measurements (IMA/EVM on Linux)

   💡 Usage: OS integrity verification
   🔍 Attestation: Runtime OS integrity checking

🎯 PRACTICAL PCR EXAMPLES:

Example 1: Clean Boot Sequence
┌─────────┬──────────────────────────────────────────────────────────┐
│ PCR[0]  │ a7f2c8d4e9b15a3c... (Intel Boot Guard + UEFI Core)     │
│ PCR[1]  │ b8d4f7e2c9a68f1b... (Platform Config + ACPI)           │
│ PCR[2]  │ c9e5a1f8d3b74e2a... (NIC + Storage Option ROMs)        │
│ PCR[4]  │ d7b3f2c8e4a95d1f... (Windows Boot Manager)             │
│ PCR[8]  │ e6c2a9d5f1b84c7e... (Windows Kernel + HAL)             │
└─────────┴──────────────────────────────────────────────────────────┘

Example 2: Firmware Update Applied
┌─────────┬──────────────────────────────────────────────────────────┐
│ PCR[0]  │ f8e4b1c7d2a93f6e... ← CHANGED (new firmware version)   │
│ PCR[1]  │ b8d4f7e2c9a68f1b... (unchanged platform config)        │
│ PCR[2]  │ c9e5a1f8d3b74e2a... (unchanged option ROMs)            │
│ PCR[4]  │ d7b3f2c8e4a95d1f... (unchanged boot manager)           │
│ PCR[8]  │ e6c2a9d5f1b84c7e... (unchanged OS kernel)              │
└─────────┴──────────────────────────────────────────────────────────┘

Example 3: Malicious Firmware Detected
┌─────────┬──────────────────────────────────────────────────────────┐
│ PCR[0]  │ 00000000000000000... ← ZERO (Boot Guard blocked boot)   │
│ Status  │ BOOT HALTED - Firmware signature verification failed    │
│ Action  │ System requires manual recovery intervention             │
└─────────┴──────────────────────────────────────────────────────────┘

🔍 REMOTE ATTESTATION WITH PCRS:

Attestation Quote Structure:
┌─────────────────────────────────────────────────────────────────┐
│ TPM Quote (signed with Attestation Identity Key)               │
├─────────────────────────────────────────────────────────────────┤
│ • Magic: TPM_GENERATED (0xFF544347)                            │
│ • Type: TPM_ST_ATTEST_QUOTE                                    │
│ • Qualified Signer: AIK public key name                       │
│ • Extra Data: Nonce from challenger                           │
│ • Clock Info: TPM clock, reset counter, restart counter       │
│ • PCR Digest: Hash of selected PCR values                     │
│ • PCR Selection: Which PCRs included (0,1,2,4,8)              │
│ • Signature: RSA-2048/ECDSA signature over quote structure    │
└─────────────────────────────────────────────────────────────────┘

Attestation Protocol Flow:
1. 📞 Verifier → Device: "Send quote for PCRs 0,1,2,4,8 + nonce"
2. 📊 Device TPM: Collect current PCR values
3. ✍️ Device TPM: Create signed quote with AIK private key
4. 📤 Device → Verifier: Send quote + certificate chain
5. 🔍 Verifier: Validate signature and compare PCR values
6. ✅ Verifier: Make trust decision (allow/deny access)

🛠️ PRACTICAL MANAGEMENT:

Golden Measurements (Baseline):
   📋 Process:
   1. Deploy known-good system configuration
   2. Capture PCR values during verified boot
   3. Store as "golden" reference measurements
   4. Use for comparison in attestation policies

PCR Policy Management:
   🔧 Update Policies:
      • Firmware updates: Update PCR[0] expected values
      • Hardware changes: Update PCR[1,2] baselines
      • OS updates: Update PCR[8-15] references

   📊 Monitoring:
      • Continuous attestation (every 5-15 minutes)
      • Alert on unexpected PCR changes
      • Automated baseline updates for approved changes

Common PCR Issues and Solutions:
   ❌ Issue: PCR drift due to firmware updates
   ✅ Solution: Automated baseline management system

   ❌ Issue: Hardware config changes break attestation
   ✅ Solution: Flexible policies with approved hardware profiles

   ❌ Issue: False positives from legitimate changes
   ✅ Solution: Change approval workflows with automatic updates

📈 Enterprise Scale Considerations:
   • 10,000+ servers: Automated PCR baseline management essential
   • Multi-vendor hardware: Standardized PCR policies across vendors
   • CI/CD integration: PCR updates as part of deployment pipelines
   • Compliance reporting: PCR attestation for audit requirements
    `;

    trackDemoCompletion('pcr-explanation', { score: 100, timeSpent: 9000 });
}

// ===== REMOTE ATTESTATION DEMONSTRATIONS =====
function simulateAttestation() {
    const resultDiv = document.getElementById('attestation-demo-result');
    const outputDiv = document.getElementById('attestation-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
📡 Remote Attestation Protocol Simulation
=========================================

🌐 Scenario: Cloud Workload Placement Verification
📍 Verifier: Cloud Control Plane (Azure/AWS/GCP)
🖥️ Attester: DataCenter Server #DC01-R03-S047
🎯 Goal: Verify server integrity before confidential workload deployment

════════════════════════════════════════════════════════════════════

Phase 1: Attestation Challenge Generation
─────────────────────────────────────────

🔍 Verifier Action: Generate attestation challenge
📊 Challenge Parameters:
   • Target Server: DC01-R03-S047 (10.20.30.47)
   • Required PCRs: 0,1,2,4,7,8,9 (boot integrity chain)
   • Nonce: 7f2a9b8c4d1e6f3a2b5c8d9e1f4a7b2c (32 bytes)
   • Algorithm: SHA-256 (TPM 2.0)
   • Timeout: 30 seconds

📤 Network Transmission:
   Protocol: TLS 1.3 (certificate-based mutual auth)
   Endpoint: https://10.20.30.47:4433/tpm/attest
   Payload: JSON attestation request

Challenge Request Sent:
{
  "timestamp": "2024-12-16T18:30:00Z",
  "nonce": "7f2a9b8c4d1e6f3a2b5c8d9e1f4a7b2c",
  "pcr_selection": [0,1,2,4,7,8,9],
  "hash_algorithm": "sha256",
  "quote_format": "tpm2_quote"
}

Phase 2: Platform Measurement Collection
────────────────────────────────────────

🖥️ Attester Action: Collect current platform state
📊 TPM Query: Reading Platform Configuration Registers

PCR Values Retrieved:
┌─────────┬──────────────────────────────────────────────────────────┐
│ PCR[0]  │ a7f2c8d4e9b15a3c7d2f8e1b6a4c9f3e2d1a5b8c7f9e2a6d4c1b │ ✅ Firmware
│ PCR[1]  │ b8d4f7e2c9a68f1b3e5c2a7d9f4b1e8c6a2f5d8b3c7e1a9f6d2 │ ✅ Platform
│ PCR[2]  │ c9e5a1f8d3b74e2a6f1c8d5b9e3a7f2c1d8e5a2b6f4c9d1e3a │ ✅ Option ROMs
│ PCR[4]  │ d7b3f2c8e4a95d1f6c2a8e5b1d9f3c7a2e8d5b4f1a6c9e2d7 │ ✅ Boot Manager
│ PCR[7]  │ e1c5b9f3a2d8e6a4f7c1b5e9d2a6f8c3b1e5a9d4f2c7e8b1 │ ✅ Secure Boot
│ PCR[8]  │ f6d2a8c5e1b9f4a7c3e8d1b5f9a2c6e4b8f1d9c3e7a5b2d6 │ ✅ OS Kernel
│ PCR[9]  │ a3e7c1f5b8d2a9f6c4e1d5b8f2a7c3e9d6b1f4a8c2e5d9b │ ✅ OS Drivers
└─────────┴──────────────────────────────────────────────────────────┘

⏱️ Measurement Time: 45ms total
🔍 Integrity Check: All PCRs contain valid measurements

Phase 3: TPM Quote Generation
────────────────────────────

🔐 TPM Operation: Generate attestation quote
🔑 Signing Key: Attestation Identity Key (AIK)
   • Algorithm: RSA-2048
   • Key Handle: 0x80000001 (persistent AIK)
   • Certification: Valid AIK certificate from Privacy CA

Quote Generation Process:
1. 📊 PCR Selection: Combine requested PCR values
2. 🧮 PCR Digest: SHA-256(PCR[0]||PCR[1]||...||PCR[9])
3. 📝 Quote Structure: Create TPM2_ATTEST_QUOTE structure
4. ✍️ Signing: Sign quote with AIK private key
5. 📦 Package: Bundle quote + signature + certificate chain

TPM Quote Structure Generated:
┌─────────────────────────────────────────────────────────────────┐
│ TPM Quote (1,247 bytes total)                                  │
├─────────────────────────────────────────────────────────────────┤
│ Magic: 0xFF544347 (TPM_GENERATED)                              │
│ Type: 0x8018 (TPM_ST_ATTEST_QUOTE)                             │
│ Qualified Signer: sha256(AIK_public_key)                       │
│ Extra Data: 7f2a9b8c4d1e6f3a2b5c8d9e1f4a7b2c (nonce)          │
│ Clock: 0x1A2B3C4D (TPM clock value)                           │
│ Reset Count: 0x0017 (17th reset since manufacturing)           │
│ Restart Count: 0x0001 (1st restart this boot)                  │
│ Safe: 0x01 (TPM in safe state)                                │
│ PCR Selection: SHA-256 bank, PCRs 0,1,2,4,7,8,9               │
│ PCR Digest: 2f8a7c3e9b4d1f6a8c2e5d9b3f1a7c4e6d8b1f2a5c9e3   │
│ Signature: 256-byte RSA-2048 signature over quote structure    │
└─────────────────────────────────────────────────────────────────┘

⏱️ Quote Generation Time: 23ms
✅ Quote Status: Successfully generated and signed

Phase 4: Attestation Response Transmission
──────────────────────────────────────────

📤 Network Response: Send attestation evidence to verifier
🔐 Transport: TLS 1.3 encrypted channel
📊 Payload Size: 3,142 bytes (quote + certificates + metadata)

Attestation Response:
{
  "timestamp": "2024-12-16T18:30:01Z",
  "server_id": "DC01-R03-S047",
  "tpm_quote": {
    "quote_data": "ff54434700180022000b...", // base64 encoded
    "signature": "3045022100a7f2c8d4e9b1...", // base64 encoded
    "pcr_values": {
      "0": "a7f2c8d4e9b15a3c7d2f8e1b6a4c9f3e2d1a5b8c7f9e2a6d4c1b",
      "1": "b8d4f7e2c9a68f1b3e5c2a7d9f4b1e8c6a2f5d8b3c7e1a9f6d2",
      ... // other PCR values
    }
  },
  "certificate_chain": [
    "-----BEGIN CERTIFICATE-----...", // AIK certificate
    "-----BEGIN CERTIFICATE-----...", // Privacy CA certificate
    "-----BEGIN CERTIFICATE-----..."  // Root CA certificate
  ],
  "platform_info": {
    "manufacturer": "Acme Hardware Corp",
    "model": "AC-SVR-4820",
    "bios_version": "v2.1.4",
    "tpm_version": "2.0"
  }
}

📤 Transmission Status: ✅ Successful (sent in 127ms)

Phase 5: Attestation Verification
─────────────────────────────────

🔍 Verifier Action: Validate attestation evidence
🏢 Verification Infrastructure: Cloud security service

Step 1: Certificate Chain Validation
🔐 Root CA: "DataCenter Hardware Root CA" ✅ Trusted
🏭 Privacy CA: "Acme Hardware Privacy CA" ✅ Valid chain
📝 AIK Certificate: "Server DC01-R03-S047 AIK" ✅ Valid

Step 2: Signature Verification
🔍 Algorithm: RSA-2048 with SHA-256
🔑 Public Key: Extracted from AIK certificate
✍️ Signature: Verified against quote structure
✅ Result: Signature is cryptographically valid

Step 3: Nonce Freshness Check
🎲 Expected Nonce: 7f2a9b8c4d1e6f3a2b5c8d9e1f4a7b2c
📊 Quote Nonce: 7f2a9b8c4d1e6f3a2b5c8d9e1f4a7b2c
✅ Result: Nonce matches (prevents replay attacks)

Step 4: PCR Value Analysis
📋 Reference Database: Enterprise golden measurements
🔍 Comparison Mode: Strict matching with approved baselines

PCR Verification Results:
┌─────────┬──────────────┬─────────────────────────────────────┐
│ PCR     │ Status       │ Analysis                            │
├─────────┼──────────────┼─────────────────────────────────────┤
│ PCR[0]  │ ✅ MATCH     │ Firmware v2.1.4 (approved)         │
│ PCR[1]  │ ✅ MATCH     │ Platform config baseline #47       │
│ PCR[2]  │ ✅ MATCH     │ Standard device config              │
│ PCR[4]  │ ✅ MATCH     │ Windows Boot Manager v10.0         │
│ PCR[7]  │ ✅ MATCH     │ Secure Boot enabled, std policy    │
│ PCR[8]  │ ✅ MATCH     │ Windows 11 Enterprise kernel       │
│ PCR[9]  │ ✅ MATCH     │ Approved system drivers only       │
└─────────┴──────────────┴─────────────────────────────────────┘

🎉 ATTESTATION RESULT: ✅ TRUSTED
══════════════════════════════════

Trust Decision Summary:
✅ Certificate Chain: Valid and trusted
✅ Signature: Cryptographically verified
✅ Nonce: Fresh, prevents replay
✅ PCR Values: Match approved baselines
✅ Platform State: Verified integrity
✅ Compliance: Meets security policy requirements

Security Clearance: GRANTED
🛡️ Approved for: Confidential workload deployment
🎯 Workload Types: PII processing, financial data, healthcare records
⏱️ Verification Time: 1,247ms total (well under 30s timeout)
🔄 Re-attestation: Required every 4 hours for ongoing verification

Cloud Platform Action:
📍 Workload Placement: Authorizing deployment to server DC01-R03-S047
🔐 Encryption Keys: Provisioning workload encryption keys to verified platform
📊 Monitoring: Enabling continuous attestation monitoring
🚨 Alerts: Configured to alert on any integrity violations

💡 Next Steps:
   • Deploy confidential workload with confidence
   • Monitor for PCR drift or anomalies
   • Maintain attestation baseline currency
   • Regular security policy reviews
    `;

    trackDemoCompletion('attestation-simulation', { score: 100, timeSpent: 10000 });
}

function simulateAttestationFailure() {
    const resultDiv = document.getElementById('attestation-demo-result');
    const outputDiv = document.getElementById('attestation-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
❌ Remote Attestation Failure Simulation
========================================

🚨 Scenario: Compromised Server Detection
📍 Verifier: Cloud Security Service
🖥️ Attester: DataCenter Server #DC01-R05-S023 (COMPROMISED)
⚠️ Incident: Firmware rootkit detected via attestation

════════════════════════════════════════════════════════════════════

Phase 1: Routine Attestation Check
──────────────────────────────────

⏰ Scheduled Event: 4-hour periodic attestation (06:00 UTC)
🎯 Target: Server DC01-R05-S023 (10.20.30.85)
📊 Challenge: Standard attestation request for PCRs 0,1,2,4,7,8,9
🎲 Nonce: e8f3b7d2a1c9f4e6b2d5a8f1c3e7b9d4

📤 Attestation Request Sent Successfully

Phase 2: Suspicious Response Received
────────────────────────────────────

🖥️ Server Response: Attestation quote received
⏱️ Response Time: 2,847ms (unusually slow, normal: <300ms)
🚨 Initial Warning: Extended response time indicates possible tampering

Received PCR Values:
┌─────────┬──────────────────────────────────────────────────────────┬──────────┐
│ PCR     │ Measured Value                                           │ Status   │
├─────────┼──────────────────────────────────────────────────────────┼──────────┤
│ PCR[0]  │ x7c3f9e2d8a1b5f4c6e9d2a7f8c1b4e5d9a3f6c2e8b1d7f4a9 │ ⚠️ DIFF  │
│ PCR[1]  │ b8d4f7e2c9a68f1b3e5c2a7d9f4b1e8c6a2f5d8b3c7e1a9f6d2 │ ✅ MATCH │
│ PCR[2]  │ c9e5a1f8d3b74e2a6f1c8d5b9e3a7f2c1d8e5a2b6f4c9d1e3a │ ✅ MATCH │
│ PCR[4]  │ d7b3f2c8e4a95d1f6c2a8e5b1d9f3c7a2e8d5b4f1a6c9e2d7 │ ✅ MATCH │
│ PCR[7]  │ 1f4a8c2e5b9d6f3a7c1e4b8d2f5a9c6e3b7d1f8c4e2a5d9b │ ⚠️ DIFF  │
│ PCR[8]  │ f6d2a8c5e1b9f4a7c3e8d1b5f9a2c6e4b8f1d9c3e7a5b2d6 │ ✅ MATCH │
│ PCR[9]  │ a3e7c1f5b8d2a9f6c4e1d5b8f2a7c3e9d6b1f4a8c2e5d9b │ ✅ MATCH │
└─────────┴──────────────────────────────────────────────────────────┴──────────┘

🚨 CRITICAL ALERT: PCR[0] and PCR[7] Mismatch Detected!

Phase 3: Detailed Anomaly Analysis
──────────────────────────────────

🔍 Forensic Analysis: PCR[0] (Firmware Measurement)
Expected Value: a7f2c8d4e9b15a3c7d2f8e1b6a4c9f3e2d1a5b8c7f9e2a6d4c1b
Measured Value: x7c3f9e2d8a1b5f4c6e9d2a7f8c1b4e5d9a3f6c2e8b1d7f4a9
🚨 Analysis: Firmware has been modified! Different measurement indicates:
   • Unauthorized firmware modification
   • Possible rootkit installation in UEFI
   • Boot process compromise

🔍 Forensic Analysis: PCR[7] (Secure Boot Policy)
Expected Value: e1c5b9f3a2d8e6a4f7c1b5e9d2a6f8c3b1e5a9d4f2c7e8b1
Measured Value: 1f4a8c2e5b9d6f3a7c1e4b8d2f5a9c6e3b7d1f8c4e2a5d9b
🚨 Analysis: Secure Boot configuration altered! Changes indicate:
   • Secure Boot databases (db/dbx) modified
   • Possibly disabled or weakened secure boot
   • Unauthorized certificate additions

Phase 4: Signature Verification Check
─────────────────────────────────────

🔐 Quote Signature: Verification attempt...
✅ Signature Valid: Quote is properly signed by legitimate TPM
🎭 Sophisticated Attack: Attacker has not compromised TPM itself
💡 Conclusion: Firmware-level compromise above TPM measurement layer

This indicates a sophisticated attack where:
   • TPM hardware remains secure and functional
   • Firmware has been modified to include malicious code
   • Secure Boot policy weakened to allow malicious components
   • Attack occurred after initial secure provisioning

Phase 5: Incident Response Activation
────────────────────────────────────

🚨 SECURITY INCIDENT DECLARED: Level 2 (High Severity)
⏰ Incident ID: INC-2024-1216-0600-ATTEST
📱 Alert Routing: SOC → Security Team → Infrastructure Team

Immediate Response Actions:
1. 🚫 QUARANTINE: Server isolated from production network
   Network ACL: Block all traffic except management
   Status: ✅ Complete (executed in 15 seconds)

2. 📊 EVIDENCE PRESERVATION:
   PCR Values: Captured and signed for forensics
   TPM Event Log: Downloaded and preserved
   Memory Dump: Initiated for malware analysis
   Status: 🔄 In Progress (45% complete)

3. 🔍 FORENSIC INVESTIGATION:
   Assigned: Senior Security Analyst Team
   Tools: Enterprise forensic suite deployed
   Priority: Critical infrastructure compromise
   Status: ✅ Team Activated (ETA: 30 minutes)

4. 📞 STAKEHOLDER NOTIFICATION:
   CISO: ✅ Notified (immediate escalation)
   Infrastructure Manager: ✅ Notified
   Compliance Officer: ✅ Notified (regulatory implications)
   External Auditors: 🔄 Pending (within 24 hours)

Phase 6: Threat Assessment and Impact Analysis
──────────────────────────────────────────────

🎯 Attack Vector Analysis:
Likely Attack Path:
1. 🌐 Initial Access: Network-based attack or physical access
2. 🔓 Privilege Escalation: Exploitation to admin/root privileges
3. 💾 Firmware Modification: Direct SPI flash modification or update hijacking
4. 🔒 Secure Boot Bypass: Modification of UEFI variables or key databases
5. 🦠 Persistence: Installation of UEFI rootkit for stealth persistence

🔍 Potential Capabilities (Firmware Rootkit):
   ✅ Persistence: Survives OS reinstallation, antivirus, disk formatting
   ✅ Stealth: Operates below OS level, difficult to detect
   ✅ Network Access: Can establish command & control channels
   ✅ Data Exfiltration: Access to all system data and network traffic
   ✅ Lateral Movement: Can spread to other systems via network

📊 Business Impact Assessment:
   🏢 Affected Systems: 1 confirmed, 847 systems in same datacenter rack
   💰 Financial Risk: $2.1M (data breach calculation)
   📋 Compliance Risk: SOC2, ISO27001, PCI DSS implications
   ⏱️ Downtime Impact: High (critical infrastructure server)
   🌐 Customer Impact: Moderate (service degradation possible)

Phase 7: Containment and Recovery Planning
─────────────────────────────────────────

🛡️ Immediate Containment (0-4 hours):
✅ Network Isolation: Complete
🔄 Similar System Scan: Attestation check of 847 related systems
📊 Baseline Comparison: Compare with known-good golden measurements
🔍 Threat Hunting: Active search for indicators of compromise

📋 Short-term Recovery (4-24 hours):
1. 💾 Firmware Restoration: Restore from verified clean firmware backup
2. 🔧 Hardware Validation: TPM reset and reprovisioning
3. 🖥️ OS Rebuild: Complete operating system reinstallation
4. 📊 Verification: Multiple attestation cycles to confirm clean state

🔮 Long-term Improvements (1-4 weeks):
1. 🛡️ Enhanced Monitoring: Continuous attestation (15-minute intervals)
2. 🔐 Firmware Signing: Strengthen firmware update procedures
3. 📚 Incident Review: Post-incident analysis and lessons learned
4. 🎓 Team Training: Enhanced training on firmware-level threats

════════════════════════════════════════════════════════════════════

📊 ATTESTATION FAILURE SUMMARY
═════════════════════════════

❌ Verification Result: FAILED
🚨 Threat Level: HIGH
⏱️ Detection Time: 1.2 seconds (automated)
🎯 Attack Type: Firmware-level compromise
💡 Detection Method: PCR baseline deviation

🏆 Success Factors:
✅ Rapid Detection: Automated attestation caught compromise quickly
✅ Evidence Preservation: Complete forensic evidence captured
✅ Incident Response: Well-orchestrated immediate response
✅ Containment: Prevented lateral movement and data exfiltration

📈 Lessons Learned:
1. 📊 Continuous Attestation: Critical for rapid detection
2. 🔧 Baseline Management: Automated golden measurement updates essential
3. 🚨 Response Automation: Automated quarantine saved critical time
4. 🛡️ Defense in Depth: Multiple security layers prevented worse outcome
5. 📋 Documentation: Complete incident documentation enables improvement

💰 Financial Impact Avoided:
   Without Attestation: $15M+ (estimated major breach cost)
   With Attestation: $500K (contained incident cost)
   💡 ROI: 3,000% return on attestation infrastructure investment

🚀 Key Takeaway: Hardware-based attestation provides unparalleled
   visibility into firmware-level attacks that traditional security
   tools cannot detect. Early detection saves millions in damages.
    `;

    trackDemoCompletion('attestation-failure-simulation', { score: 100, timeSpent: 15000 });
}

function explainTPMQuotes() {
    const resultDiv = document.getElementById('attestation-demo-result');
    const outputDiv = document.getElementById('attestation-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
📋 TPM Quote Format and Structure Deep Dive
==========================================

🔍 What is a TPM Quote?
   📝 Definition: Cryptographically signed attestation of platform state
   🔐 Security: Hardware-backed proof of integrity measurements
   🛡️ Assurance: Cannot be forged without TPM private key
   📊 Contents: Platform measurements + metadata + signature

🏗️ TPM Quote Architecture (TPM 2.0):

TPM2_ATTEST_QUOTE Structure (Total: ~400-1500 bytes)
┌─────────────────────────────────────────────────────────────────┐
│ Header Section (Fixed Fields)                                  │
├─────────────────────────────────────────────────────────────────┤
│ Magic Number: 0xFF544347 ("TPM_GENERATED")                     │ 4 bytes
│ Type: 0x8018 (TPM_ST_ATTEST_QUOTE)                            │ 2 bytes
│ Qualified Signer: Hash of signing key name                     │ 32 bytes
│ Extra Data: Nonce from challenger                              │ 0-64 bytes
├─────────────────────────────────────────────────────────────────┤
│ Clock Information (Freshness Assurance)                        │
├─────────────────────────────────────────────────────────────────┤
│ Clock: TPM internal clock value                                │ 8 bytes
│ Reset Count: Number of TPM resets                              │ 4 bytes
│ Restart Count: Number of TPM restarts                          │ 4 bytes
│ Safe: TPM safe indicator (0/1)                                 │ 1 byte
├─────────────────────────────────────────────────────────────────┤
│ Quote-Specific Information                                      │
├─────────────────────────────────────────────────────────────────┤
│ PCR Selection: Which PCRs and hash algorithms                  │ Variable
│ PCR Digest: Hash of selected PCR values                        │ 32-64 bytes
└─────────────────────────────────────────────────────────────────┘

Signature Wrapper:
┌─────────────────────────────────────────────────────────────────┐
│ Signature Algorithm: RSA-2048/3072 or ECDSA-P256/384           │
│ Signature: Digital signature over entire ATTEST structure      │ 256+ bytes
│ Certificate Chain: AIK cert + intermediate + root CA           │ 2-8 KB
└─────────────────────────────────────────────────────────────────┘

🔍 DETAILED FIELD ANALYSIS:

Magic Number (0xFF544347):
   🎯 Purpose: Identifies structure as TPM-generated
   🛡️ Security: Prevents confusion with other signed data
   💡 Note: "TPM_GENERATED" in hex encoding

Type Field (0x8018):
   📋 TPM_ST_ATTEST_QUOTE: Quote attestation type
   🔍 Other Types: TPM_ST_ATTEST_TIME, TPM_ST_ATTEST_CREATION
   💡 Usage: Determines how to interpret remaining fields

Qualified Signer:
   🔑 Contents: SHA-256 hash of AIK public key name
   🎯 Purpose: Identifies which TPM key created the signature
   🛡️ Security: Binds quote to specific attestation key

Extra Data (Nonce):
   🎲 Contents: Challenge nonce from verifier (0-64 bytes)
   🛡️ Security: Prevents replay attacks
   ⏰ Freshness: Proves quote was generated recently
   💡 Best Practice: Use 32+ byte random nonce

Clock Information:
┌──────────────┬─────────────────────────────────────────────────────────┐
│ Field        │ Purpose                                                 │
├──────────────┼─────────────────────────────────────────────────────────┤
│ Clock        │ Monotonic timer, milliseconds since TPM manufactured    │
│ Reset Count  │ Number of TPM_Startup(CLEAR) commands                  │
│ Restart Count│ Number of TPM_Startup(STATE) commands                  │
│ Safe         │ 1 if TPM can attest to proper operation                │
└──────────────┴─────────────────────────────────────────────────────────┘

PCR Selection:
   📊 Structure: Hash algorithm + PCR bitmap
   🧮 Algorithms: SHA-1, SHA-256, SHA-384, SHA-512, SM3
   🎯 PCR Mask: Bitmap indicating which PCRs included
   💡 Example: SHA-256 bank, PCRs 0,1,2,4,7,8,9

PCR Digest Calculation:
   🧮 Process: Hash(PCR[selected_1] || PCR[selected_2] || ...)
   📊 Result: Single hash representing all selected PCRs
   🛡️ Security: Any PCR change completely changes digest
   💡 Note: Order matters! PCRs concatenated in numerical order

🔐 SIGNATURE GENERATION PROCESS:

Step 1: Structure Assembly
   📋 Build: Complete TPM2_ATTEST_QUOTE structure
   🧮 Serialize: Convert to canonical binary format
   📊 Hash: SHA-256 hash of entire structure (digest to sign)

Step 2: TPM Internal Signing
   🔑 Key: Use Attestation Identity Key (AIK) private key
   🧮 Algorithm: RSA-PKCS#1 v1.5 or ECDSA as configured
   ⚡ Hardware: Signing performed in TPM secure hardware
   🛡️ Protection: Private key never exposed outside TPM

Step 3: Certificate Chain Assembly
   📜 AIK Certificate: Contains AIK public key + attributes
   🏢 Privacy CA Certificate: Intermediate certificate authority
   🌐 Root CA Certificate: Trust anchor certificate
   🔗 Chain: Links platform identity to trusted root

📊 REAL-WORLD QUOTE EXAMPLE:

Scenario: Enterprise server attestation
PCRs: 0 (firmware), 4 (boot manager), 8 (OS kernel)
Nonce: "a1b2c3d4e5f6789012345678"

Raw Quote Data (hex):
ff544347001800220000000020c3a5...  [Magic + Type + Qualified Signer]
a1b2c3d4e5f6789012345678...       [Extra Data - Nonce]
00000001a2b3c4d5...               [Clock Info]
00030001000403080020...           [PCR Selection]
f7e2d8a9c5b1f6e3a8d2c7f9b4...     [PCR Digest]

Signature (RSA-2048):
30820122300d06092a864886f70d...     [ASN.1 signature structure]

AIK Certificate:
-----BEGIN CERTIFICATE-----
MIICxjCCAa4CAQAwDQYJKoZIhvcNAQEL...
[Contains AIK public key + platform identity info]
-----END CERTIFICATE-----

🔍 QUOTE VERIFICATION PROCESS:

Verifier Side Steps:
1. 📋 Parse Quote: Decode TPM2_ATTEST_QUOTE structure
2. 🎲 Check Nonce: Verify nonce matches challenge sent
3. ⏰ Check Freshness: Verify clock info indicates recent generation
4. 📜 Validate Certificate: Check AIK certificate chain to trusted root
5. ✍️ Verify Signature: Cryptographically verify quote signature
6. 📊 Compare PCRs: Compare PCR digest with expected baseline
7. ✅ Trust Decision: Allow/deny based on verification results

Verification Code Example (Conceptual):
```
bool verify_quote(quote, nonce, expected_pcrs, aik_cert) {
    // Step 1: Basic structure validation
    if (quote.magic != TPM_GENERATED) return false;
    if (quote.type != TPM_ST_ATTEST_QUOTE) return false;

    // Step 2: Freshness check
    if (quote.extra_data != nonce) return false;
    if (too_old(quote.clock)) return false;

    // Step 3: Certificate validation
    if (!verify_cert_chain(aik_cert, trusted_roots)) return false;

    // Step 4: Signature verification
    if (!verify_signature(quote, signature, aik_cert.public_key)) return false;

    // Step 5: PCR comparison
    expected_digest = hash(expected_pcrs);
    if (quote.pcr_digest != expected_digest) return false;

    return true; // Quote is valid and trusted
}
```

⚠️ COMMON VALIDATION PITFALLS:

Certificate Issues:
❌ Problem: Not validating full certificate chain
✅ Solution: Validate from AIK cert to trusted root CA

Nonce Handling:
❌ Problem: Reusing nonces enables replay attacks
✅ Solution: Use cryptographically random, unique nonces

PCR Comparison:
❌ Problem: Exact comparison breaks with legitimate changes
✅ Solution: Flexible policies with approved baseline variations

Time Validation:
❌ Problem: Accepting stale quotes enables replay
✅ Solution: Enforce quote age limits (e.g., 5 minutes maximum)

🛠️ ENTERPRISE DEPLOYMENT CONSIDERATIONS:

Scale Challenges:
   📊 Volume: 10,000+ servers = 40,000+ quotes/hour
   🔐 Keys: Managing thousands of AIK certificates
   📋 Baselines: Maintaining PCR reference values across fleet
   🚨 Monitoring: Real-time analysis of quote anomalies

Performance Optimization:
   ⚡ Caching: Cache valid quotes for short periods
   📊 Batching: Batch verification of multiple quotes
   🔄 Automation: Automated baseline updates for approved changes
   📈 Scaling: Horizontal scaling of verification infrastructure

🎯 Quote Format Evolution:

TPM 1.2 (Legacy):
   📋 Format: TPM_QUOTE_INFO structure
   🔐 Signature: SHA-1 + RSA-2048 only
   ❌ Limitations: Limited PCR support, weak algorithms

TPM 2.0 (Current):
   📋 Format: TPM2_ATTEST_QUOTE structure
   🔐 Signature: Multiple algorithms (RSA, ECDSA, various sizes)
   ✅ Improvements: Better security, more flexibility

Future (Post-Quantum):
   📋 Format: Enhanced ATTEST structure with quantum-resistant fields
   🔐 Signature: Lattice-based, hash-based, or code-based signatures
   🚀 Timeline: Standards development in progress (2025-2027)

💡 Key Takeaways:
1. TPM quotes provide hardware-backed proof of platform integrity
2. Nonce handling is critical for preventing replay attacks
3. Certificate chain validation ensures authentic TPM identity
4. PCR comparison enables detection of unauthorized changes
5. Proper implementation requires careful attention to security details
    `;

    trackDemoCompletion('tpm-quote-explanation', { score: 100, timeSpent: 12000 });
}

// ===== ASSESSMENT FUNCTIONS =====
function startAssessment() {
    const event = new CustomEvent('assessmentStart', {
        detail: {
            moduleId: 'module-1-hardware-rot',
            assessmentId: 'hardware-rot-quiz'
        }
    });
    document.dispatchEvent(event);

    alert('Assessment functionality will be implemented in the full version. For now, explore the interactive demos above!');
}

function showStudyGuide() {
    alert('Study guide will open with key hardware security concepts and practice questions.');
}

// ===== UTILITY FUNCTIONS =====
function trackDemoCompletion(demoId, result) {
    const event = new CustomEvent('demoComplete', {
        detail: {
            elementId: demoId,
            score: result.score,
            completed: true,
            timeSpent: result.timeSpent
        }
    });
    document.dispatchEvent(event);

    console.log(`Demo completed: ${demoId}`, result);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hardware Root of Trust demo module loaded successfully');
});