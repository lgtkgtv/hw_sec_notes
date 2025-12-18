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
// Quiz System Implementation
let currentQuestionIndex = 0;
let userAnswers = [];
let quizQuestions = [];
let quizStartTime = 0;

function startAssessment() {
    // Initialize quiz
    initializeQuiz();

    // Hide intro card and show quiz container
    document.getElementById('assessment-intro-card').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';

    // Start timer
    quizStartTime = Date.now();

    // Show first question
    showQuestion(0);

    // Trigger assessment start event
    const event = new CustomEvent('assessmentStart', {
        detail: {
            moduleId: 'module-0-crypto',
            assessmentId: 'fundamentals-quiz'
        }
    });
    document.dispatchEvent(event);
}

function initializeQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(10).fill(null);

    quizQuestions = [
        {
            question: "Which cryptographic algorithm would be most appropriate for encrypting large amounts of data in a datacenter storage system?",
            options: ["RSA-2048", "AES-256", "SHA-256", "ECDSA"],
            correct: 1,
            explanation: "AES-256 is a symmetric encryption algorithm designed for efficiently encrypting large amounts of data. RSA is asymmetric and used for key exchange, SHA-256 is a hash function, and ECDSA is for digital signatures."
        },
        {
            question: "What is the primary purpose of a hash function in secure boot processes?",
            options: ["Encrypt the bootloader", "Verify integrity of boot components", "Generate encryption keys", "Compress boot data"],
            correct: 1,
            explanation: "Hash functions in secure boot verify the integrity of each boot component by comparing computed hashes with stored reference values to detect tampering or corruption."
        },
        {
            question: "In RSA cryptography, which key is used to decrypt data that was encrypted for secure communication?",
            options: ["Public key", "Private key", "Session key", "Master key"],
            correct: 1,
            explanation: "In RSA, the private key is used to decrypt data that was encrypted with the corresponding public key. The private key must be kept secret and secure."
        },
        {
            question: "What property of cryptographic hash functions makes them suitable for password storage?",
            options: ["Reversibility", "One-way function property", "Key generation", "Data compression"],
            correct: 1,
            explanation: "Hash functions are one-way (irreversible), making it computationally infeasible to recover the original password from its hash, while still allowing password verification."
        },
        {
            question: "Which of the following best describes the 'avalanche effect' in cryptographic hash functions?",
            options: ["Small input changes cause large output changes", "Output size increases with input size", "Multiple inputs produce the same output", "Processing speed increases exponentially"],
            correct: 0,
            explanation: "The avalanche effect means that a small change in input (even one bit) should cause approximately half of the output bits to change, ensuring unpredictable hash values."
        },
        {
            question: "What is the main advantage of using Hardware Security Modules (HSMs) over software-based cryptography?",
            options: ["Lower cost", "Hardware-protected key storage", "Faster processing", "Easier integration"],
            correct: 1,
            explanation: "HSMs provide tamper-resistant hardware that physically protects cryptographic keys and operations, making them much more secure than software-based solutions."
        },
        {
            question: "In digital signatures, what is verified to ensure message authenticity?",
            options: ["Message encryption", "Signature with sender's public key", "Hash value only", "Timestamp"],
            correct: 1,
            explanation: "Digital signatures are verified using the sender's public key to confirm that the signature was created with the corresponding private key, proving authenticity and non-repudiation."
        },
        {
            question: "Which cryptographic primitive is primarily used for key exchange in modern TLS connections?",
            options: ["AES", "SHA-256", "ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)", "MD5"],
            correct: 2,
            explanation: "ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) is commonly used for secure key exchange in TLS, providing forward secrecy and efficient performance."
        },
        {
            question: "What is the key length of AES-256?",
            options: ["128 bits", "192 bits", "256 bits", "512 bits"],
            correct: 2,
            explanation: "AES-256 uses a 256-bit key length, which provides strong security and is recommended for protecting sensitive data in enterprise environments."
        },
        {
            question: "In the context of firmware security, what does 'measured boot' accomplish?",
            options: ["Encrypts firmware components", "Records hash values of boot components", "Speeds up boot process", "Compresses boot code"],
            correct: 1,
            explanation: "Measured boot records (measures) hash values of each boot component in a trusted log, enabling later verification of system integrity and detection of unauthorized modifications."
        }
    ];
}

