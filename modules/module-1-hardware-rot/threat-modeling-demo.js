// Threat Modeling Demo Functions for DataCenter Hardware Security
// Educational demonstrations of threat analysis and security assessment

// Boot Threats Exploration
function exploreBootThreats() {
    const resultContainer = createResultContainer('boot-threats-result');
    resultContainer.innerHTML = `
        <div class="demo-header">
            <h4>🥾 Boot Process Threat Analysis</h4>
            <p>Analyzing potential attack vectors during system startup</p>
        </div>

        <div class="threat-analysis">
            <div class="threat-category">
                <h5>⚠️ Pre-Boot Threats</h5>
                <ul>
                    <li><strong>Supply Chain Attacks:</strong> Compromised hardware or firmware</li>
                    <li><strong>Physical Access:</strong> Hardware implants or modifications</li>
                    <li><strong>UEFI Rootkits:</strong> Persistent boot-level malware</li>
                </ul>
            </div>

            <div class="threat-category">
                <h5>⚡ Boot Process Attacks</h5>
                <ul>
                    <li><strong>Secure Boot Bypass:</strong> Certificate manipulation</li>
                    <li><strong>Firmware Downgrade:</strong> Rollback to vulnerable versions</li>
                    <li><strong>Boot Parameter Injection:</strong> Malicious configuration</li>
                </ul>
            </div>

            <div class="threat-mitigation">
                <h5>🛡️ Mitigation Strategies</h5>
                <ul>
                    <li>Hardware Root of Trust (RoT) implementation</li>
                    <li>Cryptographic boot verification chains</li>
                    <li>Anti-rollback protection mechanisms</li>
                    <li>Continuous firmware integrity monitoring</li>
                </ul>
            </div>
        </div>
    `;
    resultContainer.style.display = 'block';
}

// Multi-Tenant Threat Analysis
function exploreMultiTenantThreats() {
    const resultContainer = createResultContainer('multi-tenant-result');
    resultContainer.innerHTML = `
        <div class="demo-header">
            <h4>🏢 Multi-Tenant Security Threats</h4>
            <p>DataCenter isolation and tenant separation vulnerabilities</p>
        </div>

        <div class="threat-analysis">
            <div class="threat-category">
                <h5>🔓 Isolation Failures</h5>
                <ul>
                    <li><strong>Memory Bleed:</strong> Cross-tenant memory access</li>
                    <li><strong>Cache Side-Channels:</strong> Shared cache exploitation</li>
                    <li><strong>Hypervisor Escape:</strong> VM-to-host breakout</li>
                    <li><strong>Network Segmentation Bypass:</strong> VLAN hopping</li>
                </ul>
            </div>

            <div class="threat-category">
                <h5>⚡ Resource Contention Attacks</h5>
                <ul>
                    <li><strong>CPU Exhaustion:</strong> Monopolizing compute resources</li>
                    <li><strong>Memory Pressure:</strong> Forcing memory swapping</li>
                    <li><strong>Storage I/O Flooding:</strong> Disk performance degradation</li>
                    <li><strong>Network Bandwidth Starvation:</strong> Traffic congestion</li>
                </ul>
            </div>

            <div class="security-controls">
                <h5>🔐 Security Controls</h5>
                <ul>
                    <li>Hardware-enforced memory isolation</li>
                    <li>CPU resource quotas and limits</li>
                    <li>Network micro-segmentation</li>
                    <li>Storage encryption and access controls</li>
                </ul>
            </div>
        </div>
    `;
    resultContainer.style.display = 'block';
}

// Boot Attack Simulation
function simulateBootAttack() {
    const resultContainer = createResultContainer('boot-attack-result');
    resultContainer.innerHTML = `
        <div class="demo-header">
            <h4>⚔️ Boot Attack Simulation</h4>
            <p>Interactive demonstration of boot-time attack scenarios</p>
        </div>

        <div class="simulation-flow">
            <div class="attack-step">
                <h5>1️⃣ Attack Vector: UEFI Firmware Modification</h5>
                <div class="step-details">
                    <p><strong>Scenario:</strong> Attacker gains physical access to server during maintenance</p>
                    <p><strong>Method:</strong> SPI flash programmer used to modify UEFI firmware</p>
                    <p><strong>Payload:</strong> Persistent backdoor installed in firmware</p>
                </div>
            </div>

            <div class="attack-step">
                <h5>2️⃣ Detection Challenges</h5>
                <div class="step-details">
                    <p><strong>Stealth:</strong> Firmware-level rootkit below OS visibility</p>
                    <p><strong>Persistence:</strong> Survives OS reinstalls and disk replacement</p>
                    <p><strong>Network Access:</strong> Can communicate before OS network stack loads</p>
                </div>
            </div>

            <div class="defense-response">
                <h5>🛡️ Defense Response</h5>
                <div class="response-actions">
                    <p><strong>Intel Boot Guard:</strong> Would detect firmware modification</p>
                    <p><strong>TPM Attestation:</strong> Reports unexpected firmware measurements</p>
                    <p><strong>Hardware Root of Trust:</strong> Prevents unauthorized firmware execution</p>
                </div>
            </div>
        </div>
    `;
    resultContainer.style.display = 'block';
}

