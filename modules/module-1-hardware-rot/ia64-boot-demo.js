// IA64 Secure Boot Interactive Demonstrations
// Complete boot chain simulation with datacenter security

// =============================================================================
// COMPLETE BOOT SIMULATION
// =============================================================================

function startCompleteBootDemo() {
    const resultDiv = document.getElementById('interactive-demo-result');
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });

    const bootSteps = [
        {
            name: 'Power-On Reset',
            duration: 500,
            icon: '🔌',
            details: 'CPU starts execution from reset vector (0xFFFFFFF0)',
            measurements: []
        },
        {
            name: 'eFuse Verification',
            duration: 800,
            icon: '🔥',
            details: 'Reading Boot Guard configuration from CPU eFuses',
            measurements: []
        },
        {
            name: 'ACM Loading',
            duration: 1000,
            icon: '🛡️',
            details: 'Loading Authenticated Code Module from SPI Flash',
            measurements: []
        },
        {
            name: 'Boot Guard Verification',
            duration: 1200,
            icon: '✅',
            details: 'Verifying Key Manifest and Boot Policy Manifest',
            measurements: []
        },
        {
            name: 'UEFI Firmware',
            duration: 2000,
            icon: '⚙️',
            details: 'Platform initialization and device enumeration',
            measurements: ['PCR[0]: UEFI Firmware', 'PCR[1]: UEFI Configuration']
        },
        {
            name: 'Secure Boot Check',
            duration: 800,
            icon: '🔐',
            details: 'Verifying bootloader signature against UEFI db',
            measurements: []
        },
        {
            name: 'Bootloader Execution',
            duration: 1000,
            icon: '🥾',
            details: 'Windows Boot Manager loading and verification',
            measurements: ['PCR[4]: Bootloader', 'PCR[5]: Boot Configuration']
        },
        {
            name: 'Kernel Loading',
            duration: 1500,
            icon: '🖥️',
            details: 'OS kernel signature verification and loading',
            measurements: ['PCR[8]: Kernel', 'PCR[9]: Kernel Configuration']
        },
        {
            name: 'Driver Verification',
            duration: 1200,
            icon: '🚗',
            details: 'Loading signed kernel drivers',
            measurements: ['PCR[10]: Driver Measurements']
        },
        {
            name: 'BitLocker Unlock',
            duration: 1000,
            icon: '🔓',
            details: 'TPM unsealing disk encryption keys',
            measurements: ['PCR verification for key release']
        }
    ];

    let currentStep = 0;

    function runBootStep() {
        if (currentStep >= bootSteps.length) {
            showBootComplete();
            return;
        }

        const step = bootSteps[currentStep];

        resultDiv.innerHTML = `
            <div class="boot-simulation">
                <div class="boot-header">
                    <h4>🚀 Secure Boot Simulation</h4>
                    <div class="progress-info">Step ${currentStep + 1} of ${bootSteps.length}</div>
                </div>

                <div class="current-boot-step">
                    <div class="step-visual">
                        <div class="step-icon-large">${step.icon}</div>
                        <div class="spinner"></div>
                    </div>
                    <div class="step-details">
                        <h5>${step.name}</h5>
                        <p>${step.details}</p>
                        ${step.measurements.length > 0 ? `
                            <div class="measurements">
                                <strong>TPM Measurements:</strong>
                                ${step.measurements.map(m => `<div class="measurement">${m}</div>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="boot-progress-bar">
                    <div class="progress-fill" style="width: ${(currentStep / bootSteps.length) * 100}%"></div>
                </div>

                <div class="boot-log">
                    <h6>Boot Log:</h6>
                    <div class="log-entries">
                        ${bootSteps.slice(0, currentStep + 1).map((s, i) => `
                            <div class="log-entry ${i === currentStep ? 'current' : 'completed'}">
                                ${s.icon} ${s.name} ${i < currentStep ? '✅' : '⏳'}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => {
            currentStep++;
            runBootStep();
        }, step.duration);
    }

    runBootStep();
}

