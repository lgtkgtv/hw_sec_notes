// Enhanced Hardware Security Demonstrations
// Priority implementations: TPM Explorer, Boot Simulator enhancements
// Deprioritized: Attack simulations, attestation protocols

// =============================================================================
// PRIORITY IMPLEMENTATION: TPM Explorer
// =============================================================================

function exploreTpm() {
    const resultDiv = document.getElementById('tpm-demo-result');
    const outputDiv = document.getElementById('tpm-output');

    if (!resultDiv || !outputDiv) {
        createTPMDemoArea();
        return exploreTpm(); // Retry after creating area
    }

    resultDiv.style.display = 'block';
    resultDiv.classList.add('demo-active');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔒 Initializing TPM 2.0 exploration...</p>
        </div>
    `;

    setTimeout(() => {
        const tpmData = generateTPMData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <div class="demo-section">
                    <h4>🔧 TPM 2.0 Overview</h4>
                    <div class="tpm-info-grid">
                        <div class="tpm-info-card">
                            <h5>📋 TPM Details</h5>
                            <div class="info-item">
                                <span class="label">Manufacturer:</span>
                                <span class="value">${tpmData.manufacturer}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Version:</span>
                                <span class="value">TPM ${tpmData.version}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Firmware:</span>
                                <span class="value">${tpmData.firmware}</span>
                            </div>
                        </div>

                        <div class="tpm-info-card">
                            <h5>🔐 Security Status</h5>
                            <div class="info-item">
                                <span class="label">Owner Present:</span>
                                <span class="value success">✅ Yes</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Platform Auth:</span>
                                <span class="value success">✅ Enabled</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Lockout:</span>
                                <span class="value success">✅ Protected</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="demo-section">
                    <h4>🗝️ Platform Configuration Registers (PCRs)</h4>
                    <div class="pcr-container">
                        ${generatePCRDisplay(tpmData.pcrs)}
                    </div>
                    <div class="demo-note">
                        <p><strong>PCRs store measurements</strong> of system components during boot. Changes indicate potential tampering.</p>
                    </div>
                </div>

                <div class="demo-section">
                    <h4>🔑 Key Management Demonstration</h4>
                    <div class="key-operations">
                        <button onclick="generateTPMKey()" class="demo-button">🔄 Generate RSA Key</button>
                        <button onclick="sealUnsealDemo()" class="demo-button">🔒 Seal/Unseal Data</button>
                        <button onclick="attestationDemo()" class="demo-button deprioritized">📋 Remote Attestation</button>
                    </div>

                    <div id="tpm-operation-result" class="operation-result" style="display: none;">
                        <!-- Operation results appear here -->
                    </div>
                </div>

                <div class="demo-actions">
                    <button onclick="exploreTpm()" class="demo-button">🔄 Refresh TPM State</button>
                    <button onclick="showBootChain()" class="demo-button">⚡ Boot Chain Demo</button>
                </div>
            </div>
        `;

        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }, 2000);

    updateProgress('hardware-tpm', true);
}

function generateTPMKey() {
    const resultDiv = document.getElementById('tpm-operation-result');
    resultDiv.style.display = 'block';

    resultDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔄 Generating RSA-2048 key in TPM...</p>
        </div>
    `;

    setTimeout(() => {
        const keyData = {
            handle: '0x81000001',
            algorithm: 'RSA-2048',
            usage: 'Signing & Encryption',
            publicKey: generateRandomHex(512),
            created: new Date().toISOString()
        };

        resultDiv.innerHTML = `
            <div class="operation-success">
                <h5>✅ TPM Key Generated Successfully</h5>

                <div class="key-details">
                    <div class="detail-item">
                        <span class="label">Key Handle:</span>
                        <span class="value">${keyData.handle}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Algorithm:</span>
                        <span class="value">${keyData.algorithm}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Usage:</span>
                        <span class="value">${keyData.usage}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Created:</span>
                        <span class="value">${keyData.created}</span>
                    </div>
                </div>

                <div class="public-key-section">
                    <h6>📢 Public Key (Extractable)</h6>
                    <div class="data-box key">${formatHex(keyData.publicKey)}</div>
                </div>

                <div class="demo-note">
                    <p><strong>Security:</strong> Private key never leaves the TPM. All cryptographic operations occur within the secure boundary.</p>
                </div>
            </div>
        `;
    }, 1500);
}

function sealUnsealDemo() {
    const resultDiv = document.getElementById('tpm-operation-result');
    resultDiv.style.display = 'block';

    resultDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔒 Sealing sensitive data to current PCR state...</p>
        </div>
    `;

    setTimeout(() => {
        const secretData = "Database encryption key: AES256-" + generateRandomHex(16);
        const sealedBlob = generateRandomHex(256);
        const pcrSelection = [0, 1, 2, 3, 7];

        resultDiv.innerHTML = `
            <div class="operation-success">
                <h5>✅ Data Sealed Successfully</h5>

                <div class="seal-operation">
                    <div class="seal-section">
                        <h6>📝 Original Secret Data</h6>
                        <div class="data-box plaintext">${secretData}</div>
                    </div>

                    <div class="seal-section">
                        <h6>🔒 Sealed Blob (PCR-bound)</h6>
                        <div class="data-box ciphertext">${formatHex(sealedBlob)}</div>
                    </div>

                    <div class="seal-section">
                        <h6>📋 PCR Policy (Boot State)</h6>
                        <div class="pcr-policy">
                            <p>Sealed to PCRs: <strong>${pcrSelection.join(', ')}</strong></p>
                            <p class="policy-note">Data can only be unsealed when system is in the exact same boot state</p>
                        </div>
                    </div>
                </div>

                <div class="unseal-actions">
                    <button onclick="performUnseal('${secretData}')" class="demo-button">🔓 Attempt Unseal</button>
                    <button onclick="simulateBootChange()" class="demo-button secondary">⚠️ Simulate Boot Change</button>
                </div>

                <div class="demo-note">
                    <p><strong>Seal/Unseal:</strong> Protects secrets by binding them to specific system state. If boot sequence changes, data becomes inaccessible.</p>
                </div>
            </div>
        `;
    }, 2000);
}

