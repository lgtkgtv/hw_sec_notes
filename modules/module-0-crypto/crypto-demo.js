/**
 * Interactive Cryptography Demo - Module 0
 * Provides hands-on demonstrations of cryptographic concepts
 */

// ===== AES DEMONSTRATION =====
function demonstrateAES() {
    const resultDiv = document.getElementById('aes-demo-result');
    const outputDiv = document.getElementById('aes-output');

    resultDiv.style.display = 'block';

    // Simulate AES encryption process
    const plaintext = "Confidential server configuration data";
    const key = "256-bit AES key: " + generateRandomHex(64);

    outputDiv.innerHTML = `
🔐 AES-256 Encryption Demonstration
=====================================

📄 Original Data: "${plaintext}"
🔑 Encryption Key: ${key}

⏱️  Encrypting...
${simulateProgressBar()}

🔒 Encrypted Data: ${generateRandomHex(64)}
📊 Encryption Time: 0.003ms (hardware accelerated)
🛡️  Security Level: 256-bit (quantum resistant until ~2040)

💡 Real-World Application:
   • NVMe SSD encrypts this data automatically
   • Intel AES-NI provides hardware acceleration
   • Key stored in TPM for additional security
   • Decryption happens transparently on read

✅ Encryption Complete - Data is now secure!
    `;

    // Track completion for progress system
    trackDemoCompletion('aes-encryption', { score: 100, timeSpent: 3000 });
}