function showBootComplete() {
    const resultDiv = document.getElementById('interactive-demo-result');

    resultDiv.innerHTML = `
        <div class="boot-complete-result">
            <div class="success-header">
                <div class="success-icon">✅</div>
                <h4>Secure Boot Completed Successfully!</h4>
            </div>

            <div class="boot-summary">
                <div class="summary-section">
                    <h5>🔒 Security Verifications Performed:</h5>
                    <ul class="verification-list">
                        <li>✅ CPU eFuse integrity verified</li>
                        <li>✅ Boot Guard key chain validated</li>
                        <li>✅ UEFI firmware signature confirmed</li>
                        <li>✅ Secure boot policy enforced</li>
                        <li>✅ Bootloader authenticity verified</li>
                        <li>✅ Kernel signature validated</li>
                        <li>✅ Driver signatures confirmed</li>
                        <li>✅ TPM measurements recorded</li>
                    </ul>
                </div>

                <div class="summary-section">
                    <h5>📊 Final TPM State:</h5>
                    <div class="pcr-summary">
                        <div class="pcr-item">PCR[0]: ${generateRandomHex(16)}...</div>
                        <div class="pcr-item">PCR[1]: ${generateRandomHex(16)}...</div>
                        <div class="pcr-item">PCR[4]: ${generateRandomHex(16)}...</div>
                        <div class="pcr-item">PCR[8]: ${generateRandomHex(16)}...</div>
                    </div>
                </div>
            </div>

            <div class="next-actions">
                <h5>🌐 Next: Datacenter Security</h5>
                <p>Now that we understand single-system boot security, let's explore how this scales to datacenter deployments...</p>
                <div class="action-buttons">
                    <button onclick="exploreDatacenterSecurity()" class="demo-button">🏗️ Datacenter Security</button>
                    <button onclick="showVMSecurity()" class="demo-button">🖥️ VM Security</button>
                    <button onclick="showContainerSecurity()" class="demo-button">📦 Container Security</button>
                </div>
            </div>
        </div>
    `;
}

// =============================================================================
// DATACENTER SECURITY EXPLORATION
// =============================================================================

function exploreDatacenterSecurity() {
    const resultDiv = document.getElementById('interactive-demo-result');

    resultDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🏗️ Initializing datacenter security overview...</p>
        </div>
    `;

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="datacenter-security">
                <div class="datacenter-header">
                    <h4>🏗️ Datacenter Hardware Security Architecture</h4>
                    <p>Scaling secure boot to thousands of servers with consistent security policy</p>
                </div>

                <div class="datacenter-layers">
                    <div class="security-layer">
                        <div class="layer-icon">🏭</div>
                        <div class="layer-content">
                            <h5>Infrastructure Root of Trust</h5>
                            <div class="layer-details">
                                <strong>Hardware Security Modules (HSMs):</strong><br>
                                • FIPS 140-2 Level 3 certified<br>
                                • Central key management for datacenter<br>
                                • Root CA for platform certificates<br>
                                <br>
                                <strong>Secure Supply Chain:</strong><br>
                                • Verified OEM delivery process<br>
                                • Tamper-evident packaging<br>
                                • Pre-boot hardware attestation<br>
                            </div>
                        </div>
                    </div>

                    <div class="security-layer">
                        <div class="layer-icon">🖥️</div>
                        <div class="layer-content">
                            <h5>Server Platform Security</h5>
                            <div class="layer-details">
                                <strong>BMC (Baseboard Management Controller):</strong><br>
                                • Out-of-band management security<br>
                                • RedFish API with RBAC<br>
                                • Encrypted communications (TLS 1.3)<br>
                                <br>
                                <strong>Intel TXT / AMD SME:</strong><br>
                                • Hardware-assisted memory protection<br>
                                • Hypervisor integrity measurement<br>
                                • DMA attack prevention<br>
                            </div>
                        </div>
                    </div>

                    <div class="security-layer">
                        <div class="layer-icon">☁️</div>
                        <div class="layer-content">
                            <h5>Virtualization Security</h5>
                            <div class="layer-details">
                                <strong>Type-1 Hypervisor Security:</strong><br>
                                • VMware vSphere with vTPM<br>
                                • Microsoft Hyper-V with Shielded VMs<br>
                                • KVM with AMD SEV / Intel TXT<br>
                                <br>
                                <strong>VM Isolation:</strong><br>
                                • Hardware-assisted virtualization<br>
                                • IOMMU for device isolation<br>
                                • Encrypted VM memory<br>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="datacenter-demo-actions">
                    <button onclick="showVMSecurity()" class="demo-button">🖥️ Secure VM Deployment</button>
                    <button onclick="showContainerSecurity()" class="demo-button">📦 Trusted Containers</button>
                    <button onclick="showOrchestrationSecurity()" class="demo-button">🎼 Orchestration Security</button>
                </div>
            </div>
        `;
    }, 1500);
}

// =============================================================================
// SECURE VM DEPLOYMENT
// =============================================================================