function performUnseal(originalData) {
    const resultDiv = document.getElementById('tpm-operation-result');

    // Add unseal attempt section
    const unsealSection = document.createElement('div');
    unsealSection.innerHTML = `
        <div class="unseal-attempt">
            <div class="demo-loading">
                <div class="spinner"></div>
                <p>🔓 Verifying PCR state and unsealing...</p>
            </div>
        </div>
    `;
    resultDiv.appendChild(unsealSection);

    setTimeout(() => {
        unsealSection.innerHTML = `
            <div class="unseal-success">
                <h6>✅ Unseal Successful!</h6>
                <div class="data-box plaintext">${originalData}</div>
                <p class="success-note">PCR values match sealed policy - data recovered successfully</p>
            </div>
        `;
    }, 1500);
}

function simulateBootChange() {
    const resultDiv = document.getElementById('tpm-operation-result');

    // Add boot change simulation
    const changeSection = document.createElement('div');
    changeSection.innerHTML = `
        <div class="boot-change-simulation">
            <div class="demo-loading">
                <div class="spinner"></div>
                <p>⚠️ Simulating firmware modification...</p>
            </div>
        </div>
    `;
    resultDiv.appendChild(changeSection);

    setTimeout(() => {
        changeSection.innerHTML = `
            <div class="boot-change-result">
                <h6>⚠️ Boot State Changed</h6>
                <div class="change-details">
                    <p><strong>PCR[0] Changed:</strong></p>
                    <div class="pcr-comparison">
                        <div class="pcr-old">Old: <code>3B4C89F2A1D5E6...</code></div>
                        <div class="pcr-new">New: <code>8F1A2D5B9E3C7...</code></div>
                    </div>
                    <p class="failure-note">❌ Unseal would now FAIL - PCR mismatch detected!</p>
                </div>

                <div class="demo-note">
                    <p><strong>Security Feature:</strong> Any firmware change prevents access to sealed data, protecting against malicious modifications.</p>
                </div>
            </div>
        `;
    }, 1500);
}

// =============================================================================
// BOOT CHAIN DEMONSTRATION
// =============================================================================

