// RedFish/BMC Scale Analysis Interactive Demonstrations
// Hardware Security Course - Module 1: DataCenter Management at Scale

function analyzeCSPImplementation() {
    const outputDiv = document.getElementById('bmc-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🔍 CSP RedFish Implementation Deep Dive</h3>
            <div class="csp-comparison-analysis">
                <div class="csp-analysis-grid">
                    <div class="csp-detail aws-detail">
                        <h4>🟠 AWS Implementation Analysis</h4>
                        <div class="implementation-metrics">
                            <div class="metric">
                                <strong>📊 Scale Metrics:</strong><br>
                                • 5+ million servers managed<br>
                                • 25+ AWS regions globally<br>
                                • 80+ availability zones<br>
                                • 99.99% SLA achievement
                            </div>
                            <div class="metric">
                                <strong>🔧 Technical Features:</strong><br>
                                • Custom Nitro BMC firmware<br>
                                • Hardware-based security isolation<br>
                                • Predictive failure detection<br>
                                • Automated instance replacement
                            </div>
                            <div class="metric">
                                <strong>💰 Business Impact:</strong><br>
                                • 40% reduction in hardware failures<br>
                                • 60% faster incident response<br>
                                • $2B+ annual operational savings<br>
                                • 50% improvement in energy efficiency
                            </div>
                        </div>
                    </div>

                    <div class="csp-detail azure-detail">
                        <h4>🔵 Microsoft Azure Implementation</h4>
                        <div class="implementation-metrics">
                            <div class="metric">
                                <strong>📊 Scale Metrics:</strong><br>
                                • 3+ million servers managed<br>
                                • 60+ Azure regions globally<br>
                                • 140+ edge locations<br>
                                • 99.95% SLA for premium services
                            </div>
                            <div class="metric">
                                <strong>🔧 Technical Features:</strong><br>
                                • Fabric Controller integration<br>
                                • Hyper-V BMC orchestration<br>
                                • Live migration capabilities<br>
                                • Azure Monitor integration
                            </div>
                            <div class="metric">
                                <strong>💰 Business Impact:</strong><br>
                                • 35% reduction in downtime<br>
                                • 45% faster VM provisioning<br>
                                • 25% improvement in resource utilization<br>
                                • Enterprise compliance automation
                            </div>
                        </div>
                    </div>

                    <div class="csp-detail gcp-detail">
                        <h4>🌐 Google Cloud Implementation</h4>
                        <div class="implementation-metrics">
                            <div class="metric">
                                <strong>📊 Scale Metrics:</strong><br>
                                • 2+ million servers managed<br>
                                • 35+ GCP regions globally<br>
                                • 100+ zones worldwide<br>
                                • 99.99% uptime for GKE
                            </div>
                            <div class="metric">
                                <strong>🔧 Technical Features:</strong><br>
                                • Borg cluster management<br>
                                • TPU hardware optimization<br>
                                • Machine learning automation<br>
                                • Site Reliability Engineering
                            </div>
                            <div class="metric">
                                <strong>💰 Business Impact:</strong><br>
                                • 50% improvement in ML workload efficiency<br>
                                • 30% reduction in operational overhead<br>
                                • Advanced AI-driven automation<br>
                                • Carbon-neutral operations
                            </div>
                        </div>
                    </div>

                    <div class="csp-detail oracle-detail">
                        <h4>🔴 Oracle Cloud Implementation</h4>
                        <div class="implementation-metrics">
                            <div class="metric">
                                <strong>📊 Scale Metrics:</strong><br>
                                • 500K+ servers managed<br>
                                • 40+ OCI regions globally<br>
                                • Dedicated bare metal focus<br>
                                • 99.995% autonomous database SLA
                            </div>
                            <div class="metric">
                                <strong>🔧 Technical Features:</strong><br>
                                • Autonomous operations model<br>
                                • High-performance bare metal<br>
                                • Database-optimized hardware<br>
                                • Self-healing infrastructure
                            </div>
                            <div class="metric">
                                <strong>💰 Business Impact:</strong><br>
                                • 80% reduction in database admin tasks<br>
                                • 50% improvement in database performance<br>
                                • 95% automation of operations<br>
                                • Enterprise-grade security compliance
                            </div>
                        </div>
                    </div>
                </div>

                <div class="adoption-insights">
                    <h4>📈 RedFish Adoption Insights</h4>
                    <div class="insights-summary">
                        <div class="insight-metric">
                            <h5>🚀 Implementation Velocity</h5>
                            <p><strong>AWS:</strong> First to market with custom BMC implementation (2017)<br>
                               <strong>Azure:</strong> Enterprise-focused rollout with ARM integration (2018)<br>
                               <strong>GCP:</strong> Borg-native implementation with ML optimization (2019)<br>
                               <strong>Oracle:</strong> Autonomous operations focus with bare metal priority (2020)</p>
                        </div>

                        <div class="insight-metric">
                            <h5>🔧 Technical Differentiation</h5>
                            <p><strong>AWS:</strong> Security-first with Nitro System isolation<br>
                               <strong>Azure:</strong> Enterprise integration and hybrid cloud capabilities<br>
                               <strong>GCP:</strong> AI/ML optimization and SRE practices<br>
                               <strong>Oracle:</strong> Database workload optimization and autonomy</p>
                        </div>

                        <div class="insight-metric">
                            <h5>💡 Innovation Areas</h5>
                            <p><strong>Predictive Maintenance:</strong> All CSPs use ML for failure prediction<br>
                               <strong>Security Automation:</strong> Hardware-based attestation and isolation<br>
                               <strong>Energy Efficiency:</strong> Dynamic power management and optimization<br>
                               <strong>Operational Automation:</strong> 90%+ reduction in manual operations</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function simulateAWSNitroAPI() {
    const outputDiv = document.getElementById('bmc-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🚀 AWS Nitro RedFish API Simulation</h3>
            <div id="aws-nitro-simulation"></div>
        </div>
    `;

    const simulationDiv = document.getElementById('aws-nitro-simulation');

    // Simulate AWS Nitro API calls
    simulationDiv.innerHTML = `
        <div class="api-simulation">
            <h4>🔧 Nitro System BMC Operations</h4>

            <div class="api-workflow">
                <h5>📋 Instance Lifecycle Management</h5>
                <div class="api-call-sequence">
                    <div class="api-call">
                        <strong>GET /redfish/v1/Systems/i-1234567890abcdef0</strong>
                        <pre class="api-response">{
  "@odata.type": "#ComputerSystem.v1_13_0.ComputerSystem",
  "Id": "i-1234567890abcdef0",
  "Name": "AWS EC2 Instance",
  "SystemType": "Physical",
  "Status": {
    "State": "Enabled",
    "Health": "OK"
  },
  "ProcessorSummary": {
    "Count": 4,
    "Model": "Intel(R) Xeon(R) Platinum 8259CL CPU @ 2.50GHz"
  },
  "MemorySummary": {
    "TotalSystemMemoryGiB": 16,
    "Status": {
      "State": "Enabled",
      "Health": "OK"
    }
  },
  "Boot": {
    "BootSourceOverrideTarget": "Uefi",
    "UefiTargetBootSourceOverride": "PciRoot(0x0)/Pci(0x1f,0x2)/..."
  },
  "PowerState": "On",
  "IndicatorLED": "Off",
  "Actions": {
    "#ComputerSystem.Reset": {
      "target": "/redfish/v1/Systems/i-1234567890abcdef0/Actions/ComputerSystem.Reset",
      "ResetType@Redfish.AllowableValues": ["On", "ForceOff", "GracefulShutdown", "ForceRestart"]
    }
  }
}</pre>
                    </div>

                    <div class="api-call">
                        <strong>POST /redfish/v1/Systems/i-1234567890abcdef0/Actions/ComputerSystem.Reset</strong>
                        <pre class="api-request">{
  "ResetType": "GracefulShutdown"
}</pre>
                        <div class="api-status success">✅ Instance shutdown initiated successfully</div>
                    </div>

                    <div class="api-call">
                        <strong>GET /redfish/v1/Systems/i-1234567890abcdef0/Storage</strong>
                        <pre class="api-response">{
  "@odata.type": "#StorageCollection.StorageCollection",
  "Name": "Storage Collection",
  "Members": [
    {
      "@odata.id": "/redfish/v1/Systems/i-1234567890abcdef0/Storage/NVMe0"
    },
    {
      "@odata.id": "/redfish/v1/Systems/i-1234567890abcdef0/Storage/EBS0"
    }
  ],
  "Members@odata.count": 2
}</pre>
                    </div>
                </div>

                <h5>📊 Hardware Health Monitoring</h5>
                <div class="health-dashboard">
                    <div class="health-metric">
                        <h6>🌡️ Thermal Status</h6>
                        <div class="metric-value ok">Normal (45°C)</div>
                        <div class="metric-details">
                            • CPU: 42°C (Normal)<br>
                            • Memory: 38°C (Normal)<br>
                            • NVMe SSD: 48°C (Normal)
                        </div>
                    </div>

                    <div class="health-metric">
                        <h6>⚡ Power Consumption</h6>
                        <div class="metric-value ok">120W / 180W</div>
                        <div class="metric-details">
                            • CPU: 65W<br>
                            • Memory: 25W<br>
                            • Storage: 15W<br>
                            • Network: 15W
                        </div>
                    </div>

                    <div class="health-metric">
                        <h6>🧠 Memory Health</h6>
                        <div class="metric-value ok">ECC: 0 errors</div>
                        <div class="metric-details">
                            • Bank 0-1: Healthy<br>
                            • Bank 2-3: Healthy<br>
                            • No correctable errors<br>
                            • No uncorrectable errors
                        </div>
                    </div>
                </div>

                <h5>🔐 Nitro Security Features</h5>
                <div class="security-features">
                    <div class="security-item">
                        <h6>🛡️ Hardware Attestation</h6>
                        <p><strong>Nitro Security Chip Status:</strong> Verified ✅<br>
                           <strong>Boot Integrity:</strong> Secure boot chain validated<br>
                           <strong>Runtime Attestation:</strong> Hypervisor integrity confirmed</p>
                    </div>

                    <div class="security-item">
                        <h6>🔒 Memory Encryption</h6>
                        <p><strong>Memory Protection:</strong> Always-on encryption<br>
                           <strong>Key Management:</strong> Hardware-rooted keys<br>
                           <strong>DMA Protection:</strong> IOMMU isolation enabled</p>
                    </div>

                    <div class="security-item">
                        <h6>🌐 Network Isolation</h6>
                        <p><strong>Tenant Isolation:</strong> Hardware-enforced VPC<br>
                           <strong>SR-IOV Security:</strong> Virtual function isolation<br>
                           <strong>Network Monitoring:</strong> Traffic analysis enabled</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function simulateAzureFabricAPI() {
    const outputDiv = document.getElementById('bmc-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🔷 Azure Fabric Controller BMC API Simulation</h3>
            <div id="azure-fabric-simulation"></div>
        </div>
    `;

    const simulationDiv = document.getElementById('azure-fabric-simulation');

    simulationDiv.innerHTML = `
        <div class="api-simulation">
            <h4>🏗️ Azure Fabric Controller Operations</h4>

            <div class="fabric-workflow">
                <h5>⚙️ VM Scale Set Management</h5>
                <div class="api-call-sequence">
                    <div class="api-call">
                        <strong>GET /redfish/v1/Chassis/Node-42/Power</strong>
                        <pre class="api-response">{
  "@odata.type": "#Power.v1_6_1.Power",
  "Id": "Power",
  "Name": "Power",
  "PowerControl": [
    {
      "@odata.id": "/redfish/v1/Chassis/Node-42/Power#/PowerControl/0",
      "MemberId": "0",
      "Name": "Server Power Control",
      "PowerConsumedWatts": 245,
      "PowerRequestedWatts": 300,
      "PowerCapacityWatts": 650,
      "Status": {
        "State": "Enabled",
        "Health": "OK"
      }
    }
  ],
  "PowerSupplies": [
    {
      "@odata.id": "/redfish/v1/Chassis/Node-42/Power#/PowerSupplies/0",
      "MemberId": "0",
      "Name": "Power Supply 1",
      "Status": {
        "State": "Enabled",
        "Health": "OK"
      },
      "PowerCapacityWatts": 650,
      "LastPowerOutputWatts": 245,
      "PowerInputWatts": 275,
      "EfficiencyPercent": 89
    }
  ]
}</pre>
                    </div>

                    <div class="api-call">
                        <strong>GET /redfish/v1/Chassis/Node-42/Thermal</strong>
                        <pre class="api-response">{
  "@odata.type": "#Thermal.v1_6_1.Thermal",
  "Id": "Thermal",
  "Name": "Thermal",
  "Temperatures": [
    {
      "@odata.id": "/redfish/v1/Chassis/Node-42/Thermal#/Temperatures/0",
      "MemberId": "0",
      "Name": "CPU 1 Temp",
      "ReadingCelsius": 42,
      "UpperThresholdFatal": 95,
      "UpperThresholdCritical": 85,
      "Status": {
        "State": "Enabled",
        "Health": "OK"
      }
    }
  ],
  "Fans": [
    {
      "@odata.id": "/redfish/v1/Chassis/Node-42/Thermal#/Fans/0",
      "MemberId": "0",
      "Name": "System Fan 1",
      "Reading": 3200,
      "ReadingUnits": "RPM",
      "Status": {
        "State": "Enabled",
        "Health": "OK"
      }
    }
  ]
}</pre>
                    </div>
                </div>

                <h5>🔄 Hyper-V Integration</h5>
                <div class="hyperv-dashboard">
                    <div class="hyperv-metric">
                        <h6>🖥️ VM Allocation</h6>
                        <div class="allocation-status">
                            <div class="vm-slot">VM-1: D4s_v4 (4 vCPU, 16GB)</div>
                            <div class="vm-slot">VM-2: D2s_v4 (2 vCPU, 8GB)</div>
                            <div class="vm-slot">VM-3: D8s_v4 (8 vCPU, 32GB)</div>
                            <div class="vm-slot available">Available: (2 vCPU, 8GB)</div>
                        </div>
                    </div>

                    <div class="hyperv-metric">
                        <h6>🔄 Live Migration Status</h6>
                        <div class="migration-progress">
                            <div class="migration-item">
                                <strong>VM-1:</strong> Migration ready ✅<br>
                                <em>Memory pre-copy: 95% complete</em>
                            </div>
                            <div class="migration-item">
                                <strong>VM-2:</strong> Active workload 🔄<br>
                                <em>Cannot migrate during peak hours</em>
                            </div>
                        </div>
                    </div>
                </div>

                <h5>📊 Azure Monitor Integration</h5>
                <div class="monitoring-dashboard">
                    <div class="monitor-metric">
                        <h6>📈 Performance Counters</h6>
                        <pre class="metric-data">{
  "timestamp": "2024-01-15T10:30:00Z",
  "metrics": {
    "processor.utilization": 45.2,
    "memory.available_mb": 8192,
    "memory.committed_percent": 68.4,
    "network.bytes_total": 1024000,
    "disk.avg_disk_sec_per_read": 0.002,
    "hyperv.logical_processors": 16,
    "hyperv.virtual_processors": 14
  }
}</pre>
                    </div>

                    <div class="monitor-metric">
                        <h6>🚨 Health Alerts</h6>
                        <div class="alert-list">
                            <div class="alert info">ℹ️ Scheduled maintenance: Node-42 (Jan 20, 2AM UTC)</div>
                            <div class="alert warning">⚠️ Memory usage approaching threshold: 85%</div>
                            <div class="alert success">✅ Hardware health check passed: All components OK</div>
                        </div>
                    </div>
                </div>

                <h5>🔐 Enterprise Security Features</h5>
                <div class="security-controls">
                    <div class="security-control">
                        <h6>🛡️ TPM Management</h6>
                        <p><strong>TPM Version:</strong> 2.0 Compliant ✅<br>
                           <strong>Attestation Status:</strong> Verified boot chain<br>
                           <strong>BitLocker Integration:</strong> Volume encryption active</p>
                    </div>

                    <div class="security-control">
                        <h6>🔑 Key Vault Integration</h6>
                        <p><strong>HSM Status:</strong> Hardware security module active<br>
                           <strong>Certificate Management:</strong> Auto-rotation enabled<br>
                           <strong>Secret Access:</strong> Managed identity authentication</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function simulateGoogleBorgAPI() {
    const outputDiv = document.getElementById('bmc-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🤖 Google Borg Machine Management API</h3>
            <div id="google-borg-simulation"></div>
        </div>
    `;

    const simulationDiv = document.getElementById('google-borg-simulation');

    simulationDiv.innerHTML = `
        <div class="api-simulation">
            <h4>🧠 Borg Cluster Management Operations</h4>

            <div class="borg-workflow">
                <h5>🎯 Machine Allocation and Scheduling</h5>
                <div class="api-call-sequence">
                    <div class="api-call">
                        <strong>GET /machine/v1/clusters/prod-us-central1-a/machines/machine-12345</strong>
                        <pre class="api-response">{
  "machine_id": "machine-12345",
  "cluster": "prod-us-central1-a",
  "status": {
    "state": "READY",
    "health": "HEALTHY",
    "last_heartbeat": "2024-01-15T10:30:00Z"
  },
  "resources": {
    "cpu": {
      "total_millicores": 8000,
      "allocatable_millicores": 7600,
      "allocated_millicores": 4200
    },
    "memory": {
      "total_bytes": 34359738368,
      "allocatable_bytes": 32212254720,
      "allocated_bytes": 18253611008
    },
    "disk": {
      "total_bytes": 1099511627776,
      "available_bytes": 659706976666
    }
  },
  "hardware": {
    "machine_type": "n1-standard-8",
    "cpu_model": "Intel Skylake",
    "accelerators": [],
    "local_ssds": 1
  },
  "network": {
    "interfaces": [
      {
        "name": "eth0",
        "ip_address": "10.128.0.42",
        "bandwidth_gbps": 10
      }
    ]
  }
}</pre>
                    </div>

                    <div class="api-call">
                        <strong>POST /machine/v1/clusters/prod-us-central1-a/allocations</strong>
                        <pre class="api-request">{
  "allocation_request": {
    "job_name": "ml-training-job",
    "priority": "production",
    "resources": {
      "cpu_millicores": 2000,
      "memory_bytes": 8589934592,
      "disk_bytes": 107374182400
    },
    "constraints": {
      "machine_type": "n1-standard-8",
      "zone": "us-central1-a",
      "anti_affinity": ["existing-job-1", "existing-job-2"]
    }
  }
}</pre>
                        <div class="api-status success">✅ Allocation successful: machine-12345 assigned</div>
                    </div>
                </div>

                <h5>🧠 ML-Driven Resource Optimization</h5>
                <div class="ml-optimization">
                    <div class="optimization-metric">
                        <h6>📊 Workload Prediction</h6>
                        <div class="prediction-chart">
                            <div class="chart-data">
                                <div class="data-point">
                                    <span class="time">10:00</span>
                                    <span class="cpu-bar" style="width: 45%;">CPU: 45%</span>
                                </div>
                                <div class="data-point">
                                    <span class="time">11:00</span>
                                    <span class="cpu-bar" style="width: 72%;">CPU: 72% (predicted)</span>
                                </div>
                                <div class="data-point">
                                    <span class="time">12:00</span>
                                    <span class="cpu-bar" style="width: 85%;">CPU: 85% (predicted)</span>
                                </div>
                                <div class="data-point">
                                    <span class="time">13:00</span>
                                    <span class="cpu-bar" style="width: 65%;">CPU: 65% (predicted)</span>
                                </div>
                            </div>
                        </div>
                        <p><em>ML model predicts 85% CPU utilization at peak (12:00 PM)</em></p>
                    </div>

                    <div class="optimization-metric">
                        <h6>⚡ Auto-Scaling Decisions</h6>
                        <div class="scaling-events">
                            <div class="scaling-event">
                                <strong>11:45:</strong> Pre-emptive scale-up triggered<br>
                                <em>ML model confidence: 94%</em>
                            </div>
                            <div class="scaling-event">
                                <strong>12:30:</strong> Workload rebalancing initiated<br>
                                <em>Moving batch jobs to lower-cost machines</em>
                            </div>
                        </div>
                    </div>
                </div>

                <h5>⚡ TPU Management Integration</h5>
                <div class="tpu-management">
                    <div class="tpu-status">
                        <h6>🧮 TPU Pod Status</h6>
                        <div class="tpu-grid">
                            <div class="tpu-chip active">TPU 0: Training</div>
                            <div class="tpu-chip active">TPU 1: Training</div>
                            <div class="tpu-chip active">TPU 2: Training</div>
                            <div class="tpu-chip active">TPU 3: Training</div>
                            <div class="tpu-chip idle">TPU 4: Available</div>
                            <div class="tpu-chip idle">TPU 5: Available</div>
                            <div class="tpu-chip maintenance">TPU 6: Maintenance</div>
                            <div class="tpu-chip idle">TPU 7: Available</div>
                        </div>
                    </div>

                    <div class="tpu-performance">
                        <h6>📈 ML Training Performance</h6>
                        <pre class="performance-data">Current Job: BERT-Large Fine-tuning
Model Parameters: 340M
Batch Size: 32
Training Speed: 1.2 samples/sec/chip
Estimated Completion: 2h 15m

TPU Utilization:
- Compute: 87% (target: 85-95%)
- Memory: 76% (32GB HBM per chip)
- Network: 45% (inter-chip communication)
- Power: 180W per chip (total: 1440W)</pre>
                    </div>
                </div>

                <h5>🛡️ SRE and Reliability Engineering</h5>
                <div class="sre-dashboard">
                    <div class="sre-metric">
                        <h6>📊 Error Budget Status</h6>
                        <div class="error-budget">
                            <div class="budget-item">
                                <span class="service">Compute Engine:</span>
                                <span class="budget-bar">
                                    <span class="used" style="width: 15%;">15%</span>
                                </span>
                                <span class="budget-text">85% remaining</span>
                            </div>
                            <div class="budget-item">
                                <span class="service">GKE:</span>
                                <span class="budget-bar">
                                    <span class="used" style="width: 8%;">8%</span>
                                </span>
                                <span class="budget-text">92% remaining</span>
                            </div>
                        </div>
                    </div>

                    <div class="sre-metric">
                        <h6>🔧 Automated Recovery Actions</h6>
                        <div class="recovery-log">
                            <div class="recovery-event">
                                <strong>10:25:</strong> Machine health check failure detected<br>
                                <em>Action: Automated failover to machine-12346</em>
                            </div>
                            <div class="recovery-event">
                                <strong>10:27:</strong> Workload migration completed<br>
                                <em>0 jobs affected, 45-second recovery time</em>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function simulateOracleAutonomousAPI() {
    const outputDiv = document.getElementById('bmc-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🔴 Oracle Autonomous BMC Operations</h3>
            <div id="oracle-autonomous-simulation"></div>
        </div>
    `;

    const simulationDiv = document.getElementById('oracle-autonomous-simulation');

    simulationDiv.innerHTML = `
        <div class="api-simulation">
            <h4>⚡ Oracle Autonomous Operations Model</h4>

            <div class="autonomous-workflow">
                <h5>🗄️ Autonomous Database Management</h5>
                <div class="api-call-sequence">
                    <div class="api-call">
                        <strong>GET /redfish/v1/Managers/BMC-Exadata-01/LogServices/AutonomasOperations</strong>
                        <pre class="api-response">{
  "@odata.type": "#LogService.v1_2_0.LogService",
  "Id": "AutonomousOperations",
  "Name": "Autonomous Operations Log",
  "Description": "Self-driving, self-securing, self-repairing operations",
  "Status": {
    "State": "Enabled",
    "Health": "OK"
  },
  "Entries": {
    "@odata.id": "/redfish/v1/Managers/BMC-Exadata-01/LogServices/AutonomousOperations/Entries"
  },
  "AutonomousFeatures": {
    "SelfDriving": {
      "Status": "Active",
      "LastOptimization": "2024-01-15T09:45:00Z",
      "PerformanceGain": "23%"
    },
    "SelfSecuring": {
      "Status": "Active",
      "LastSecurityPatch": "2024-01-14T22:00:00Z",
      "ThreatDetectionActive": true
    },
    "SelfRepairing": {
      "Status": "Active",
      "LastAutoRepair": "2024-01-15T08:30:00Z",
      "UpTime": "99.997%"
    }
  }
}</pre>
                    </div>
                </div>

                <h5>🧠 Self-Driving Database Operations</h5>
                <div class="autonomous-features">
                    <div class="feature-panel">
                        <h6>⚙️ Automatic Performance Tuning</h6>
                        <div class="tuning-metrics">
                            <div class="metric-item">
                                <strong>SQL Plan Management:</strong><br>
                                • Auto-optimized: 1,247 SQL statements<br>
                                • Performance improvement: 23% average<br>
                                • Index recommendations: 12 implemented
                            </div>
                            <div class="metric-item">
                                <strong>Memory Allocation:</strong><br>
                                • SGA auto-tuning: Active<br>
                                • PGA optimization: Continuous<br>
                                • Buffer cache hit ratio: 99.2%
                            </div>
                        </div>
                    </div>

                    <div class="feature-panel">
                        <h6>📈 Auto-Scaling Actions</h6>
                        <div class="scaling-timeline">
                            <div class="timeline-event">
                                <strong>08:30:</strong> CPU utilization spike detected (85%)<br>
                                <em>Action: Auto-scaled from 2 to 4 OCPUs</em>
                            </div>
                            <div class="timeline-event">
                                <strong>09:15:</strong> Storage usage threshold reached (80%)<br>
                                <em>Action: Auto-extended storage from 1TB to 1.5TB</em>
                            </div>
                            <div class="timeline-event">
                                <strong>10:00:</strong> Workload normalized, scaling down<br>
                                <em>Action: Reduced to 3 OCPUs for cost optimization</em>
                            </div>
                        </div>
                    </div>
                </div>

                <h5>🛡️ Self-Securing Operations</h5>
                <div class="security-automation">
                    <div class="security-panel">
                        <h6>🔒 Automated Security Patching</h6>
                        <div class="patch-status">
                            <div class="patch-info">
                                <strong>Last Patch Applied:</strong> 2024-01-14 22:00 UTC<br>
                                <strong>Patch Type:</strong> Security update (Oracle Database 19.21)<br>
                                <strong>Downtime:</strong> 0 seconds (rolling patch)<br>
                                <strong>Next Scheduled:</strong> 2024-02-15 22:00 UTC
                            </div>
                            <div class="patch-log">
                                <pre class="log-output">2024-01-14 22:00:00 - Patch validation started
2024-01-14 22:00:30 - Database health checks passed
2024-01-14 22:01:00 - Rolling patch initiated
2024-01-14 22:03:45 - Node 1 patched successfully
2024-01-14 22:06:30 - Node 2 patched successfully
2024-01-14 22:08:15 - Patch deployment completed
2024-01-14 22:08:30 - Post-patch validation passed</pre>
                            </div>
                        </div>
                    </div>

                    <div class="security-panel">
                        <h6>🚨 Threat Detection & Response</h6>
                        <div class="threat-monitoring">
                            <div class="threat-status">
                                <div class="status-item good">
                                    ✅ <strong>SQL Injection Protection:</strong> 0 attempts blocked today
                                </div>
                                <div class="status-item good">
                                    ✅ <strong>Privilege Escalation:</strong> No unauthorized access attempts
                                </div>
                                <div class="status-item warning">
                                    ⚠️ <strong>Unusual Query Patterns:</strong> 3 anomalies detected (low risk)
                                </div>
                                <div class="status-item good">
                                    ✅ <strong>Data Exfiltration:</strong> All data access patterns normal
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h5>🔧 Self-Repairing Infrastructure</h5>
                <div class="repair-automation">
                    <div class="repair-panel">
                        <h6>⚡ Automated Failure Recovery</h6>
                        <div class="recovery-dashboard">
                            <div class="recovery-metric">
                                <strong>Hardware Monitoring:</strong><br>
                                • Exadata storage servers: 12/12 healthy<br>
                                • Database servers: 4/4 healthy<br>
                                • InfiniBand network: Optimal performance<br>
                                • Power and cooling: Within normal ranges
                            </div>
                            <div class="recovery-metric">
                                <strong>Recent Auto-Repairs:</strong><br>
                                • 08:30: Automatic disk replacement initiated<br>
                                • 09:00: Failed storage cell automatically replaced<br>
                                • 09:15: Data redistribution completed<br>
                                • 09:30: System performance restored to baseline
                            </div>
                        </div>
                    </div>

                    <div class="repair-panel">
                        <h6>💰 Cost Optimization</h6>
                        <div class="cost-metrics">
                            <div class="cost-saving">
                                <strong>Auto Scaling Savings:</strong><br>
                                • Monthly compute cost reduction: 35%<br>
                                • Storage optimization: 20% space savings<br>
                                • Network utilization: 15% bandwidth reduction<br>
                                • Total monthly savings: $12,500
                            </div>
                        </div>
                    </div>
                </div>

                <h5>📊 SLA Performance Dashboard</h5>
                <div class="sla-dashboard">
                    <div class="sla-metric">
                        <strong>🎯 Availability SLA: 99.995%</strong><br>
                        <div class="sla-bar">
                            <span class="achieved" style="width: 99.997%;">99.997% Achieved</span>
                        </div>
                        <em>Exceeding SLA by 0.002% this month</em>
                    </div>

                    <div class="sla-metric">
                        <strong>⚡ Performance SLA: < 1ms latency</strong><br>
                        <div class="performance-stats">
                            • Average latency: 0.7ms<br>
                            • 95th percentile: 0.9ms<br>
                            • 99th percentile: 1.1ms<br>
                            • SLA compliance: 98.5%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function simulateOpenBMCAPI() {
    const outputDiv = document.getElementById('bmc-analysis-output');
    outputDiv.style.display = 'block';
    outputDiv.scrollIntoView({ behavior: 'smooth' });

    outputDiv.innerHTML = `
        <div class="demo-output">
            <h3>🔧 OpenBMC RedFish API Simulation</h3>
            <div id="openbmc-simulation"></div>
        </div>
    `;

    const simulationDiv = document.getElementById('openbmc-simulation');

    simulationDiv.innerHTML = `
        <div class="api-simulation">
            <h4>🌐 Open Compute Project BMC Management</h4>

            <div class="openbmc-workflow">
                <h5>🔓 OpenBMC Architecture Overview</h5>
                <div class="openbmc-architecture">
                    <pre class="architecture-diagram">
OpenBMC Software Stack (Meta/Facebook Implementation)

┌─────────────────────────────────────────────────────────┐
│                 Management Console                      │
│           (Web UI, CLI, REST APIs)                     │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│              BMC Application Layer                      │
│                                                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │  Phosphor   │ │   Entity    │ │      Inventory      │ │
│ │  REST API   │ │   Manager   │ │      Manager        │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │  Sensor     │ │    Event    │ │       Power         │ │
│ │  Manager    │ │   Manager   │ │       Manager       │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                D-Bus Service                           │
│          (Inter-process Communication)                  │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│               Linux Kernel (Yocto)                     │
│                                                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │  Hardware   │ │   GPIO      │ │       I2C/SPI      │ │
│ │  Drivers    │ │   Driver    │ │       Drivers       │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                    </pre>
                </div>

                <h5>⚡ Fleet Management at Scale</h5>
                <div class="api-call-sequence">
                    <div class="api-call">
                        <strong>GET /redfish/v1/Managers/bmc</strong>
                        <pre class="api-response">{
  "@odata.type": "#Manager.v1_11_0.Manager",
  "Id": "bmc",
  "Name": "OpenBMC Manager",
  "ManagerType": "BMC",
  "Status": {
    "State": "Enabled",
    "Health": "OK"
  },
  "FirmwareVersion": "2.13.0-meta",
  "Model": "OCP Mono Lake",
  "DateTime": "2024-01-15T10:30:00Z",
  "EthernetInterfaces": {
    "@odata.id": "/redfish/v1/Managers/bmc/EthernetInterfaces"
  },
  "SerialInterfaces": {
    "@odata.id": "/redfish/v1/Managers/bmc/SerialInterfaces"
  },
  "NetworkProtocol": {
    "@odata.id": "/redfish/v1/Managers/bmc/NetworkProtocol"
  },
  "LogServices": {
    "@odata.id": "/redfish/v1/Managers/bmc/LogServices"
  }
}</pre>
                    </div>

                    <div class="api-call">
                        <strong>GET /redfish/v1/Chassis/motherboard/Power</strong>
                        <pre class="api-response">{
  "@odata.type": "#Power.v1_6_1.Power",
  "Id": "Power",
  "Name": "Motherboard Power",
  "PowerControl": [
    {
      "MemberId": "0",
      "Name": "System Power Control",
      "PowerConsumedWatts": 320,
      "PowerRequestedWatts": 400,
      "PowerCapacityWatts": 650,
      "PowerMetrics": {
        "MinConsumedWatts": 180,
        "MaxConsumedWatts": 580,
        "AverageConsumedWatts": 340
      }
    }
  ],
  "PowerSupplies": [
    {
      "MemberId": "0",
      "Name": "PSU 1",
      "Status": {
        "State": "Enabled",
        "Health": "OK"
      },
      "PowerCapacityWatts": 800,
      "LastPowerOutputWatts": 320,
      "PowerInputWatts": 356,
      "EfficiencyPercent": 90,
      "HotPluggable": true,
      "Manufacturer": "Delta Electronics",
      "Model": "DPS-800AB-6",
      "SerialNumber": "FBDLT0001"
    }
  ]
}</pre>
                    </div>
                </div>

                <h5>🏗️ OCP Hardware Innovation</h5>
                <div class="ocp-features">
                    <div class="ocp-panel">
                        <h6>📦 Disaggregated Architecture</h6>
                        <div class="disaggregation-benefits">
                            <div class="benefit-item">
                                <strong>🔄 Component Flexibility:</strong><br>
                                • Independent CPU, memory, storage upgrades<br>
                                • Hot-swappable components reduce downtime<br>
                                • Standardized form factors across vendors
                            </div>
                            <div class="benefit-item">
                                <strong>💰 Cost Optimization:</strong><br>
                                • 30% reduction in hardware acquisition cost<br>
                                • Improved component utilization rates<br>
                                • Simplified supply chain management
                            </div>
                        </div>
                    </div>

                    <div class="ocp-panel">
                        <h6>🌿 Sustainability Metrics</h6>
                        <div class="sustainability-dashboard">
                            <div class="sustainability-metric">
                                <strong>⚡ Power Efficiency:</strong><br>
                                • PUE: 1.08 (industry leading)<br>
                                • Server efficiency: 90%+ PSU efficiency<br>
                                • Dynamic power management active
                            </div>
                            <div class="sustainability-metric">
                                <strong>♻️ Circular Economy:</strong><br>
                                • Component reuse rate: 85%<br>
                                • Repairable design philosophy<br>
                                • End-of-life recycling program
                            </div>
                        </div>
                    </div>
                </div>

                <h5>📊 Global Fleet Management Dashboard</h5>
                <div class="fleet-management">
                    <div class="fleet-stats">
                        <h6>🌍 Worldwide Deployment Statistics</h6>
                        <div class="deployment-grid">
                            <div class="deployment-region">
                                <strong>🇺🇸 North America:</strong><br>
                                • Servers: 850,000<br>
                                • Datacenters: 15<br>
                                • Avg. PUE: 1.09<br>
                                • Uptime: 99.98%
                            </div>
                            <div class="deployment-region">
                                <strong>🇪🇺 Europe:</strong><br>
                                • Servers: 420,000<br>
                                • Datacenters: 8<br>
                                • Avg. PUE: 1.07<br>
                                • Uptime: 99.97%
                            </div>
                            <div class="deployment-region">
                                <strong>🌏 Asia-Pacific:</strong><br>
                                • Servers: 380,000<br>
                                • Datacenters: 12<br>
                                • Avg. PUE: 1.12<br>
                                • Uptime: 99.96%
                            </div>
                            <div class="deployment-region">
                                <strong>🌎 Other Regions:</strong><br>
                                • Servers: 150,000<br>
                                • Datacenters: 5<br>
                                • Avg. PUE: 1.15<br>
                                • Uptime: 99.95%
                            </div>
                        </div>
                    </div>

                    <div class="fleet-operations">
                        <h6>🔧 Automated Operations at Scale</h6>
                        <div class="operations-log">
                            <pre class="ops-log">Recent Fleet Operations (Last 24 Hours):

10:25 UTC - Firmware Update Campaign
├── Target: 50,000 servers (North America region)
├── Update: OpenBMC 2.13.0 → 2.13.1
├── Success Rate: 99.97% (15 manual interventions required)
└── Duration: 4 hours 23 minutes

08:15 UTC - Power Optimization Rollout
├── Target: All regions
├── Action: Dynamic power scaling deployment
├── Expected Savings: 12% power reduction
└── Status: 85% complete

06:30 UTC - Predictive Maintenance Alert
├── Component: PSU failure predicted (48-hour window)
├── Affected Servers: 1,247 units
├── Action: Proactive PSU replacement scheduled
└── Business Impact: Zero downtime expected

04:45 UTC - Security Patch Deployment
├── Target: Critical security update
├── Scope: 1.8M servers globally
├── Method: Rolling deployment
└── Completion: 100% success, 0 downtime</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// CSS styling for the RedFish/BMC analysis demonstrations
const style = document.createElement('style');
style.textContent = `
    .demo-output {
        background: linear-gradient(135deg, #1e293b, #334155);
        border: 1px solid #475569;
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        color: #e2e8f0;
    }

    .csp-detail, .csp-analysis-grid > div {
        background: #2d3748;
        border: 1px solid #4a5568;
        border-radius: 8px;
        padding: 15px;
        margin: 15px 0;
    }

    .aws-detail { border-left: 4px solid #ff9900; }
    .azure-detail { border-left: 4px solid #0078d4; }
    .gcp-detail { border-left: 4px solid #4285f4; }
    .oracle-detail { border-left: 4px solid #f80000; }

    .implementation-metrics, .csp-analysis-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 15px;
        margin: 15px 0;
    }

    .metric {
        background: #374151;
        padding: 12px;
        border-radius: 6px;
        border-left: 3px solid #60a5fa;
    }

    .api-call {
        background: #1e293b;
        border: 1px solid #4a5568;
        border-radius: 6px;
        padding: 15px;
        margin: 15px 0;
    }

    .api-response, .api-request {
        background: #0f172a;
        border: 1px solid #334155;
        padding: 12px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        overflow-x: auto;
        white-space: pre;
        color: #e2e8f0;
        margin-top: 10px;
    }

    .api-status {
        margin-top: 10px;
        padding: 8px 12px;
        border-radius: 4px;
        font-weight: bold;
    }

    .api-status.success {
        background: rgba(34, 197, 94, 0.2);
        color: #22c55e;
        border: 1px solid #22c55e;
    }

    .health-dashboard, .hyperv-dashboard, .monitoring-dashboard {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }

    .health-metric, .hyperv-metric, .monitor-metric {
        background: #374151;
        border: 1px solid #6b7280;
        border-radius: 6px;
        padding: 15px;
    }

    .metric-value {
        font-size: 20px;
        font-weight: bold;
        margin: 8px 0;
    }

    .metric-value.ok { color: #22c55e; }
    .metric-value.warning { color: #eab308; }
    .metric-value.critical { color: #ef4444; }

    .vm-slot, .migration-item, .alert {
        background: #2d3748;
        padding: 8px;
        margin: 6px 0;
        border-radius: 4px;
    }

    .vm-slot.available { border: 1px dashed #6b7280; opacity: 0.7; }

    .alert.info { border-left: 3px solid #60a5fa; }
    .alert.warning { border-left: 3px solid #eab308; }
    .alert.success { border-left: 3px solid #22c55e; }

    .prediction-chart, .chart-data {
        background: #1e293b;
        padding: 15px;
        border-radius: 6px;
    }

    .data-point {
        display: flex;
        align-items: center;
        margin: 8px 0;
    }

    .time {
        width: 60px;
        font-weight: bold;
        color: #94a3b8;
    }

    .cpu-bar {
        background: linear-gradient(90deg, #22c55e 0%, #eab308 70%, #ef4444 100%);
        height: 20px;
        border-radius: 4px;
        display: inline-block;
        color: #000;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        margin-left: 10px;
        min-width: 100px;
    }

    .tpu-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin: 15px 0;
    }

    .tpu-chip {
        padding: 10px;
        text-align: center;
        border-radius: 6px;
        font-size: 12px;
        font-weight: bold;
    }

    .tpu-chip.active { background: #22c55e; color: #000; }
    .tpu-chip.idle { background: #6b7280; color: #fff; }
    .tpu-chip.maintenance { background: #eab308; color: #000; }

    .error-budget .budget-item {
        display: flex;
        align-items: center;
        margin: 10px 0;
    }

    .budget-bar {
        flex: 1;
        height: 20px;
        background: #374151;
        border-radius: 10px;
        margin: 0 10px;
        position: relative;
        overflow: hidden;
    }

    .used {
        display: block;
        height: 100%;
        background: #ef4444;
        border-radius: 10px;
    }

    .autonomous-features, .security-automation, .repair-automation {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin: 20px 0;
    }

    .feature-panel, .security-panel, .repair-panel {
        background: #374151;
        border: 1px solid #6b7280;
        border-radius: 8px;
        padding: 15px;
    }

    .timeline-event, .scaling-event, .recovery-event {
        background: #2d3748;
        border-left: 3px solid #34d399;
        padding: 10px;
        margin: 10px 0;
        border-radius: 4px;
    }

    .sla-bar {
        width: 100%;
        height: 25px;
        background: #374151;
        border-radius: 12px;
        position: relative;
        overflow: hidden;
        margin: 10px 0;
    }

    .achieved {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, #22c55e, #16a34a);
        color: #000;
        text-align: center;
        line-height: 25px;
        font-weight: bold;
        border-radius: 12px;
    }

    .deployment-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 15px 0;
    }

    .deployment-region {
        background: #374151;
        padding: 12px;
        border-radius: 6px;
        text-align: center;
    }

    .ops-log {
        background: #0f172a;
        color: #e2e8f0;
        padding: 15px;
        border-radius: 6px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        line-height: 1.4;
        overflow-x: auto;
        white-space: pre;
    }
`;

document.head.appendChild(style);