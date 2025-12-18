// DataCenter Architecture Demo Functions

function generateRandomHex(length) {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function visualizeDataCenterLayout() {
    const outputDiv = document.getElementById('datacenter-demo-output');

    // Show loading state
    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🏢 Generating datacenter layout visualization...</p>
        </div>
    `;

    setTimeout(() => {
        const layoutData = generateDataCenterLayoutData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🏢 DataCenter Physical Layout Visualization</h4>

                <div class="datacenter-facility">
                    <div class="facility-overview">
                        <h5>📊 Facility Overview - ${layoutData.facility.name}</h5>
                        <div class="facility-stats">
                            <div class="stat-metric">
                                <span class="stat-icon">🏢</span>
                                <div class="stat-content">
                                    <span class="stat-value">${layoutData.facility.size.toLocaleString()} sq ft</span>
                                    <span class="stat-label">Total Area</span>
                                </div>
                            </div>
                            <div class="stat-metric">
                                <span class="stat-icon">⚡</span>
                                <div class="stat-content">
                                    <span class="stat-value">${layoutData.facility.powerCapacity} MW</span>
                                    <span class="stat-label">Power Capacity</span>
                                </div>
                            </div>
                            <div class="stat-metric">
                                <span class="stat-icon">🌡️</span>
                                <div class="stat-content">
                                    <span class="stat-value">${layoutData.facility.coolingCapacity} tons</span>
                                    <span class="stat-label">Cooling Capacity</span>
                                </div>
                            </div>
                            <div class="stat-metric">
                                <span class="stat-icon">🖥️</span>
                                <div class="stat-content">
                                    <span class="stat-value">${layoutData.facility.totalServers.toLocaleString()}</span>
                                    <span class="stat-label">Total Servers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="data-halls-layout">
                        <h5>🏭 Data Halls Layout</h5>
                        <div class="halls-grid">
                            ${layoutData.dataHalls.map(hall => `
                                <div class="data-hall ${hall.type}">
                                    <div class="hall-header">
                                        <span class="hall-name">${hall.name}</span>
                                        <span class="hall-type">${hall.type}</span>
                                        <span class="hall-power">${hall.power}MW</span>
                                    </div>
                                    <div class="hall-content">
                                        <div class="hall-stats">
                                            <div class="hall-stat">
                                                <span>Racks:</span>
                                                <span>${hall.racks}</span>
                                            </div>
                                            <div class="hall-stat">
                                                <span>Servers:</span>
                                                <span>${hall.servers.toLocaleString()}</span>
                                            </div>
                                            <div class="hall-stat">
                                                <span>Utilization:</span>
                                                <span>${hall.utilization}%</span>
                                            </div>
                                        </div>
                                        <div class="rack-visualization">
                                            ${Array.from({length: Math.min(hall.racks / 10, 6)}, (_, row) =>
                                                `<div class="rack-row">
                                                    ${Array.from({length: Math.min(10, hall.racks - row * 10)}, (_, col) =>
                                                        `<div class="rack-unit ${hall.type}"></div>`
                                                    ).join('')}
                                                </div>`
                                            ).join('')}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="rack-detail-view">
                        <h5>🔧 Detailed Rack Composition</h5>
                        <div class="rack-types">
                            ${layoutData.rackTypes.map(rackType => `
                                <div class="rack-type-detail">
                                    <div class="rack-type-header">
                                        <span class="rack-name">${rackType.name}</span>
                                        <span class="rack-power">${rackType.power}kW</span>
                                        <span class="rack-count">${rackType.count} racks</span>
                                    </div>

                                    <div class="rack-chassis-layout">
                                        <div class="chassis-list">
                                            ${rackType.chassisLayout.map(chassis => `
                                                <div class="chassis-unit ${chassis.type}" title="${chassis.description}">
                                                    <div class="chassis-position">U${chassis.position}</div>
                                                    <div class="chassis-info">
                                                        <div class="chassis-name">${chassis.name}</div>
                                                        <div class="chassis-specs">${chassis.specs}</div>
                                                    </div>
                                                    <div class="chassis-resources">
                                                        ${chassis.resources.map(resource =>
                                                            `<span class="resource-tag">${resource}</span>`
                                                        ).join('')}
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>

                                    <div class="rack-resources-summary">
                                        <h6>Resource Summary per Rack</h6>
                                        <div class="resources-grid">
                                            <div class="resource-summary">
                                                <span class="resource-label">CPU Cores:</span>
                                                <span class="resource-value">${rackType.totalCores}</span>
                                            </div>
                                            <div class="resource-summary">
                                                <span class="resource-label">Memory:</span>
                                                <span class="resource-value">${rackType.totalMemory}TB</span>
                                            </div>
                                            <div class="resource-summary">
                                                <span class="resource-label">Storage:</span>
                                                <span class="resource-value">${rackType.totalStorage}TB</span>
                                            </div>
                                            <div class="resource-summary">
                                                <span class="resource-label">GPUs:</span>
                                                <span class="resource-value">${rackType.totalGPUs}</span>
                                            </div>
                                            <div class="resource-summary">
                                                <span class="resource-label">Network:</span>
                                                <span class="resource-value">${rackType.totalNetwork}Gbps</span>
                                            </div>
                                            <div class="resource-summary">
                                                <span class="resource-label">Power Draw:</span>
                                                <span class="resource-value">${rackType.powerDraw}kW</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="infrastructure-systems">
                        <h5>🔌 Infrastructure Systems</h5>
                        <div class="infrastructure-grid">
                            <div class="infrastructure-system power">
                                <h6>⚡ Power Infrastructure</h6>
                                <div class="system-details">
                                    <ul>
                                        <li><strong>Primary Feed:</strong> ${layoutData.infrastructure.power.primary}</li>
                                        <li><strong>Backup Feed:</strong> ${layoutData.infrastructure.power.backup}</li>
                                        <li><strong>UPS Systems:</strong> ${layoutData.infrastructure.power.ups}</li>
                                        <li><strong>Generators:</strong> ${layoutData.infrastructure.power.generators}</li>
                                        <li><strong>PDU Configuration:</strong> ${layoutData.infrastructure.power.pdu}</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="infrastructure-system cooling">
                                <h6>🌡️ Cooling Infrastructure</h6>
                                <div class="system-details">
                                    <ul>
                                        <li><strong>CRAC Units:</strong> ${layoutData.infrastructure.cooling.crac}</li>
                                        <li><strong>Chilled Water:</strong> ${layoutData.infrastructure.cooling.chilledWater}</li>
                                        <li><strong>Design:</strong> ${layoutData.infrastructure.cooling.design}</li>
                                        <li><strong>Redundancy:</strong> ${layoutData.infrastructure.cooling.redundancy}</li>
                                        <li><strong>Efficiency (PUE):</strong> ${layoutData.infrastructure.cooling.pue}</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="infrastructure-system network">
                                <h6>🌐 Network Infrastructure</h6>
                                <div class="system-details">
                                    <ul>
                                        <li><strong>Spine Switches:</strong> ${layoutData.infrastructure.network.spine}</li>
                                        <li><strong>Leaf Switches:</strong> ${layoutData.infrastructure.network.leaf}</li>
                                        <li><strong>ToR Switches:</strong> ${layoutData.infrastructure.network.tor}</li>
                                        <li><strong>Bandwidth:</strong> ${layoutData.infrastructure.network.bandwidth}</li>
                                        <li><strong>Redundancy:</strong> ${layoutData.infrastructure.network.redundancy}</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="infrastructure-system security">
                                <h6>🔒 Physical Security</h6>
                                <div class="system-details">
                                    <ul>
                                        <li><strong>Perimeter:</strong> ${layoutData.infrastructure.security.perimeter}</li>
                                        <li><strong>Access Control:</strong> ${layoutData.infrastructure.security.access}</li>
                                        <li><strong>Surveillance:</strong> ${layoutData.infrastructure.security.surveillance}</li>
                                        <li><strong>Fire Suppression:</strong> ${layoutData.infrastructure.security.fireSuppression}</li>
                                        <li><strong>Compliance:</strong> ${layoutData.infrastructure.security.compliance}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 2000);
}

function generateDataCenterLayoutData() {
    return {
        facility: {
            name: "DataCenter East-1 (Virginia)",
            size: 750000,
            powerCapacity: 150,
            coolingCapacity: 12000,
            totalServers: 45678
        },
        dataHalls: [
            {
                name: "Hall A",
                type: "compute",
                power: 40,
                racks: 240,
                servers: 9600,
                utilization: 87
            },
            {
                name: "Hall B",
                type: "storage",
                power: 30,
                racks: 180,
                servers: 5400,
                utilization: 92
            },
            {
                name: "Hall C",
                type: "network",
                power: 20,
                racks: 60,
                servers: 480,
                utilization: 78
            },
            {
                name: "Hall D",
                type: "ai-ml",
                power: 60,
                racks: 150,
                servers: 3000,
                utilization: 95
            }
        ],
        rackTypes: [
            {
                name: "Compute Rack (Standard)",
                power: 25,
                count: 240,
                powerDraw: 22,
                totalCores: 1600,
                totalMemory: 20,
                totalStorage: 160,
                totalGPUs: 0,
                totalNetwork: 1000,
                chassisLayout: [
                    {
                        position: "1-2",
                        name: "Network Switch",
                        type: "network",
                        specs: "48x25GbE + 6x100GbE",
                        resources: ["25G", "100G"],
                        description: "Top-of-Rack switch with uplinks"
                    },
                    {
                        position: "3-42",
                        name: "1U Compute Servers",
                        type: "compute",
                        specs: "2x Intel Xeon, 512GB RAM, 2x NVMe",
                        resources: ["80 cores", "512GB", "2x NVMe"],
                        description: "40x 1U dual-socket servers"
                    }
                ]
            },
            {
                name: "GPU Training Rack (AI/ML)",
                power: 40,
                count: 150,
                powerDraw: 38,
                totalCores: 960,
                totalMemory: 8,
                totalStorage: 64,
                totalGPUs: 64,
                totalNetwork: 1600,
                chassisLayout: [
                    {
                        position: "1-2",
                        name: "InfiniBand Switch",
                        type: "network",
                        specs: "36x200Gb InfiniBand NDR",
                        resources: ["200G IB"],
                        description: "High-performance GPU interconnect"
                    },
                    {
                        position: "3-42",
                        name: "2U GPU Servers",
                        type: "gpu",
                        specs: "2x AMD EPYC, 8x H100, 1TB RAM",
                        resources: ["96 cores", "8x H100", "1TB RAM"],
                        description: "20x 2U GPU training nodes"
                    }
                ]
            },
            {
                name: "Storage Rack (Dense)",
                power: 20,
                count: 180,
                powerDraw: 18,
                totalCores: 480,
                totalMemory: 6,
                totalStorage: 5760,
                totalGPUs: 0,
                totalNetwork: 800,
                chassisLayout: [
                    {
                        position: "1-2",
                        name: "Storage Controller",
                        type: "storage",
                        specs: "Dual controller with 100GbE",
                        resources: ["100G"],
                        description: "Redundant storage controller"
                    },
                    {
                        position: "3-42",
                        name: "4U Storage Chassis",
                        type: "storage",
                        specs: "36x15.36TB NVMe, dual PSU",
                        resources: ["576TB", "36x NVMe"],
                        description: "10x 4U dense storage chassis"
                    }
                ]
            }
        ],
        infrastructure: {
            power: {
                primary: "Utility grid (2x15kV feeds)",
                backup: "6x2.5MW diesel generators",
                ups: "N+1 UPS systems (10min runtime)",
                generators: "72-hour fuel supply on-site",
                pdu: "Dual A+B feeds per rack"
            },
            cooling: {
                crac: "48x Computer Room Air Conditioning units",
                chilledWater: "4x1500-ton chillers with thermal storage",
                design: "Hot aisle containment with liquid cooling",
                redundancy: "N+1 cooling, 2N chilled water",
                pue: "1.28 (annual average)"
            },
            network: {
                spine: "8x400G spine switches (25.6Tbps each)",
                leaf: "48x100G leaf switches per pod",
                tor: "1200x25G/100G top-of-rack switches",
                bandwidth: "Total fabric: 819Tbps",
                redundancy: "Diverse fiber paths, no single points of failure"
            },
            security: {
                perimeter: "16ft fence + razor wire + detection sensors",
                access: "Biometric + badge + mantrap entry",
                surveillance: "360° camera coverage + thermal imaging",
                fireSuppression: "VESDA smoke detection + FM-200 suppression",
                compliance: "SOC 2, ISO 27001, PCI DSS Level 1"
            }
        }
    };
}

function demonstrateResourceProvisioning() {
    const outputDiv = document.getElementById('datacenter-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>⚙️ Simulating resource provisioning workflow...</p>
        </div>
    `;

    setTimeout(() => {
        const provisioningData = generateResourceProvisioningData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>⚙️ Resource Provisioning Workflow</h4>

                <div class="provisioning-scenario">
                    <div class="scenario-header">
                        <h5>📋 Provisioning Request: ${provisioningData.request.workloadType}</h5>
                        <div class="request-summary">
                            <div class="request-item">
                                <span class="request-label">Tenant:</span>
                                <span class="request-value">${provisioningData.request.tenantId}</span>
                            </div>
                            <div class="request-item">
                                <span class="request-label">SLA Tier:</span>
                                <span class="request-value">${provisioningData.request.slaTier}</span>
                            </div>
                            <div class="request-item">
                                <span class="request-label">Region:</span>
                                <span class="request-value">${provisioningData.request.region}</span>
                            </div>
                            <div class="request-item">
                                <span class="request-label">Duration:</span>
                                <span class="request-value">${provisioningData.request.duration}</span>
                            </div>
                        </div>
                    </div>

                    <div class="resource-requirements">
                        <h5>💻 Resource Requirements</h5>
                        <div class="requirements-grid">
                            <div class="requirement-category">
                                <h6>🖥️ Compute Resources</h6>
                                <ul>
                                    ${provisioningData.requirements.compute.map(req =>
                                        `<li><strong>${req.resource}:</strong> ${req.specification}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                            <div class="requirement-category">
                                <h6>🎮 GPU Resources</h6>
                                <ul>
                                    ${provisioningData.requirements.gpu.map(req =>
                                        `<li><strong>${req.resource}:</strong> ${req.specification}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                            <div class="requirement-category">
                                <h6>💾 Storage Resources</h6>
                                <ul>
                                    ${provisioningData.requirements.storage.map(req =>
                                        `<li><strong>${req.resource}:</strong> ${req.specification}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                            <div class="requirement-category">
                                <h6>🌐 Network Resources</h6>
                                <ul>
                                    ${provisioningData.requirements.network.map(req =>
                                        `<li><strong>${req.resource}:</strong> ${req.specification}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="provisioning-workflow">
                        <h5>⚙️ Automated Provisioning Workflow</h5>
                        <div class="workflow-steps">
                            ${provisioningData.workflow.map((step, index) => `
                                <div class="workflow-step ${step.status}">
                                    <div class="step-number">${index + 1}</div>
                                    <div class="step-content">
                                        <div class="step-title">${step.title}</div>
                                        <div class="step-description">${step.description}</div>
                                        <div class="step-duration">Duration: ${step.duration}</div>
                                        ${step.details ? `
                                            <div class="step-details">
                                                <strong>Details:</strong>
                                                <ul>
                                                    ${step.details.map(detail => `<li>${detail}</li>`).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                    </div>
                                    <div class="step-status-icon">
                                        ${step.status === 'completed' ? '✅' :
                                          step.status === 'in-progress' ? '🔄' :
                                          step.status === 'pending' ? '⏳' : '❌'}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="resource-allocation">
                        <h5>📍 Physical Resource Allocation</h5>
                        <div class="allocation-result">
                            ${provisioningData.allocation.map(alloc => `
                                <div class="allocation-item">
                                    <div class="allocation-header">
                                        <span class="resource-type">${alloc.resourceType}</span>
                                        <span class="allocation-location">${alloc.location}</span>
                                    </div>
                                    <div class="allocation-details">
                                        <div class="hardware-details">
                                            <strong>Hardware:</strong> ${alloc.hardware}
                                        </div>
                                        <div class="capacity-details">
                                            <strong>Allocated:</strong> ${alloc.allocated}
                                        </div>
                                        <div class="performance-details">
                                            <strong>Performance:</strong> ${alloc.performance}
                                        </div>
                                        <div class="isolation-details">
                                            <strong>Isolation:</strong> ${alloc.isolation}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="monitoring-setup">
                        <h5>📊 Monitoring & Management Setup</h5>
                        <div class="monitoring-config">
                            <div class="monitoring-category">
                                <h6>🔍 Resource Monitoring</h6>
                                <pre class="monitoring-code">
# Kubernetes Resource Monitoring Setup
apiVersion: v1
kind: ServiceMonitor
metadata:
  name: tenant-workload-monitoring
spec:
  selector:
    matchLabels:
      tenant: "${provisioningData.request.tenantId}"
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics

# Resource Quotas and Limits
apiVersion: v1
kind: ResourceQuota
metadata:
  name: tenant-${provisioningData.request.tenantId}-quota
spec:
  hard:
    requests.cpu: "${provisioningData.quotas.cpu}"
    requests.memory: "${provisioningData.quotas.memory}"
    requests.nvidia.com/gpu: "${provisioningData.quotas.gpu}"
    persistentvolumeclaims: "${provisioningData.quotas.storage}"

# Network Policy for Tenant Isolation
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: tenant-${provisioningData.request.tenantId}-isolation
spec:
  podSelector:
    matchLabels:
      tenant: "${provisioningData.request.tenantId}"
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          tenant: "${provisioningData.request.tenantId}"
                                </pre>
                            </div>

                            <div class="monitoring-category">
                                <h6>📈 Performance SLA Monitoring</h6>
                                <div class="sla-metrics">
                                    ${provisioningData.slaMetrics.map(metric => `
                                        <div class="sla-metric">
                                            <div class="metric-name">${metric.name}</div>
                                            <div class="metric-target">Target: ${metric.target}</div>
                                            <div class="metric-current">Current: ${metric.current}</div>
                                            <div class="metric-status ${metric.status}">${metric.status}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="provisioning-summary">
                        <h5>📋 Provisioning Summary</h5>
                        <div class="summary-metrics">
                            <div class="summary-metric success">
                                <span class="summary-label">Total Provisioning Time:</span>
                                <span class="summary-value">${provisioningData.summary.totalTime}</span>
                            </div>
                            <div class="summary-metric success">
                                <span class="summary-label">Resources Allocated:</span>
                                <span class="summary-value">${provisioningData.summary.resourcesAllocated}</span>
                            </div>
                            <div class="summary-metric success">
                                <span class="summary-label">Cost Estimate:</span>
                                <span class="summary-value">${provisioningData.summary.costEstimate}/hour</span>
                            </div>
                            <div class="summary-metric success">
                                <span class="summary-label">SLA Compliance:</span>
                                <span class="summary-value">${provisioningData.summary.slaCompliance}</span>
                            </div>
                        </div>

                        <div class="next-steps">
                            <h6>📌 Next Steps</h6>
                            <ul>
                                <li>✅ Resources provisioned and ready for workload deployment</li>
                                <li>🔄 Monitoring dashboards configured for tenant visibility</li>
                                <li>🔒 Security policies applied for multi-tenant isolation</li>
                                <li>📊 SLA monitoring active with automated alerting</li>
                                <li>💳 Billing and chargeback systems updated</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 2500);
}

function generateResourceProvisioningData() {
    return {
        request: {
            workloadType: "Large Language Model Training",
            tenantId: "enterprise-customer-001",
            slaTier: "Premium",
            region: "us-east-1",
            duration: "7 days"
        },
        requirements: {
            compute: [
                { resource: "CPU Cores", specification: "256 cores (4x64-core nodes)" },
                { resource: "Memory", specification: "2TB DDR5 (512GB per node)" },
                { resource: "Architecture", specification: "AMD EPYC 9654 or Intel Xeon 8490H" }
            ],
            gpu: [
                { resource: "GPU Count", specification: "32x NVIDIA H100 SXM5 80GB" },
                { resource: "GPU Memory", specification: "2.56TB total GPU memory" },
                { resource: "Interconnect", specification: "NVLink 4.0 + InfiniBand NDR 400Gb/s" }
            ],
            storage: [
                { resource: "High-Performance", specification: "50TB NVMe PCIe 5.0 (training data)" },
                { resource: "Capacity Storage", specification: "500TB object storage (datasets)" },
                { resource: "IOPS Requirements", specification: "1M+ random IOPS" }
            ],
            network: [
                { resource: "Bandwidth", specification: "400Gbps InfiniBand per node" },
                { resource: "Latency", specification: "<2μs inter-node latency" },
                { resource: "External Access", specification: "10Gbps internet connectivity" }
            ]
        },
        workflow: [
            {
                title: "Resource Discovery & Planning",
                description: "Analyze datacenter inventory and identify optimal resource allocation",
                duration: "30 seconds",
                status: "completed",
                details: [
                    "Scanned 4 datacenters for H100 GPU availability",
                    "Identified Hall D racks 15-18 with required capacity",
                    "Validated network topology for multi-node training"
                ]
            },
            {
                title: "Hardware Health Validation",
                description: "Verify hardware health and perform pre-allocation testing",
                duration: "2 minutes",
                status: "completed",
                details: [
                    "BMC health checks passed on all target nodes",
                    "GPU burn-in testing completed successfully",
                    "Storage performance validation completed"
                ]
            },
            {
                title: "Network Configuration",
                description: "Configure VLANs, security policies, and performance settings",
                duration: "3 minutes",
                status: "completed",
                details: [
                    "Created tenant-isolated network namespace",
                    "Configured InfiniBand fabric for RDMA performance",
                    "Applied security policies for multi-tenant isolation"
                ]
            },
            {
                title: "Compute Resource Allocation",
                description: "Provision CPU, memory, and configure hypervisor isolation",
                duration: "2 minutes",
                status: "completed",
                details: [
                    "Allocated 4x2-socket servers in rack 16-17",
                    "Configured NUMA topology optimization",
                    "Applied CPU affinity for GPU-optimal placement"
                ]
            },
            {
                title: "GPU Resource Configuration",
                description: "Initialize GPUs, configure MIG instances, and validate interconnects",
                duration: "5 minutes",
                status: "in-progress",
                details: [
                    "Initialized 32x H100 GPUs across 4 nodes",
                    "Configured full GPU allocation (no MIG partitioning)",
                    "Validated NVLink topology and bandwidth"
                ]
            },
            {
                title: "Storage Provisioning",
                description: "Allocate high-performance storage and configure data paths",
                duration: "3 minutes",
                status: "pending"
            },
            {
                title: "Monitoring & Alerting Setup",
                description: "Configure tenant-specific monitoring, logging, and SLA tracking",
                duration: "2 minutes",
                status: "pending"
            }
        ],
        allocation: [
            {
                resourceType: "Compute Cluster",
                location: "Hall D, Rack 16-17, Nodes 1-4",
                hardware: "4x Dual AMD EPYC 9654 (96 cores each)",
                allocated: "256 CPU cores, 2TB DDR5 memory",
                performance: "3.2GHz base, 4.1GHz boost, 7200MHz memory",
                isolation: "Hardware-enforced NUMA boundaries"
            },
            {
                resourceType: "GPU Cluster",
                location: "Hall D, Rack 16-17, GPU Nodes 1-4",
                hardware: "32x NVIDIA H100 SXM5 80GB",
                allocated: "2.56TB GPU memory, NVLink 4.0 fabric",
                performance: "989 TFLOPS BF16, 3.35TB/s memory bandwidth",
                isolation: "Dedicated GPU allocation, no sharing"
            },
            {
                resourceType: "High-Performance Storage",
                location: "Hall D, Storage Arrays SA-201-204",
                hardware: "200x Samsung PM9A3 7.68TB NVMe",
                allocated: "50TB usable with RAID-10 protection",
                performance: "14GB/s seq, 1.2M IOPS random",
                isolation: "Dedicated namespace per tenant"
            },
            {
                resourceType: "Network Fabric",
                location: "Hall D, InfiniBand Spine/Leaf",
                hardware: "Mellanox Quantum-2 InfiniBand NDR",
                allocated: "400Gbps per node, full bisection bandwidth",
                performance: "<2μs latency, RDMA capable",
                isolation: "VLAN isolation with tenant-specific subnets"
            }
        ],
        quotas: {
            cpu: "256",
            memory: "2Ti",
            gpu: "32",
            storage: "50Ti"
        },
        slaMetrics: [
            {
                name: "GPU Utilization",
                target: ">85%",
                current: "92%",
                status: "meeting"
            },
            {
                name: "Training Throughput",
                target: ">1000 samples/sec",
                current: "1247 samples/sec",
                status: "exceeding"
            },
            {
                name: "Network Latency",
                target: "<2μs",
                current: "1.4μs",
                status: "meeting"
            },
            {
                name: "Storage IOPS",
                target: ">1M IOPS",
                current: "1.2M IOPS",
                status: "meeting"
            }
        ],
        summary: {
            totalTime: "12 minutes 30 seconds",
            resourcesAllocated: "256 CPU cores, 32 GPUs, 50TB storage",
            costEstimate: "$847",
            slaCompliance: "✅ All SLA targets met or exceeded"
        }
    };
}

function simulateFaultTolerance() {
    const outputDiv = document.getElementById('datacenter-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔄 Simulating fault tolerance scenarios...</p>
        </div>
    `;

    setTimeout(() => {
        const faultData = generateFaultToleranceData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🔄 Fault Tolerance & Recovery Simulation</h4>

                <div class="fault-scenarios">
                    <div class="fault-scenario">
                        <h5>⚡ Scenario 1: Power System Failure</h5>
                        <div class="scenario-details">
                            <div class="fault-description">
                                <p><strong>Failure Type:</strong> Primary utility feed failure</p>
                                <p><strong>Affected Systems:</strong> Hall D (60MW load)</p>
                                <p><strong>Impact Scope:</strong> 150 racks, 3000 servers</p>
                                <p><strong>Redundancy Available:</strong> Secondary utility feed + UPS + generators</p>
                            </div>

                            <div class="fault-timeline">
                                <h6>⏱️ Fault Response Timeline</h6>
                                <div class="timeline-events">
                                    ${faultData.powerFailure.timeline.map((event, index) => `
                                        <div class="timeline-event ${event.status}">
                                            <div class="event-time">T+${event.time}</div>
                                            <div class="event-action">${event.action}</div>
                                            <div class="event-result">${event.result}</div>
                                            <div class="event-systems">${event.systems}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="recovery-metrics">
                                <h6>📊 Recovery Metrics</h6>
                                <div class="metrics-grid">
                                    <div class="recovery-metric success">
                                        <span class="metric-name">Failover Time:</span>
                                        <span class="metric-value">${faultData.powerFailure.metrics.failoverTime}</span>
                                    </div>
                                    <div class="recovery-metric success">
                                        <span class="metric-name">Workload Impact:</span>
                                        <span class="metric-value">${faultData.powerFailure.metrics.workloadImpact}</span>
                                    </div>
                                    <div class="recovery-metric success">
                                        <span class="metric-name">SLA Compliance:</span>
                                        <span class="metric-value">${faultData.powerFailure.metrics.slaCompliance}</span>
                                    </div>
                                    <div class="recovery-metric success">
                                        <span class="metric-name">Generator Runtime:</span>
                                        <span class="metric-value">${faultData.powerFailure.metrics.generatorRuntime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="fault-scenario">
                        <h5>🖥️ Scenario 2: Server Hardware Failure</h5>
                        <div class="scenario-details">
                            <div class="fault-description">
                                <p><strong>Failure Type:</strong> Memory module failure with ECC overflow</p>
                                <p><strong>Affected Systems:</strong> GPU training node in Hall D, Rack 17</p>
                                <p><strong>Impact Scope:</strong> 1 server with 8x H100 GPUs (critical workload)</p>
                                <p><strong>Redundancy Available:</strong> Cluster redundancy + live migration</p>
                            </div>

                            <div class="fault-detection">
                                <h6>🔍 Fault Detection & Isolation</h6>
                                <div class="detection-steps">
                                    ${faultData.hardwareFailure.detection.map((step, index) => `
                                        <div class="detection-step">
                                            <div class="step-number">${index + 1}</div>
                                            <div class="step-content">
                                                <div class="step-title">${step.title}</div>
                                                <div class="step-details">${step.details}</div>
                                                <div class="step-timing">Detected in: ${step.timing}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="workload-migration">
                                <h6>🔄 Automated Workload Migration</h6>
                                <pre class="migration-log">
${faultData.hardwareFailure.migrationLog.join('\n')}
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div class="fault-scenario">
                        <h5>🌐 Scenario 3: Network Fabric Failure</h5>
                        <div class="scenario-details">
                            <div class="fault-description">
                                <p><strong>Failure Type:</strong> Spine switch failure in InfiniBand fabric</p>
                                <p><strong>Affected Systems:</strong> 25% reduction in east-west bandwidth</p>
                                <p><strong>Impact Scope:</strong> Multi-node AI training jobs affected</p>
                                <p><strong>Redundancy Available:</strong> Multi-path routing + traffic rebalancing</p>
                            </div>

                            <div class="network-recovery">
                                <h6>📡 Network Recovery Actions</h6>
                                <div class="recovery-actions">
                                    ${faultData.networkFailure.recovery.map((action, index) => `
                                        <div class="recovery-action ${action.status}">
                                            <div class="action-step">Step ${index + 1}</div>
                                            <div class="action-content">
                                                <div class="action-title">${action.title}</div>
                                                <div class="action-description">${action.description}</div>
                                                <div class="action-result">${action.result}</div>
                                                <div class="action-timing">${action.timing}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="redundancy-architecture">
                    <h5>🏗️ Multi-Level Redundancy Architecture</h5>
                    <div class="redundancy-layers">
                        <div class="redundancy-layer geographic">
                            <h6>🌍 Geographic Redundancy</h6>
                            <div class="layer-details">
                                <div class="redundancy-item">
                                    <span class="item-name">Primary Region:</span>
                                    <span class="item-value">US-East-1 (Virginia)</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Backup Region:</span>
                                    <span class="item-value">US-West-2 (Oregon)</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Replication:</span>
                                    <span class="item-value">Real-time data synchronization</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Failover Time:</span>
                                    <span class="item-value">&lt; 5 minutes (automated)</span>
                                </div>
                            </div>
                        </div>

                        <div class="redundancy-layer zone">
                            <h6>🏢 Availability Zone Redundancy</h6>
                            <div class="layer-details">
                                <div class="redundancy-item">
                                    <span class="item-name">AZ Configuration:</span>
                                    <span class="item-value">3 zones with independent infrastructure</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Power Sources:</span>
                                    <span class="item-value">Separate utility substations</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Network Paths:</span>
                                    <span class="item-value">Diverse fiber routes</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Isolation:</span>
                                    <span class="item-value">50+ mile physical separation</span>
                                </div>
                            </div>
                        </div>

                        <div class="redundancy-layer facility">
                            <h6>🔌 Facility-Level Redundancy</h6>
                            <div class="layer-details">
                                <div class="redundancy-item">
                                    <span class="item-name">Power Design:</span>
                                    <span class="item-value">N+1 UPS, 2N generators</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Cooling Design:</span>
                                    <span class="item-value">N+1 CRAC, 2N chillers</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Network Design:</span>
                                    <span class="item-value">Multi-path fabric, no SPOF</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Fire Suppression:</span>
                                    <span class="item-value">Dual detection, redundant suppression</span>
                                </div>
                            </div>
                        </div>

                        <div class="redundancy-layer server">
                            <h6>🖥️ Server-Level Redundancy</h6>
                            <div class="layer-details">
                                <div class="redundancy-item">
                                    <span class="item-name">Power Supplies:</span>
                                    <span class="item-value">Dual PSU with A+B feeds</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Network Interfaces:</span>
                                    <span class="item-value">Dual NICs with LACP bonding</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Memory:</span>
                                    <span class="item-value">ECC with SDDC protection</span>
                                </div>
                                <div class="redundancy-item">
                                    <span class="item-name">Storage:</span>
                                    <span class="item-value">RAID with hot spares</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fault-tolerance-metrics">
                    <h5>📊 Fault Tolerance KPIs</h5>
                    <div class="kpi-dashboard">
                        ${faultData.kpis.map(kpi => `
                            <div class="kpi-metric ${kpi.status}">
                                <div class="kpi-header">
                                    <span class="kpi-name">${kpi.name}</span>
                                    <span class="kpi-status ${kpi.status}">${kpi.statusText}</span>
                                </div>
                                <div class="kpi-values">
                                    <span class="kpi-target">Target: ${kpi.target}</span>
                                    <span class="kpi-current">Current: ${kpi.current}</span>
                                </div>
                                <div class="kpi-trend ${kpi.trend}">
                                    ${kpi.trend === 'improving' ? '📈' : kpi.trend === 'stable' ? '➡️' : '📉'} ${kpi.trendText}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }, 3000);
}

function generateFaultToleranceData() {
    return {
        powerFailure: {
            timeline: [
                {
                    time: "0ms",
                    action: "Primary utility feed fails",
                    result: "Power monitoring detects voltage drop",
                    systems: "UPS systems activate automatically",
                    status: "alert"
                },
                {
                    time: "10ms",
                    action: "UPS systems engage",
                    result: "Seamless power transfer to battery backup",
                    systems: "All servers maintain power",
                    status: "success"
                },
                {
                    time: "30s",
                    action: "Generator start sequence initiated",
                    result: "6x2.5MW generators begin startup",
                    systems: "Fuel systems and cooling activated",
                    status: "in-progress"
                },
                {
                    time: "45s",
                    action: "Generators reach operational speed",
                    result: "Load transfer switches engage",
                    systems: "UPS systems begin recharging",
                    status: "success"
                },
                {
                    time: "60s",
                    action: "Secondary utility feed activated",
                    result: "Manual transfer to backup utility connection",
                    systems: "Generators remain on standby",
                    status: "success"
                }
            ],
            metrics: {
                failoverTime: "<50ms (imperceptible to workloads)",
                workloadImpact: "0% - no service interruption",
                slaCompliance: "100% - all SLAs maintained",
                generatorRuntime: "15 minutes until utility restoration"
            }
        },
        hardwareFailure: {
            detection: [
                {
                    title: "ECC Memory Error Detection",
                    details: "Multiple correctable errors escalated to uncorrectable error",
                    timing: "3.2 seconds"
                },
                {
                    title: "BMC Health Alert",
                    details: "Memory module health status changed to 'Critical'",
                    timing: "3.5 seconds"
                },
                {
                    title: "Hypervisor Memory Exception",
                    details: "KVM detected memory page fault in GPU workload",
                    timing: "4.1 seconds"
                },
                {
                    title: "Workload Health Check Failure",
                    details: "Training job health checks begin failing",
                    timing: "5.8 seconds"
                },
                {
                    title: "Automated Remediation Triggered",
                    details: "Cluster orchestrator initiates workload migration",
                    timing: "6.2 seconds"
                }
            ],
            migrationLog: [
                "[2024-01-17 14:23:15] ALERT: Memory errors detected on node gpu-train-04",
                "[2024-01-17 14:23:18] INFO: Beginning workload migration for training job LLM-Train-001",
                "[2024-01-17 14:23:20] INFO: Identified target nodes: gpu-train-05, gpu-train-06",
                "[2024-01-17 14:23:25] INFO: Checkpointing model state at epoch 247/1000",
                "[2024-01-17 14:23:32] INFO: Checkpoint saved: 89.2GB model state",
                "[2024-01-17 14:23:35] INFO: Migrating checkpoint to healthy nodes",
                "[2024-01-17 14:23:47] INFO: Reconfiguring distributed training topology",
                "[2024-01-17 14:23:52] INFO: Resuming training from checkpoint on new nodes",
                "[2024-01-17 14:24:01] SUCCESS: Training resumed - lost 0.3% progress (46 seconds)",
                "[2024-01-17 14:24:05] INFO: Marking gpu-train-04 for maintenance",
                "[2024-01-17 14:24:08] INFO: Scheduling memory module replacement"
            ]
        },
        networkFailure: {
            recovery: [
                {
                    title: "Network Topology Recalculation",
                    description: "OSPF protocol recalculates routing tables without failed spine switch",
                    result: "Alternative paths identified and activated",
                    timing: "2.1 seconds",
                    status: "completed"
                },
                {
                    title: "Traffic Load Rebalancing",
                    description: "Redistribute traffic across remaining spine switches",
                    result: "Bandwidth reduced to 75% but within acceptable limits",
                    timing: "3.8 seconds",
                    status: "completed"
                },
                {
                    title: "QoS Policy Adjustment",
                    description: "Prioritize critical training traffic over batch workloads",
                    result: "AI/ML training maintains required bandwidth",
                    timing: "5.2 seconds",
                    status: "completed"
                },
                {
                    title: "Maintenance Notification",
                    description: "Schedule replacement of failed spine switch",
                    result: "Maintenance window scheduled for next available slot",
                    timing: "1 minute",
                    status: "completed"
                }
            ]
        },
        kpis: [
            {
                name: "Mean Time To Recovery (MTTR)",
                target: "<5 minutes",
                current: "2.3 minutes",
                status: "excellent",
                statusText: "Exceeding Target",
                trend: "improving",
                trendText: "15% improvement vs last quarter"
            },
            {
                name: "Availability (99.9X%)",
                target: "99.95%",
                current: "99.987%",
                status: "excellent",
                statusText: "Exceeding Target",
                trend: "stable",
                trendText: "Consistent performance"
            },
            {
                name: "Redundancy Health Score",
                target: ">95%",
                current: "98.2%",
                status: "excellent",
                statusText: "Excellent",
                trend: "stable",
                trendText: "All redundancy systems operational"
            },
            {
                name: "Automated Recovery Rate",
                target: ">90%",
                current: "94.7%",
                status: "excellent",
                statusText: "Exceeding Target",
                trend: "improving",
                trendText: "Enhanced automation deployment"
            }
        ]
    };
}

function showCSPComparison() {
    const outputDiv = document.getElementById('datacenter-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>☁️ Loading CSP architecture comparison...</p>
        </div>
    `;

    setTimeout(() => {
        const cspData = generateCSPComparisonData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>☁️ Cloud Service Provider Architecture Comparison</h4>

                <div class="csp-overview">
                    <h5>📊 CSP Market Overview</h5>
                    <div class="market-metrics">
                        <div class="market-metric">
                            <span class="metric-icon">🌐</span>
                            <div class="metric-content">
                                <span class="metric-value">${cspData.marketOverview.totalMarketSize}</span>
                                <span class="metric-label">Global Cloud Market Size</span>
                            </div>
                        </div>
                        <div class="market-metric">
                            <span class="metric-icon">🏢</span>
                            <div class="metric-content">
                                <span class="metric-value">${cspData.marketOverview.totalDatacenters.toLocaleString()}</span>
                                <span class="metric-label">Total Hyperscale DCs</span>
                            </div>
                        </div>
                        <div class="market-metric">
                            <span class="metric-icon">⚡</span>
                            <div class="metric-content">
                                <span class="metric-value">${cspData.marketOverview.totalPowerConsumption}GW</span>
                                <span class="metric-label">Global Power Consumption</span>
                            </div>
                        </div>
                        <div class="market-metric">
                            <span class="metric-icon">📈</span>
                            <div class="metric-content">
                                <span class="metric-value">${cspData.marketOverview.growthRate}%</span>
                                <span class="metric-label">Annual Growth Rate</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="csp-comparison-table">
                    <h5>🏆 Major CSP Architecture Comparison</h5>
                    <div class="comparison-grid">
                        <div class="comparison-header">
                            <div class="header-item">Feature</div>
                            <div class="header-item">AWS</div>
                            <div class="header-item">Microsoft Azure</div>
                            <div class="header-item">Google Cloud</div>
                            <div class="header-item">Oracle Cloud</div>
                        </div>

                        ${cspData.comparisonFeatures.map(feature => `
                            <div class="comparison-row">
                                <div class="feature-name">${feature.name}</div>
                                <div class="feature-value aws">${feature.aws}</div>
                                <div class="feature-value azure">${feature.azure}</div>
                                <div class="feature-value gcp">${feature.gcp}</div>
                                <div class="feature-value oci">${feature.oci}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="csp-detailed-analysis">
                    <h5>🔍 Detailed Architecture Analysis</h5>
                    <div class="csp-tabs">
                        <div class="csp-tab aws">
                            <div class="tab-header">
                                <h6>🟧 Amazon Web Services (AWS)</h6>
                                <span class="market-share">Market Share: ${cspData.marketShares.aws}%</span>
                            </div>
                            <div class="tab-content">
                                <div class="architecture-strengths">
                                    <strong>🚀 Architecture Strengths:</strong>
                                    <ul>
                                        <li><strong>Nitro System:</strong> Hardware-accelerated virtualization with dedicated security chips</li>
                                        <li><strong>Custom Silicon:</strong> Graviton processors optimized for cloud workloads</li>
                                        <li><strong>Global Scale:</strong> ${cspData.details.aws.regions} regions, ${cspData.details.aws.azs} availability zones</li>
                                        <li><strong>Service Breadth:</strong> ${cspData.details.aws.services}+ services with deep integration</li>
                                    </ul>
                                </div>
                                <div class="datacenter-footprint">
                                    <strong>🏢 DataCenter Footprint:</strong>
                                    <ul>
                                        <li>Physical DCs: ${cspData.details.aws.physicalDCs} globally</li>
                                        <li>Edge Locations: ${cspData.details.aws.edgeLocations} for CloudFront CDN</li>
                                        <li>Wavelength Zones: ${cspData.details.aws.wavelength} for 5G/edge computing</li>
                                        <li>Local Zones: ${cspData.details.aws.localZones} for ultra-low latency</li>
                                    </ul>
                                </div>
                                <div class="management-tools">
                                    <strong>🛠️ Management & Orchestration:</strong>
                                    <pre class="management-code">
# AWS Resource Composition Example
aws ec2 describe-instances --instance-ids i-1234567890abcdef0 \\
    --query 'Reservations[].Instances[].{
        InstanceType:InstanceType,
        State:State.Name,
        PrivateIP:PrivateIpAddress,
        AZ:Placement.AvailabilityZone,
        SecurityGroups:SecurityGroups[].GroupName
    }'

# AWS Systems Manager for BMC-like functionality
aws ssm send-command \\
    --instance-ids i-1234567890abcdef0 \\
    --document-name "AWS-RunShellScript" \\
    --parameters 'commands=["dmidecode -t system"]'

# CloudFormation Infrastructure as Code
Resources:
  ComputeCluster:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: c7g.16xlarge
      ImageId: ami-0abcdef1234567890
      IamInstanceProfile: !Ref InstanceProfile
      SecurityGroupIds: [!Ref SecurityGroup]
      UserData: !Base64 |
        #!/bin/bash
        # Instance initialization
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div class="csp-tab azure">
                            <div class="tab-header">
                                <h6>🔷 Microsoft Azure</h6>
                                <span class="market-share">Market Share: ${cspData.marketShares.azure}%</span>
                            </div>
                            <div class="tab-content">
                                <div class="architecture-strengths">
                                    <strong>🚀 Architecture Strengths:</strong>
                                    <ul>
                                        <li><strong>Hyper-V Platform:</strong> Enterprise-grade virtualization with security focus</li>
                                        <li><strong>Enterprise Integration:</strong> Deep Windows Server and Active Directory integration</li>
                                        <li><strong>Hybrid Cloud:</strong> Azure Stack for on-premises extension</li>
                                        <li><strong>AI/ML Platform:</strong> Strong focus on AI with custom hardware acceleration</li>
                                    </ul>
                                </div>
                                <div class="datacenter-footprint">
                                    <strong>🏢 DataCenter Footprint:</strong>
                                    <ul>
                                        <li>Physical DCs: ${cspData.details.azure.physicalDCs} globally</li>
                                        <li>Regions: ${cspData.details.azure.regions} with ${cspData.details.azure.azs} availability zones</li>
                                        <li>Edge Zones: ${cspData.details.azure.edgeZones} for low-latency applications</li>
                                        <li>Azure Stack: On-premises hybrid deployment option</li>
                                    </ul>
                                </div>
                                <div class="management-tools">
                                    <strong>🛠️ Management & Orchestration:</strong>
                                    <pre class="management-code">
# Azure Resource Management
az vm show --resource-group myResourceGroup --name myVM \\
    --query '{Name:name, PowerState:powerState,
              PrivateIP:privateIps[0],
              Size:hardwareProfile.vmSize}' \\
    --output table

# Azure Resource Manager Templates
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [{
    "type": "Microsoft.Compute/virtualMachines",
    "apiVersion": "2021-03-01",
    "name": "myVM",
    "location": "[resourceGroup().location]",
    "properties": {
      "hardwareProfile": {
        "vmSize": "Standard_HB120rs_v3"
      },
      "osProfile": {
        "computerName": "myVM",
        "adminUsername": "[parameters('adminUsername')]"
      }
    }
  }]
}

# Azure Arc for hybrid management
az connectedmachine connect --resource-group myRG \\
    --name myHybridMachine --location eastus
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div class="csp-tab gcp">
                            <div class="tab-header">
                                <h6>🔴 Google Cloud Platform</h6>
                                <span class="market-share">Market Share: ${cspData.marketShares.gcp}%</span>
                            </div>
                            <div class="tab-content">
                                <div class="architecture-strengths">
                                    <strong>🚀 Architecture Strengths:</strong>
                                    <ul>
                                        <li><strong>Custom Hardware:</strong> TPU chips for AI/ML, custom networking ASICs</li>
                                        <li><strong>Global Network:</strong> Private fiber network with edge caching</li>
                                        <li><strong>Kubernetes Native:</strong> Born from Google's container orchestration expertise</li>
                                        <li><strong>Data Analytics:</strong> BigQuery and other big data tools at scale</li>
                                    </ul>
                                </div>
                                <div class="datacenter-footprint">
                                    <strong>🏢 DataCenter Footprint:</strong>
                                    <ul>
                                        <li>Physical DCs: ${cspData.details.gcp.physicalDCs} globally</li>
                                        <li>Regions: ${cspData.details.gcp.regions} with ${cspData.details.gcp.azs} zones</li>
                                        <li>Edge Locations: ${cspData.details.gcp.edgeLocations} for Cloud CDN</li>
                                        <li>Anthos: Multi-cloud and hybrid platform</li>
                                    </ul>
                                </div>
                                <div class="management-tools">
                                    <strong>🛠️ Management & Orchestration:</strong>
                                    <pre class="management-code">
# Google Cloud Resource Management
gcloud compute instances describe my-instance \\
    --zone=us-central1-a \\
    --format="table(name,machineType.basename(),
                   status,networkInterfaces[0].accessConfigs[0].natIP)"

# Google Deployment Manager
resources:
- name: my-vm
  type: compute.v1.instance
  properties:
    zone: us-central1-a
    machineType: zones/us-central1-a/machineTypes/c3-standard-176
    disks:
    - deviceName: boot
      type: PERSISTENT
      boot: true
    networkInterfaces:
    - network: global/networks/default
      accessConfigs:
      - name: External NAT
        type: ONE_TO_ONE_NAT

# GKE for container orchestration
gcloud container clusters create my-gke-cluster \\
    --zone=us-central1-a \\
    --machine-type=c3-standard-176 \\
    --num-nodes=10
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div class="csp-tab oci">
                            <div class="tab-header">
                                <h6>🟤 Oracle Cloud Infrastructure</h6>
                                <span class="market-share">Market Share: ${cspData.marketShares.oci}%</span>
                            </div>
                            <div class="tab-content">
                                <div class="architecture-strengths">
                                    <strong>🚀 Architecture Strengths:</strong>
                                    <ul>
                                        <li><strong>Bare Metal Cloud:</strong> Direct hardware access without virtualization overhead</li>
                                        <li><strong>Enterprise Focus:</strong> Optimized for Oracle Database and enterprise workloads</li>
                                        <li><strong>Predictable Performance:</strong> Dedicated hardware with consistent performance</li>
                                        <li><strong>High-Performance Networking:</strong> RDMA-capable network with low latency</li>
                                    </ul>
                                </div>
                                <div class="datacenter-footprint">
                                    <strong>🏢 DataCenter Footprint:</strong>
                                    <ul>
                                        <li>Physical DCs: ${cspData.details.oci.physicalDCs} globally</li>
                                        <li>Regions: ${cspData.details.oci.regions} with ${cspData.details.oci.azs} availability domains</li>
                                        <li>Edge Locations: Focus on enterprise connectivity</li>
                                        <li>Dedicated Regions: For government and regulated industries</li>
                                    </ul>
                                </div>
                                <div class="management-tools">
                                    <strong>🛠️ Management & Orchestration:</strong>
                                    <pre class="management-code">
# OCI CLI Resource Management
oci compute instance list --compartment-id ocid1.compartment.oc1.. \\
    --query 'data[].{Name:"display-name",
                     State:"lifecycle-state",
                     Shape:shape,
                     IP:"private-ip"}'

# OCI Resource Manager (Terraform-based)
resource "oci_core_instance" "compute_instance" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.compartment_ocid
  shape               = "BM.Standard3.64"
  display_name        = "bare-metal-instance"

  source_details {
    source_id   = var.instance_image_ocid
    source_type = "image"
  }

  create_vnic_details {
    subnet_id      = oci_core_subnet.subnet.id
    hostname_label = "baremetal01"
  }
}

# OCI Container Engine for Kubernetes (OKE)
oci ce cluster create \\
    --compartment-id ocid1.compartment.oc1.. \\
    --name my-oke-cluster \\
    --kubernetes-version v1.28.2
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="redfish-bmc-adoption">
                    <h5>🔧 RedFish & BMC Management Adoption</h5>
                    <div class="adoption-analysis">
                        <div class="adoption-overview">
                            <h6>📊 Industry Adoption Status</h6>
                            <div class="adoption-metrics">
                                <div class="adoption-metric">
                                    <span class="metric-name">RedFish API Standard:</span>
                                    <span class="metric-value success">✅ Universally Adopted</span>
                                </div>
                                <div class="adoption-metric">
                                    <span class="metric-name">BMC Management:</span>
                                    <span class="metric-value success">✅ Standard Practice</span>
                                </div>
                                <div class="adoption-metric">
                                    <span class="metric-name">Out-of-Band Management:</span>
                                    <span class="metric-value success">✅ Critical Infrastructure</span>
                                </div>
                                <div class="adoption-metric">
                                    <span class="metric-name">DMTF Compliance:</span>
                                    <span class="metric-value success">✅ Industry Requirement</span>
                                </div>
                            </div>
                        </div>

                        <div class="csp-redfish-usage">
                            <h6>🏢 CSP RedFish Implementation</h6>
                            <div class="usage-details">
                                ${Object.entries(cspData.redfishUsage).map(([csp, usage]) => `
                                    <div class="usage-item">
                                        <div class="usage-header">
                                            <span class="csp-name">${csp.toUpperCase()}</span>
                                            <span class="usage-level ${usage.adoptionLevel}">${usage.adoptionLevel}</span>
                                        </div>
                                        <div class="usage-details-list">
                                            <ul>
                                                ${usage.details.map(detail => `<li>${detail}</li>`).join('')}
                                            </ul>
                                        </div>
                                        <div class="usage-scale">
                                            <strong>Scale:</strong> ${usage.scale}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="redfish-benefits">
                            <h6>🎯 RedFish Benefits for Hyperscale Operations</h6>
                            <div class="benefits-grid">
                                <div class="benefit-item">
                                    <h6>🚀 Operational Efficiency</h6>
                                    <ul>
                                        <li>Automated server provisioning and configuration</li>
                                        <li>Remote firmware updates without physical access</li>
                                        <li>Centralized hardware inventory and asset management</li>
                                        <li>Predictive maintenance through telemetry collection</li>
                                    </ul>
                                </div>
                                <div class="benefit-item">
                                    <h6>📊 Monitoring & Telemetry</h6>
                                    <ul>
                                        <li>Real-time hardware health monitoring</li>
                                        <li>Power and thermal management at scale</li>
                                        <li>Storage and memory health tracking</li>
                                        <li>Network interface status and performance</li>
                                    </ul>
                                </div>
                                <div class="benefit-item">
                                    <h6>🔒 Security & Compliance</h6>
                                    <ul>
                                        <li>Secure out-of-band management channel</li>
                                        <li>Hardware-level security event logging</li>
                                        <li>Compliance reporting and audit trails</li>
                                        <li>Secure boot and firmware verification</li>
                                    </ul>
                                </div>
                                <div class="benefit-item">
                                    <h6>⚡ Automation & Orchestration</h6>
                                    <ul>
                                        <li>RESTful API for infrastructure automation</li>
                                        <li>Integration with DevOps and IaC toolchains</li>
                                        <li>Event-driven automation and remediation</li>
                                        <li>Standardized management across vendors</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="datacenter-vs-csp">
                    <h5>🏢 DataCenter vs CSP Relationship</h5>
                    <div class="relationship-analysis">
                        <div class="relationship-models">
                            <div class="model-item">
                                <h6>🏢 Owned DataCenters (Hyperscale CSPs)</h6>
                                <div class="model-description">
                                    <p><strong>Examples:</strong> AWS, Google, Meta, Microsoft</p>
                                    <p><strong>Model:</strong> CSP owns and operates their own datacenters globally</p>
                                    <p><strong>Benefits:</strong> Complete control, custom hardware, vertical integration</p>
                                    <p><strong>Scale:</strong> 50-300+ datacenters per major CSP</p>
                                </div>
                            </div>
                            <div class="model-item">
                                <h6>🤝 Colocation Partners</h6>
                                <div class="model-description">
                                    <p><strong>Examples:</strong> Equinix, Digital Realty, CyrusOne hosting CSP equipment</p>
                                    <p><strong>Model:</strong> CSPs lease space/power in third-party datacenters</p>
                                    <p><strong>Benefits:</strong> Faster market entry, reduced capital investment</p>
                                    <p><strong>Scale:</strong> Thousands of colocation facilities globally</p>
                                </div>
                            </div>
                            <div class="model-item">
                                <h6>🌐 Edge & Regional Partnerships</h6>
                                <div class="model-description">
                                    <p><strong>Examples:</strong> AWS Wavelength, Azure Edge Zones, GCP Edge</p>
                                    <p><strong>Model:</strong> CSP infrastructure in telecom/ISP datacenters</p>
                                    <p><strong>Benefits:</strong> Ultra-low latency, local presence</p>
                                    <p><strong>Scale:</strong> Hundreds of edge locations per CSP</p>
                                </div>
                            </div>
                            <div class="model-item">
                                <h6>🏭 Multi-Tenant Datacenters</h6>
                                <div class="model-description">
                                    <p><strong>Examples:</strong> Traditional datacenters hosting multiple CSPs</p>
                                    <p><strong>Model:</strong> Single datacenter serves multiple cloud providers</p>
                                    <p><strong>Benefits:</strong> Resource sharing, cost optimization</p>
                                    <p><strong>Scale:</strong> Common in smaller markets and regions</p>
                                </div>
                            </div>
                        </div>

                        <div class="relationship-diagram">
                            <h6>🔄 DataCenter-CSP Ecosystem</h6>
                            <pre class="ecosystem-diagram">
┌─────────────────────────────────────────────────────────────────┐
│                    Global Cloud Ecosystem                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────┐                  │
│  │  Hyperscale CSPs │    │ Regional/Niche   │                  │
│  │  • AWS (33%)     │    │ CSPs             │                  │
│  │  • Azure (22%)   │    │ • Alibaba (9%)   │                  │
│  │  │ Google (10%)  │    │ • Salesforce     │                  │
│  │  • Oracle (2%)   │    │ • IBM Cloud      │                  │
│  └──────┬───────────┘    └──────┬───────────┘                  │
│         │                       │                              │
│         ▼                       ▼                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              DataCenter Infrastructure                 │   │
│  │                                                         │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │   │
│  │ │ Owned DCs   │ │ Colocation  │ │ Edge/Regional       │ │   │
│  │ │ • 50-300    │ │ • Equinix   │ │ • Telecom DCs       │ │   │
│  │ │   per CSP   │ │ • DLR       │ │ • ISP facilities    │ │   │
│  │ └─────────────┘ └─────────────┘ └─────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │            Supporting Infrastructure                    │   │
│  │ • Network Providers (Level 3, Cogent, etc.)           │   │
│  │ • Hardware Vendors (Dell, HPE, Supermicro, etc.)      │   │
│  │ • Software Vendors (VMware, RedHat, etc.)             │   │
│  │ • Power/Cooling (Schneider, Vertiv, etc.)             │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 3500);
}

function generateCSPComparisonData() {
    return {
        marketOverview: {
            totalMarketSize: "$545B",
            totalDatacenters: 8000,
            totalPowerConsumption: 45,
            growthRate: 15.7
        },
        marketShares: {
            aws: 33,
            azure: 22,
            gcp: 10,
            oci: 2
        },
        comparisonFeatures: [
            {
                name: "Global Regions",
                aws: "33 regions",
                azure: "60+ regions",
                gcp: "40+ regions",
                oci: "48 regions"
            },
            {
                name: "Availability Zones",
                aws: "105 AZs",
                azure: "130+ AZs",
                gcp: "121 zones",
                oci: "3 ADs per region"
            },
            {
                name: "Virtualization",
                aws: "Nitro System",
                azure: "Hyper-V",
                gcp: "Custom KVM",
                oci: "KVM + Bare Metal"
            },
            {
                name: "Custom Silicon",
                aws: "Graviton CPUs",
                azure: "Project Brainwave",
                gcp: "TPU + Custom ASICs",
                oci: "Standard x86"
            },
            {
                name: "GPU Offerings",
                aws: "P4/P5 instances",
                azure: "NC/ND series",
                gcp: "A2/G2 instances",
                oci: "BM.GPU series"
            },
            {
                name: "Networking",
                aws: "400 Gbps enhanced",
                azure: "200 Gbps accelerated",
                gcp: "Jupiter fabric",
                oci: "RDMA capable"
            },
            {
                name: "Storage Tiers",
                aws: "S3/EBS/EFS",
                azure: "Blob/Disk/Files",
                gcp: "Cloud Storage/PD",
                oci: "Object/Block/File"
            },
            {
                name: "Management API",
                aws: "AWS CLI/SDK",
                azure: "Azure CLI/ARM",
                gcp: "gcloud/REST",
                oci: "OCI CLI/SDK"
            }
        ],
        details: {
            aws: {
                regions: 33,
                azs: 105,
                services: 200,
                physicalDCs: 450,
                edgeLocations: 450,
                wavelength: 29,
                localZones: 32
            },
            azure: {
                regions: 60,
                azs: 130,
                physicalDCs: 200,
                edgeZones: 15
            },
            gcp: {
                regions: 40,
                azs: 121,
                physicalDCs: 180,
                edgeLocations: 200
            },
            oci: {
                regions: 48,
                azs: 144,
                physicalDCs: 95
            }
        },
        redfishUsage: {
            aws: {
                adoptionLevel: "comprehensive",
                scale: "500,000+ servers managed via custom BMC integration",
                details: [
                    "Custom Nitro cards provide enhanced BMC functionality",
                    "RedFish API integrated with AWS Systems Manager",
                    "Automated hardware provisioning and lifecycle management",
                    "Real-time telemetry collection for predictive maintenance"
                ]
            },
            azure: {
                adoptionLevel: "extensive",
                scale: "300,000+ servers with RedFish management",
                details: [
                    "Host Guardian Service integrates with BMC attestation",
                    "Azure Stack hybrid deployments use RedFish extensively",
                    "Hardware health monitoring via Azure Monitor integration",
                    "Automated firmware updates through Windows Admin Center"
                ]
            },
            gcp: {
                adoptionLevel: "comprehensive",
                scale: "250,000+ servers with custom management stack",
                details: [
                    "Borg cluster manager interfaces with RedFish APIs",
                    "Custom monitoring stack for hardware telemetry",
                    "Automated failure detection and remediation",
                    "Integration with Google's global monitoring infrastructure"
                ]
            },
            oci: {
                adoptionLevel: "extensive",
                scale: "50,000+ servers with enterprise-grade BMC features",
                details: [
                    "Bare metal instances provide direct BMC access to customers",
                    "Enterprise-grade RedFish implementation for Oracle workloads",
                    "Advanced power management and thermal monitoring",
                    "Integration with Oracle Enterprise Manager"
                ]
            }
        }
    };
}