function showQuestion(index) {
    if (index < 0 || index >= quizQuestions.length) return;

    const question = quizQuestions[index];
    const questionContainer = document.getElementById('current-question');

    // Update progress
    document.getElementById('question-number').textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    document.getElementById('progress-fill').style.width = `${((index + 1) / quizQuestions.length) * 100}%`;

    // Create question HTML
    const optionsHTML = question.options.map((option, i) =>
        `<li onclick="selectAnswer(${i})" data-index="${i}" ${userAnswers[index] === i ? 'class="selected"' : ''}>
            ${String.fromCharCode(65 + i)}) ${option}
        </li>`
    ).join('');

    questionContainer.innerHTML = `
        <h4>${question.question}</h4>
        <ul class="question-options">
            ${optionsHTML}
        </ul>
    `;

    // Update navigation buttons
    document.getElementById('prev-button').disabled = index === 0;
    document.getElementById('next-button').disabled = userAnswers[index] === null;
    document.getElementById('next-button').style.display = index === quizQuestions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-button').style.display = index === quizQuestions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;

    // Update visual selection
    const options = document.querySelectorAll('.question-options li');
    options.forEach(option => option.classList.remove('selected'));
    options[answerIndex].classList.add('selected');

    // Enable next button
    document.getElementById('next-button').disabled = false;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1 && userAnswers[currentQuestionIndex] !== null) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function submitQuiz() {
    // Calculate score
    let correct = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        if (userAnswers[i] === quizQuestions[i].correct) {
            correct++;
        }
    }

    const score = Math.round((correct / quizQuestions.length) * 100);
    const passed = score >= 70;
    const timeSpent = Math.round((Date.now() - quizStartTime) / 60000); // minutes

    // Hide quiz, show results
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';

    // Display results
    const resultsContent = document.getElementById('results-content');
    resultsContent.innerHTML = `
        <div class="results-score ${passed ? 'pass' : 'fail'}">
            ${score}%
        </div>
        <div class="results-summary">
            <p><strong>${passed ? '🎉 Congratulations! You passed!' : '📚 Keep studying! You can retake the quiz.'}</strong></p>
            <p>You answered <strong>${correct}</strong> out of <strong>${quizQuestions.length}</strong> questions correctly.</p>
            <p>Time taken: <strong>${timeSpent}</strong> minutes</p>
            <p>Passing score: <strong>70%</strong></p>
        </div>
    `;

    // Track completion
    trackDemoCompletion('crypto-assessment', {
        score: score,
        timeSpent: timeSpent * 60000,
        passed: passed
    });
}

function retakeQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = new Array(10).fill(null);

    // Hide results, show intro
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('assessment-intro-card').style.display = 'block';
}

