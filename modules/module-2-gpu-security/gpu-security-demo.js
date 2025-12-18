// GPU Security Demo Functions

function generateRandomHex(length) {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function demonstrateConfidentialComputing() {
    const outputDiv = document.getElementById('gpu-security-demo-output');

    // Show loading state
    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔒 Initializing NVIDIA Confidential Computing demonstration...</p>
        </div>
    `;

    setTimeout(() => {
        const ccData = generateConfidentialComputingData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🔒 NVIDIA H100 Confidential Computing</h4>

                <div class="cc-architecture">
                    <div class="cc-overview">
                        <h5>🏗️ Confidential Computing Architecture</h5>
                        <div class="architecture-diagram">
                            <div class="cc-layer">
                                <div class="layer-title">Application Layer</div>
                                <div class="layer-components">
                                    <div class="component secure">Encrypted AI Models</div>
                                    <div class="component secure">Protected Training Data</div>
                                    <div class="component secure">Confidential Inference</div>
                                </div>
                                <div class="layer-protection">🔐 Memory Encryption: AES-256</div>
                            </div>
                            <div class="cc-arrow">↓ Attestation & Key Exchange</div>
                            <div class="cc-layer">
                                <div class="layer-title">NVIDIA GPU Driver</div>
                                <div class="layer-components">
                                    <div class="component secure">Authenticated Driver</div>
                                    <div class="component secure">Secure Channel</div>
                                    <div class="component secure">Key Management</div>
                                </div>
                                <div class="layer-protection">🛡️ Hardware Root of Trust</div>
                            </div>
                            <div class="cc-arrow">↓ Hardware Interface</div>
                            <div class="cc-layer">
                                <div class="layer-title">H100 Hardware TEE</div>
                                <div class="layer-components">
                                    <div class="component secure">Secure Processor</div>
                                    <div class="component secure">Hardware Encryption</div>
                                    <div class="component secure">Attestation Engine</div>
                                </div>
                                <div class="layer-protection">🔒 Hardware Isolation</div>
                            </div>
                        </div>
                    </div>

                    <div class="cc-setup">
                        <h5>⚙️ Confidential Computing Setup</h5>
                        <div class="setup-steps">
                            <div class="setup-step">
                                <h6>1. 🔧 Enable CC Mode</h6>
                                <pre class="setup-command">
# Check current GPU status
$ nvidia-smi --query-gpu=name,cc.mode --format=csv
name, cc.mode
NVIDIA H100 PCIe 80GB, Disabled

# Enable Confidential Computing mode
$ nvidia-smi -cc 1
Confidential compute mode enabled. Please reboot to take effect.

# After reboot - verify CC mode
$ nvidia-smi --query-gpu=cc.mode --format=csv
cc.mode
Enabled
                                </pre>
                                <div class="step-status success">✅ CC Mode: Enabled</div>
                            </div>

                            <div class="setup-step">
                                <h6>2. 🔑 Generate Attestation Report</h6>
                                <pre class="setup-command">
# Generate attestation report using nvidia-ml-py
import pynvml
import base64
import hashlib

pynvml.nvmlInit()
handle = pynvml.nvmlDeviceGetHandleByIndex(0)

# Generate attestation report
attestation_report = pynvml.nvmlDeviceGetConfComputeGpuAttestationReport(handle)

# Attestation report structure:
report_data = {
    'version': '${ccData.attestation.version}',
    'gpu_uuid': '${ccData.attestation.gpu_uuid}',
    'firmware_version': '${ccData.attestation.firmware_version}',
    'driver_version': '${ccData.attestation.driver_version}',
    'report_size': len(attestation_report),
    'report_hash': hashlib.sha256(attestation_report).hexdigest()[:16] + '...',
    'timestamp': '${ccData.attestation.timestamp}'
}

print("Attestation Report Generated:")
for key, value in report_data.items():
    print(f"  {key}: {value}")
                                </pre>
                                <div class="step-status success">✅ Attestation: ${ccData.attestation.status}</div>
                            </div>

                            <div class="setup-step">
                                <h6>3. 🔐 Establish Secure Session</h6>
                                <pre class="setup-command">
# Verify attestation with remote service
def verify_attestation_remote(report, nvidia_root_cert):
    """Verify GPU attestation with NVIDIA verification service"""

    verification_request = {
        'attestation_report': base64.b64encode(report).decode(),
        'nonce': base64.b64encode(os.urandom(32)).decode(),
        'timestamp': int(time.time())
    }

    response = requests.post(
        'https://nv-attestation-service.nvidia.com/v1/verify',
        json=verification_request,
        headers={'Authorization': f'Bearer {api_token}'}
    )

    if response.status_code == 200:
        verification_result = response.json()
        return verification_result['verified'], verification_result['details']
    else:
        return False, f"Verification failed: {response.text}"

# Example verification response
verification_result = {
    'verified': True,
    'gpu_model': 'H100',
    'firmware_trusted': True,
    'cc_enabled': True,
    'trust_level': 'Hardware-Verified',
    'session_key': '${generateRandomHex(64)}'
}
                                </pre>
                                <div class="step-status success">✅ Session: Secure Channel Established</div>
                            </div>
                        </div>
                    </div>

                    <div class="cc-workload">
                        <h5>🧠 Confidential AI Workload Example</h5>
                        <div class="workload-details">
                            <div class="workload-scenario">
                                <h6>Scenario: Confidential Medical AI Model Training</h6>
                                <p><strong>Use Case:</strong> Train AI model on sensitive patient data with hardware-level protection</p>
                                <p><strong>Data:</strong> Encrypted medical imaging dataset (10TB)</p>
                                <p><strong>Model:</strong> Custom transformer architecture for diagnostic imaging</p>
                                <p><strong>Security Requirements:</strong> HIPAA compliance, zero-trust architecture</p>
                            </div>

                            <div class="workload-execution">
                                <h6>Secure Execution Environment</h6>
                                <div class="execution-metrics">
                                    <div class="metric-item">
                                        <span class="metric-label">Memory Encryption:</span>
                                        <span class="metric-value secure">AES-256-GCM Active</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Data Protection:</span>
                                        <span class="metric-value secure">Hardware TEE Isolation</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Model Security:</span>
                                        <span class="metric-value secure">Encrypted at Rest & Runtime</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Host Visibility:</span>
                                        <span class="metric-value secure">Zero Plaintext Exposure</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Attestation:</span>
                                        <span class="metric-value secure">Continuously Verified</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Performance Impact:</span>
                                        <span class="metric-value">&lt; ${ccData.workload.performanceImpact}% overhead</span>
                                    </div>
                                </div>

                                <div class="security-guarantees">
                                    <h6>🛡️ Security Guarantees</h6>
                                    <ul>
                                        <li><strong>Data Confidentiality:</strong> Training data never visible to host OS or hypervisor</li>
                                        <li><strong>Model Protection:</strong> AI model weights encrypted in GPU memory</li>
                                        <li><strong>Code Integrity:</strong> Training code protected by hardware attestation</li>
                                        <li><strong>Side-Channel Resistance:</strong> Hardware mitigations against timing attacks</li>
                                        <li><strong>Physical Security:</strong> Protection against physical memory attacks</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="workload-monitoring">
                                <h6>📊 Real-time Security Monitoring</h6>
                                <div class="monitoring-dashboard">
                                    ${ccData.workload.securityMetrics.map(metric => `
                                        <div class="security-metric ${metric.status}">
                                            <div class="metric-icon">${metric.icon}</div>
                                            <div class="metric-content">
                                                <div class="metric-name">${metric.name}</div>
                                                <div class="metric-value">${metric.value}</div>
                                                <div class="metric-trend">${metric.trend}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="enterprise-integration">
                        <h5>🏢 Enterprise Integration</h5>
                        <div class="integration-examples">
                            <div class="integration-tab">
                                <h6>Kubernetes Confidential Computing</h6>
                                <pre class="integration-code">
apiVersion: v1
kind: Pod
metadata:
  name: confidential-ai-training
  annotations:
    nvidia.com/confidential-compute: "required"
spec:
  containers:
  - name: ai-trainer
    image: nvcr.io/nvidia/pytorch:23.08-py3-cc
    resources:
      limits:
        nvidia.com/gpu: 1
    env:
    - name: NVIDIA_CONFIDENTIAL_COMPUTE
      value: "1"
    - name: CC_ATTESTATION_URL
      value: "https://attestation.company.com/verify"
    securityContext:
      privileged: true
      capabilities:
        add:
        - SYS_ADMIN  # Required for CC mode
  nodeSelector:
    nvidia.com/gpu.confidential-compute: "enabled"
  tolerations:
  - key: nvidia.com/gpu
    operator: Exists
    effect: NoSchedule
                                </pre>
                            </div>

                            <div class="integration-tab">
                                <h6>Cloud Provider Integration (AWS)</h6>
                                <pre class="integration-code">
# Terraform configuration for CC-enabled GPU instances
resource "aws_instance" "gpu_confidential_compute" {
  ami                    = "ami-0123456789abcdef0"  # NVIDIA CC-enabled AMI
  instance_type          = "p5.48xlarge"            # H100 instances
  key_name              = var.key_pair_name

  vpc_security_group_ids = [aws_security_group.gpu_cc.id]
  subnet_id             = aws_subnet.private.id

  # Enable confidential computing
  enclave_options {
    enabled = true
  }

  user_data = base64encode(templatefile("${path.module}/cc-setup.sh", {
    attestation_service = var.attestation_service_url
    api_key            = var.api_key
  }))

  tags = {
    Name = "gpu-confidential-compute"
    Environment = "production"
    Compliance = "hipaa-ready"
  }
}

# Security group for CC workloads
resource "aws_security_group" "gpu_cc" {
  name_prefix = "gpu-confidential-compute"
  vpc_id      = aws_vpc.main.id

  # Attestation service access
  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "NVIDIA attestation service"
  }

  # No inbound access except SSH (if needed)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.admin_cidr]
    description = "SSH access"
  }
}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 3000);
}