// Tenant Isolation Testing
function exploreTenantIsolation() {
    const resultContainer = createResultContainer('isolation-test-result');
    resultContainer.innerHTML = `
        <div class="demo-header">
            <h4>🔒 Tenant Isolation Testing Framework</h4>
            <p>Comprehensive isolation validation and testing methodology</p>
        </div>

        <div class="isolation-tests">
            <div class="test-category">
                <h5>💾 Memory Isolation Tests</h5>
                <ul>
                    <li><strong>Page Table Isolation:</strong> Verify address space separation</li>
                    <li><strong>Cache Line Testing:</strong> Ensure L1/L2/L3 cache isolation</li>
                    <li><strong>NUMA Node Verification:</strong> Check memory locality enforcement</li>
                    <li><strong>DMA Protection:</strong> Validate IOMMU isolation</li>
                </ul>
            </div>

            <div class="test-category">
                <h5>⚡ CPU Resource Tests</h5>
                <ul>
                    <li><strong>Core Affinity:</strong> CPU binding and isolation verification</li>
                    <li><strong>Scheduler Fairness:</strong> Resource allocation testing</li>
                    <li><strong>Performance Counter Access:</strong> Hardware counter isolation</li>
                    <li><strong>Speculative Execution:</strong> Side-channel leak testing</li>
                </ul>
            </div>

            <div class="test-results">
                <h5>📊 Test Results Dashboard</h5>
                <div class="results-grid">
                    <div class="result-item">Memory Isolation: ✅ PASS</div>
                    <div class="result-item">CPU Isolation: ✅ PASS</div>
                    <div class="result-item">Network Segmentation: ✅ PASS</div>
                    <div class="result-item">Storage Access Control: ⚠️ REVIEW</div>
                </div>
            </div>
        </div>
    `;
    resultContainer.style.display = 'block';
}

// Resource Allocation Analysis
function analyzeResourceAllocation() {
    const resultContainer = createResultContainer('resource-analysis-result');
    resultContainer.innerHTML = `
        <div class="demo-header">
            <h4>📊 DataCenter Resource Allocation Analysis</h4>
            <p>Security-focused resource management and monitoring</p>
        </div>

        <div class="resource-metrics">
            <div class="metric-category">
                <h5>💻 Compute Resources</h5>
                <div class="metrics-grid">
                    <div class="metric">CPU Cores: 64/128 allocated</div>
                    <div class="metric">Memory: 256GB/512GB allocated</div>
                    <div class="metric">Cache: L3 partitioned per tenant</div>
                    <div class="metric">Performance Counters: Isolated access</div>
                </div>
            </div>

            <div class="metric-category">
                <h5>🌐 Network Resources</h5>
                <div class="metrics-grid">
                    <div class="metric">Bandwidth: 10Gb/s per tenant</div>
                    <div class="metric">VLANs: Isolated per workload</div>
                    <div class="metric">Firewall Rules: 2,847 active</div>
                    <div class="metric">DDoS Protection: Enabled</div>
                </div>
            </div>

            <div class="security-monitoring">
                <h5>🔍 Security Monitoring</h5>
                <ul>
                    <li><strong>Resource Anomaly Detection:</strong> Unusual allocation patterns</li>
                    <li><strong>Performance Baseline:</strong> Expected vs actual resource usage</li>
                    <li><strong>Isolation Verification:</strong> Continuous tenant separation checks</li>
                    <li><strong>Attack Surface Analysis:</strong> Resource exposure assessment</li>
                </ul>
            </div>
        </div>
    `;
    resultContainer.style.display = 'block';
}

// Network Security Testing
function testNetworkSecurity() {
    const resultContainer = createResultContainer('network-security-result');
    resultContainer.innerHTML = `
        <div class="demo-header">
            <h4>🌐 DataCenter Network Security Assessment</h4>
            <p>Comprehensive network isolation and security validation</p>
        </div>

        <div class="network-analysis">
            <div class="security-layer">
                <h5>🔒 Physical Layer Security</h5>
                <ul>
                    <li><strong>Cable Security:</strong> Physical access controls and monitoring</li>
                    <li><strong>Switch Security:</strong> Management interface protection</li>
                    <li><strong>Port Security:</strong> MAC address filtering and limits</li>
                    <li><strong>Network Taps:</strong> Detection of unauthorized connections</li>
                </ul>
            </div>

            <div class="security-layer">
                <h5>📡 Protocol Layer Security</h5>
                <ul>
                    <li><strong>VLAN Isolation:</strong> Tenant network separation</li>
                    <li><strong>VPN Tunneling:</strong> Encrypted inter-site communication</li>
                    <li><strong>DNS Security:</strong> Secure name resolution</li>
                    <li><strong>Time Synchronization:</strong> NTP security hardening</li>
                </ul>
            </div>

            <div class="monitoring-tools">
                <h5>📊 Network Monitoring Tools</h5>
                <div class="tools-grid">
                    <div class="tool-item">
                        <strong>Traffic Analysis:</strong> Deep packet inspection
                    </div>
                    <div class="tool-item">
                        <strong>Intrusion Detection:</strong> Signature and anomaly-based
                    </div>
                    <div class="tool-item">
                        <strong>Flow Monitoring:</strong> NetFlow/sFlow analysis
                    </div>
                    <div class="tool-item">
                        <strong>Security Events:</strong> SIEM integration
                    </div>
                </div>
            </div>
        </div>
    `;
    resultContainer.style.display = 'block';
}