function showBootChain() {
    const resultDiv = document.getElementById('tpm-demo-result');
    const outputDiv = document.getElementById('tpm-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>⚡ Simulating secure boot chain...</p>
        </div>
    `;

    setTimeout(() => {
        outputDiv.innerHTML = `
            <div class="demo-output">
                <div class="demo-section">
                    <h4>⚡ Secure Boot Chain Visualization</h4>

                    <div class="boot-chain">
                        ${generateBootChainSteps()}
                    </div>

                    <div class="demo-actions">
                        <button onclick="simulateBootProcess()" class="demo-button">▶️ Run Boot Simulation</button>
                        <button onclick="exploreTpm()" class="demo-button secondary">↩️ Back to TPM</button>
                    </div>

                    <div id="boot-simulation-result" style="display: none;">
                        <!-- Boot simulation results -->
                    </div>
                </div>
            </div>
        `;
    }, 1000);
}

function simulateBootProcess() {
    const resultDiv = document.getElementById('boot-simulation-result');
    resultDiv.style.display = 'block';

    const steps = [
        { name: 'CPU Reset', duration: 100, pcr: null },
        { name: 'Intel Boot Guard', duration: 300, pcr: 0 },
        { name: 'UEFI Firmware', duration: 500, pcr: 1 },
        { name: 'Boot Loader', duration: 400, pcr: 2 },
        { name: 'OS Kernel', duration: 600, pcr: 3 },
        { name: 'Boot Complete', duration: 200, pcr: null }
    ];

    let currentStep = 0;

    function runStep() {
        if (currentStep >= steps.length) {
            resultDiv.innerHTML += `
                <div class="boot-complete">
                    <h5>✅ Secure Boot Completed Successfully</h5>
                    <p>All components verified. System integrity maintained.</p>
                    <div class="final-pcr-state">
                        <h6>Final PCR State:</h6>
                        ${generatePCRDisplay({
                            0: generateRandomHex(64),
                            1: generateRandomHex(64),
                            2: generateRandomHex(64),
                            3: generateRandomHex(64)
                        })}
                    </div>
                </div>
            `;
            return;
        }

        const step = steps[currentStep];

        resultDiv.innerHTML = `
            <div class="boot-progress">
                <h5>Boot Process Simulation</h5>
                <div class="current-step">
                    <div class="step-indicator">
                        <span class="step-number">${currentStep + 1}</span>
                        <div class="spinner"></div>
                    </div>
                    <div class="step-info">
                        <h6>${step.name}</h6>
                        <p>Verifying component integrity...</p>
                        ${step.pcr !== null ? `<p class="pcr-update">Extending PCR[${step.pcr}]</p>` : ''}
                    </div>
                </div>

                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(currentStep / steps.length) * 100}%"></div>
                </div>
            </div>
        `;

        setTimeout(() => {
            currentStep++;
            runStep();
        }, step.duration);
    }

    runStep();
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateTPMData() {
    return {
        manufacturer: 'Infineon Technologies',
        version: '2.0',
        firmware: 'v7.85.3054.0',
        pcrs: {
            0: generateRandomHex(64), // BIOS measurements
            1: generateRandomHex(64), // BIOS configuration
            2: generateRandomHex(64), // Option ROM code
            3: generateRandomHex(64), // Option ROM configuration
            4: generateRandomHex(64), // Boot loader code
            7: generateRandomHex(64)  // Secure Boot policy
        }
    };
}

function generatePCRDisplay(pcrs) {
    return Object.entries(pcrs).map(([num, value]) => `
        <div class="pcr-item">
            <div class="pcr-header">
                <span class="pcr-number">PCR[${num}]</span>
                <span class="pcr-description">${getPCRDescription(num)}</span>
            </div>
            <div class="pcr-value">${formatHex(value)}</div>
        </div>
    `).join('');
}

function getPCRDescription(pcrNum) {
    const descriptions = {
        '0': 'BIOS/UEFI Code',
        '1': 'BIOS/UEFI Config',
        '2': 'Option ROM Code',
        '3': 'Option ROM Config',
        '4': 'Boot Loader',
        '7': 'Secure Boot Policy'
    };
    return descriptions[pcrNum] || 'Platform Measurement';
}

function generateBootChainSteps() {
    return `
        <div class="boot-step">
            <div class="step-icon">🔌</div>
            <div class="step-content">
                <h5>1. Power-On Reset</h5>
                <p>CPU initializes, starts execution from reset vector</p>
            </div>
        </div>

        <div class="boot-arrow">↓</div>

        <div class="boot-step">
            <div class="step-icon">🛡️</div>
            <div class="step-content">
                <h5>2. Intel Boot Guard</h5>
                <p>Verifies UEFI firmware signature using hardware root of trust</p>
                <div class="pcr-extend">Extends PCR[0]</div>
            </div>
        </div>

        <div class="boot-arrow">↓</div>

        <div class="boot-step">
            <div class="step-icon">⚙️</div>
            <div class="step-content">
                <h5>3. UEFI Firmware</h5>
                <p>Platform initialization, device enumeration, boot device selection</p>
                <div class="pcr-extend">Extends PCR[1]</div>
            </div>
        </div>

        <div class="boot-arrow">↓</div>

        <div class="boot-step">
            <div class="step-icon">🚀</div>
            <div class="step-content">
                <h5>4. Boot Loader</h5>
                <p>OS loader verification and kernel loading</p>
                <div class="pcr-extend">Extends PCR[2], PCR[3]</div>
            </div>
        </div>

        <div class="boot-arrow">↓</div>

        <div class="boot-step">
            <div class="step-icon">🖥️</div>
            <div class="step-content">
                <h5>5. Operating System</h5>
                <p>Kernel initialization and system startup</p>
            </div>
        </div>
    `;
}

function createTPMDemoArea() {
    const targetDiv = document.querySelector('.hardware-demo-section') || document.body;
    const demoArea = document.createElement('div');
    demoArea.innerHTML = `
        <div id="tpm-demo-result" class="demo-result" style="display: none;">
            <div id="tpm-output" class="demo-output-container"></div>
        </div>
    `;
    targetDiv.appendChild(demoArea);
}

// =============================================================================
// DEPRIORITIZED FUNCTIONS - Styled as Disabled
// =============================================================================

function attestationDemo() {
    showDeprioritizedMessage('Remote Attestation', 'Advanced attestation protocols and quote verification coming soon');
}

function simulateAttackVectors() {
    showDeprioritizedMessage('Attack Vector Simulation', 'Interactive security attack scenarios in development');
}

function showSecureBootFailure() {
    showDeprioritizedMessage('Boot Failure Simulation', 'Tamper detection and recovery procedures coming soon');
}

// Reuse utility functions from crypto demo
function formatHex(hexString) {
    return hexString.match(/.{1,32}/g).join('<br>');
}

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
                <p><small>Priority features (TPM Explorer, Boot Simulator) are fully functional!</small></p>
            </div>
            <div class="modal-footer">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="demo-button">Got it</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}