function generateConfidentialComputingData() {
    return {
        attestation: {
            version: '1.0',
            gpu_uuid: 'GPU-' + generateRandomHex(8) + '-' + generateRandomHex(4) + '-' + generateRandomHex(4) + '-' + generateRandomHex(4) + '-' + generateRandomHex(12),
            firmware_version: 'H100-CC-535.104.05',
            driver_version: '535.104.05',
            status: 'Verified',
            timestamp: new Date().toISOString()
        },
        workload: {
            performanceImpact: 3,
            securityMetrics: [
                {
                    name: 'Memory Encryption',
                    value: 'Active',
                    trend: 'Stable',
                    status: 'secure',
                    icon: '🔐'
                },
                {
                    name: 'Attestation Status',
                    value: 'Verified',
                    trend: 'Continuous',
                    status: 'secure',
                    icon: '✅'
                },
                {
                    name: 'Side-Channel Protection',
                    value: 'Hardware Enabled',
                    trend: 'Active',
                    status: 'secure',
                    icon: '🛡️'
                },
                {
                    name: 'Key Rotation',
                    value: 'Every 24h',
                    trend: 'Automated',
                    status: 'secure',
                    icon: '🔄'
                },
                {
                    name: 'Isolation Level',
                    value: 'Hardware TEE',
                    trend: 'Maximum',
                    status: 'secure',
                    icon: '🏰'
                },
                {
                    name: 'Performance',
                    value: '97% of baseline',
                    trend: 'Optimal',
                    status: 'good',
                    icon: '⚡'
                }
            ]
        }
    };
}