function showVMSecurity() {
    const resultDiv = document.getElementById('interactive-demo-result');

    resultDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🖥️ Loading secure VM deployment process...</p>
        </div>
    `;

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="vm-security">
                <div class="vm-header">
                    <h4>🖥️ Secure Virtual Machine Deployment</h4>
                    <p>From hypervisor boot to encrypted workload execution</p>
                </div>

                <div class="vm-deployment-flow">
                    <div class="deployment-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h5>🔒 Hypervisor Secure Boot</h5>
                            <div class="step-details">
                                <strong>VMware vSphere ESXi Boot Process:</strong><br>
                                • UEFI Secure Boot validates ESXi bootloader<br>
                                • VMware Certificate Authority verification<br>
                                • Hypervisor measured boot to vTPM<br>
                                <br>
                                <strong>Intel TXT Integration:</strong><br>
                                • Trusted launch measurement<br>
                                • Hypervisor integrity protected by SMX<br>
                                • Dynamic root of trust for measurement (DRTM)<br>
                            </div>
                        </div>
                    </div>

                    <div class="deployment-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h5>🛡️ Virtual TPM Provisioning</h5>
                            <div class="step-details">
                                <strong>vTPM 2.0 Creation:</strong><br>
                                • Hardware-backed random number generation<br>
                                • Unique Endorsement Key per VM<br>
                                • Platform Configuration Registers (PCRs)<br>
                                <br>
                                <strong>VM-specific Measurements:</strong><br>
                                • Guest OS boot measurements<br>
                                • Application attestation<br>
                                • Runtime integrity verification<br>
                            </div>
                        </div>
                    </div>

                    <div class="deployment-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h5>🔐 Memory Encryption</h5>
                            <div class="step-details">
                                <strong>AMD SEV (Secure Encrypted Virtualization):</strong><br>
                                • VM memory encrypted with unique keys<br>
                                • Hypervisor cannot access guest memory<br>
                                • DMA and interrupt protection<br>
                                <br>
                                <strong>Intel TME/MKTME:</strong><br>
                                • Total Memory Encryption<br>
                                • Multi-Key Total Memory Encryption<br>
                                • Per-VM encryption keys<br>
                            </div>
                        </div>
                    </div>

                    <div class="deployment-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h5>🎯 Attestation & Deployment</h5>
                            <div class="step-details">
                                <strong>Remote Attestation:</strong><br>
                                • TPM quote generation<br>
                                • Platform Certificate validation<br>
                                • Workload placement decisions<br>
                                <br>
                                <strong>Confidential Computing:</strong><br>
                                • Encrypted workload deployment<br>
                                • Runtime attestation checks<br>
                                • Secure key injection<br>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="vm-demo-section">
                    <h5>🎮 Interactive VM Security Demo</h5>
                    <div class="demo-buttons">
                        <button onclick="simulateVMBoot()" class="demo-button">▶️ Simulate Secure VM Boot</button>
                        <button onclick="showAttestationFlow()" class="demo-button">📋 Attestation Process</button>
                        <button onclick="demonstrateMemoryEncryption()" class="demo-button">🔐 Memory Encryption</button>
                    </div>
                </div>
            </div>
        `;
    }, 2000);
}

// =============================================================================
// TRUSTED CONTAINER SECURITY
// =============================================================================

