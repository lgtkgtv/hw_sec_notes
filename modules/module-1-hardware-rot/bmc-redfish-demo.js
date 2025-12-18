// BMC and RedFish API Interactive Demonstrations
// DataCenter Asset Management and Security

// =============================================================================
// BMC PROVISIONING SIMULATION
// =============================================================================

function simulateBMCProvisioning() {
    const resultDiv = document.getElementById('bmc-demo-result');
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });

    const provisioningSteps = [
        {
            name: 'Hardware Discovery',
            duration: 1000,
            icon: '🔍',
            details: 'Scanning for new BMC on network segment 192.168.100.0/24',
            redfish: '/redfish/v1/',
            action: 'Network discovery via DHCP and mDNS'
        },
        {
            name: 'Initial Authentication',
            duration: 800,
            icon: '🔐',
            details: 'Connecting with OEM default credentials for initial setup',
            redfish: '/redfish/v1/SessionService/Sessions',
            action: 'POST session creation with temporary credentials'
        },
        {
            name: 'Security Hardening',
            duration: 1500,
            icon: '🛡️',
            details: 'Applying security baseline configuration',
            redfish: '/redfish/v1/AccountService',
            action: 'PATCH to enforce strong password policy'
        },
        {
            name: 'Certificate Installation',
            duration: 1200,
            icon: '📜',
            details: 'Installing enterprise CA certificate for TLS',
            redfish: '/redfish/v1/CertificateService/CertificateLocations',
            action: 'POST certificate installation'
        },
        {
            name: 'BIOS Configuration',
            duration: 2000,
            icon: '⚙️',
            details: 'Configuring secure boot and TPM settings',
            redfish: '/redfish/v1/Systems/1/Bios/Settings',
            action: 'PATCH UEFI security configuration'
        },
        {
            name: 'Monitoring Setup',
            duration: 1000,
            icon: '📊',
            details: 'Registering with datacenter management platform',
            redfish: '/redfish/v1/EventService/Subscriptions',
            action: 'POST event subscription for DCIM integration'
        }
    ];

    let currentStep = 0;

    function runProvisioningStep() {
        if (currentStep >= provisioningSteps.length) {
            showProvisioningComplete();
            return;
        }

        const step = provisioningSteps[currentStep];

        resultDiv.innerHTML = `
            <div class="provisioning-simulation">
                <div class="provisioning-header">
                    <h4>🏭 BMC Provisioning Automation</h4>
                    <div class="progress-info">Step ${currentStep + 1} of ${provisioningSteps.length}</div>
                </div>

                <div class="current-provisioning-step">
                    <div class="step-visual">
                        <div class="step-icon-large">${step.icon}</div>
                        <div class="spinner"></div>
                    </div>
                    <div class="step-details">
                        <h5>${step.name}</h5>
                        <p>${step.details}</p>

                        <div class="redfish-api-call">
                            <h6>🔌 RedFish API Call:</h6>
                            <div class="api-endpoint">
                                <code>${step.redfish}</code>
                            </div>
                            <div class="api-description">${step.action}</div>
                        </div>
                    </div>
                </div>

                <div class="provisioning-progress-bar">
                    <div class="progress-fill" style="width: ${(currentStep / provisioningSteps.length) * 100}%"></div>
                </div>

                <div class="provisioning-log">
                    <h6>Provisioning Log:</h6>
                    <div class="log-entries">
                        ${provisioningSteps.slice(0, currentStep + 1).map((s, i) => `
                            <div class="log-entry ${i === currentStep ? 'current' : 'completed'}">
                                <span class="log-timestamp">${new Date().toLocaleTimeString()}</span>
                                <span class="log-message">${s.icon} ${s.name} ${i < currentStep ? '✅' : '⏳'}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => {
            currentStep++;
            runProvisioningStep();
        }, step.duration);
    }

    runProvisioningStep();
}