function showDetailedResults() {
    let detailsHTML = '<div class="detailed-results"><h4>Detailed Results</h4>';

    for (let i = 0; i < quizQuestions.length; i++) {
        const question = quizQuestions[i];
        const userAnswer = userAnswers[i];
        const correct = userAnswer === question.correct;

        detailsHTML += `
            <div class="result-item ${correct ? 'correct' : 'incorrect'}">
                <h5>Question ${i + 1}: ${correct ? '✅ Correct' : '❌ Incorrect'}</h5>
                <p><strong>Q:</strong> ${question.question}</p>
                <p><strong>Your answer:</strong> ${question.options[userAnswer]}</p>
                ${!correct ? `<p><strong>Correct answer:</strong> ${question.options[question.correct]}</p>` : ''}
                <p><strong>Explanation:</strong> ${question.explanation}</p>
            </div>
        `;
    }

    detailsHTML += '</div>';

    // Create modal for detailed results
    const modal = document.createElement('div');
    modal.className = 'study-guide-overlay';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="study-guide" style="transform: translate(-50%, -50%);">
            <div class="study-guide-header">
                <h3>📊 Detailed Quiz Results</h3>
                <button class="btn btn-outline" onclick="this.closest('.study-guide-overlay').remove()">×</button>
            </div>
            <div class="study-guide-content">${detailsHTML}</div>
        </div>
    `;

    document.body.appendChild(modal);
}

function showStudyGuide() {
    const studyGuideContent = `
        <h4>🔐 Symmetric Cryptography</h4>
        <ul>
            <li><strong>AES (Advanced Encryption Standard):</strong> Most common symmetric algorithm</li>
            <li><strong>Key sizes:</strong> AES-128, AES-192, AES-256</li>
            <li><strong>Use cases:</strong> Bulk data encryption, storage encryption, VPNs</li>
            <li><strong>Performance:</strong> Very fast, hardware-accelerated on modern CPUs</li>
        </ul>

        <h4>🔑 Asymmetric Cryptography</h4>
        <ul>
            <li><strong>RSA:</strong> Widely used for key exchange and digital signatures</li>
            <li><strong>ECC (Elliptic Curve):</strong> Smaller keys, better performance</li>
            <li><strong>Public/Private Keys:</strong> Public key encrypts, private key decrypts</li>
            <li><strong>Digital Signatures:</strong> Private key signs, public key verifies</li>
        </ul>

        <h4>🏷️ Hash Functions</h4>
        <ul>
            <li><strong>SHA-256:</strong> Most common secure hash function</li>
            <li><strong>Properties:</strong> One-way, deterministic, avalanche effect</li>
            <li><strong>Uses:</strong> Integrity verification, password storage, digital signatures</li>
            <li><strong>Collision Resistance:</strong> Extremely difficult to find two inputs with same hash</li>
        </ul>

        <h4>🛡️ Hardware Security</h4>
        <ul>
            <li><strong>TPM (Trusted Platform Module):</strong> Hardware security chip</li>
            <li><strong>HSM (Hardware Security Module):</strong> Dedicated crypto hardware</li>
            <li><strong>Secure Boot:</strong> Hardware-verified boot process</li>
            <li><strong>Root of Trust:</strong> Hardware-based foundation for security</li>
        </ul>

        <h4>🔧 Key Management</h4>
        <ul>
            <li><strong>Key Generation:</strong> Use cryptographically secure random numbers</li>
            <li><strong>Key Exchange:</strong> Diffie-Hellman, ECDHE for forward secrecy</li>
            <li><strong>Key Storage:</strong> Hardware protection, key escrow</li>
            <li><strong>Key Rotation:</strong> Regular key updates for long-term security</li>
        </ul>

        <h4>📚 Study Tips</h4>
        <ul>
            <li>Focus on when to use each cryptographic primitive</li>
            <li>Understand the difference between encryption and hashing</li>
            <li>Learn about hardware security benefits over software</li>
            <li>Review real-world applications in datacenter environments</li>
        </ul>
    `;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'study-guide-overlay';
    overlay.style.display = 'block';
    overlay.onclick = function(e) {
        if (e.target === overlay) hideStudyGuide();
    };

    document.body.appendChild(overlay);

    // Show study guide
    const studyGuide = document.getElementById('study-guide');
    document.getElementById('study-guide-content').innerHTML = studyGuideContent;
    studyGuide.style.display = 'block';
}

function hideStudyGuide() {
    const overlay = document.querySelector('.study-guide-overlay');
    if (overlay) overlay.remove();

    const studyGuide = document.getElementById('study-guide');
    studyGuide.style.display = 'none';
}

// ===== ADDITIONAL RESOURCES FUNCTIONS =====

function showQuickReference() {
    const quickRefContent = `
        <div class="quick-ref-grid">
            <div class="ref-section">
                <h4>🔐 Symmetric Encryption</h4>
                <table class="ref-table">
                    <tr><th>Algorithm</th><th>Key Size</th><th>Use Case</th></tr>
                    <tr><td>AES-128</td><td>128 bits</td><td>General purpose, high speed</td></tr>
                    <tr><td>AES-192</td><td>192 bits</td><td>Enhanced security</td></tr>
                    <tr><td>AES-256</td><td>256 bits</td><td>Top secret, long-term</td></tr>
                    <tr><td>ChaCha20</td><td>256 bits</td><td>Mobile, software-only</td></tr>
                </table>
            </div>

            <div class="ref-section">
                <h4>🔑 Asymmetric Encryption</h4>
                <table class="ref-table">
                    <tr><th>Algorithm</th><th>Key Size</th><th>Use Case</th></tr>
                    <tr><td>RSA-2048</td><td>2048 bits</td><td>Legacy compatibility</td></tr>
                    <tr><td>RSA-3072</td><td>3072 bits</td><td>Current standard</td></tr>
                    <tr><td>ECDSA P-256</td><td>256 bits</td><td>Efficient, modern</td></tr>
                    <tr><td>Ed25519</td><td>255 bits</td><td>High performance</td></tr>
                </table>
            </div>

            <div class="ref-section">
                <h4>🏷️ Hash Functions</h4>
                <table class="ref-table">
                    <tr><th>Algorithm</th><th>Output</th><th>Use Case</th></tr>
                    <tr><td>SHA-256</td><td>256 bits</td><td>General purpose, blockchain</td></tr>
                    <tr><td>SHA-512</td><td>512 bits</td><td>High security applications</td></tr>
                    <tr><td>SHA-3</td><td>Variable</td><td>Post-quantum backup</td></tr>
                    <tr><td>BLAKE3</td><td>256 bits</td><td>High performance</td></tr>
                </table>
            </div>

            <div class="ref-section">
                <h4>🔧 Key Derivation</h4>
                <table class="ref-table">
                    <tr><th>Function</th><th>Purpose</th><th>Parameters</th></tr>
                    <tr><td>PBKDF2</td><td>Password hashing</td><td>Iterations: 100,000+</td></tr>
                    <tr><td>Argon2id</td><td>Memory-hard KDF</td><td>Memory: 64MB+</td></tr>
                    <tr><td>HKDF</td><td>Key expansion</td><td>Salt + Info</td></tr>
                    <tr><td>scrypt</td><td>Password KDF</td><td>N=32768, r=8, p=1</td></tr>
                </table>
            </div>

            <div class="ref-section">
                <h4>⚡ Performance Guide</h4>
                <div class="perf-tips">
                    <p><strong>Software Crypto:</strong></p>
                    <ul>
                        <li>AES-128: ~1 GB/s per core</li>
                        <li>ChaCha20: ~800 MB/s per core</li>
                        <li>SHA-256: ~400 MB/s per core</li>
                    </ul>
                    <p><strong>Hardware Acceleration:</strong></p>
                    <ul>
                        <li>AES-NI: 10x faster AES</li>
                        <li>SHA extensions: 3x faster SHA</li>
                        <li>Intel QAT: Dedicated crypto chip</li>
                    </ul>
                </div>
            </div>

            <div class="ref-section">
                <h4>🛡️ Security Levels</h4>
                <div class="security-levels">
                    <p><strong>128-bit security:</strong> AES-128, RSA-3072, P-256</p>
                    <p><strong>192-bit security:</strong> AES-192, RSA-7680, P-384</p>
                    <p><strong>256-bit security:</strong> AES-256, RSA-15360, P-521</p>
                    <p><em>Note: Choose based on data sensitivity and compliance requirements</em></p>
                </div>
            </div>
        </div>
    `;

    showResourceModal("📋 Cryptography Quick Reference", quickRefContent);
}

function showTroubleshootingGuide() {
    const troubleshootingContent = `
        <div class="troubleshooting-sections">
            <div class="issue-section">
                <h4>⚠️ Common Cryptographic Mistakes</h4>

                <div class="issue-item">
                    <h5>🔴 Problem: Using ECB Mode for Block Encryption</h5>
                    <p><strong>Issue:</strong> ECB mode reveals patterns in encrypted data</p>
                    <p><strong>Solution:</strong> Always use CBC, GCM, or CTR modes with random IVs</p>
                    <pre><code>// Bad
AES.encrypt(data, key, {mode: CryptoJS.mode.ECB})

// Good
AES.encrypt(data, key, {mode: CryptoJS.mode.CBC, iv: randomIV})</code></pre>
                </div>

                <div class="issue-item">
                    <h5>🔴 Problem: Reusing IVs/Nonces</h5>
                    <p><strong>Issue:</strong> Compromises security completely</p>
                    <p><strong>Solution:</strong> Generate fresh random IV for each encryption</p>
                    <pre><code>// Bad - Fixed IV
const iv = "1234567890123456";

// Good - Random IV per encryption
const iv = crypto.getRandomValues(new Uint8Array(16));</code></pre>
                </div>

                <div class="issue-item">
                    <h5>🔴 Problem: Rolling Your Own Crypto</h5>
                    <p><strong>Issue:</strong> Custom implementations have vulnerabilities</p>
                    <p><strong>Solution:</strong> Use established libraries (OpenSSL, libsodium)</p>
                    <pre><code>// Bad - Custom implementation
function myEncrypt(data, key) { /* custom logic */ }

// Good - Established library
const encrypted = sodium.crypto_secretbox(data, nonce, key);</code></pre>
                </div>

                <div class="issue-item">
                    <h5>🔴 Problem: Inadequate Random Number Generation</h5>
                    <p><strong>Issue:</strong> Predictable "random" values</p>
                    <p><strong>Solution:</strong> Use cryptographically secure PRNGs</p>
                    <pre><code>// Bad
const key = Math.random().toString();

// Good
const key = crypto.getRandomValues(new Uint8Array(32));</code></pre>
                </div>
            </div>

            <div class="issue-section">
                <h4>🔧 Implementation Best Practices</h4>

                <div class="best-practice">
                    <h5>✅ Key Management</h5>
                    <ul>
                        <li>Store keys in hardware (HSM/TPM) when possible</li>
                        <li>Use key derivation functions for passwords</li>
                        <li>Implement proper key rotation policies</li>
                        <li>Never hardcode keys in source code</li>
                    </ul>
                </div>

                <div class="best-practice">
                    <h5>✅ Authentication</h5>
                    <ul>
                        <li>Always use authenticated encryption (GCM, Poly1305)</li>
                        <li>Verify MAC before decrypting</li>
                        <li>Use constant-time comparison for MACs</li>
                        <li>Implement proper session management</li>
                    </ul>
                </div>

                <div class="best-practice">
                    <h5>✅ Error Handling</h5>
                    <ul>
                        <li>Don't leak information in error messages</li>
                        <li>Use constant-time operations</li>
                        <li>Clear sensitive data from memory</li>
                        <li>Log security events appropriately</li>
                    </ul>
                </div>
            </div>

            <div class="issue-section">
                <h4>🚨 Security Checklist</h4>
                <div class="checklist">
                    <input type="checkbox"> Use established crypto libraries<br>
                    <input type="checkbox"> Generate random IVs/nonces per operation<br>
                    <input type="checkbox"> Use authenticated encryption modes<br>
                    <input type="checkbox"> Implement proper key management<br>
                    <input type="checkbox"> Use secure random number generation<br>
                    <input type="checkbox"> Validate all inputs before processing<br>
                    <input type="checkbox"> Clear sensitive data from memory<br>
                    <input type="checkbox"> Regular security audits and updates<br>
                </div>
            </div>
        </div>
    `;

    showResourceModal("⚠️ Common Implementation Issues", troubleshootingContent);
}

function startCryptoGame() {
    const gameContent = `
        <div class="crypto-game-container">
            <div class="game-header">
                <h4>🏁 Welcome to Crypto Grand Prix!</h4>
                <p>Test your crypto knowledge in this fast-paced racing game!</p>
            </div>

            <div id="game-area" class="game-area">
                <div id="game-menu" class="game-menu">
                    <h5>🏆 Choose Your Challenge</h5>
                    <div class="game-options">
                        <button onclick="startQuickRace()" class="game-btn">🏃 Quick Race (5 questions)</button>
                        <button onclick="startGrandPrix()" class="game-btn">🏁 Grand Prix (10 questions)</button>
                        <button onclick="showLeaderboard()" class="game-btn">📊 Leaderboard</button>
                    </div>
                </div>

                <div id="race-game" class="race-game" style="display: none;">
                    <div class="race-header">
                        <div id="race-progress" class="race-progress">
                            <div class="car">🏎️</div>
                            <div class="track"></div>
                            <div class="finish">🏁</div>
                        </div>
                        <div id="race-stats" class="race-stats">
                            <span id="question-counter">Question 1/5</span>
                            <span id="score-counter">Score: 0</span>
                            <span id="timer">Time: 30s</span>
                        </div>
                    </div>

                    <div id="race-question" class="race-question">
                        <!-- Question will be inserted here -->
                    </div>

                    <div class="race-answers" id="race-answers">
                        <!-- Answers will be inserted here -->
                    </div>
                </div>

                <div id="race-results" class="race-results" style="display: none;">
                    <h5>🏆 Race Complete!</h5>
                    <div id="final-score" class="final-score"></div>
                    <div class="race-actions">
                        <button onclick="restartGame()" class="game-btn">🔄 Race Again</button>
                        <button onclick="backToMenu()" class="game-btn">🏠 Main Menu</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    showResourceModal("🏆 Crypto Grand Prix Game", gameContent);

    // Initialize game variables
    window.gameState = {
        currentQuestion: 0,
        score: 0,
        timeLeft: 30,
        questions: []
    };
}