function showAESPerformance() {
    const resultDiv = document.getElementById('aes-demo-result');
    const outputDiv = document.getElementById('aes-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
📊 AES Performance Comparison
=============================

🏃 Speed Benchmarks (1GB data):
   Software AES:     850 MB/s
   AES-NI Hardware:  2,400 MB/s  ⚡ 2.8x faster
   Dedicated HSM:    5,800 MB/s  ⚡ 6.8x faster

💪 CPU Overhead:
   Software AES:     45% CPU usage
   AES-NI Hardware:  8% CPU usage   ✅ 5.6x less CPU
   Dedicated HSM:    2% CPU usage   ✅ 22x less CPU

🔋 Power Efficiency:
   Software:         12W additional power
   Hardware:         0.5W additional power ✅ 24x efficient

🏭 Datacenter Impact (1000 servers):
   • Hardware encryption saves 12kW power
   • Reduces cooling requirements by 15%
   • Frees up CPU for application workloads
   • ROI achieved in 8-12 months

💰 Cost Analysis:
   AES-NI: Built into modern CPUs (no extra cost)
   HSM Cards: $2,000-$15,000 per server
   Software: "Free" but high operational cost
    `;
}

// ===== ASYMMETRIC CRYPTOGRAPHY DEMONSTRATIONS =====
function demonstrateRSA() {
    const resultDiv = document.getElementById('asymmetric-demo-result');
    const outputDiv = document.getElementById('asymmetric-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
🔐 RSA-2048 Key Exchange Demonstration
=====================================

👥 Scenario: Server A wants to send symmetric key to Server B

🔧 Step 1: Key Generation (Server B)
   Generating RSA-2048 key pair... ⏱️
   ✅ Public Key:  ${generateRandomHex(32)}...
   🔐 Private Key: [PROTECTED - Stored in TPM]
   ⏱️ Generation Time: 847ms

📡 Step 2: Key Distribution (Server B)
   🌐 Publishing public key to certificate authority
   🏢 Server A downloads public key
   ✅ Public key verified with CA signature

🔒 Step 3: Secure Communication (Server A)
   💾 Symmetric Key: ${generateRandomHex(32)}
   🔐 Encrypting with Server B's public key...
   📤 Sending encrypted key to Server B

🔓 Step 4: Decryption (Server B)
   📨 Received encrypted symmetric key
   🔑 Decrypting with private key (in TPM)...
   ✅ Symmetric key recovered securely!

🏁 Result: Both servers now share symmetric key
   💡 Now they can use fast AES for bulk encryption
   🔐 RSA used only for initial key exchange

⚖️ RSA Trade-offs:
   ✅ Strong security (widely trusted)
   ✅ Established infrastructure
   ❌ Large key sizes (2048+ bits)
   ❌ Slower performance
   ❌ Vulnerable to quantum computers
    `;

    trackDemoCompletion('rsa-demo', { score: 100, timeSpent: 5000 });
}

function demonstrateECC() {
    const resultDiv = document.getElementById('asymmetric-demo-result');
    const outputDiv = document.getElementById('asymmetric-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
📈 ECC (Elliptic Curve Cryptography) Demonstration
==================================================

👥 Scenario: Same key exchange, but with ECC-P256

🔧 Step 1: ECC Key Generation (Server B)
   Generating ECC-P256 key pair... ⏱️
   ✅ Public Key:  ${generateRandomHex(32)}
   🔐 Private Key: [PROTECTED - Stored in secure enclave]
   ⏱️ Generation Time: 23ms  ⚡ 37x faster than RSA!

🔒 Step 2: ECDH Key Agreement
   🤝 Both servers generate ephemeral key pairs
   📡 Exchange public keys over insecure channel
   🧮 Compute shared secret using ECC math
   ✅ Identical symmetric key derived by both sides

📊 ECC vs RSA Comparison:

   Security Level: 128-bit equivalent
   ┌─────────────────┬──────────┬─────────────┐
   │                 │   ECC    │     RSA     │
   ├─────────────────┼──────────┼─────────────┤
   │ Key Size        │ 256 bits │ 3072 bits   │ ⚡ 12x smaller
   │ Signature Size  │  64 bytes│  384 bytes  │ ⚡ 6x smaller
   │ Key Gen Speed   │   23ms   │   847ms     │ ⚡ 37x faster
   │ Sign Speed      │  0.8ms   │   12ms      │ ⚡ 15x faster
   │ Verify Speed    │  2.1ms   │   0.4ms     │ ❌ 5x slower
   │ Bandwidth       │   Low    │    High     │ ⚡ Better
   │ Battery Life    │  Better  │   Worse     │ ⚡ Better
   └─────────────────┴──────────┴─────────────┘

🔮 Quantum Resistance:
   RSA-2048:  ❌ Broken by Shor's algorithm
   ECC-P256:  ❌ Also broken by Shor's algorithm
   Solution:  🔄 Upgrade to post-quantum cryptography

💡 When to use ECC:
   ✅ Mobile devices (battery efficiency)
   ✅ IoT sensors (limited processing power)
   ✅ High-frequency trading (low latency)
   ✅ Blockchain applications
   ❌ Legacy system compatibility
    `;

    trackDemoCompletion('ecc-demo', { score: 100, timeSpent: 4000 });
}

function compareAsymmetric() {
    const resultDiv = document.getElementById('asymmetric-demo-result');
    const outputDiv = document.getElementById('asymmetric-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
⚖️ RSA vs ECC: Complete Comparison
=================================

🏢 Datacenter Deployment Scenarios:

Scenario 1: High-Frequency API Authentication
   💼 Requirement: 100,000 authentications/second
   🏆 Winner: ECC
   📊 Reasoning:
      • ECC signing: 0.8ms vs RSA: 12ms
      • 15x performance advantage critical
      • Lower CPU overhead = more API capacity

Scenario 2: Legacy Enterprise Integration
   💼 Requirement: Compatibility with 10-year-old systems
   🏆 Winner: RSA
   📊 Reasoning:
      • Universal support in legacy systems
      • Established certificate infrastructure
      • Risk-averse enterprise environments

Scenario 3: IoT Device Management (10M+ devices)
   💼 Requirement: Minimize bandwidth and battery usage
   🏆 Winner: ECC
   📊 Reasoning:
      • 12x smaller keys = less bandwidth
      • Lower power consumption
      • Faster processing on limited hardware

Scenario 4: Government/Military Applications
   💼 Requirement: NSA Suite B compliance
   🏆 Winner: ECC (historically, now transitioning)
   📊 Reasoning:
      • NSA Suite B specifies ECC algorithms
      • Better performance for classified networks
      • Migration to post-quantum in progress

🔮 Future-Proofing Strategy:

   Current (2024):
   ├── RSA-2048: Deprecated, upgrade to RSA-3072
   ├── ECC-P256: Secure until quantum computers
   └── Hybrid: Use both for maximum compatibility

   Near Future (2025-2030):
   ├── Post-Quantum: NIST standardized algorithms
   ├── Hybrid Classical+PQ: During transition period
   └── Pure Post-Quantum: When quantum threat imminent

   Quantum Era (2030+):
   ├── Lattice-based: CRYSTALS-Dilithium, Kyber
   ├── Hash-based: SPHINCS+, XMSS
   └── Code-based: Classic McEliece, BIKE

💡 Recommendation Matrix:
   ┌──────────────────────┬─────────┬───────────────────┐
   │ Use Case             │ Choice  │ Reasoning         │
   ├──────────────────────┼─────────┼───────────────────┤
   │ New Deployments      │ ECC     │ Performance       │
   │ Legacy Integration   │ RSA     │ Compatibility     │
   │ Mobile/IoT          │ ECC     │ Efficiency        │
   │ Critical Infra       │ Hybrid  │ Risk Management   │
   │ Future Systems       │ PQ      │ Quantum Readiness │
   └──────────────────────┴─────────┴───────────────────┘
    `;
}

// ===== DIGITAL SIGNATURE DEMONSTRATIONS =====
function demonstrateSignature() {
    const resultDiv = document.getElementById('signature-demo-result');
    const outputDiv = document.getElementById('signature-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
✍️ Digital Signature Creation Process
====================================

📄 Document: "Firmware Update v2.1.4 for DataCenter Server"
🏷️ Document Hash (SHA-256): ${generateRandomHex(64)}

🔧 Signature Creation Process:

Step 1: Hash the Document
   📄 Input: Firmware binary (2.4 MB)
   🏷️ Hash Algorithm: SHA-256
   ⏱️ Hashing Time: 12ms
   📊 Hash: ${generateRandomHex(64)}
   ✅ Unique fingerprint created

Step 2: Sign the Hash
   🔐 Private Key: RSA-2048 (stored in HSM)
   🔑 Signing Algorithm: RSA-PKCS#1 v1.5
   ⏱️ Signing Time: 8ms
   ✍️ Signature: ${generateRandomHex(256)}
   🛡️ Signature provides: Authenticity + Non-repudiation

Step 3: Package for Distribution
   📦 Package Contents:
      • Original firmware binary
      • SHA-256 hash
      • RSA signature
      • Certificate chain

   📋 Metadata:
      • Signer: Acme Hardware Corp
      • Timestamp: ${new Date().toISOString()}
      • Purpose: Firmware Update
      • Version: 2.1.4

🏁 Result: Digitally Signed Firmware Package
   ✅ Recipients can verify authenticity
   ✅ Tamper detection guaranteed
   ✅ Legal non-repudiation established
   ✅ Secure distribution enabled

💡 Hardware Security Integration:
   🔒 Private key never leaves HSM
   🛡️ Signature verification in secure boot
   📜 Certificate stored in platform trust store
   🚨 Revocation checking via OCSP
    `;

    trackDemoCompletion('signature-creation', { score: 100, timeSpent: 4500 });
}

function verifySignature() {
    const resultDiv = document.getElementById('signature-demo-result');
    const outputDiv = document.getElementById('signature-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
✅ Digital Signature Verification Process
=========================================

📦 Received Package: "Firmware Update v2.1.4"
🔍 Verification Status: IN PROGRESS...

Step 1: Extract Components
   📄 Firmware Binary: ✅ Present (2.4 MB)
   🏷️ Claimed Hash: ✅ Present
   ✍️ Digital Signature: ✅ Present
   📜 Certificate Chain: ✅ Present

Step 2: Verify Certificate Chain
   🏢 Root CA: "Hardware Manufacturers Root CA" ✅ TRUSTED
   🏭 Intermediate: "Acme Hardware Signing CA" ✅ VALID
   📝 Leaf Certificate: "Acme Firmware Signing" ✅ VALID
   📅 Expiration: 2025-12-31 ✅ NOT EXPIRED
   🚫 Revocation: Checking OCSP... ✅ NOT REVOKED

Step 3: Verify Signature
   🔓 Public Key: Extracted from certificate ✅
   🧮 Signature Algorithm: RSA-PKCS#1 v1.5 ✅
   ✍️ Signature Verification: ✅ VALID
   ⏱️ Verification Time: 0.4ms

Step 4: Verify Integrity
   📄 Recalculating hash of received firmware...
   🏷️ Calculated Hash: ${generateRandomHex(64)}
   📊 Claimed Hash:    ${generateRandomHex(64)}
   🔍 Hash Comparison: ✅ MATCH

🎉 VERIFICATION SUCCESSFUL!
===========================

✅ Authenticity: Confirmed from Acme Hardware Corp
✅ Integrity: File has not been tampered with
✅ Non-repudiation: Acme cannot deny signing this
✅ Freshness: Signature created recently
✅ Authorization: Acme authorized to sign firmware

🛡️ Security Implications:
   • Firmware is safe to install
   • No malware injection detected
   • Supply chain integrity maintained
   • Compliance requirements met

🚀 Next Step: Proceed with firmware installation
    `;
}

function simulateSignatureAttack() {
    const resultDiv = document.getElementById('signature-demo-result');
    const outputDiv = document.getElementById('signature-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
⚠️ Signature Attack Simulation
==============================

🎭 Attack Scenario: Malicious firmware injection
🎯 Target: DataCenter server firmware update

Attack Step 1: Intercept Original Package
   📦 Legitimate Package: firmware-v2.1.4.bin
   ✍️ Valid Signature: ${generateRandomHex(256)}
   👤 Attacker: Intercepts during download

Attack Step 2: Modify Firmware
   🦠 Malicious Payload: Backdoor implant
   📝 Modified Binary: firmware-v2.1.4-INFECTED.bin
   ⚠️ Problem: Signature no longer matches!

Attack Step 3: Attempt Signature Forgery
   🔧 Option A: Forge signature
      ❌ Result: IMPOSSIBLE without private key
      🔐 RSA-2048 cannot be broken in reasonable time

   🔧 Option B: Replace certificate
      ❌ Result: BLOCKED by certificate validation
      🏢 Fake certificates rejected by trust store

   🔧 Option C: Hash collision attack
      ❌ Result: INFEASIBLE with SHA-256
      🧮 Would require 2^128 operations

Defense Step 1: Automatic Verification
   🛡️ Hardware Security Module validates signature
   🚨 Alert: "SIGNATURE VERIFICATION FAILED"
   🚫 Installation: BLOCKED automatically

Defense Step 2: Incident Response
   📊 Logging: Attack attempt recorded
   🚨 Alert: Security team notified
   🔐 Network: Source IP blocked
   📋 Compliance: Incident documented

🏁 Attack Result: FAILED ❌
========================

✅ Digital signature successfully prevented:
   • Malware installation
   • Supply chain compromise
   • Backdoor deployment
   • Data breach initiation

💡 Key Learning Points:
   🔐 Private keys must be protected in hardware
   📜 Certificate validation is critical
   🚨 Automated verification prevents human error
   📊 Logging enables forensic analysis
   🛡️ Multiple layers of defense work together

🚀 Real-World Examples:
   • SolarWinds: Could have been prevented with proper code signing
   • CCleaner: Compromised due to weak signing process
   • ASUS: Live Update infected 1M+ computers

   Lesson: Hardware-backed signing + verification is essential!
    `;

    trackDemoCompletion('signature-attack', { score: 100, timeSpent: 6000 });
}

// ===== HASH FUNCTION DEMONSTRATIONS =====
function generateHashes() {
    const input = document.getElementById('hash-input').value;
    const sha256Output = document.getElementById('sha256-output');
    const sha512Output = document.getElementById('sha512-output');

    // Simulate hash generation (in real implementation, use Web Crypto API)
    const sha256Hash = generateSimulatedHash(input, 64);
    const sha512Hash = generateSimulatedHash(input, 128);

    sha256Output.textContent = sha256Hash;
    sha512Output.textContent = sha512Hash;

    const resultDiv = document.getElementById('hash-demo-result');
    const outputDiv = document.getElementById('hash-output');

    resultDiv.style.display = 'block';
    outputDiv.innerHTML = `
🏷️ Hash Generation Complete
==========================

📄 Input Text: "${input}"
📏 Input Length: ${input.length} bytes

🧮 SHA-256 Result:
   Hash: ${sha256Hash}
   Length: 64 hex characters (32 bytes)
   Computation Time: 0.12ms

🧮 SHA-512 Result:
   Hash: ${sha512Hash}
   Length: 128 hex characters (64 bytes)
   Computation Time: 0.18ms

💡 Hash Properties Demonstrated:
   ✅ Deterministic: Same input = same hash
   ✅ Fixed Length: Output size independent of input
   ✅ Fast: Sub-millisecond computation
   ✅ Irreversible: Cannot recover input from hash
    `;

    trackDemoCompletion('hash-generation', { score: 50, timeSpent: 2000 });
}

function demonstrateAvalanche() {
    const input = document.getElementById('hash-input').value;
    const originalHash = generateSimulatedHash(input, 64);

    // Create slightly modified input
    const modifiedInput = input + '.';
    const modifiedHash = generateSimulatedHash(modifiedInput, 64);

    // Calculate differences
    let differences = 0;
    for (let i = 0; i < 64; i++) {
        if (originalHash[i] !== modifiedHash[i]) differences++;
    }

    const resultDiv = document.getElementById('hash-demo-result');
    const outputDiv = document.getElementById('hash-output');

    resultDiv.style.display = 'block';
    outputDiv.innerHTML = `
🌊 Avalanche Effect Demonstration
================================

🔤 Original Input: "${input}"
🔄 Modified Input: "${modifiedInput}" (added one period)
📏 Change: 1 character added (0.1% change)

🧮 Hash Results:
   Original:  ${originalHash}
   Modified:  ${modifiedHash}

📊 Avalanche Analysis:
   Characters Different: ${differences} out of 64
   Percentage Different: ${((differences/64)*100).toFixed(1)}%

🎯 Expected Avalanche: ~50% (ideal cryptographic hash)
🏆 SHA-256 Performance: ${differences > 25 && differences < 39 ? 'EXCELLENT' : 'GOOD'} avalanche effect

💡 Security Implications:
   ✅ Small changes create dramatically different hashes
   ✅ Makes it impossible to predict hash behavior
   ✅ Prevents attackers from creating similar-looking files
   ✅ Essential for digital signature security

🔍 Real-World Application:
   • File integrity verification
   • Password storage (with salt)
   • Blockchain proof-of-work
   • Digital forensics
   • Malware detection
    `;

    trackDemoCompletion('avalanche-demo', { score: 75, timeSpent: 3000 });
}

function showHashUses() {
    const resultDiv = document.getElementById('hash-demo-result');
    const outputDiv = document.getElementById('hash-output');

    resultDiv.style.display = 'block';
    outputDiv.innerHTML = `
🛠️ Hash Functions in Hardware Security
======================================

1. 🔧 Secure Boot Chain
   Purpose: Verify each boot component integrity
   Process: Hash each component → Compare with stored hash
   Example: UEFI → Bootloader → Kernel → Drivers
   Benefit: Prevents bootkit/rootkit installation

2. 🏷️ File Integrity Monitoring (FIM)
   Purpose: Detect unauthorized file changes
   Process: Baseline hash → Periodic re-hash → Compare
   Triggers: Configuration files, executables, certificates
   Response: Alert + automatic remediation

3. 📦 Software/Firmware Verification
   Purpose: Ensure authentic updates before installation
   Process: Download → Hash → Compare with signed manifest
   Protection: Supply chain attacks, tampering, corruption
   Standard: NIST SP 800-147 for firmware integrity

4. 🔐 Key Derivation Functions (KDF)
   Purpose: Generate encryption keys from passwords/secrets
   Process: Password + Salt → Hash iterations → Strong key
   Algorithms: PBKDF2, scrypt, Argon2
   Hardware: Dedicated KDF accelerators in HSMs

5. 🎯 Digital Forensics
   Purpose: Prove evidence integrity in investigations
   Process: Hash critical files → Chain of custody
   Legal: Admissible in court proceedings
   Standards: NIST 800-86 forensic guidelines

6. 📊 Blockchain & Consensus
   Purpose: Immutable audit trail for security events
   Process: Hash transactions → Merkle trees → Blocks
   Benefits: Tamper-evident logging, distributed trust
   Applications: Security incident tracking, compliance

7. 🚨 Malware Detection
   Purpose: Identify known malicious files
   Process: Hash suspicious files → Compare with database
   Databases: VirusTotal, NIST NSRL, vendor feeds
   Limitations: Polymorphic malware, packing

8. 💾 Deduplication Storage
   Purpose: Optimize storage efficiency
   Process: Hash data blocks → Store unique blocks only
   Savings: 50-90% storage reduction typical
   Security: Convergent encryption for confidentiality

📈 Hardware Acceleration Options:

   🖥️ CPU Instructions:
      • Intel SHA Extensions (SHA-1, SHA-256)
      • ARM Crypto Extensions
      • AMD SVM crypto acceleration

   🎯 Dedicated Hardware:
      • FPGA hash accelerators
      • ASIC crypto processors
      • GPU parallel hashing
      • HSM integrated hashing

   ⚡ Performance Comparison (SHA-256, 1GB data):
      Software:        400 MB/s
      CPU Extensions:  1,200 MB/s  ⚡ 3x faster
      FPGA:           2,800 MB/s  ⚡ 7x faster
      ASIC:           8,500 MB/s  ⚡ 21x faster
    `;

    trackDemoCompletion('hash-applications', { score: 100, timeSpent: 8000 });
}

// ===== HSM DEMONSTRATIONS =====
function simulateHSM() {
    const resultDiv = document.getElementById('hsm-demo-result');
    const outputDiv = document.getElementById('hsm-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
🔧 HSM Operations Simulation
============================

🏭 HSM Model: SafeNet Luna Network HSM 7
🛡️ FIPS 140-2 Level: 3 (tamper-evident, tamper-resistant)
📊 Performance: 10,000 RSA-2048 ops/sec

Initializing HSM Connection...
✅ HSM Status: Online and Ready
✅ Authentication: Admin PIN verified
✅ Partition: "DataCenter-Prod" selected

Operation 1: Generate RSA Key Pair
   🔧 Algorithm: RSA-2048
   🎲 Entropy Source: Hardware TRNG
   ⏱️ Generation Time: 847ms
   ✅ Key Pair Generated:
      • Private Key: Stored in HSM (handle: 0x4A7F)
      • Public Key: ${generateRandomHex(64)}...
   🛡️ Key Attributes: Non-extractable, Sensitive

Operation 2: Create Digital Signature
   📄 Data to Sign: "Critical system configuration"
   🏷️ Hash: SHA-256 (computed in HSM)
   ✍️ Signing: RSA-PKCS#1 v1.5
   ⏱️ Signing Time: 0.8ms
   📝 Signature: ${generateRandomHex(256)}

Operation 3: Encrypt Sensitive Data
   📄 Plaintext: "Database encryption key: ${generateRandomHex(32)}"
   🔐 Algorithm: RSA-OAEP with SHA-256
   ⏱️ Encryption Time: 1.2ms
   🔒 Ciphertext: ${generateRandomHex(256)}

Operation 4: Generate Random Numbers
   🎲 Request: 256 bytes of cryptographic random data
   ⏱️ Generation Time: 0.1ms
   📊 Random Data: ${generateRandomHex(64)}...
   ✅ Entropy: True hardware randomness (not PRNG)

🔐 HSM Security Features Demonstrated:
   ✅ Hardware key generation and storage
   ✅ Tamper resistance and evidence
   ✅ Role-based authentication
   ✅ High-performance crypto operations
   ✅ Secure audit logging
   ✅ Load balancing across HSM cluster

📊 Session Statistics:
   Operations Performed: 4
   Total Processing Time: 849.1ms
   HSM Utilization: 12%
   Error Count: 0
   Audit Events Generated: 8

🏆 Compliance Status: ✅ FIPS 140-2 Level 3 Validated
    `;

    trackDemoCompletion('hsm-simulation', { score: 100, timeSpent: 7000 });
}

function comparePerformance() {
    const resultDiv = document.getElementById('hsm-demo-result');
    const outputDiv = document.getElementById('hsm-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
📊 Crypto Performance: Software vs Hardware vs HSM
==================================================

🏃 RSA-2048 Operations (operations per second):

   Software (CPU):           500 ops/sec
   CPU + Instructions:     1,200 ops/sec  ⚡ 2.4x faster
   Crypto Accelerator:     5,800 ops/sec  ⚡ 11.6x faster
   Network HSM:           10,000 ops/sec  ⚡ 20x faster
   PCIe HSM Card:         25,000 ops/sec  ⚡ 50x faster

🔐 AES-256 Throughput (MB/second):

   Software (CPU):           350 MB/s
   AES-NI Instructions:    2,400 MB/s     ⚡ 6.9x faster
   FPGA Accelerator:       8,500 MB/s     ⚡ 24x faster
   Dedicated HSM:         12,000 MB/s     ⚡ 34x faster

🎲 Random Number Generation (MB/second):

   Software PRNG:             50 MB/s     ⚠️ Pseudorandom
   CPU RDRAND:               200 MB/s     ⚠️ Hardware-assisted PRNG
   HSM True RNG:             800 MB/s     ✅ True randomness

💰 Total Cost of Ownership (5-year, 100-server deployment):

   Software-Only Approach:
   • Licensing: $0
   • Additional CPU: $2,000,000 (performance impact)
   • Power & Cooling: $800,000
   • Management Overhead: $1,200,000
   • Security Risk: HIGH
   Total: $4,000,000

   CPU Acceleration:
   • Hardware Cost: $500,000 (built-in features)
   • Additional CPU: $800,000
   • Power & Cooling: $300,000
   • Management: $600,000
   • Security Risk: MEDIUM
   Total: $2,200,000  💰 45% savings

   Dedicated HSM:
   • HSM Hardware: $3,000,000
   • Installation: $500,000
   • Maintenance: $750,000
   • Training: $250,000
   • Security Risk: LOW
   Total: $4,500,000  🛡️ Maximum security

🎯 Recommendation by Use Case:

   Development/Testing:
   → Software crypto (cost-effective)

   Production Web Services:
   → CPU acceleration (balanced performance/cost)

   Financial Services:
   → Network HSM (regulatory compliance)

   Critical Infrastructure:
   → Clustered HSMs (high availability + security)

   Cloud Service Provider:
   → Hybrid: CPU + HSM for key services

📈 Scalability Factors:

   Software:
   ✅ Scales with CPU cores
   ❌ Linear performance degradation

   Hardware Acceleration:
   ✅ Dedicated crypto units
   ❌ Limited concurrent operations

   HSM:
   ✅ Purpose-built for crypto
   ✅ Horizontal scaling via clustering
   ❌ Higher complexity and cost
    `;
}

function showComplianceInfo() {
    const resultDiv = document.getElementById('hsm-demo-result');
    const outputDiv = document.getElementById('hsm-output');

    resultDiv.style.display = 'block';

    outputDiv.innerHTML = `
📋 Cryptographic Compliance Standards
====================================

🏛️ FIPS 140-2: Federal Information Processing Standard

   Level 1: Software-Based
   • Basic security requirements
   • Software cryptographic modules
   • No physical tamper protection
   • Example: OpenSSL in approved mode

   Level 2: Software + Hardware
   • Role-based authentication
   • Tamper-evident protection
   • Example: Smart cards, USB tokens

   Level 3: Tamper-Resistant Hardware ⭐ RECOMMENDED
   • Tamper detection and response
   • Identity-based authentication
   • Example: Network HSMs, appliances

   Level 4: Maximum Security
   • Tamper response includes key deletion
   • Extreme environmental protection
   • Example: Military/intelligence HSMs

🌍 Common Criteria (ISO 15408):

   EAL1-EAL7: Evaluation Assurance Levels
   • EAL4+: Recommended for commercial use
   • EAL5+: High security applications
   • EAL7: Formal verification (rare)

🏛️ Regulatory Compliance Requirements:

   PCI DSS (Payment Cards):
   🔒 Requirement: HSM for payment processing
   📋 Standards: FIPS 140-2 Level 3 minimum
   🎯 Scope: Card authentication, PIN verification

   FIPS 140-3 (Updated 2019):
   🔒 Requirement: Enhanced security requirements
   📋 Changes: Stronger algorithms, better testing
   🎯 Migration: Gradual replacement of FIPS 140-2

   Federal PKI (FPKI):
   🔒 Requirement: Government certificate authorities
   📋 Standards: FIPS 140-2 Level 3 for root CAs
   🎯 Scope: Federal employee certificates

   HIPAA (Healthcare):
   🔒 Requirement: Administrative, physical, technical safeguards
   📋 Recommendation: HSMs for PHI encryption keys
   🎯 Benefit: Audit trails, access controls

   SOX (Financial Reporting):
   🔒 Requirement: Controls over IT systems
   📋 Recommendation: HSMs for signing financial data
   🎯 Benefit: Non-repudiation, integrity

🌐 International Standards:

   🇪🇺 European Union:
   • eIDAS Regulation: Qualified signatures
   • GDPR: Encryption key protection
   • NIS Directive: Critical infrastructure

   🇬🇧 United Kingdom:
   • CESG/NCSC: Government crypto standards
   • CAPS: Cryptographic approval process

   🇯🇵 Japan:
   • JCMVP: Japanese crypto module validation
   • IPSJ: Information processing society standards

💼 Industry-Specific Requirements:

   Banking/Finance:
   • ISO 27001/27002: Information security
   • Basel III: Operational risk management
   • SWIFT: Customer security programme

   Healthcare:
   • HITECH Act: Health information technology
   • FDA 21 CFR Part 11: Electronic records

   Aerospace/Defense:
   • ITAR: International traffic in arms
   • NSA Suite B: Cryptographic algorithms

   Automotive:
   • ISO/SAE 21434: Cybersecurity engineering
   • UNECE WP.29: Vehicle cybersecurity

🎯 HSM Selection Criteria by Compliance:

   Financial Services:
   ✅ FIPS 140-2 Level 3 minimum
   ✅ Common Criteria EAL4+
   ✅ PCI-HSM certification
   ✅ 24/7 support and SLA

   Government/Defense:
   ✅ FIPS 140-2 Level 4
   ✅ NSA Suite B algorithms
   ✅ Tempest certification (EMSEC)
   ✅ US/Allied nation manufacture

   Healthcare:
   ✅ FIPS 140-2 Level 2 minimum
   ✅ HIPAA audit logging
   ✅ Role-based access control
   ✅ Integration with EMR systems

   Cloud Service Providers:
   ✅ Multi-tenancy support
   ✅ High availability clustering
   ✅ Performance at scale
   ✅ Multiple compliance certifications
    `;

    trackDemoCompletion('compliance-standards', { score: 100, timeSpent: 10000 });
}

// ===== ASSESSMENT FUNCTIONS =====
function startAssessment() {
    // Trigger assessment start event
    const event = new CustomEvent('assessmentStart', {
        detail: {
            moduleId: 'module-0-crypto',
            assessmentId: 'fundamentals-quiz'
        }
    });
    document.dispatchEvent(event);

    alert('Assessment functionality will be implemented in the full version. For now, explore the interactive demos above!');
}

function showStudyGuide() {
    alert('Study guide will open in a new window with key concepts and practice questions.');
}

// ===== UTILITY FUNCTIONS =====
function generateRandomHex(length) {
    let result = '';
    const chars = '0123456789abcdef';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateSimulatedHash(input, length) {
    // Simple hash simulation for demo purposes
    // In real implementation, use Web Crypto API
    let hash = '';
    const chars = '0123456789abcdef';
    let seed = 0;

    // Create deterministic "hash" based on input
    for (let i = 0; i < input.length; i++) {
        seed += input.charCodeAt(i) * (i + 1);
    }

    for (let i = 0; i < length; i++) {
        hash += chars.charAt((seed + i) % 16);
    }

    return hash;
}

function simulateProgressBar() {
    return `
▓▓▓▓▓▓▓▓▓▓ 100%
    `;
}

function trackDemoCompletion(demoId, result) {
    // Report to progress tracking system
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
    console.log('Cryptography demo module loaded successfully');

    // Set up hash input event listener
    const hashInput = document.getElementById('hash-input');
    if (hashInput) {
        hashInput.addEventListener('input', function() {
            // Reset hash outputs when input changes
            const sha256Output = document.getElementById('sha256-output');
            const sha512Output = document.getElementById('sha512-output');
            if (sha256Output) sha256Output.textContent = 'Type above and click "Generate Hashes"';
            if (sha512Output) sha512Output.textContent = 'Type above and click "Generate Hashes"';
        });
    }
});