function showContainerSecurity() {
    const resultDiv = document.getElementById('interactive-demo-result');

    resultDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>📦 Loading trusted container architecture...</p>
        </div>
    `;

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="container-security">
                <div class="container-header">
                    <h4>📦 Trusted Container Deployment</h4>
                    <p>Secure containers with hardware-backed isolation and attestation</p>
                </div>

                <div class="container-architecture">
                    <div class="container-layer">
                        <div class="layer-title">
                            <h5>🏗️ Container Runtime Security</h5>
                        </div>
                        <div class="layer-content">
                            <div class="security-feature">
                                <strong>🛡️ Kata Containers (Hardware Isolation):</strong><br>
                                • Lightweight VM per container<br>
                                • Intel VT-x / AMD-V hardware isolation<br>
                                • Minimal attack surface<br>
                                • Compatible with Docker/Kubernetes<br>
                            </div>
                            <div class="security-feature">
                                <strong>🔒 gVisor (Kernel Boundary):</strong><br>
                                • User-space kernel implementation<br>
                                • Syscall interception and validation<br>
                                • Reduced kernel attack surface<br>
                                • Runtime security enforcement<br>
                            </div>
                        </div>
                    </div>

                    <div class="container-layer">
                        <div class="layer-title">
                            <h5>🔐 Image Signing & Verification</h5>
                        </div>
                        <div class="layer-content">
                            <div class="security-feature">
                                <strong>📝 Notary v2 / Sigstore:</strong><br>
                                • Content trust for container images<br>
                                • Timestamped signatures<br>
                                • Public transparency logs<br>
                                • Policy-based deployment<br>
                            </div>
                            <div class="security-feature">
                                <strong>🎯 Admission Controllers:</strong><br>
                                • Image signature validation<br>
                                • Security policy enforcement<br>
                                • Runtime configuration checks<br>
                                • Compliance verification<br>
                            </div>
                        </div>
                    </div>

                    <div class="container-layer">
                        <div class="layer-title">
                            <h5>🌐 Confidential Computing Integration</h5>
                        </div>
                        <div class="layer-content">
                            <div class="security-feature">
                                <strong>🔒 Intel SGX Containers:</strong><br>
                                • Application-level enclaves<br>
                                • Memory encryption in use<br>
                                • Remote attestation capability<br>
                                • Secure key provisioning<br>
                            </div>
                            <div class="security-feature">
                                <strong>☁️ Confidential Container Initiative:</strong><br>
                                • AMD SEV container support<br>
                                • Encrypted container images<br>
                                • Runtime measurement<br>
                                • Zero-trust architecture<br>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-demo-section">
                    <h5>🎮 Interactive Container Security Demo</h5>
                    <div class="demo-buttons">
                        <button onclick="simulateContainerDeployment()" class="demo-button">🚀 Container Deployment</button>
                        <button onclick="showImageVerification()" class="demo-button">✅ Image Verification</button>
                        <button onclick="demonstrateRuntimeSecurity()" class="demo-button">🛡️ Runtime Security</button>
                    </div>
                </div>

                <div class="container-comparison">
                    <h5>📊 Container Security Comparison</h5>
                    <div class="comparison-table">
                        <div class="comparison-row header">
                            <div class="feature">Security Feature</div>
                            <div class="traditional">Traditional Containers</div>
                            <div class="trusted">Trusted Containers</div>
                        </div>
                        <div class="comparison-row">
                            <div class="feature">Isolation</div>
                            <div class="traditional">Namespace/cgroups</div>
                            <div class="trusted">Hardware VM isolation</div>
                        </div>
                        <div class="comparison-row">
                            <div class="feature">Image Trust</div>
                            <div class="traditional">Optional signing</div>
                            <div class="trusted">Mandatory verification</div>
                        </div>
                        <div class="comparison-row">
                            <div class="feature">Memory Protection</div>
                            <div class="traditional">Kernel-based</div>
                            <div class="trusted">Hardware encryption</div>
                        </div>
                        <div class="comparison-row">
                            <div class="feature">Attestation</div>
                            <div class="traditional">Not available</div>
                            <div class="trusted">TPM-backed proof</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 2000);
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateRandomHex(length) {
    const hex = '0123456789ABCDEF';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += hex[Math.floor(Math.random() * 16)];
    }
    return result;
}

function updateProgress(demoId, completed) {
    localStorage.setItem(`hw_security_progress_${demoId}`, completed);
    console.log(`Progress updated: ${demoId} = ${completed}`);
}

// Placeholder functions for additional demos
function simulateBootGuard() { showDeprioritizedMessage('Boot Guard Simulation', 'Detailed Boot Guard attack/defense scenarios coming soon'); }
function exploreTPMPCRs() { showDeprioritizedMessage('TPM PCR Explorer', 'Advanced PCR manipulation and measurement demos in development'); }
function secureBootValidation() { showDeprioritizedMessage('Secure Boot Validation', 'Interactive secure boot policy testing coming soon'); }
function attackScenarios() { showDeprioritizedMessage('Attack Scenarios', 'Red team vs blue team security scenarios in development'); }
function simulateVMBoot() { showDeprioritizedMessage('VM Boot Simulation', 'Virtual machine secure boot process demo coming soon'); }
function showAttestationFlow() { showDeprioritizedMessage('Attestation Flow', 'Remote attestation protocol demonstration in development'); }
function demonstrateMemoryEncryption() { showDeprioritizedMessage('Memory Encryption', 'AMD SEV / Intel TME demonstration coming soon'); }
function simulateContainerDeployment() { showDeprioritizedMessage('Container Deployment', 'Trusted container deployment simulation coming soon'); }
function showImageVerification() { showDeprioritizedMessage('Image Verification', 'Container image signing and verification demo in development'); }
function demonstrateRuntimeSecurity() { showDeprioritizedMessage('Runtime Security', 'Container runtime protection demonstration coming soon'); }
function showOrchestrationSecurity() { showDeprioritizedMessage('Orchestration Security', 'Kubernetes security and policy enforcement coming soon'); }

function showDeprioritizedMessage(title, message) {
    const modal = document.createElement('div');
    modal.className = 'deprioritized-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🚧 ${title}</h3>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
                <p><small>The complete IA64 secure boot explanation and datacenter architecture overview are fully available!</small></p>
            </div>
            <div class="modal-footer">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="demo-button">Got it</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}