function showResourceModal(title, content) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'study-guide-overlay';
    overlay.style.display = 'block';
    overlay.onclick = function(e) {
        if (e.target === overlay) overlay.remove();
    };

    overlay.innerHTML = `
        <div class="study-guide resource-modal" style="max-width: 1000px;">
            <div class="study-guide-header">
                <h3>${title}</h3>
                <button class="btn btn-outline" onclick="this.closest('.study-guide-overlay').remove()">×</button>
            </div>
            <div class="study-guide-content resource-content">
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

// Game Functions
function startQuickRace() {
    initializeGame(5);
    startRace();
}

function startGrandPrix() {
    initializeGame(10);
    startRace();
}

function initializeGame(questionCount) {
    window.gameState.questions = [
        { q: "Which is fastest for bulk encryption?", a: ["RSA", "AES", "SHA-256", "ECDSA"], correct: 1 },
        { q: "What provides forward secrecy?", a: ["RSA", "Static keys", "ECDHE", "SHA-256"], correct: 2 },
        { q: "Best for password hashing?", a: ["MD5", "SHA-1", "Argon2", "AES"], correct: 2 },
        { q: "Hardware crypto advantage?", a: ["Speed", "Tamper resistance", "Cost", "Simplicity"], correct: 1 },
        { q: "Purpose of digital signatures?", a: ["Encryption", "Authentication", "Compression", "Key exchange"], correct: 1 },
        { q: "What is avalanche effect?", a: ["Slow hashing", "Small input change → big output change", "Key reuse", "Error detection"], correct: 1 },
        { q: "Best AES mode for disk encryption?", a: ["ECB", "CBC", "XTS", "OFB"], correct: 2 },
        { q: "What does HMAC provide?", a: ["Encryption", "Message authentication", "Key exchange", "Compression"], correct: 1 },
        { q: "TPM primary function?", a: ["Networking", "Hardware root of trust", "Graphics", "Storage"], correct: 1 },
        { q: "Secure boot verifies?", a: ["User identity", "Network connection", "Code integrity", "Performance"], correct: 2 }
    ].slice(0, questionCount);

    window.gameState.currentQuestion = 0;
    window.gameState.score = 0;
    window.gameState.timeLeft = 30;
}

function startRace() {
    document.getElementById('game-menu').style.display = 'none';
    document.getElementById('race-game').style.display = 'block';
    showGameQuestion();
    startTimer();
}

function showGameQuestion() {
    const state = window.gameState;
    if (state.currentQuestion >= state.questions.length) {
        endRace();
        return;
    }

    const question = state.questions[state.currentQuestion];
    document.getElementById('question-counter').textContent = `Question ${state.currentQuestion + 1}/${state.questions.length}`;
    document.getElementById('score-counter').textContent = `Score: ${state.score}`;

    document.getElementById('race-question').innerHTML = `<h6>${question.q}</h6>`;

    const answersHTML = question.a.map((answer, i) =>
        `<button onclick="selectGameAnswer(${i})" class="race-answer-btn">${String.fromCharCode(65 + i)}) ${answer}</button>`
    ).join('');

    document.getElementById('race-answers').innerHTML = answersHTML;

    // Update progress bar
    const progress = ((state.currentQuestion + 1) / state.questions.length) * 100;
    const car = document.querySelector('.car');
    if (car) car.style.left = progress + '%';
}

function selectGameAnswer(answerIndex) {
    const state = window.gameState;
    const question = state.questions[state.currentQuestion];

    if (answerIndex === question.correct) {
        state.score += Math.max(10, Math.floor(state.timeLeft / 3)); // Bonus for speed
    }

    state.currentQuestion++;
    state.timeLeft = 30; // Reset timer

    setTimeout(() => {
        showGameQuestion();
    }, 500);
}

function startTimer() {
    window.gameTimer = setInterval(() => {
        window.gameState.timeLeft--;
        document.getElementById('timer').textContent = `Time: ${window.gameState.timeLeft}s`;

        if (window.gameState.timeLeft <= 0) {
            // Auto-advance to next question
            selectGameAnswer(-1); // Wrong answer
        }
    }, 1000);
}

function endRace() {
    clearInterval(window.gameTimer);
    document.getElementById('race-game').style.display = 'none';
    document.getElementById('race-results').style.display = 'block';

    const state = window.gameState;
    const maxScore = state.questions.length * 40; // Max possible score
    const percentage = Math.round((state.score / maxScore) * 100);

    let rank = "🥉 Bronze Racer";
    if (percentage >= 90) rank = "🏆 Crypto Champion";
    else if (percentage >= 75) rank = "🥇 Gold Racer";
    else if (percentage >= 60) rank = "🥈 Silver Racer";

    document.getElementById('final-score').innerHTML = `
        <h4>${rank}</h4>
        <p>Final Score: <strong>${state.score}</strong> points (${percentage}%)</p>
        <p>Questions Correct: ${Math.floor(state.score / 10)} / ${state.questions.length}</p>
    `;
}

function restartGame() {
    document.getElementById('race-results').style.display = 'none';
    document.getElementById('game-menu').style.display = 'block';
}

function backToMenu() {
    restartGame();
}

function showLeaderboard() {
    alert('🏆 Leaderboard feature coming soon! For now, challenge yourself to get 100% correct!');
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

function scrollToHashGenerator() {
    // Smooth scroll to hash generator section
    const hashSection = document.getElementById('hash-generator');
    if (hashSection) {
        hashSection.scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Also automatically generate hashes for the default text
    setTimeout(() => {
        generateHashesInGenerator();
    }, 500);
}

// New functions specifically for the Hash Generator section
function generateHashesInGenerator() {
    const input = document.getElementById('hash-generator-input').value;
    const sha256Output = document.getElementById('hash-generator-sha256');
    const sha512Output = document.getElementById('hash-generator-sha512');

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
   Length: 256 bits (32 bytes)
   Time: 0.001ms (hardware accelerated)

🧮 SHA-512 Result:
   Hash: ${sha512Hash}
   Length: 512 bits (64 bytes)
   Time: 0.002ms (hardware accelerated)

✅ Hashes generated successfully!

💡 Note: These are simulated hashes for educational purposes.
   Real implementations use cryptographically secure algorithms.
    `;

    // Track completion for progress system
    trackDemoCompletion('hash-generation', { score: 100, timeSpent: 2000 });
}