function showProvisioningComplete() {
    const resultDiv = document.getElementById('bmc-demo-result');

    resultDiv.innerHTML = `
        <div class="provisioning-complete">
            <div class="success-header">
                <div class="success-icon">✅</div>
                <h4>BMC Provisioning Completed Successfully!</h4>
            </div>

            <div class="provisioning-summary">
                <div class="summary-section">
                    <h5>🔒 Security Configuration Applied:</h5>
                    <ul class="security-checklist">
                        <li>✅ Default credentials changed</li>
                        <li>✅ TLS 1.3 encryption enforced</li>
                        <li>✅ Certificate-based authentication</li>
                        <li>✅ RBAC policies configured</li>
                        <li>✅ Audit logging enabled</li>
                        <li>✅ Secure boot activated</li>
                        <li>✅ TPM enabled for attestation</li>
                        <li>✅ Network access restrictions applied</li>
                    </ul>
                </div>

                <div class="summary-section">
                    <h5>📊 BMC Status Dashboard:</h5>
                    <div class="status-grid">
                        <div class="status-item">
                            <span class="status-label">Firmware Version:</span>
                            <span class="status-value">2.14.0-secure</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Security State:</span>
                            <span class="status-value success">Hardened</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Network Access:</span>
                            <span class="status-value">Management VLAN Only</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Monitoring:</span>
                            <span class="status-value success">Active</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="next-actions">
                <h5>🚀 Server Ready for Production Deployment</h5>
                <div class="action-buttons">
                    <button onclick="exploreRedfishSecurity()" class="demo-button">🔐 Explore RedFish Security</button>
                    <button onclick="demonstrateAssetManagement()" class="demo-button">📊 Asset Management</button>
                </div>
            </div>
        </div>
    `;
}

// =============================================================================
// REDFISH SECURITY EXPLORATION
// =============================================================================