function simulateGPUAttack() {
    const outputDiv = document.getElementById('gpu-security-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>⚠️ Simulating GPU security attack scenarios...</p>
        </div>
    `;

    setTimeout(() => {
        const attackData = generateGPUAttackData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>⚠️ GPU Security Attack Simulation</h4>

                <div class="attack-scenarios">
                    <div class="attack-scenario">
                        <h5>🎯 Scenario 1: GPU Memory Extraction Attack</h5>
                        <div class="attack-details">
                            <div class="attack-description">
                                <p><strong>Threat Actor:</strong> Malicious cloud tenant with GPU access</p>
                                <p><strong>Attack Method:</strong> Attempt to extract AI model weights from GPU memory</p>
                                <p><strong>Target:</strong> Proprietary LLM model running on shared GPU infrastructure</p>
                                <p><strong>Objective:</strong> Steal valuable intellectual property (AI model parameters)</p>
                            </div>

                            <div class="attack-timeline">
                                <h6>⏱️ Attack Execution Timeline</h6>
                                <div class="timeline-events">
                                    ${attackData.memoryExtraction.timeline.map((event, index) => `
                                        <div class="timeline-event ${event.outcome}">
                                            <div class="event-time">T+${event.time}</div>
                                            <div class="event-action">${event.action}</div>
                                            <div class="event-result">${event.result}</div>
                                            <div class="event-impact">${event.impact}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="defense-analysis">
                                <h6>🛡️ Defense Mechanisms Activated</h6>
                                <div class="defense-results">
                                    ${attackData.memoryExtraction.defenses.map(defense => `
                                        <div class="defense-item ${defense.effectiveness}">
                                            <div class="defense-mechanism">${defense.mechanism}</div>
                                            <div class="defense-action">${defense.action}</div>
                                            <div class="defense-result">${defense.result}</div>
                                        </div>
                                    `).join('')}
                                </div>

                                <div class="attack-outcome">
                                    <h6>📊 Attack Outcome Assessment</h6>
                                    <div class="outcome-metrics">
                                        <div class="metric-success">
                                            <span>✅ Data Protected:</span>
                                            <span>Model weights remain encrypted and inaccessible</span>
                                        </div>
                                        <div class="metric-success">
                                            <span>✅ Detection Time:</span>
                                            <span>Attack detected within ${attackData.memoryExtraction.detectionTime}</span>
                                        </div>
                                        <div class="metric-success">
                                            <span>✅ Isolation:</span>
                                            <span>Malicious tenant automatically quarantined</span>
                                        </div>
                                        <div class="metric-info">
                                            <span>📊 Performance Impact:</span>
                                            <span>< 2% performance degradation during defense</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="attack-scenario">
                        <h5>💻 Scenario 2: GPU Driver Privilege Escalation</h5>
                        <div class="attack-details">
                            <div class="attack-description">
                                <p><strong>Threat Actor:</strong> Advanced Persistent Threat (APT) group</p>
                                <p><strong>Attack Method:</strong> Exploitation of GPU driver vulnerability</p>
                                <p><strong>Target:</strong> Enterprise datacenter with mixed GPU workloads</p>
                                <p><strong>Objective:</strong> Gain elevated privileges and persistent access</p>
                            </div>

                            <div class="vulnerability-details">
                                <h6>🔍 Simulated Vulnerability Details</h6>
                                <div class="vuln-info">
                                    <div class="vuln-item">
                                        <span class="vuln-label">CVE:</span>
                                        <span class="vuln-value">CVE-2024-XXXX (Simulated)</span>
                                    </div>
                                    <div class="vuln-item">
                                        <span class="vuln-label">CVSS Score:</span>
                                        <span class="vuln-value">8.8 (High)</span>
                                    </div>
                                    <div class="vuln-item">
                                        <span class="vuln-label">Attack Vector:</span>
                                        <span class="vuln-value">Local, Low Privilege Required</span>
                                    </div>
                                    <div class="vuln-item">
                                        <span class="vuln-label">Impact:</span>
                                        <span class="vuln-value">Complete System Compromise</span>
                                    </div>
                                </div>

                                <div class="exploit-chain">
                                    <h6>🔗 Exploit Chain Analysis</h6>
                                    ${attackData.privilegeEscalation.exploitChain.map((step, index) => `
                                        <div class="exploit-step">
                                            <div class="step-number">${index + 1}</div>
                                            <div class="step-content">
                                                <div class="step-title">${step.title}</div>
                                                <div class="step-description">${step.description}</div>
                                                <div class="step-mitigation">Mitigation: ${step.mitigation}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="incident-response">
                                <h6>🚨 Automated Incident Response</h6>
                                <div class="response-timeline">
                                    ${attackData.privilegeEscalation.incidentResponse.map(response => `
                                        <div class="response-action ${response.status}">
                                            <div class="response-time">T+${response.time}</div>
                                            <div class="response-system">${response.system}</div>
                                            <div class="response-action-desc">${response.action}</div>
                                            <div class="response-result">${response.result}</div>
                                        </div>
                                    `).join('')}
                                </div>

                                <div class="lessons-learned">
                                    <h6>📚 Key Security Insights</h6>
                                    <ul>
                                        <li><strong>Defense in Depth:</strong> Multiple security layers prevented complete compromise</li>
                                        <li><strong>Rapid Detection:</strong> Behavioral analysis detected anomalous GPU driver activity</li>
                                        <li><strong>Automated Response:</strong> SOAR platform enabled sub-minute containment</li>
                                        <li><strong>Firmware Integrity:</strong> Secure boot prevented persistent compromise</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="attack-scenario">
                        <h5>🔄 Scenario 3: Cross-Tenant GPU Data Leakage</h5>
                        <div class="attack-details">
                            <div class="attack-description">
                                <p><strong>Threat Actor:</strong> Malicious tenant in multi-tenant GPU environment</p>
                                <p><strong>Attack Method:</strong> Side-channel attack via shared GPU resources</p>
                                <p><strong>Target:</strong> Sensitive data from co-located tenant workloads</p>
                                <p><strong>Objective:</strong> Extract confidential information from other tenants</p>
                            </div>

                            <div class="side-channel-analysis">
                                <h6>📊 Side-Channel Attack Analysis</h6>
                                <div class="attack-vectors">
                                    ${attackData.crossTenantAttack.attackVectors.map(vector => `
                                        <div class="attack-vector">
                                            <div class="vector-name">${vector.name}</div>
                                            <div class="vector-description">${vector.description}</div>
                                            <div class="vector-success">Success Rate: ${vector.successRate}</div>
                                            <div class="vector-mitigation">Mitigation: ${vector.mitigation}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="isolation-verification">
                                <h6>🔒 Hardware Isolation Verification</h6>
                                <div class="isolation-tests">
                                    <div class="isolation-test passed">
                                        <span class="test-name">MIG Memory Isolation:</span>
                                        <span class="test-result">✅ Hardware boundaries enforced</span>
                                    </div>
                                    <div class="isolation-test passed">
                                        <span class="test-name">Cache Isolation:</span>
                                        <span class="test-result">✅ Separate L2 cache slices confirmed</span>
                                    </div>
                                    <div class="isolation-test passed">
                                        <span class="test-name">Compute Unit Isolation:</span>
                                        <span class="test-result">✅ Dedicated SM units per tenant</span>
                                    </div>
                                    <div class="isolation-test passed">
                                        <span class="test-name">Memory Scrubbing:</span>
                                        <span class="test-result">✅ Automatic memory sanitization between jobs</span>
                                    </div>
                                    <div class="isolation-test passed">
                                        <span class="test-name">Context Switching:</span>
                                        <span class="test-result">✅ Secure context isolation maintained</span>
                                    </div>
                                </div>

                                <div class="attack-prevention">
                                    <p><strong>Result:</strong> All cross-tenant attack vectors were successfully mitigated by hardware-level isolation mechanisms.</p>
                                    <p><strong>Key Protection:</strong> MIG instances provide hardware-guaranteed isolation that prevents data leakage between tenants.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="security-recommendations">
                    <h5>🛡️ Security Recommendations</h5>
                    <div class="recommendations-grid">
                        <div class="recommendation-category">
                            <h6>🔧 Hardware Configuration</h6>
                            <ul>
                                <li>Enable Confidential Computing mode for sensitive workloads</li>
                                <li>Use MIG instances for multi-tenant isolation</li>
                                <li>Implement hardware memory encryption</li>
                                <li>Enable secure boot and firmware verification</li>
                            </ul>
                        </div>
                        <div class="recommendation-category">
                            <h6>📊 Monitoring & Detection</h6>
                            <ul>
                                <li>Deploy GPU-specific EDR (Endpoint Detection & Response)</li>
                                <li>Monitor for anomalous GPU memory access patterns</li>
                                <li>Implement behavioral analysis for GPU workloads</li>
                                <li>Set up automated incident response workflows</li>
                            </ul>
                        </div>
                        <div class="recommendation-category">
                            <h6>🔐 Access Controls</h6>
                            <ul>
                                <li>Implement least-privilege GPU driver access</li>
                                <li>Regular GPU driver and firmware updates</li>
                                <li>Multi-factor authentication for GPU resource allocation</li>
                                <li>Strict tenant isolation policies in cloud environments</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 3500);
}

function generateGPUAttackData() {
    return {
        memoryExtraction: {
            detectionTime: "47 seconds",
            timeline: [
                {
                    time: "0s",
                    action: "Attacker allocates GPU memory for malicious kernel",
                    result: "Memory allocation successful",
                    impact: "Baseline access established",
                    outcome: "neutral"
                },
                {
                    time: "15s",
                    action: "Attempt to read adjacent memory regions",
                    result: "Hardware memory protection triggered",
                    impact: "Access denied by GPU MMU",
                    outcome: "blocked"
                },
                {
                    time: "30s",
                    action: "Try side-channel timing attack on GPU cache",
                    result: "Cache partitioning prevents information leakage",
                    impact: "No sensitive data extracted",
                    outcome: "blocked"
                },
                {
                    time: "45s",
                    action: "Attempt GPU memory dump via driver vulnerability",
                    result: "Secure boot prevents driver modification",
                    impact: "Attack vector neutralized",
                    outcome: "blocked"
                },
                {
                    time: "47s",
                    action: "Behavioral detection triggers security alert",
                    result: "Tenant automatically quarantined",
                    impact: "Attack fully contained",
                    outcome: "mitigated"
                }
            ],
            defenses: [
                {
                    mechanism: "Hardware Memory Protection",
                    action: "GPU MMU enforces memory boundaries",
                    result: "Prevented unauthorized memory access",
                    effectiveness: "effective"
                },
                {
                    mechanism: "Cache Isolation",
                    action: "Dedicated cache slices per workload",
                    result: "Blocked side-channel information leakage",
                    effectiveness: "effective"
                },
                {
                    mechanism: "Secure Boot",
                    action: "Firmware integrity verification",
                    result: "Prevented driver tampering",
                    effectiveness: "effective"
                },
                {
                    mechanism: "Behavioral Detection",
                    action: "ML-based anomaly detection",
                    result: "Rapid attack identification and response",
                    effectiveness: "effective"
                }
            ]
        },
        privilegeEscalation: {
            exploitChain: [
                {
                    title: "Initial Access",
                    description: "Exploit buffer overflow in GPU driver IOCTL handler",
                    mitigation: "Input validation and bounds checking implemented"
                },
                {
                    title: "Code Execution",
                    description: "Achieve arbitrary code execution in driver context",
                    mitigation: "Control Flow Integrity (CFI) prevents ROP/JOP attacks"
                },
                {
                    title: "Privilege Escalation",
                    description: "Attempt to elevate privileges via driver vulnerability",
                    mitigation: "Hardware isolation prevents privilege escalation"
                },
                {
                    title: "Persistence",
                    description: "Try to install persistent GPU firmware backdoor",
                    mitigation: "Secure boot and firmware signing prevent persistence"
                }
            ],
            incidentResponse: [
                {
                    time: "0s",
                    system: "GPU EDR Agent",
                    action: "Anomalous driver activity detected",
                    result: "Security alert generated",
                    status: "detected"
                },
                {
                    time: "12s",
                    system: "SOAR Platform",
                    action: "Automated containment initiated",
                    result: "Workload isolated, GPU access revoked",
                    status: "contained"
                },
                {
                    time: "35s",
                    system: "Security Team",
                    action: "Incident response team activated",
                    result: "Forensic analysis initiated",
                    status: "investigating"
                },
                {
                    time: "2m",
                    system: "Patch Management",
                    action: "Emergency driver update deployed",
                    result: "Vulnerability patched across fleet",
                    status: "patched"
                }
            ]
        },
        crossTenantAttack: {
            attackVectors: [
                {
                    name: "GPU Cache Timing Attack",
                    description: "Analyze GPU cache timing to infer data from other tenants",
                    successRate: "0% (Blocked by hardware cache isolation)",
                    mitigation: "Dedicated L2 cache slices per MIG instance"
                },
                {
                    name: "Memory Bus Side-Channel",
                    description: "Monitor memory bus activity to extract information",
                    successRate: "0% (Blocked by memory encryption)",
                    mitigation: "Hardware memory encryption active"
                },
                {
                    name: "Power Analysis Attack",
                    description: "Analyze GPU power consumption patterns",
                    successRate: "< 1% (Mitigated by power masking)",
                    mitigation: "Hardware power consumption masking"
                },
                {
                    name: "Electromagnetic Emanation",
                    description: "Monitor electromagnetic emissions from GPU",
                    successRate: "0% (Physical isolation)",
                    mitigation: "Datacenter electromagnetic shielding"
                }
            ]
        }
    };
}

function showFirmwareSecurity() {
    const outputDiv = document.getElementById('gpu-security-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔧 Loading GPU firmware security analysis...</p>
        </div>
    `;

    setTimeout(() => {
        const firmwareData = generateFirmwareSecurityData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🔧 GPU Firmware Security Analysis</h4>

                <div class="firmware-overview">
                    <div class="firmware-status">
                        <h5>📊 Firmware Security Status</h5>
                        <div class="status-grid">
                            <div class="status-card secure">
                                <div class="status-icon">🔒</div>
                                <div class="status-content">
                                    <span class="status-value">${firmwareData.overview.secureDevices}</span>
                                    <span class="status-label">Secure Devices</span>
                                </div>
                            </div>
                            <div class="status-card warning">
                                <div class="status-icon">⚠️</div>
                                <div class="status-content">
                                    <span class="status-value">${firmwareData.overview.updateRequired}</span>
                                    <span class="status-label">Updates Required</span>
                                </div>
                            </div>
                            <div class="status-card info">
                                <div class="status-icon">📋</div>
                                <div class="status-content">
                                    <span class="status-value">${firmwareData.overview.totalDevices}</span>
                                    <span class="status-label">Total Devices</span>
                                </div>
                            </div>
                            <div class="status-card good">
                                <div class="status-icon">✅</div>
                                <div class="status-content">
                                    <span class="status-value">${firmwareData.overview.complianceScore}%</span>
                                    <span class="status-label">Compliance Score</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="firmware-inventory">
                        <h5>📋 GPU Firmware Inventory</h5>
                        <div class="inventory-table">
                            <div class="table-header">
                                <span>Device</span>
                                <span>Model</span>
                                <span>VBIOS Version</span>
                                <span>InfoROM</span>
                                <span>Security Status</span>
                                <span>Last Updated</span>
                            </div>
                            ${firmwareData.devices.map(device => `
                                <div class="table-row ${device.securityStatus}">
                                    <span>${device.deviceId}</span>
                                    <span>${device.model}</span>
                                    <span>${device.vbiosVersion}</span>
                                    <span>${device.inforomVersion}</span>
                                    <span class="status-badge ${device.securityStatus}">${device.securityStatusText}</span>
                                    <span>${device.lastUpdated}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="firmware-security-analysis">
                    <div class="security-checks">
                        <h5>🔍 Security Verification Results</h5>
                        <div class="checks-grid">
                            ${firmwareData.securityChecks.map(check => `
                                <div class="security-check ${check.status}">
                                    <div class="check-header">
                                        <span class="check-name">${check.name}</span>
                                        <span class="check-status ${check.status}">${check.statusText}</span>
                                    </div>
                                    <div class="check-description">${check.description}</div>
                                    <div class="check-details">
                                        <span>Devices Checked: ${check.devicesChecked}</span>
                                        <span>Pass Rate: ${check.passRate}%</span>
                                    </div>
                                    ${check.issues && check.issues.length > 0 ? `
                                        <div class="check-issues">
                                            <strong>Issues Found:</strong>
                                            <ul>
                                                ${check.issues.map(issue => `<li>${issue}</li>`).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="vulnerability-assessment">
                        <h5>🚨 Vulnerability Assessment</h5>
                        <div class="vulnerabilities-list">
                            ${firmwareData.vulnerabilities.map((vuln, index) => `
                                <div class="vulnerability-item ${vuln.severity}">
                                    <div class="vuln-header">
                                        <span class="vuln-id">${vuln.cve}</span>
                                        <span class="vuln-severity ${vuln.severity}">${vuln.severity.toUpperCase()}</span>
                                        <span class="vuln-score">CVSS: ${vuln.cvssScore}</span>
                                    </div>
                                    <div class="vuln-details">
                                        <div class="vuln-description">${vuln.description}</div>
                                        <div class="vuln-impact"><strong>Impact:</strong> ${vuln.impact}</div>
                                        <div class="vuln-affected"><strong>Affected Devices:</strong> ${vuln.affectedDevices.join(', ')}</div>
                                        <div class="vuln-mitigation"><strong>Mitigation:</strong> ${vuln.mitigation}</div>
                                    </div>
                                    <div class="vuln-timeline">
                                        <strong>Remediation Deadline:</strong> ${vuln.deadline}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="firmware-management">
                    <div class="update-management">
                        <h5>🔄 Firmware Update Management</h5>
                        <div class="update-workflow">
                            <div class="workflow-step">
                                <h6>1. 📦 Update Discovery</h6>
                                <pre class="workflow-command">
# Automated firmware update checking
#!/bin/bash

NVIDIA_UPDATE_SERVER="https://download.nvidia.com/firmware"
CURRENT_INVENTORY="/var/lib/gpu-inventory.json"

function check_firmware_updates() {
    echo "Checking for firmware updates..."

    # Query current firmware versions
    nvidia-ml-py3 -c "
import pynvml
import json

pynvml.nvmlInit()
devices = []

for i in range(pynvml.nvmlDeviceGetCount()):
    handle = pynvml.nvmlDeviceGetHandleByIndex(i)
    device_info = {
        'index': i,
        'name': pynvml.nvmlDeviceGetName(handle),
        'uuid': pynvml.nvmlDeviceGetUUID(handle),
        'vbios': pynvml.nvmlDeviceGetVbiosVersion(handle),
        'inforom': pynvml.nvmlDeviceGetInforomVersion(handle, 0)
    }
    devices.append(device_info)

print(json.dumps(devices, indent=2))
" > "$CURRENT_INVENTORY"

    # Check against NVIDIA update server
    for device in $(jq -r '.[].uuid' "$CURRENT_INVENTORY"); do
        LATEST_FIRMWARE=$(curl -s "$NVIDIA_UPDATE_SERVER/check/$device")
        CURRENT_VERSION=$(jq -r ".[] | select(.uuid==\"$device\") | .vbios" "$CURRENT_INVENTORY")

        if [[ "$LATEST_FIRMWARE" != "$CURRENT_VERSION" ]]; then
            echo "UPDATE AVAILABLE: Device $device"
            echo "Current: $CURRENT_VERSION"
            echo "Latest: $LATEST_FIRMWARE"
        fi
    done
}

check_firmware_updates
                                </pre>
                            </div>

                            <div class="workflow-step">
                                <h6>2. 🔐 Security Validation</h6>
                                <pre class="workflow-command">
# Firmware signature verification
function verify_firmware_signature() {
    local firmware_file="$1"
    local signature_file="$2"

    # Verify NVIDIA signature
    if gpg --verify "$signature_file" "$firmware_file"; then
        echo "✅ Firmware signature verified"

        # Additional hash verification
        EXPECTED_HASH=$(curl -s "$NVIDIA_UPDATE_SERVER/hash/$firmware_file")
        ACTUAL_HASH=$(sha256sum "$firmware_file" | cut -d' ' -f1)

        if [[ "$EXPECTED_HASH" == "$ACTUAL_HASH" ]]; then
            echo "✅ Firmware hash verification passed"
            return 0
        else
            echo "❌ Firmware hash mismatch"
            return 1
        fi
    else
        echo "❌ Firmware signature verification failed"
        return 1
    fi
}

# Download and verify firmware update
FIRMWARE_URL="${firmwareData.updateProcess.firmwareUrl}"
SIGNATURE_URL="${firmwareData.updateProcess.signatureUrl}"

wget -q "$FIRMWARE_URL" -O /tmp/gpu_firmware.bin
wget -q "$SIGNATURE_URL" -O /tmp/gpu_firmware.sig

if verify_firmware_signature /tmp/gpu_firmware.bin /tmp/gpu_firmware.sig; then
    echo "Firmware ready for deployment"
else
    echo "Firmware verification failed - aborting update"
    exit 1
fi
                                </pre>
                            </div>

                            <div class="workflow-step">
                                <h6>3. ⚙️ Staged Deployment</h6>
                                <pre class="workflow-command">
# Staged firmware deployment with rollback capability
function deploy_firmware_update() {
    local firmware_file="$1"

    # Pre-update backup
    echo "Creating pre-update backup..."
    nvidia-smi -q > "/backup/gpu-state-$(date +%Y%m%d-%H%M%S).txt"

    # Test deployment on canary devices first
    CANARY_DEVICES=(0 1)  # First two GPUs for testing

    for device_id in "${CANARY_DEVICES[@]}"; do
        echo "Updating canary device $device_id..."

        if nvidia-firmware-update --gpu="$device_id" --firmware="$firmware_file" --test; then
            echo "✅ Canary update successful on GPU $device_id"

            # Verify functionality
            sleep 30
            if verify_gpu_functionality "$device_id"; then
                echo "✅ Canary device $device_id functioning correctly"
            else
                echo "❌ Canary device $device_id failed verification"
                rollback_firmware "$device_id"
                exit 1
            fi
        else
            echo "❌ Canary update failed on GPU $device_id"
            exit 1
        fi
    done

    # If canary deployment successful, proceed with remaining devices
    echo "Canary deployment successful - proceeding with full deployment"

    TOTAL_DEVICES=$(nvidia-smi --query-gpu=count --format=csv,noheader,nounits)
    for ((i=2; i<TOTAL_DEVICES; i++)); do
        echo "Updating GPU $i..."
        nvidia-firmware-update --gpu="$i" --firmware="$firmware_file"

        # Verify each update
        if ! verify_gpu_functionality "$i"; then
            echo "❌ Update verification failed for GPU $i"
            rollback_firmware "$i"
        fi
    done

    echo "✅ Firmware update deployment completed successfully"
}

deploy_firmware_update /tmp/gpu_firmware.bin
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div class="compliance-reporting">
                        <h5>📊 Compliance Reporting</h5>
                        <div class="compliance-dashboard">
                            <div class="compliance-metrics">
                                ${firmwareData.compliance.frameworks.map(framework => `
                                    <div class="compliance-framework">
                                        <div class="framework-header">
                                            <span class="framework-name">${framework.name}</span>
                                            <span class="framework-score ${framework.status}">${framework.score}%</span>
                                        </div>
                                        <div class="framework-requirements">
                                            <span>Requirements: ${framework.requirementsMet}/${framework.totalRequirements}</span>
                                        </div>
                                        <div class="framework-status">
                                            <span class="status-badge ${framework.status}">${framework.statusText}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="compliance-report">
                                <h6>📄 Compliance Report Summary</h6>
                                <pre class="report-preview">
GPU Firmware Security Compliance Report
Generated: ${new Date().toLocaleString()}

Executive Summary:
- Total GPUs Assessed: ${firmwareData.overview.totalDevices}
- Security Compliance: ${firmwareData.overview.complianceScore}%
- Critical Vulnerabilities: ${firmwareData.vulnerabilities.filter(v => v.severity === 'critical').length}
- Updates Required: ${firmwareData.overview.updateRequired}

Firmware Security Status:
✅ Secure Boot: Enabled on all devices
✅ Signature Verification: Active
✅ Version Control: Centrally managed
⚠️  ${firmwareData.vulnerabilities.length} vulnerabilities require attention

Next Steps:
1. Apply critical security updates within 7 days
2. Implement automated update deployment
3. Enhanced monitoring for firmware integrity
4. Regular security assessments scheduled

Compliance Frameworks:
${firmwareData.compliance.frameworks.map(f => `- ${f.name}: ${f.score}% (${f.statusText})`).join('\n')}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 2800);
}

function generateFirmwareSecurityData() {
    return {
        overview: {
            totalDevices: 64,
            secureDevices: 58,
            updateRequired: 6,
            complianceScore: 91
        },
        devices: [
            {
                deviceId: 'GPU-0',
                model: 'NVIDIA H100 PCIe 80GB',
                vbiosVersion: '96.00.7F.00.01',
                inforomVersion: 'G001.0000.03.04',
                securityStatus: 'secure',
                securityStatusText: 'Secure',
                lastUpdated: '2024-01-10'
            },
            {
                deviceId: 'GPU-1',
                model: 'NVIDIA H100 SXM5 80GB',
                vbiosVersion: '96.00.8A.00.02',
                inforomVersion: 'G001.0000.03.05',
                securityStatus: 'secure',
                securityStatusText: 'Secure',
                lastUpdated: '2024-01-12'
            },
            {
                deviceId: 'GPU-2',
                model: 'NVIDIA L40S 48GB',
                vbiosVersion: '94.02.5C.40.01',
                inforomVersion: 'G001.0000.02.08',
                securityStatus: 'warning',
                securityStatusText: 'Update Required',
                lastUpdated: '2023-11-15'
            },
            {
                deviceId: 'GPU-3',
                model: 'NVIDIA A100 SXM4 80GB',
                vbiosVersion: '92.00.36.00.03',
                inforomVersion: 'G001.0000.02.03',
                securityStatus: 'critical',
                securityStatusText: 'Critical Update',
                lastUpdated: '2023-09-20'
            }
        ],
        securityChecks: [
            {
                name: 'Secure Boot Verification',
                status: 'passed',
                statusText: 'Passed',
                description: 'Verify secure boot is enabled and functioning correctly',
                devicesChecked: 64,
                passRate: 100,
                issues: []
            },
            {
                name: 'Firmware Signature Validation',
                status: 'passed',
                statusText: 'Passed',
                description: 'Validate cryptographic signatures of all firmware components',
                devicesChecked: 64,
                passRate: 94,
                issues: ['4 devices have unsigned InfoROM components']
            },
            {
                name: 'Version Rollback Protection',
                status: 'warning',
                statusText: 'Minor Issues',
                description: 'Check for protection against firmware downgrade attacks',
                devicesChecked: 64,
                passRate: 89,
                issues: ['7 devices missing rollback protection', '2 devices with inconsistent version policies']
            },
            {
                name: 'Runtime Integrity Monitoring',
                status: 'passed',
                statusText: 'Passed',
                description: 'Verify continuous firmware integrity monitoring',
                devicesChecked: 64,
                passRate: 97,
                issues: ['2 devices with disabled integrity monitoring']
            }
        ],
        vulnerabilities: [
            {
                cve: 'CVE-2023-31022',
                severity: 'high',
                cvssScore: 7.8,
                description: 'NVIDIA GPU Display Driver vulnerability allowing local privilege escalation',
                impact: 'Code execution, privilege escalation',
                affectedDevices: ['GPU-2', 'GPU-3', 'GPU-15', 'GPU-23'],
                mitigation: 'Update to driver version 535.104.05 or later',
                deadline: '2024-01-25'
            },
            {
                cve: 'CVE-2023-25516',
                severity: 'medium',
                cvssScore: 6.1,
                description: 'Information disclosure vulnerability in NVIDIA vGPU software',
                impact: 'Information disclosure, denial of service',
                affectedDevices: ['GPU-8', 'GPU-12'],
                mitigation: 'Update vGPU software to version 15.3 or later',
                deadline: '2024-02-15'
            }
        ],
        updateProcess: {
            firmwareUrl: 'https://download.nvidia.com/firmware/H100_firmware_v2.1.bin',
            signatureUrl: 'https://download.nvidia.com/firmware/H100_firmware_v2.1.sig'
        },
        compliance: {
            frameworks: [
                {
                    name: 'NIST Cybersecurity Framework',
                    score: 94,
                    status: 'compliant',
                    statusText: 'Compliant',
                    requirementsMet: 47,
                    totalRequirements: 50
                },
                {
                    name: 'ISO 27001:2013',
                    score: 89,
                    status: 'partial',
                    statusText: 'Partial Compliance',
                    requirementsMet: 32,
                    totalRequirements: 36
                },
                {
                    name: 'FIPS 140-2 Level 2',
                    score: 96,
                    status: 'compliant',
                    statusText: 'Compliant',
                    requirementsMet: 23,
                    totalRequirements: 24
                }
            ]
        }
    };
}

function auditGPUCompliance() {
    const outputDiv = document.getElementById('gpu-security-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>📋 Running comprehensive GPU security compliance audit...</p>
        </div>
    `;

    setTimeout(() => {
        const auditData = generateGPUComplianceData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>📋 GPU Security Compliance Audit</h4>

                <div class="audit-executive-summary">
                    <div class="summary-header">
                        <h5>📊 Executive Summary</h5>
                        <div class="audit-score ${auditData.executiveSummary.overallGrade}">
                            <span class="score-value">${auditData.executiveSummary.overallScore}</span>
                            <span class="score-label">Overall Security Score</span>
                            <span class="score-grade">${auditData.executiveSummary.overallGrade.toUpperCase()}</span>
                        </div>
                    </div>

                    <div class="summary-metrics">
                        <div class="summary-metric">
                            <span class="metric-icon">🎯</span>
                            <div class="metric-content">
                                <span class="metric-value">${auditData.executiveSummary.devicesAudited}</span>
                                <span class="metric-label">Devices Audited</span>
                            </div>
                        </div>
                        <div class="summary-metric">
                            <span class="metric-icon">✅</span>
                            <div class="metric-content">
                                <span class="metric-value">${auditData.executiveSummary.controlsPassed}</span>
                                <span class="metric-label">Controls Passed</span>
                            </div>
                        </div>
                        <div class="summary-metric">
                            <span class="metric-icon">🚨</span>
                            <div class="metric-content">
                                <span class="metric-value">${auditData.executiveSummary.criticalFindings}</span>
                                <span class="metric-label">Critical Findings</span>
                            </div>
                        </div>
                        <div class="summary-metric">
                            <span class="metric-icon">⏱️</span>
                            <div class="metric-content">
                                <span class="metric-value">${auditData.executiveSummary.remediationTime}</span>
                                <span class="metric-label">Est. Remediation</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="compliance-domains">
                    <h5>🎯 Compliance Domain Assessment</h5>
                    <div class="domains-grid">
                        ${auditData.complianceDomains.map(domain => `
                            <div class="domain-card ${domain.status}">
                                <div class="domain-header">
                                    <span class="domain-name">${domain.name}</span>
                                    <span class="domain-score">${domain.score}%</span>
                                </div>
                                <div class="domain-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill ${domain.status}" style="width: ${domain.score}%"></div>
                                    </div>
                                </div>
                                <div class="domain-details">
                                    <span class="controls-passed">${domain.controlsPassed}/${domain.totalControls} controls</span>
                                    <span class="domain-status-text">${domain.statusText}</span>
                                </div>
                                <div class="domain-findings">
                                    <strong>Key Issues:</strong>
                                    <ul>
                                        ${domain.keyIssues.slice(0, 2).map(issue => `<li>${issue}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="detailed-findings">
                    <h5>🔍 Detailed Audit Findings</h5>
                    <div class="findings-categories">
                        <div class="findings-category critical">
                            <h6>🚨 Critical Findings (Immediate Action Required)</h6>
                            ${auditData.detailedFindings.critical.map((finding, index) => `
                                <div class="finding-item critical">
                                    <div class="finding-id">CRIT-${(index + 1).toString().padStart(3, '0')}</div>
                                    <div class="finding-content">
                                        <div class="finding-title">${finding.title}</div>
                                        <div class="finding-description">${finding.description}</div>
                                        <div class="finding-impact"><strong>Business Impact:</strong> ${finding.impact}</div>
                                        <div class="finding-remediation"><strong>Remediation:</strong> ${finding.remediation}</div>
                                        <div class="finding-timeline"><strong>Timeline:</strong> ${finding.timeline}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="findings-category high">
                            <h6>⚠️ High Priority Findings</h6>
                            ${auditData.detailedFindings.high.map((finding, index) => `
                                <div class="finding-item high">
                                    <div class="finding-id">HIGH-${(index + 1).toString().padStart(3, '0')}</div>
                                    <div class="finding-content">
                                        <div class="finding-title">${finding.title}</div>
                                        <div class="finding-description">${finding.description}</div>
                                        <div class="finding-remediation"><strong>Remediation:</strong> ${finding.remediation}</div>
                                        <div class="finding-timeline"><strong>Timeline:</strong> ${finding.timeline}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="findings-category medium">
                            <h6>📋 Medium Priority Findings</h6>
                            ${auditData.detailedFindings.medium.map((finding, index) => `
                                <div class="finding-item medium">
                                    <div class="finding-id">MED-${(index + 1).toString().padStart(3, '0')}</div>
                                    <div class="finding-content">
                                        <div class="finding-title">${finding.title}</div>
                                        <div class="finding-description">${finding.description}</div>
                                        <div class="finding-timeline"><strong>Timeline:</strong> ${finding.timeline}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="remediation-roadmap">
                    <h5>🗺️ Remediation Roadmap</h5>
                    <div class="roadmap-timeline">
                        ${auditData.remediationRoadmap.map((phase, index) => `
                            <div class="roadmap-phase priority-${phase.priority}">
                                <div class="phase-header">
                                    <div class="phase-number">${index + 1}</div>
                                    <div class="phase-title">${phase.title}</div>
                                    <div class="phase-duration">${phase.duration}</div>
                                </div>
                                <div class="phase-content">
                                    <div class="phase-objectives">
                                        <strong>Objectives:</strong>
                                        <ul>
                                            ${phase.objectives.map(obj => `<li>${obj}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="phase-deliverables">
                                        <strong>Key Deliverables:</strong>
                                        <ul>
                                            ${phase.deliverables.map(del => `<li>${del}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="phase-resources">
                                        <strong>Resources Required:</strong> ${phase.resources.join(', ')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="compliance-dashboard">
                    <h5>📊 Ongoing Compliance Monitoring</h5>
                    <div class="monitoring-setup">
                        <div class="monitoring-category">
                            <h6>🔄 Automated Monitoring</h6>
                            <ul>
                                <li><strong>Continuous Firmware Verification:</strong> Real-time integrity checking</li>
                                <li><strong>Security Configuration Drift Detection:</strong> Alert on unauthorized changes</li>
                                <li><strong>Vulnerability Scanning:</strong> Daily CVE database updates</li>
                                <li><strong>Compliance Reporting:</strong> Weekly automated compliance reports</li>
                            </ul>
                        </div>

                        <div class="monitoring-category">
                            <h6>📈 KPI Tracking</h6>
                            <div class="kpi-metrics">
                                ${auditData.kpiTracking.map(kpi => `
                                    <div class="kpi-metric">
                                        <span class="kpi-name">${kpi.name}:</span>
                                        <span class="kpi-current">${kpi.current}</span>
                                        <span class="kpi-target">Target: ${kpi.target}</span>
                                        <span class="kpi-trend ${kpi.trend}">${kpi.trendText}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="monitoring-category">
                            <h6>🎯 Compliance Integration</h6>
                            <pre class="integration-example">
# Kubernetes CronJob for GPU compliance monitoring
apiVersion: batch/v1
kind: CronJob
metadata:
  name: gpu-compliance-check
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: compliance-scanner
            image: company/gpu-compliance-scanner:latest
            command:
            - /bin/bash
            - -c
            - |
              # Run comprehensive compliance check
              python3 /app/gpu_compliance_scanner.py \\
                --output-format json \\
                --compliance-frameworks nist,iso27001,fips140-2 \\
                --remediation-suggestions \\
                --export-report /reports/gpu-compliance-$(date +%Y%m%d).json

              # Upload results to compliance dashboard
              curl -X POST https://compliance.company.com/api/gpu-audit \\
                -H "Authorization: Bearer $COMPLIANCE_API_TOKEN" \\
                -H "Content-Type: application/json" \\
                -d @/reports/gpu-compliance-$(date +%Y%m%d).json

            env:
            - name: COMPLIANCE_API_TOKEN
              valueFrom:
                secretKeyRef:
                  name: compliance-credentials
                  key: api-token
            volumeMounts:
            - name: reports-volume
              mountPath: /reports
          restartPolicy: OnFailure
                            </pre>
                        </div>
                    </div>
                </div>

                <div class="audit-conclusion">
                    <h5>📝 Audit Conclusion & Next Steps</h5>
                    <div class="conclusion-content">
                        <div class="key-achievements">
                            <h6>✅ Key Achievements</h6>
                            <ul>
                                <li>94% of GPU devices meet baseline security requirements</li>
                                <li>Hardware-level security features properly configured</li>
                                <li>Comprehensive firmware management processes in place</li>
                                <li>Multi-tenant isolation mechanisms functioning correctly</li>
                            </ul>
                        </div>

                        <div class="improvement-areas">
                            <h6>🎯 Areas for Improvement</h6>
                            <ul>
                                <li>Accelerate critical security patch deployment</li>
                                <li>Enhance automated vulnerability management</li>
                                <li>Implement continuous compliance monitoring</li>
                                <li>Strengthen incident response procedures</li>
                            </ul>
                        </div>

                        <div class="strategic-recommendations">
                            <h6>🚀 Strategic Recommendations</h6>
                            <ol>
                                <li><strong>Immediate (0-30 days):</strong> Address all critical and high-priority findings</li>
                                <li><strong>Short-term (30-90 days):</strong> Implement automated compliance monitoring</li>
                                <li><strong>Medium-term (90-180 days):</strong> Enhance security controls and processes</li>
                                <li><strong>Long-term (6+ months):</strong> Establish center of excellence for GPU security</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 3500);
}

function generateGPUComplianceData() {
    return {
        executiveSummary: {
            overallScore: 87,
            overallGrade: 'good',
            devicesAudited: 64,
            controlsPassed: '142/163',
            criticalFindings: 3,
            remediationTime: '6-8 weeks'
        },
        complianceDomains: [
            {
                name: 'Hardware Security',
                score: 94,
                status: 'excellent',
                statusText: 'Excellent',
                controlsPassed: 28,
                totalControls: 30,
                keyIssues: ['2 devices missing secure boot verification', 'Firmware rollback protection needs enhancement']
            },
            {
                name: 'Access Control',
                score: 89,
                status: 'good',
                statusText: 'Good',
                controlsPassed: 31,
                totalControls: 35,
                keyIssues: ['Multi-factor authentication not enforced for all admin accounts', 'Privileged access review process needs improvement']
            },
            {
                name: 'Vulnerability Management',
                score: 76,
                status: 'warning',
                statusText: 'Needs Improvement',
                controlsPassed: 19,
                totalControls: 25,
                keyIssues: ['Critical vulnerabilities exceed SLA for patching', 'Automated vulnerability scanning gaps identified']
            },
            {
                name: 'Monitoring & Logging',
                score: 91,
                status: 'good',
                statusText: 'Good',
                controlsPassed: 26,
                totalControls: 29,
                keyIssues: ['Log retention policy needs clarification', 'Real-time alerting coverage gaps']
            },
            {
                name: 'Incident Response',
                score: 83,
                status: 'satisfactory',
                statusText: 'Satisfactory',
                controlsPassed: 20,
                totalControls: 24,
                keyIssues: ['GPU-specific incident response procedures incomplete', 'Forensic capabilities need enhancement']
            },
            {
                name: 'Data Protection',
                score: 96,
                status: 'excellent',
                statusText: 'Excellent',
                controlsPassed: 18,
                totalControls: 20,
                keyIssues: ['Encryption key rotation schedule optimization', 'Cross-border data transfer controls']
            }
        ],
        detailedFindings: {
            critical: [
                {
                    title: 'Unpatched Critical GPU Driver Vulnerabilities',
                    description: '6 GPU devices running driver versions with known critical vulnerabilities (CVE-2023-31022)',
                    impact: 'Complete system compromise, potential lateral movement, data exfiltration',
                    remediation: 'Immediate emergency patching to driver version 535.104.05 or later',
                    timeline: 'Within 72 hours'
                },
                {
                    title: 'Insufficient Multi-Tenant Isolation Verification',
                    description: 'MIG instances lack comprehensive isolation testing and validation procedures',
                    impact: 'Cross-tenant data leakage, compliance violations, reputation damage',
                    remediation: 'Implement automated MIG isolation testing and continuous verification',
                    timeline: 'Within 2 weeks'
                }
            ],
            high: [
                {
                    title: 'Missing GPU Firmware Integrity Monitoring',
                    description: 'Real-time firmware integrity monitoring not implemented on 18 devices',
                    remediation: 'Deploy continuous firmware integrity monitoring solution',
                    timeline: 'Within 4 weeks'
                },
                {
                    title: 'Inadequate Privileged Access Controls',
                    description: 'GPU administrative access lacks multi-factor authentication and just-in-time access',
                    remediation: 'Implement MFA and JIT access for all GPU administrative functions',
                    timeline: 'Within 3 weeks'
                }
            ],
            medium: [
                {
                    title: 'Log Retention Policy Gaps',
                    description: 'GPU security logs lack consistent retention and archival policies',
                    timeline: 'Within 8 weeks'
                },
                {
                    title: 'Vendor Security Assessment Outdated',
                    description: 'Security assessments of GPU hardware vendors are over 12 months old',
                    timeline: 'Within 6 weeks'
                }
            ]
        },
        remediationRoadmap: [
            {
                title: 'Critical Security Stabilization',
                duration: '0-2 weeks',
                priority: 'critical',
                objectives: [
                    'Patch all critical GPU driver vulnerabilities',
                    'Implement emergency security controls',
                    'Establish incident response readiness'
                ],
                deliverables: [
                    'Emergency security patches deployed',
                    'Critical vulnerability remediation plan',
                    'Enhanced monitoring dashboards'
                ],
                resources: ['Security Team', 'Infrastructure Team', 'Vendor Support']
            },
            {
                title: 'Security Controls Enhancement',
                duration: '2-6 weeks',
                priority: 'high',
                objectives: [
                    'Strengthen access controls and authentication',
                    'Implement continuous monitoring',
                    'Enhance firmware security management'
                ],
                deliverables: [
                    'MFA implementation for GPU access',
                    'Automated compliance monitoring',
                    'Firmware integrity verification system'
                ],
                resources: ['DevOps Team', 'Security Team', 'Compliance Team']
            },
            {
                title: 'Process Maturation',
                duration: '6-12 weeks',
                priority: 'medium',
                objectives: [
                    'Mature incident response capabilities',
                    'Establish comprehensive governance',
                    'Implement advanced threat detection'
                ],
                deliverables: [
                    'GPU-specific incident response playbooks',
                    'Advanced threat hunting capabilities',
                    'Comprehensive security training program'
                ],
                resources: ['Security Operations', 'Training Team', 'Management']
            }
        ],
        kpiTracking: [
            {
                name: 'Mean Time to Patch (MTTP)',
                current: '12 days',
                target: '≤7 days',
                trend: 'improving',
                trendText: '↗️ Improving'
            },
            {
                name: 'Security Control Coverage',
                current: '87%',
                target: '≥95%',
                trend: 'stable',
                trendText: '→ Stable'
            },
            {
                name: 'Critical Vulnerability Count',
                current: '3',
                target: '0',
                trend: 'declining',
                trendText: '↘️ Declining'
            },
            {
                name: 'Compliance Score',
                current: '87%',
                target: '≥90%',
                trend: 'improving',
                trendText: '↗️ Improving'
            }
        ]
    };
}