function demonstrateAvalancheInGenerator() {
    const input = document.getElementById('hash-generator-input').value;
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
📏 Change: 1 character added (${((1/input.length)*100).toFixed(1)}% change)

🧮 Hash Results:
   Original:  ${originalHash}
   Modified:  ${modifiedHash}

📊 Analysis:
   Differences: ${differences}/64 characters (${((differences/64)*100).toFixed(1)}%)
   Expected: ~50% for good hash function

✅ This demonstrates the avalanche effect: tiny input changes
   produce dramatically different outputs, making it impossible
   to predict hash values or reverse-engineer inputs.

💡 Security Benefit: Even knowing most of a password,
   attackers can't predict its hash value.
    `;

    // Track completion for progress system
    trackDemoCompletion('avalanche-effect', { score: 100, timeSpent: 3000 });
}

function showHashUsesInGenerator() {
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
   Algorithms: PBKDF2, Argon2, scrypt
   Protection: Rainbow table attacks, brute force

5. 🏢 Digital Certificates & PKI
   Purpose: Verify identity and create trust chains
   Process: Hash certificate data → Sign with CA private key
   Verification: Hash + CA public key → Verify signature
   Use Case: TLS/SSL, code signing, device authentication

6. 🗄️ Database/Storage Integrity
   Purpose: Detect data corruption or tampering
   Implementation: Hash blocks, checksums, Merkle trees
   Examples: ZFS, BTRFS, blockchain verification
   Benefit: Immediate corruption detection

✅ Hash functions provide the foundation for most security
   mechanisms in modern datacenter hardware!
    `;

    // Track completion for progress system
    trackDemoCompletion('hash-applications', { score: 100, timeSpent: 4000 });
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