// Complete Threat Assessment
function startThreatAssessment() {
    const resultContainer = createResultContainer('threat-assessment-result');
    resultContainer.innerHTML = `
        <div class="demo-header">
            <h4>🎯 Comprehensive DataCenter Threat Assessment</h4>
            <p>Complete security evaluation and risk analysis framework</p>
        </div>

        <div class="assessment-framework">
            <div class="assessment-phase">
                <h5>1️⃣ Asset Identification</h5>
                <ul>
                    <li>Hardware inventory and classification</li>
                    <li>Software stack mapping</li>
                    <li>Data flow analysis</li>
                    <li>Critical dependency identification</li>
                </ul>
            </div>

            <div class="assessment-phase">
                <h5>2️⃣ Threat Modeling</h5>
                <ul>
                    <li>Attack surface enumeration</li>
                    <li>Threat actor profiling</li>
                    <li>Attack vector analysis</li>
                    <li>Impact assessment</li>
                </ul>
            </div>

            <div class="assessment-phase">
                <h5>3️⃣ Risk Analysis</h5>
                <ul>
                    <li>Vulnerability prioritization</li>
                    <li>Exploitation likelihood</li>
                    <li>Business impact scoring</li>
                    <li>Risk matrix development</li>
                </ul>
            </div>

            <div class="assessment-results">
                <h5>📋 Assessment Summary</h5>
                <div class="risk-summary">
                    <div class="risk-level high">Critical: 3 findings</div>
                    <div class="risk-level medium">High: 7 findings</div>
                    <div class="risk-level low">Medium: 15 findings</div>
                    <div class="risk-level info">Low: 23 findings</div>
                </div>

                <div class="recommendations">
                    <h6>🔧 Priority Recommendations</h6>
                    <ol>
                        <li>Implement hardware-based attestation</li>
                        <li>Enhance multi-tenant isolation controls</li>
                        <li>Deploy advanced threat monitoring</li>
                        <li>Strengthen supply chain verification</li>
                    </ol>
                </div>
            </div>
        </div>
    `;
    resultContainer.style.display = 'block';
}

// Utility function to create or get result container
function createResultContainer(containerId) {
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = 'demo-result';
        container.style.display = 'none';

        // Append to the main content area
        const mainContent = document.querySelector('.main-content') || document.querySelector('.container') || document.body;
        mainContent.appendChild(container);
    }
    return container;
}

// Initialize demo functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Threat Modeling Demo loaded successfully');

    // Add CSS for demo results if not already present
    if (!document.getElementById('threat-demo-styles')) {
        const styles = document.createElement('style');
        styles.id = 'threat-demo-styles';
        styles.textContent = `
            .demo-result {
                margin: 20px 0;
                padding: 20px;
                border: 2px solid #2c3e50;
                border-radius: 8px;
                background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                animation: slideIn 0.5s ease-out;
            }

            .demo-header {
                border-bottom: 2px solid #3498db;
                padding-bottom: 10px;
                margin-bottom: 15px;
            }

            .threat-analysis, .isolation-tests, .resource-metrics, .network-analysis, .assessment-framework {
                display: grid;
                gap: 15px;
            }

            .threat-category, .test-category, .metric-category, .security-layer, .assessment-phase {
                background: white;
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid #3498db;
            }

            .metrics-grid, .results-grid, .tools-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 10px;
                margin-top: 10px;
            }

            .metric, .result-item, .tool-item {
                padding: 8px;
                background: #f8f9fa;
                border-radius: 4px;
                border-left: 3px solid #27ae60;
            }

            .risk-summary {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 10px;
                margin: 15px 0;
            }

            .risk-level {
                padding: 10px;
                text-align: center;
                border-radius: 6px;
                font-weight: bold;
            }

            .risk-level.high { background: #e74c3c; color: white; }
            .risk-level.medium { background: #f39c12; color: white; }
            .risk-level.low { background: #f1c40f; color: black; }
            .risk-level.info { background: #27ae60; color: white; }

            @keyframes slideIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(styles);
    }
});