// NVMe Security Demo Functions

function generateRandomHex(length) {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function demonstrateTCGOpal() {
    const outputDiv = document.getElementById('nvme-security-demo-output');

    // Show loading state
    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔐 Initializing TCG Opal security configuration...</p>
        </div>
    `;

    setTimeout(() => {
        const opalData = generateOpalConfigData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🔐 TCG Opal Security Configuration</h4>

                <div class="opal-config-flow">
                    <div class="config-step">
                        <h5>1. 🔍 SED Discovery & Capabilities</h5>
                        <div class="config-details">
                            <pre class="terminal-output">
$ sedutil-cli --scan
Scanning for Opal capable drives...

/dev/nvme0n1  Samsung SSD 980 PRO 2TB        Opal 2.0
/dev/nvme1n1  Intel SSD P5510 7.68TB         Opal 2.01
/dev/nvme2n1  Micron 7450 MAX 15.36TB        Opal 2.01
/dev/nvme3n1  WD Black SN850 2TB             No Opal Support

$ sedutil-cli --query /dev/nvme0n1
Drive Information for /dev/nvme0n1
Samsung SSD 980 PRO 2TB MZ-V8P2T0BW
Firmware: 5B2QGXA7

TPer Properties:
  MaxComPacketSize......65536
  MaxPacketSize.........65536
  MaxIndTokenSize.......65536
  MaxPackets............65536
  MaxSubpackets.........65536
  MaxMethods............65536

Locking Feature:
  Locking Supported.....Y
  Locking Enabled.......N
  Locked................N
  Media Encryption......Y
  MBR Enabled...........N
  MBR Done..............N
  Locking Range Count...8
                            </pre>
                        </div>
                    </div>

                    <div class="config-step">
                        <h5>2. 🔑 Initial Security Setup</h5>
                        <div class="config-details">
                            <div class="security-warning">
                                <strong>⚠️ WARNING:</strong> This operation will erase all data on the drive!
                            </div>
                            <pre class="terminal-output">
$ sedutil-cli --initialSetup ${opalData.adminPassword} /dev/nvme0n1

WARNING: This will erase all data on the drive!
Type 'YES' to continue: YES

Initial Setup in progress...
  ✓ Generating device encryption key
  ✓ Setting admin authority password
  ✓ Enabling locking feature
  ✓ Creating default locking range
  ✓ Configuring MBR (Master Boot Record)

Initial setup completed successfully!

Drive Status:
  Locking Enabled.......Y
  Admin Authority.......Configured
  Default Range.........Unlocked
  MBR Status............Active
                            </pre>
                        </div>
                    </div>

                    <div class="config-step">
                        <h5>3. 🏢 Multi-Tenant Range Configuration</h5>
                        <div class="config-details">
                            ${opalData.lockingRanges.map((range, index) => `
                                <div class="locking-range">
                                    <h6>Range ${index}: ${range.name}</h6>
                                    <div class="range-details">
                                        <div class="range-spec">
                                            <span>Start LBA: ${range.startLBA.toLocaleString()}</span>
                                            <span>Length: ${range.length.toLocaleString()}</span>
                                            <span>Size: ${range.sizeGB}GB</span>
                                        </div>
                                        <div class="range-security">
                                            <span>Auth Method: ${range.authMethod}</span>
                                            <span>Read Lock: ${range.readLock ? 'Enabled' : 'Disabled'}</span>
                                            <span>Write Lock: ${range.writeLock ? 'Enabled' : 'Disabled'}</span>
                                        </div>
                                        <pre class="command-example">
sedutil-cli --setupLockingRange ${index} ${range.startLBA} ${range.length} ${range.password} /dev/nvme0n1
sedutil-cli --setLockingRange ${index} RO LK ${range.password} /dev/nvme0n1</pre>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="config-step">
                        <h5>4. 👤 User Authority Management</h5>
                        <div class="config-details">
                            <div class="user-authorities">
                                ${opalData.userAuthorities.map(user => `
                                    <div class="user-authority">
                                        <div class="user-info">
                                            <span class="user-name">${user.name}</span>
                                            <span class="user-role">${user.role}</span>
                                            <span class="user-status ${user.enabled ? 'enabled' : 'disabled'}">${user.enabled ? 'Active' : 'Disabled'}</span>
                                        </div>
                                        <div class="user-permissions">
                                            <strong>Permissions:</strong> ${user.permissions.join(', ')}
                                        </div>
                                        <pre class="command-example">
sedutil-cli --enableUser ${user.userID} ${opalData.adminPassword} /dev/nvme0n1
sedutil-cli --setPassword ${opalData.adminPassword} ${user.userID} ${user.password} /dev/nvme0n1</pre>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="config-step">
                        <h5>5. 🔒 Pre-Boot Authentication (PBA)</h5>
                        <div class="config-details">
                            <div class="pba-info">
                                <p>Pre-Boot Authentication ensures the drive remains locked until proper credentials are provided during system startup.</p>
                                <ul>
                                    <li><strong>Shadow MBR:</strong> Small encrypted partition containing PBA image</li>
                                    <li><strong>Authentication Flow:</strong> User enters credentials before OS loads</li>
                                    <li><strong>Unlock Mechanism:</strong> Successful auth unlocks the data partition</li>
                                    <li><strong>Security Benefit:</strong> Protection against offline attacks</li>
                                </ul>
                            </div>
                            <pre class="terminal-output">
$ sedutil-cli --setMBRDone ON ${opalData.adminPassword} /dev/nvme0n1
MBR Done flag set successfully

$ sedutil-cli --enableLockingRange 0 ${opalData.adminPassword} /dev/nvme0n1
Locking Range 0 enabled successfully

Boot Process Flow:
1. BIOS/UEFI detects locked SED
2. Shadow MBR loads PBA image
3. User prompted for authentication
4. Credentials verified by SED controller
5. Upon success, main data partition unlocked
6. Normal OS boot process continues
                            </pre>
                        </div>
                    </div>
                </div>

                <div class="opal-status-summary">
                    <h5>📊 Configuration Summary</h5>
                    <div class="status-grid">
                        <div class="status-item">
                            <span class="status-label">Opal Version:</span>
                            <span class="status-value">TCG Opal ${opalData.opalVersion}</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Encryption Algorithm:</span>
                            <span class="status-value">${opalData.encryptionAlgorithm}</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Key Length:</span>
                            <span class="status-value">${opalData.keyLength} bits</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Locking Ranges:</span>
                            <span class="status-value">${opalData.lockingRanges.length} configured</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">User Authorities:</span>
                            <span class="status-value">${opalData.userAuthorities.length} active</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">PBA Status:</span>
                            <span class="status-value">Enabled</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 2500);
}

function generateOpalConfigData() {
    return {
        adminPassword: "****************",
        opalVersion: "2.01",
        encryptionAlgorithm: "AES-256-XTS",
        keyLength: 256,
        lockingRanges: [
            {
                name: "Production Database",
                startLBA: 0,
                length: 1048576000,
                sizeGB: 500,
                authMethod: "Certificate + Smart Card",
                readLock: false,
                writeLock: false,
                password: "****************"
            },
            {
                name: "Application Data",
                startLBA: 1048576001,
                length: 1048576000,
                sizeGB: 500,
                authMethod: "Password + TOTP",
                readLock: false,
                writeLock: false,
                password: "****************"
            },
            {
                name: "Development Environment",
                startLBA: 2097152001,
                length: 1048576000,
                sizeGB: 500,
                authMethod: "Password",
                readLock: false,
                writeLock: false,
                password: "****************"
            },
            {
                name: "Backup & Archive",
                startLBA: 3145728001,
                length: 1048576000,
                sizeGB: 500,
                authMethod: "Certificate",
                readLock: false,
                writeLock: true,
                password: "****************"
            }
        ],
        userAuthorities: [
            {
                userID: 1,
                name: "Admin User",
                role: "System Administrator",
                enabled: true,
                permissions: ["Read", "Write", "Admin", "Config"],
                password: "****************"
            },
            {
                userID: 2,
                name: "DB Operator",
                role: "Database Administrator",
                enabled: true,
                permissions: ["Read", "Write", "Range0"],
                password: "****************"
            },
            {
                userID: 3,
                name: "Developer",
                role: "Application Developer",
                enabled: true,
                permissions: ["Read", "Write", "Range2"],
                password: "****************"
            },
            {
                userID: 4,
                name: "Auditor",
                role: "Compliance Auditor",
                enabled: true,
                permissions: ["Read", "Audit"],
                password: "****************"
            }
        ]
    };
}

function simulateSecurityAttack() {
    const outputDiv = document.getElementById('nvme-security-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>⚠️ Simulating security attack scenarios...</p>
        </div>
    `;

    setTimeout(() => {
        const attackData = generateSecurityAttackData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>⚠️ NVMe Security Attack Simulation</h4>

                <div class="attack-scenarios">
                    <div class="attack-scenario">
                        <h5>🎭 Scenario 1: Physical Drive Theft</h5>
                        <div class="attack-details">
                            <div class="attack-description">
                                <p><strong>Threat Actor:</strong> Malicious insider with datacenter access</p>
                                <p><strong>Attack Method:</strong> Physical removal of SED during maintenance window</p>
                                <p><strong>Objective:</strong> Extract sensitive customer data from stolen drive</p>
                            </div>

                            <div class="attack-timeline">
                                <h6>⏱️ Attack Timeline</h6>
                                <div class="timeline-events">
                                    ${attackData.physicalTheft.timeline.map((event, index) => `
                                        <div class="timeline-event ${event.impact}">
                                            <div class="event-time">T+${event.time}</div>
                                            <div class="event-description">${event.description}</div>
                                            <div class="event-impact">Impact: ${event.impactDesc}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="defense-analysis">
                                <h6>🛡️ Defense Effectiveness</h6>
                                <div class="defense-results">
                                    <div class="defense-success">
                                        ✅ <strong>SED Protection:</strong> Data remains encrypted with 256-bit AES
                                    </div>
                                    <div class="defense-success">
                                        ✅ <strong>Key Security:</strong> Encryption keys never left the drive controller
                                    </div>
                                    <div class="defense-success">
                                        ✅ <strong>Authentication:</strong> Multi-factor authentication required for unlock
                                    </div>
                                    <div class="defense-warning">
                                        ⚠️ <strong>Detection Time:</strong> ${attackData.physicalTheft.detectionTime} to detect theft
                                    </div>
                                </div>

                                <div class="attack-mitigation">
                                    <h6>📋 Immediate Response Actions</h6>
                                    <ul>
                                        <li>Revoke all authentication credentials for stolen drive</li>
                                        <li>Update enterprise key management to blacklist drive serial number</li>
                                        <li>Notify affected customers and compliance authorities</li>
                                        <li>Review physical security controls and access logs</li>
                                        <li>Implement additional monitoring for similar threats</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="attack-scenario">
                        <h5>💻 Scenario 2: Firmware Exploitation</h5>
                        <div class="attack-details">
                            <div class="attack-description">
                                <p><strong>Threat Actor:</strong> Advanced Persistent Threat (APT) group</p>
                                <p><strong>Attack Method:</strong> Exploitation of SED firmware vulnerability</p>
                                <p><strong>Objective:</strong> Bypass Opal authentication and extract keys</p>
                            </div>

                            <div class="vulnerability-analysis">
                                <h6>🔍 Vulnerability Details</h6>
                                <div class="vuln-info">
                                    <div class="vuln-item">
                                        <span class="vuln-label">CVE:</span>
                                        <span class="vuln-value">CVE-2024-XXXX (Simulated)</span>
                                    </div>
                                    <div class="vuln-item">
                                        <span class="vuln-label">CVSS Score:</span>
                                        <span class="vuln-value">8.4 (High)</span>
                                    </div>
                                    <div class="vuln-item">
                                        <span class="vuln-label">Attack Vector:</span>
                                        <span class="vuln-value">Local Physical Access</span>
                                    </div>
                                    <div class="vuln-item">
                                        <span class="vuln-label">Affected Models:</span>
                                        <span class="vuln-value">Firmware versions prior to ${attackData.firmwareExploit.patchedVersion}</span>
                                    </div>
                                </div>

                                <div class="exploit-details">
                                    <h6>⚡ Exploitation Technique</h6>
                                    <pre class="attack-code">
# Simulated attack flow (Educational purposes only)

1. Attacker gains local access to system with vulnerable SED
2. Uses custom tool to send malformed Opal command
3. Buffer overflow in firmware authentication routine
4. Achieves arbitrary code execution in SED controller
5. Extracts DEK (Data Encryption Key) from secure memory
6. Bypasses all Opal authentication mechanisms

# Detection indicators:
- Unusual Opal command sequences in logs
- Unexpected firmware reset events
- Authentication bypass without valid credentials
- Anomalous power consumption patterns
                                    </pre>
                                </div>
                            </div>

                            <div class="mitigation-response">
                                <h6>🔧 Mitigation Strategy</h6>
                                <div class="mitigation-steps">
                                    <div class="mitigation-step immediate">
                                        <h6>Immediate (0-24 hours)</h6>
                                        <ul>
                                            <li>Identify all drives with vulnerable firmware</li>
                                            <li>Isolate affected systems from network</li>
                                            <li>Begin emergency firmware update process</li>
                                            <li>Enable enhanced monitoring for exploit signatures</li>
                                        </ul>
                                    </div>
                                    <div class="mitigation-step short-term">
                                        <h6>Short-term (1-7 days)</h6>
                                        <ul>
                                            <li>Deploy firmware patches across all affected drives</li>
                                            <li>Implement additional access controls</li>
                                            <li>Conduct forensic analysis of compromised systems</li>
                                            <li>Update incident response procedures</li>
                                        </ul>
                                    </div>
                                    <div class="mitigation-step long-term">
                                        <h6>Long-term (1-4 weeks)</h6>
                                        <ul>
                                            <li>Review and update SED procurement standards</li>
                                            <li>Implement automated firmware vulnerability scanning</li>
                                            <li>Enhance physical security controls</li>
                                            <li>Conduct security awareness training</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="attack-scenario">
                        <h5>🔑 Scenario 3: Key Management Compromise</h5>
                        <div class="attack-details">
                            <div class="attack-description">
                                <p><strong>Threat Actor:</strong> Compromised cloud service provider employee</p>
                                <p><strong>Attack Method:</strong> Unauthorized access to enterprise key management system</p>
                                <p><strong>Objective:</strong> Obtain SED encryption keys for multiple tenants</p>
                            </div>

                            <div class="compromise-analysis">
                                <h6>🎯 Attack Chain Analysis</h6>
                                <div class="attack-chain">
                                    ${attackData.keyCompromise.attackChain.map((step, index) => `
                                        <div class="chain-step">
                                            <div class="step-number">${index + 1}</div>
                                            <div class="step-content">
                                                <div class="step-title">${step.title}</div>
                                                <div class="step-description">${step.description}</div>
                                                <div class="step-impact">Risk Level: <span class="${step.riskLevel}">${step.riskLevel}</span></div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="blast-radius">
                                <h6>💥 Blast Radius Assessment</h6>
                                <div class="impact-metrics">
                                    <div class="impact-metric">
                                        <span class="metric-label">Affected Drives:</span>
                                        <span class="metric-value">${attackData.keyCompromise.affectedDrives.toLocaleString()}</span>
                                    </div>
                                    <div class="impact-metric">
                                        <span class="metric-label">Compromised Data:</span>
                                        <span class="metric-value">${attackData.keyCompromise.compromisedData} PB</span>
                                    </div>
                                    <div class="impact-metric">
                                        <span class="metric-label">Affected Tenants:</span>
                                        <span class="metric-value">${attackData.keyCompromise.affectedTenants}</span>
                                    </div>
                                    <div class="impact-metric">
                                        <span class="metric-label">Recovery Time:</span>
                                        <span class="metric-value">${attackData.keyCompromise.recoveryTime} hours</span>
                                    </div>
                                </div>

                                <div class="recovery-plan">
                                    <h6>🔄 Emergency Recovery Plan</h6>
                                    <ol>
                                        <li><strong>Immediate Key Rotation:</strong> Generate new encryption keys for all affected drives</li>
                                        <li><strong>Access Revocation:</strong> Disable compromised administrator accounts</li>
                                        <li><strong>Re-encryption:</strong> Perform full data re-encryption with new keys</li>
                                        <li><strong>Tenant Notification:</strong> Inform affected customers within 72 hours</li>
                                        <li><strong>Compliance Reporting:</strong> Submit breach notifications to relevant authorities</li>
                                        <li><strong>Security Hardening:</strong> Implement additional access controls and monitoring</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lessons-learned">
                    <h5>📚 Key Security Lessons</h5>
                    <div class="lessons-grid">
                        <div class="lesson-category">
                            <h6>🛡️ Defense in Depth</h6>
                            <ul>
                                <li>SED encryption is one layer - not complete protection</li>
                                <li>Combine with physical security, access controls, monitoring</li>
                                <li>Regular vulnerability assessments and firmware updates</li>
                                <li>Implement defense capabilities at multiple levels</li>
                            </ul>
                        </div>
                        <div class="lesson-category">
                            <h6>🔑 Key Management</h6>
                            <ul>
                                <li>Separate key management from data storage infrastructure</li>
                                <li>Use hardware security modules (HSMs) for key protection</li>
                                <li>Implement regular key rotation and secure backup</li>
                                <li>Monitor all key access and usage patterns</li>
                            </ul>
                        </div>
                        <div class="lesson-category">
                            <h6>📊 Monitoring & Response</h6>
                            <ul>
                                <li>Real-time monitoring of SED status and anomalies</li>
                                <li>Automated detection of firmware exploitation attempts</li>
                                <li>Rapid incident response and containment procedures</li>
                                <li>Regular security drills and tabletop exercises</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 3000);
}

function generateSecurityAttackData() {
    return {
        physicalTheft: {
            detectionTime: "4 hours",
            timeline: [
                {
                    time: "0m",
                    description: "Insider gains access to datacenter during scheduled maintenance",
                    impactDesc: "Physical security perimeter breached",
                    impact: "medium"
                },
                {
                    time: "15m",
                    description: "SED physically removed from server rack",
                    impactDesc: "Data confidentiality at risk",
                    impact: "high"
                },
                {
                    time: "2h",
                    description: "Attacker attempts to connect drive to external system",
                    impactDesc: "Drive remains locked - no data access",
                    impact: "low"
                },
                {
                    time: "4h",
                    description: "Missing drive detected during routine inventory",
                    impactDesc: "Incident response initiated",
                    impact: "low"
                },
                {
                    time: "6h",
                    description: "Security team revokes drive authentication credentials",
                    impactDesc: "Drive permanently locked, data protected",
                    impact: "success"
                }
            ]
        },
        firmwareExploit: {
            patchedVersion: "v2.4.1",
            exploitComplexity: "High",
            privilegesRequired: "Physical Access"
        },
        keyCompromise: {
            affectedDrives: 8432,
            compromisedData: 127.5,
            affectedTenants: 156,
            recoveryTime: 72,
            attackChain: [
                {
                    title: "Initial Access",
                    description: "Phishing attack compromises administrator credentials",
                    riskLevel: "medium"
                },
                {
                    title: "Privilege Escalation",
                    description: "Lateral movement to key management system",
                    riskLevel: "high"
                },
                {
                    title: "Key Extraction",
                    description: "Download encryption keys for multiple SED arrays",
                    riskLevel: "critical"
                },
                {
                    title: "Data Access",
                    description: "Potential unauthorized access to encrypted data",
                    riskLevel: "critical"
                }
            ]
        }
    };
}

function showKeyManagement() {
    const outputDiv = document.getElementById('nvme-security-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔑 Loading enterprise key management demonstration...</p>
        </div>
    `;

    setTimeout(() => {
        const keyMgmtData = generateKeyManagementData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🔑 Enterprise SED Key Management</h4>

                <div class="key-management-architecture">
                    <div class="architecture-overview">
                        <h5>🏗️ Key Management Architecture</h5>
                        <div class="architecture-diagram">
                            <div class="architecture-layer">
                                <div class="layer-title">Enterprise Key Management (EKM)</div>
                                <div class="layer-components">
                                    <div class="component">HashiCorp Vault Cluster</div>
                                    <div class="component">AWS KMS</div>
                                    <div class="component">Azure Key Vault</div>
                                    <div class="component">HSM Hardware</div>
                                </div>
                            </div>
                            <div class="architecture-arrow">↓ KMIP Protocol</div>
                            <div class="architecture-layer">
                                <div class="layer-title">Key Management Proxy</div>
                                <div class="layer-components">
                                    <div class="component">KMIP Client Library</div>
                                    <div class="component">Policy Engine</div>
                                    <div class="component">Audit Logger</div>
                                    <div class="component">Load Balancer</div>
                                </div>
                            </div>
                            <div class="architecture-arrow">↓ TCG Opal Commands</div>
                            <div class="architecture-layer">
                                <div class="layer-title">SED Storage Array</div>
                                <div class="layer-components">
                                    <div class="component">NVMe SED Drives</div>
                                    <div class="component">Hardware Encryption</div>
                                    <div class="component">Secure Key Storage</div>
                                    <div class="component">Authentication Engine</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="key-lifecycle">
                        <h5>🔄 Key Lifecycle Management</h5>
                        <div class="lifecycle-stages">
                            ${keyMgmtData.keyLifecycle.map((stage, index) => `
                                <div class="lifecycle-stage">
                                    <div class="stage-number">${index + 1}</div>
                                    <div class="stage-content">
                                        <h6>${stage.name}</h6>
                                        <div class="stage-description">${stage.description}</div>
                                        <div class="stage-duration">Duration: ${stage.duration}</div>
                                        <div class="stage-security">Security Level: <span class="${stage.securityLevel}">${stage.securityLevel}</span></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="key-operations">
                        <h5>⚙️ Key Operations Console</h5>
                        <div class="operations-dashboard">
                            <div class="operation-section">
                                <h6>🆕 Key Generation</h6>
                                <pre class="operation-example">
# Generate new SED encryption key
curl -X POST "https://vault.company.com/v1/transit/keys/sed-encryption" \\
     -H "X-Vault-Token: $VAULT_TOKEN" \\
     -d '{
       "type": "aes256-gcm96",
       "derived": false,
       "exportable": false,
       "allow_plaintext_backup": false,
       "context": "datacenter-rack-01"
     }'

# Response:
{
  "data": {
    "key_id": "sed-${generateRandomHex(16)}",
    "creation_time": "${new Date().toISOString()}",
    "min_decryption_version": 1,
    "min_encryption_version": 1,
    "supports_encryption": true,
    "supports_decryption": true,
    "supports_signing": false
  }
}
                                </pre>
                            </div>

                            <div class="operation-section">
                                <h6>🔄 Key Rotation</h6>
                                <pre class="operation-example">
# Automated key rotation workflow
#!/bin/bash
KEY_NAME="sed-encryption"
ROTATION_INTERVAL="90d"

# Check if key needs rotation
LAST_ROTATION=$(vault read -field=creation_time transit/keys/$KEY_NAME)
CURRENT_TIME=$(date +%s)
ROTATION_TIME=$((CURRENT_TIME - 90*24*3600))

if [ $LAST_ROTATION -lt $ROTATION_TIME ]; then
    echo "Rotating key $KEY_NAME..."

    # Rotate to new version
    vault write transit/keys/$KEY_NAME/rotate

    # Update SED with new key
    for SED in ${SED_DEVICES[@]}; do
        NEW_KEY=$(vault write -field=ciphertext transit/encrypt/$KEY_NAME plaintext=...)
        sedutil-cli --setPassword $OLD_PASSWORD $NEW_KEY $SED
    done

    echo "Key rotation completed for $KEY_NAME"
fi
                                </pre>
                            </div>

                            <div class="operation-section">
                                <h6>🔒 Key Escrow & Recovery</h6>
                                <div class="escrow-process">
                                    <div class="escrow-step">
                                        <strong>1. Key Escrow:</strong> Master keys stored in secure escrow with M-of-N recovery
                                    </div>
                                    <div class="escrow-step">
                                        <strong>2. Recovery Request:</strong> Authenticated request with business justification
                                    </div>
                                    <div class="escrow-step">
                                        <strong>3. Authorization:</strong> Multi-party authorization (${keyMgmtData.escrow.requiredApprovals} approvals required)
                                    </div>
                                    <div class="escrow-step">
                                        <strong>4. Key Reconstruction:</strong> Combine key shares to recreate original key
                                    </div>
                                    <div class="escrow-step">
                                        <strong>5. Audit Trail:</strong> Complete logging of recovery operation
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="compliance-reporting">
                        <h5>📊 Compliance & Audit Reporting</h5>
                        <div class="compliance-metrics">
                            <div class="metric-category">
                                <h6>🔑 Key Security Metrics</h6>
                                <div class="metrics-grid">
                                    <div class="metric-item">
                                        <span class="metric-label">Active Keys:</span>
                                        <span class="metric-value">${keyMgmtData.metrics.activeKeys.toLocaleString()}</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Keys Rotated (30d):</span>
                                        <span class="metric-value">${keyMgmtData.metrics.rotatedKeys}</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Failed Operations:</span>
                                        <span class="metric-value">${keyMgmtData.metrics.failedOps}</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Compliance Score:</span>
                                        <span class="metric-value">${keyMgmtData.metrics.complianceScore}%</span>
                                    </div>
                                </div>
                            </div>

                            <div class="audit-events">
                                <h6>📋 Recent Audit Events</h6>
                                <div class="events-list">
                                    ${keyMgmtData.auditEvents.map(event => `
                                        <div class="audit-event ${event.severity}">
                                            <div class="event-time">${event.timestamp}</div>
                                            <div class="event-type">${event.type}</div>
                                            <div class="event-description">${event.description}</div>
                                            <div class="event-user">User: ${event.user}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="compliance-frameworks">
                                <h6>🛡️ Compliance Framework Alignment</h6>
                                <div class="frameworks-grid">
                                    ${keyMgmtData.complianceFrameworks.map(framework => `
                                        <div class="framework-item">
                                            <div class="framework-name">${framework.name}</div>
                                            <div class="framework-status ${framework.status}">${framework.status}</div>
                                            <div class="framework-score">Score: ${framework.score}%</div>
                                            <div class="framework-requirements">${framework.requirements} requirements met</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="integration-examples">
                    <h5>🔧 Integration Examples</h5>
                    <div class="integration-tabs">
                        <div class="integration-tab">
                            <h6>Kubernetes Secret Management</h6>
                            <pre class="integration-code">
apiVersion: v1
kind: Secret
metadata:
  name: sed-encryption-keys
  namespace: storage-system
type: Opaque
data:
  # Keys retrieved from Vault via External Secrets Operator
  sed-key-primary: &lt;base64-encoded-key&gt;
  sed-key-backup: &lt;base64-encoded-key&gt;
---
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.company.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "storage-operator"
                            </pre>
                        </div>

                        <div class="integration-tab">
                            <h6>Terraform SED Provisioning</h6>
                            <pre class="integration-code">
resource "vault_mount" "sed_encryption" {
  path        = "sed"
  type        = "transit"
  description = "SED encryption keys"
}

resource "vault_transit_secret_backend_key" "sed_key" {
  backend          = vault_mount.sed_encryption.path
  name             = "datacenter-${var.datacenter_id}"
  type             = "aes256-gcm96"
  deletion_allowed = false
  exportable       = false

  lifecycle {
    prevent_destroy = true
  }
}

resource "local_file" "sed_config" {
  content = templatefile("${path.module}/sed-config.tpl", {
    sed_devices = var.sed_devices
    key_id      = vault_transit_secret_backend_key.sed_key.name
    vault_addr  = var.vault_address
  })
  filename = "/tmp/sed-config-${var.datacenter_id}.sh"
}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 2800);
}

function generateKeyManagementData() {
    return {
        keyLifecycle: [
            {
                name: "Key Generation",
                description: "Generate cryptographically secure encryption keys using HSM",
                duration: "5-10 seconds",
                securityLevel: "high"
            },
            {
                name: "Key Distribution",
                description: "Securely distribute keys to SED devices via KMIP protocol",
                duration: "30-60 seconds",
                securityLevel: "high"
            },
            {
                name: "Active Usage",
                description: "Keys actively used for data encryption/decryption operations",
                duration: "90 days (typical)",
                securityLevel: "medium"
            },
            {
                name: "Key Rotation",
                description: "Generate new key version and update SED configurations",
                duration: "5-10 minutes",
                securityLevel: "high"
            },
            {
                name: "Key Retirement",
                description: "Secure deletion of old key material from all systems",
                duration: "24-48 hours",
                securityLevel: "critical"
            }
        ],
        escrow: {
            requiredApprovals: 3,
            keyShares: 5,
            threshold: 3
        },
        metrics: {
            activeKeys: 8432,
            rotatedKeys: 156,
            failedOps: 3,
            complianceScore: 97.8
        },
        auditEvents: [
            {
                timestamp: "2024-01-15 14:23:17 UTC",
                type: "KEY_ROTATION",
                description: "Automated key rotation for datacenter-rack-05",
                user: "system-automation",
                severity: "info"
            },
            {
                timestamp: "2024-01-15 09:15:42 UTC",
                type: "KEY_ACCESS",
                description: "Manual key retrieval for emergency recovery",
                user: "admin@company.com",
                severity: "warning"
            },
            {
                timestamp: "2024-01-14 22:08:31 UTC",
                type: "COMPLIANCE_CHECK",
                description: "FIPS 140-2 compliance validation successful",
                user: "compliance-scanner",
                severity: "info"
            },
            {
                timestamp: "2024-01-14 16:45:19 UTC",
                type: "FAILED_OPERATION",
                description: "Key distribution failed for /dev/nvme3n1",
                user: "storage-operator",
                severity: "error"
            }
        ],
        complianceFrameworks: [
            {
                name: "FIPS 140-2 Level 2",
                status: "compliant",
                score: 98,
                requirements: 24
            },
            {
                name: "Common Criteria EAL4+",
                status: "compliant",
                score: 95,
                requirements: 18
            },
            {
                name: "SOC 2 Type II",
                status: "compliant",
                score: 99,
                requirements: 32
            },
            {
                name: "ISO 27001:2013",
                status: "partial",
                score: 87,
                requirements: 28
            }
        ]
    };
}

function auditSecurityCompliance() {
    const outputDiv = document.getElementById('nvme-security-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>📋 Running comprehensive security audit...</p>
        </div>
    `;

    setTimeout(() => {
        const auditData = generateSecurityAuditData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>📋 NVMe Security Compliance Audit</h4>

                <div class="audit-overview">
                    <div class="audit-summary">
                        <h5>📊 Audit Summary</h5>
                        <div class="summary-metrics">
                            <div class="metric-card">
                                <div class="metric-icon">✅</div>
                                <div class="metric-content">
                                    <span class="metric-value">${auditData.summary.compliantDrives}</span>
                                    <span class="metric-label">Compliant Drives</span>
                                </div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-icon">⚠️</div>
                                <div class="metric-content">
                                    <span class="metric-value">${auditData.summary.warningDrives}</span>
                                    <span class="metric-label">Warning Status</span>
                                </div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-icon">❌</div>
                                <div class="metric-content">
                                    <span class="metric-value">${auditData.summary.nonCompliantDrives}</span>
                                    <span class="metric-label">Non-Compliant</span>
                                </div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-icon">📈</div>
                                <div class="metric-content">
                                    <span class="metric-value">${auditData.summary.overallScore}%</span>
                                    <span class="metric-label">Overall Score</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="compliance-categories">
                        <h5>🔍 Compliance Categories</h5>
                        <div class="categories-grid">
                            ${auditData.categories.map(category => `
                                <div class="category-item ${category.status}">
                                    <div class="category-header">
                                        <span class="category-name">${category.name}</span>
                                        <span class="category-score">${category.score}%</span>
                                        <span class="category-status ${category.status}">${category.statusText}</span>
                                    </div>
                                    <div class="category-progress">
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${category.score}%"></div>
                                        </div>
                                    </div>
                                    <div class="category-details">
                                        <span>${category.passed}/${category.total} checks passed</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="detailed-findings">
                    <h5>🔍 Detailed Audit Findings</h5>
                    <div class="findings-list">
                        ${auditData.findings.map((finding, index) => `
                            <div class="finding-item ${finding.severity}">
                                <div class="finding-header">
                                    <div class="finding-id">F${(index + 1).toString().padStart(3, '0')}</div>
                                    <div class="finding-title">${finding.title}</div>
                                    <div class="finding-severity ${finding.severity}">${finding.severity.toUpperCase()}</div>
                                </div>
                                <div class="finding-details">
                                    <div class="finding-description">${finding.description}</div>
                                    <div class="finding-impact"><strong>Impact:</strong> ${finding.impact}</div>
                                    <div class="finding-recommendation"><strong>Recommendation:</strong> ${finding.recommendation}</div>
                                    ${finding.affectedDevices ? `<div class="finding-devices"><strong>Affected Devices:</strong> ${finding.affectedDevices.join(', ')}</div>` : ''}
                                </div>
                                <div class="finding-timeline">
                                    <strong>Remediation Timeline:</strong> ${finding.timelineToFix}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="remediation-plan">
                    <h5>🛠️ Remediation Action Plan</h5>
                    <div class="action-plan">
                        ${auditData.remediationPlan.map((action, index) => `
                            <div class="action-item priority-${action.priority}">
                                <div class="action-header">
                                    <div class="action-number">${index + 1}</div>
                                    <div class="action-title">${action.title}</div>
                                    <div class="action-priority">Priority: ${action.priority.toUpperCase()}</div>
                                </div>
                                <div class="action-details">
                                    <div class="action-description">${action.description}</div>
                                    <div class="action-timeline">Timeline: ${action.timeline}</div>
                                    <div class="action-owner">Owner: ${action.owner}</div>
                                </div>
                                <div class="action-tasks">
                                    <strong>Tasks:</strong>
                                    <ul>
                                        ${action.tasks.map(task => `<li>${task}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="compliance-report">
                    <h5>📄 Compliance Report Export</h5>
                    <div class="report-options">
                        <div class="report-format">
                            <strong>Available Formats:</strong>
                            <button class="report-btn">📊 Excel Report</button>
                            <button class="report-btn">📋 PDF Summary</button>
                            <button class="report-btn">📝 CSV Data</button>
                            <button class="report-btn">🔗 JSON API</button>
                        </div>

                        <div class="report-preview">
                            <h6>Report Preview</h6>
                            <pre class="report-content">
NVMe SED Security Compliance Report
Generated: ${new Date().toLocaleString()}
Auditor: Automated Security Scanner v2.1
Scope: DataCenter Hardware Security Assessment

Executive Summary:
- Total Drives Assessed: ${auditData.summary.totalDrives}
- Compliance Level: ${auditData.summary.overallScore}% (${auditData.summary.overallScore >= 90 ? 'EXCELLENT' : auditData.summary.overallScore >= 80 ? 'GOOD' : 'NEEDS IMPROVEMENT'})
- Critical Findings: ${auditData.findings.filter(f => f.severity === 'critical').length}
- High Priority Actions: ${auditData.remediationPlan.filter(a => a.priority === 'high').length}

Key Recommendations:
1. Address ${auditData.findings.filter(f => f.severity === 'critical').length} critical security findings within 7 days
2. Implement automated compliance monitoring
3. Update SED firmware on ${auditData.summary.nonCompliantDrives} non-compliant drives
4. Enhance key rotation procedures for multi-tenant environments

Next Audit Scheduled: ${new Date(Date.now() + 90*24*60*60*1000).toLocaleDateString()}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 3200);
}

function generateSecurityAuditData() {
    return {
        summary: {
            totalDrives: 1247,
            compliantDrives: 1184,
            warningDrives: 47,
            nonCompliantDrives: 16,
            overallScore: 92
        },
        categories: [
            {
                name: "Encryption Configuration",
                score: 96,
                status: "compliant",
                statusText: "Compliant",
                passed: 48,
                total: 50
            },
            {
                name: "Authentication & Access Control",
                score: 89,
                status: "warning",
                statusText: "Minor Issues",
                passed: 42,
                total: 47
            },
            {
                name: "Key Management",
                score: 94,
                status: "compliant",
                statusText: "Compliant",
                passed: 31,
                total: 33
            },
            {
                name: "Firmware Security",
                score: 87,
                status: "warning",
                statusText: "Updates Needed",
                passed: 26,
                total: 30
            },
            {
                name: "Audit & Logging",
                score: 91,
                status: "compliant",
                statusText: "Compliant",
                passed: 21,
                total: 23
            },
            {
                name: "Physical Security",
                score: 98,
                status: "compliant",
                statusText: "Excellent",
                passed: 19,
                total: 19
            }
        ],
        findings: [
            {
                title: "Outdated Firmware on Multiple SEDs",
                severity: "high",
                description: "16 SED drives are running firmware versions with known security vulnerabilities",
                impact: "Potential for firmware exploitation and authentication bypass",
                recommendation: "Update firmware to version 2.4.1 or later within 14 days",
                affectedDevices: ["/dev/nvme2n1", "/dev/nvme7n1", "/dev/nvme12n1", "/dev/nvme18n1"],
                timelineToFix: "14 days"
            },
            {
                title: "Weak Password Policies",
                severity: "medium",
                description: "Some SED configurations use passwords that don't meet enterprise security standards",
                impact: "Increased risk of password-based attacks",
                recommendation: "Implement minimum 12-character passwords with complexity requirements",
                affectedDevices: ["/dev/nvme5n1", "/dev/nvme9n1"],
                timelineToFix: "7 days"
            },
            {
                title: "Missing Key Rotation",
                severity: "medium",
                description: "47 drives have not had key rotation in the past 90 days",
                impact: "Extended exposure window for compromised keys",
                recommendation: "Implement automated key rotation every 90 days",
                timelineToFix: "30 days"
            },
            {
                title: "Insufficient Audit Logging",
                severity: "low",
                description: "Some SED operations are not being logged to central SIEM",
                impact: "Reduced visibility into security events and potential compliance issues",
                recommendation: "Configure comprehensive audit logging for all SED operations",
                timelineToFix: "21 days"
            }
        ],
        remediationPlan: [
            {
                priority: "high",
                title: "Emergency Firmware Updates",
                description: "Update firmware on all vulnerable SED drives to address critical security vulnerabilities",
                timeline: "14 days",
                owner: "Infrastructure Team",
                tasks: [
                    "Schedule maintenance windows for affected systems",
                    "Download and validate firmware updates from vendor",
                    "Deploy updates using automated configuration management",
                    "Verify successful update and security posture improvement"
                ]
            },
            {
                priority: "medium",
                title: "Password Policy Enforcement",
                description: "Implement and enforce strong password policies across all SED configurations",
                timeline: "7 days",
                owner: "Security Team",
                tasks: [
                    "Define enterprise password complexity requirements",
                    "Update SED configuration scripts and automation",
                    "Force password changes on non-compliant drives",
                    "Implement automated password compliance checking"
                ]
            },
            {
                priority: "medium",
                title: "Automated Key Rotation Implementation",
                description: "Deploy automated key rotation system for all enterprise SEDs",
                timeline: "30 days",
                owner: "DevOps Team",
                tasks: [
                    "Design key rotation automation framework",
                    "Integrate with existing key management infrastructure",
                    "Test rotation procedures in development environment",
                    "Deploy to production with proper monitoring and rollback procedures"
                ]
            },
            {
                priority: "low",
                title: "Enhanced Audit Logging",
                description: "Improve audit logging coverage and SIEM integration for comprehensive security monitoring",
                timeline: "21 days",
                owner: "Security Operations Team",
                tasks: [
                    "Review current logging gaps and requirements",
                    "Configure additional log sources and parsers",
                    "Implement real-time alerting for security events",
                    "Validate log integrity and retention policies"
                ]
            }
        ]
    };
}