function exploreRedfishSecurity() {
    const resultDiv = document.getElementById('bmc-demo-result');

    resultDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔐 Loading RedFish security demonstration...</p>
        </div>
    `;

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="redfish-security">
                <div class="redfish-header">
                    <h4>🔐 RedFish API Security Deep Dive</h4>
                    <p>Comprehensive security features and best practices</p>
                </div>

                <div class="security-categories">
                    <div class="security-category">
                        <h5>🔒 Authentication & Authorization</h5>

                        <div class="api-example">
                            <h6>Session-based Authentication:</h6>
                            <div class="api-call">
                                <div class="http-method post">POST</div>
                                <code>/redfish/v1/SessionService/Sessions</code>
                            </div>
                            <div class="json-payload">
{
  "UserName": "admin",
  "Password": "SecureP@ssw0rd!",
  "Oem": {
    "Dell": {
      "MFAToken": "123456"
    }
  }
}
                            </div>
                            <div class="response-example">
                                <strong>Response Headers:</strong><br>
                                <code>X-Auth-Token: 1a2b3c4d5e6f7890abcdef</code><br>
                                <code>Set-Cookie: SessionToken=xyz123; HttpOnly; Secure</code>
                            </div>
                        </div>

                        <div class="security-feature">
                            <h6>🎯 Role-Based Access Control (RBAC):</h6>
                            <div class="rbac-example">
                                <div class="role-definition">
                                    <strong>Predefined Roles:</strong><br>
                                    • <span class="role-badge admin">Administrator</span> Full system control<br>
                                    • <span class="role-badge operator">Operator</span> System operations<br>
                                    • <span class="role-badge readonly">ReadOnly</span> Monitoring only<br>
                                    • <span class="role-badge oem">OEM</span> Vendor-specific access
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="security-category">
                        <h5>🌐 Transport Security</h5>

                        <div class="tls-configuration">
                            <h6>🔒 TLS Configuration:</h6>
                            <div class="config-grid">
                                <div class="config-item">
                                    <strong>Protocol:</strong> TLS 1.3 (mandatory)
                                </div>
                                <div class="config-item">
                                    <strong>Cipher Suites:</strong> AES-256-GCM, ChaCha20-Poly1305
                                </div>
                                <div class="config-item">
                                    <strong>Key Exchange:</strong> ECDHE with P-256/P-384
                                </div>
                                <div class="config-item">
                                    <strong>Certificate Validation:</strong> Extended validation (EV)
                                </div>
                            </div>
                        </div>

                        <div class="certificate-example">
                            <h6>📜 Certificate Management:</h6>
                            <div class="api-call">
                                <div class="http-method get">GET</div>
                                <code>/redfish/v1/CertificateService/CertificateLocations</code>
                            </div>
                            <div class="cert-details">
                                <strong>Certificate Types:</strong><br>
                                • HTTPS Server Certificate<br>
                                • Client Authentication Certificate<br>
                                • CA Trust Store Certificates<br>
                                • LDAP/AD Integration Certificates
                            </div>
                        </div>
                    </div>

                    <div class="security-category">
                        <h5>📊 Security Monitoring</h5>

                        <div class="monitoring-example">
                            <h6>🔍 Event Subscription for Security Events:</h6>
                            <div class="api-call">
                                <div class="http-method post">POST</div>
                                <code>/redfish/v1/EventService/Subscriptions</code>
                            </div>
                            <div class="json-payload">
{
  "Name": "SecurityEventMonitor",
  "Destination": "https://siem.datacenter.com/redfish-events",
  "EventTypes": [
    "Alert",
    "StatusChange"
  ],
  "MessageIds": [
    "SecurityEvent.1.0.AuthenticationFailure",
    "SecurityEvent.1.0.UnauthorizedAccess",
    "SecurityEvent.1.0.ConfigurationChanged"
  ]
}
                            </div>
                        </div>

                        <div class="security-events">
                            <h6>⚠️ Security Event Examples:</h6>
                            <div class="event-log">
                                <div class="event-entry critical">
                                    <span class="event-time">2024-01-15T14:30:22Z</span>
                                    <span class="event-type">AuthenticationFailure</span>
                                    <span class="event-details">Failed login attempt from 192.168.1.100</span>
                                </div>
                                <div class="event-entry warning">
                                    <span class="event-time">2024-01-15T14:25:15Z</span>
                                    <span class="event-type">ConfigurationChanged</span>
                                    <span class="event-details">BIOS secure boot settings modified</span>
                                </div>
                                <div class="event-entry info">
                                    <span class="event-time">2024-01-15T14:20:08Z</span>
                                    <span class="event-type">SessionCreated</span>
                                    <span class="event-details">Administrator login successful</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="security-demo-actions">
                    <button onclick="simulateAuthenticationFlow()" class="demo-button">🔑 Authentication Flow</button>
                    <button onclick="testAccessControl()" class="demo-button">🛡️ Access Control Test</button>
                    <button onclick="monitorSecurityEvents()" class="demo-button">📊 Security Monitoring</button>
                </div>
            </div>
        `;
    }, 2000);
}

// =============================================================================
// ASSET MANAGEMENT DEMONSTRATION
// =============================================================================

function demonstrateAssetManagement() {
    const resultDiv = document.getElementById('bmc-demo-result');

    resultDiv.innerHTML = `
        <div name="demo-loading">
            <div class="spinner"></div>
            <p>📊 Loading datacenter asset management...</p>
        </div>
    `;

    setTimeout(() => {
        const assetData = generateAssetData();

        resultDiv.innerHTML = `
            <div class="asset-management">
                <div class="asset-header">
                    <h4>📊 DataCenter Asset Management</h4>
                    <p>Comprehensive hardware inventory and lifecycle management</p>
                </div>

                <div class="asset-dashboard">
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <div class="stat-number">${assetData.totalServers}</div>
                            <div class="stat-label">Total Servers</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${assetData.activeServers}</div>
                            <div class="stat-label">Active Servers</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${assetData.healthyPercent}%</div>
                            <div class="stat-label">Health Status</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${assetData.compliancePercent}%</div>
                            <div class="stat-label">Compliance</div>
                        </div>
                    </div>
                </div>

                <div class="asset-inventory">
                    <h5>🏭 Server Inventory (Sample)</h5>
                    <div class="inventory-table">
                        <div class="table-header">
                            <div class="col-hostname">Hostname</div>
                            <div class="col-model">Model</div>
                            <div class="col-bmc">BMC Version</div>
                            <div class="col-status">Status</div>
                            <div class="col-compliance">Compliance</div>
                            <div class="col-actions">Actions</div>
                        </div>
                        ${generateInventoryRows(assetData.servers)}
                    </div>
                </div>

                <div class="asset-operations">
                    <h5>⚙️ Bulk Operations</h5>
                    <div class="operation-grid">
                        <div class="operation-card">
                            <h6>🔄 Firmware Updates</h6>
                            <p>Schedule BMC and BIOS firmware updates across selected servers</p>
                            <div class="api-example-mini">
                                <code>PATCH /redfish/v1/UpdateService</code>
                            </div>
                            <button onclick="simulateFirmwareUpdate()" class="demo-button mini">Simulate Update</button>
                        </div>

                        <div class="operation-card">
                            <h6>🔐 Security Audit</h6>
                            <p>Scan for security misconfigurations and compliance violations</p>
                            <div class="api-example-mini">
                                <code>GET /redfish/v1/AccountService</code>
                            </div>
                            <button onclick="performSecurityAudit()" class="demo-button mini">Run Audit</button>
                        </div>

                        <div class="operation-card">
                            <h6>📊 Health Check</h6>
                            <p>Comprehensive hardware health assessment</p>
                            <div class="api-example-mini">
                                <code>GET /redfish/v1/Chassis/{id}/Thermal</code>
                            </div>
                            <button onclick="runHealthCheck()" class="demo-button mini">Health Check</button>
                        </div>

                        <div class="operation-card">
                            <h6>⚡ Power Management</h6>
                            <p>Datacenter power control and energy optimization</p>
                            <div class="api-example-mini">
                                <code>POST /redfish/v1/Chassis/{id}/Actions</code>
                            </div>
                            <button onclick="managePower()" class="demo-button mini">Power Control</button>
                        </div>
                    </div>
                </div>

                <div class="compliance-dashboard">
                    <h5>📋 Compliance Dashboard</h5>
                    <div class="compliance-checks">
                        <div class="compliance-item passed">
                            <span class="check-icon">✅</span>
                            <span class="check-name">Strong Authentication</span>
                            <span class="check-result">98% Compliant</span>
                        </div>
                        <div class="compliance-item warning">
                            <span class="check-icon">⚠️</span>
                            <span class="check-name">Firmware Currency</span>
                            <span class="check-result">85% Compliant</span>
                        </div>
                        <div class="compliance-item passed">
                            <span class="check-icon">✅</span>
                            <span class="check-name">TLS Configuration</span>
                            <span class="check-result">100% Compliant</span>
                        </div>
                        <div class="compliance-item failed">
                            <span class="check-icon">❌</span>
                            <span class="check-name">Certificate Expiry</span>
                            <span class="check-result">12% Non-Compliant</span>
                        </div>
                    </div>
                </div>

                <div class="asset-demo-actions">
                    <button onclick="showLifecycleManagement()" class="demo-button">📅 Lifecycle Management</button>
                    <button onclick="demonstrateAutomation()" class="demo-button">🤖 Automation Workflows</button>
                </div>
            </div>
        `;
    }, 2000);
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateAssetData() {
    return {
        totalServers: 2847,
        activeServers: 2834,
        healthyPercent: 97,
        compliancePercent: 89,
        servers: [
            { hostname: 'web-01.dc1.example.com', model: 'Dell PowerEdge R750', bmc: '5.10.50.00', status: 'healthy', compliance: 'compliant' },
            { hostname: 'db-03.dc1.example.com', model: 'HPE ProLiant DL380', bmc: '2.44.0', status: 'warning', compliance: 'warning' },
            { hostname: 'app-12.dc2.example.com', model: 'Supermicro SYS-2029P', bmc: '1.73.23', status: 'healthy', compliance: 'compliant' },
            { hostname: 'cache-07.dc1.example.com', model: 'Dell PowerEdge R640', bmc: '5.10.50.00', status: 'critical', compliance: 'non-compliant' },
            { hostname: 'compute-25.dc3.example.com', model: 'Lenovo ThinkSystem SR650', bmc: '3.30.0', status: 'healthy', compliance: 'compliant' }
        ]
    };
}

function generateInventoryRows(servers) {
    return servers.map(server => `
        <div class="table-row">
            <div class="col-hostname">
                <div class="hostname">${server.hostname}</div>
                <div class="location">Rack 15, Unit 8</div>
            </div>
            <div class="col-model">${server.model}</div>
            <div class="col-bmc">
                <span class="version">${server.bmc}</span>
                <span class="update-available">⬆️</span>
            </div>
            <div class="col-status">
                <span class="status-badge ${server.status}">${server.status}</span>
            </div>
            <div class="col-compliance">
                <span class="compliance-badge ${server.compliance}">${server.compliance}</span>
            </div>
            <div class="col-actions">
                <button class="action-button" onclick="inspectServer('${server.hostname}')">🔍</button>
                <button class="action-button" onclick="configureServer('${server.hostname}')">⚙️</button>
            </div>
        </div>
    `).join('');
}

function updateProgress(demoId, completed) {
    localStorage.setItem(`hw_security_progress_${demoId}`, completed);
    console.log(`Progress updated: ${demoId} = ${completed}`);
}

// Placeholder functions for additional demos
function simulateAuthenticationFlow() { showDeprioritizedMessage('Authentication Flow', 'Interactive authentication protocol demonstration coming soon'); }
function testAccessControl() { showDeprioritizedMessage('Access Control Test', 'RBAC testing and policy validation demo in development'); }
function monitorSecurityEvents() { showDeprioritizedMessage('Security Monitoring', 'Real-time security event correlation coming soon'); }
function simulateFirmwareUpdate() { showDeprioritizedMessage('Firmware Update', 'Automated firmware deployment simulation in development'); }
function performSecurityAudit() { showDeprioritizedMessage('Security Audit', 'Comprehensive security scanning demo coming soon'); }
function runHealthCheck() { showDeprioritizedMessage('Health Check', 'Hardware health assessment automation in development'); }
function managePower() { showDeprioritizedMessage('Power Management', 'Datacenter power control demonstration coming soon'); }
function showLifecycleManagement() { showDeprioritizedMessage('Lifecycle Management', 'Asset lifecycle tracking and automation coming soon'); }
function demonstrateAutomation() { showDeprioritizedMessage('Automation Workflows', 'Infrastructure as code demonstrations in development'); }
function inspectServer(hostname) { showDeprioritizedMessage('Server Inspection', `Detailed inspection of ${hostname} coming soon`); }
function configureServer(hostname) { showDeprioritizedMessage('Server Configuration', `Configuration management for ${hostname} in development`); }
function showAttackSimulation() { showDeprioritizedMessage('Attack Simulation', 'Red team vs blue team BMC security scenarios coming soon'); }
function startDatacenterTour() { showDeprioritizedMessage('DataCenter Tour', 'Complete datacenter security walkthrough in development'); }

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
                <p><small>BMC provisioning, RedFish security, and asset management overviews are fully available!</small></p>
            </div>
            <div class="modal-footer">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="demo-button">Got it</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}