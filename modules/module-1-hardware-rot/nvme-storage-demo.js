// NVMe Storage Demo Functions

function generateRandomHex(length) {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function demonstrateNVMePerformance() {
    const outputDiv = document.getElementById('nvme-demo-output');

    // Show loading state
    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>📊 Running NVMe performance benchmark...</p>
        </div>
    `;

    setTimeout(() => {
        const performanceData = generatePerformanceData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>📊 NVMe Performance Benchmark Results</h4>

                <div class="performance-results">
                    <div class="perf-tier">
                        <h5>🚀 Tier 0: PCIe 5.0 NVMe (Samsung PM9A3)</h5>
                        <div class="metrics-grid">
                            <div class="metric">
                                <span class="label">Sequential Read:</span>
                                <span class="value">${performanceData.tier0.seqRead} MB/s</span>
                            </div>
                            <div class="metric">
                                <span class="label">Sequential Write:</span>
                                <span class="value">${performanceData.tier0.seqWrite} MB/s</span>
                            </div>
                            <div class="metric">
                                <span class="label">Random Read IOPS:</span>
                                <span class="value">${performanceData.tier0.randReadIOPS.toLocaleString()}</span>
                            </div>
                            <div class="metric">
                                <span class="label">Random Write IOPS:</span>
                                <span class="value">${performanceData.tier0.randWriteIOPS.toLocaleString()}</span>
                            </div>
                            <div class="metric">
                                <span class="label">Latency (P99):</span>
                                <span class="value">${performanceData.tier0.latency} μs</span>
                            </div>
                            <div class="metric">
                                <span class="label">Queue Depth:</span>
                                <span class="value">${performanceData.tier0.queueDepth}</span>
                            </div>
                        </div>
                    </div>

                    <div class="perf-tier">
                        <h5>⚡ Tier 1: PCIe 4.0 NVMe (Intel P5510)</h5>
                        <div class="metrics-grid">
                            <div class="metric">
                                <span class="label">Sequential Read:</span>
                                <span class="value">${performanceData.tier1.seqRead} MB/s</span>
                            </div>
                            <div class="metric">
                                <span class="label">Sequential Write:</span>
                                <span class="value">${performanceData.tier1.seqWrite} MB/s</span>
                            </div>
                            <div class="metric">
                                <span class="label">Random Read IOPS:</span>
                                <span class="value">${performanceData.tier1.randReadIOPS.toLocaleString()}</span>
                            </div>
                            <div class="metric">
                                <span class="label">Random Write IOPS:</span>
                                <span class="value">${performanceData.tier1.randWriteIOPS.toLocaleString()}</span>
                            </div>
                            <div class="metric">
                                <span class="label">Latency (P99):</span>
                                <span class="value">${performanceData.tier1.latency} μs</span>
                            </div>
                            <div class="metric">
                                <span class="label">Queue Depth:</span>
                                <span class="value">${performanceData.tier1.queueDepth}</span>
                            </div>
                        </div>
                    </div>

                    <div class="perf-comparison">
                        <h5>📈 Performance Optimization Insights</h5>
                        <ul>
                            <li><strong>Queue Depth Impact:</strong> Optimal performance at QD=${performanceData.tier0.queueDepth} for Tier 0</li>
                            <li><strong>CPU Affinity:</strong> NUMA-local access improves latency by ~15%</li>
                            <li><strong>Block Size:</strong> 4K random I/O shows best IOPS, 1MB sequential shows best throughput</li>
                            <li><strong>Multi-Queue:</strong> ${Math.floor(performanceData.tier0.randReadIOPS / 100000)} submission queues utilized</li>
                        </ul>
                    </div>
                </div>

                <div class="benchmark-command">
                    <h5>📝 Benchmark Command Used</h5>
                    <pre>fio --name=nvme-benchmark --filename=/dev/nvme0n1 --direct=1 --rw=randread \\
    --bs=4k --ioengine=io_uring --iodepth=32 --runtime=60 --numjobs=4 \\
    --time_based --group_reporting</pre>
                </div>
            </div>
        `;
    }, 2000);
}

function generatePerformanceData() {
    return {
        tier0: {
            seqRead: Math.floor(Math.random() * 2000) + 13000,  // 13-15 GB/s
            seqWrite: Math.floor(Math.random() * 1500) + 11000, // 11-12.5 GB/s
            randReadIOPS: Math.floor(Math.random() * 200000) + 900000, // 900K-1.1M
            randWriteIOPS: Math.floor(Math.random() * 150000) + 750000, // 750K-900K
            latency: Math.floor(Math.random() * 30) + 60, // 60-90 μs
            queueDepth: 32
        },
        tier1: {
            seqRead: Math.floor(Math.random() * 1000) + 7000,   // 7-8 GB/s
            seqWrite: Math.floor(Math.random() * 800) + 6000,   // 6-6.8 GB/s
            randReadIOPS: Math.floor(Math.random() * 100000) + 500000, // 500K-600K
            randWriteIOPS: Math.floor(Math.random() * 80000) + 400000, // 400K-480K
            latency: Math.floor(Math.random() * 50) + 120, // 120-170 μs
            queueDepth: 32
        }
    };
}

function showNVMeTopology() {
    const outputDiv = document.getElementById('nvme-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🗺️ Discovering NVMe storage topology...</p>
        </div>
    `;

    setTimeout(() => {
        const topologyData = generateTopologyData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🗺️ DataCenter NVMe Storage Topology</h4>

                <div class="topology-view">
                    <div class="rack-layout">
                        <h5>🏢 Rack Layout (42U)</h5>
                        ${topologyData.racks.map(rack => `
                            <div class="rack" data-rack="${rack.id}">
                                <h6>Rack ${rack.id} (${rack.servers} servers)</h6>
                                <div class="servers-grid">
                                    ${rack.serverList.map(server => `
                                        <div class="server ${server.tier}">
                                            <span class="server-name">${server.name}</span>
                                            <span class="nvme-count">${server.nvmeCount} NVMe</span>
                                            <span class="capacity">${server.totalCapacity}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="fabric-layout">
                        <h5>🌐 Storage Fabric Architecture</h5>
                        <div class="fabric-tier">
                            <div class="fabric-switch spine">
                                <h6>Spine Switches (400G)</h6>
                                <div class="switch-list">
                                    ${topologyData.spines.map(spine => `
                                        <div class="switch">
                                            ${spine.name}<br>
                                            <small>${spine.ports}x400G</small>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="fabric-switch leaf">
                                <h6>Leaf Switches (100G/200G)</h6>
                                <div class="switch-list">
                                    ${topologyData.leafs.map(leaf => `
                                        <div class="switch">
                                            ${leaf.name}<br>
                                            <small>${leaf.downPorts}x100G ↓</small>
                                            <small>${leaf.upPorts}x200G ↑</small>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <div class="storage-targets">
                            <h6>📦 NVMe-oF Storage Targets</h6>
                            <div class="targets-grid">
                                ${topologyData.targets.map(target => `
                                    <div class="target">
                                        <strong>${target.name}</strong><br>
                                        ${target.protocol} over ${target.transport}<br>
                                        <small>${target.namespaces} namespaces</small><br>
                                        <small>${target.bandwidth} total bandwidth</small>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="topology-stats">
                    <h5>📊 Topology Statistics</h5>
                    <div class="stats-grid">
                        <div class="stat">
                            <span class="stat-label">Total NVMe Drives:</span>
                            <span class="stat-value">${topologyData.totalDrives}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Total Raw Capacity:</span>
                            <span class="stat-value">${topologyData.totalCapacity} PB</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Aggregate IOPS:</span>
                            <span class="stat-value">${topologyData.aggregateIOPS.toLocaleString()}M</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Storage Bandwidth:</span>
                            <span class="stat-value">${topologyData.bandwidth} TB/s</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Fault Domains:</span>
                            <span class="stat-value">${topologyData.faultDomains}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Redundancy Level:</span>
                            <span class="stat-value">N+${topologyData.redundancy}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 1800);
}

function generateTopologyData() {
    const racks = [];
    for (let i = 1; i <= 4; i++) {
        const serverCount = Math.floor(Math.random() * 8) + 12; // 12-20 servers per rack
        const serverList = [];
        for (let j = 1; j <= serverCount; j++) {
            const tier = j <= 4 ? 'tier0' : j <= 12 ? 'tier1' : 'tier2';
            serverList.push({
                name: `srv-${i}${j.toString().padStart(2, '0')}`,
                tier: tier,
                nvmeCount: tier === 'tier0' ? 8 : tier === 'tier1' ? 12 : 16,
                totalCapacity: tier === 'tier0' ? '61TB' : tier === 'tier1' ? '184TB' : '480TB'
            });
        }

        racks.push({
            id: i,
            servers: serverCount,
            serverList: serverList
        });
    }

    return {
        racks: racks,
        spines: [
            { name: 'spine-01', ports: 32 },
            { name: 'spine-02', ports: 32 }
        ],
        leafs: [
            { name: 'leaf-01', downPorts: 48, upPorts: 8 },
            { name: 'leaf-02', downPorts: 48, upPorts: 8 },
            { name: 'leaf-03', downPorts: 48, upPorts: 8 },
            { name: 'leaf-04', downPorts: 48, upPorts: 8 }
        ],
        targets: [
            { name: 'nvme-target-01', protocol: 'NVMe-oF', transport: 'RDMA', namespaces: 256, bandwidth: '800GB/s' },
            { name: 'nvme-target-02', protocol: 'NVMe-oF', transport: 'TCP', namespaces: 128, bandwidth: '400GB/s' },
            { name: 'nvme-target-03', protocol: 'NVMe-oF', transport: 'RDMA', namespaces: 256, bandwidth: '800GB/s' },
            { name: 'nvme-target-04', protocol: 'NVMe-oF', transport: 'FC', namespaces: 64, bandwidth: '200GB/s' }
        ],
        totalDrives: 896,
        totalCapacity: 12.4,
        aggregateIOPS: 485,
        bandwidth: 2.2,
        faultDomains: 8,
        redundancy: 2
    };
}

function simulateFailover() {
    const outputDiv = document.getElementById('nvme-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🔄 Simulating storage failover scenario...</p>
        </div>
    `;

    setTimeout(() => {
        const failoverData = generateFailoverScenario();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🔄 NVMe Storage Failover Simulation</h4>

                <div class="failover-scenario">
                    <div class="incident-details">
                        <h5>🚨 Incident: ${failoverData.incident.type}</h5>
                        <p><strong>Affected Components:</strong> ${failoverData.incident.affected}</p>
                        <p><strong>Impact Scope:</strong> ${failoverData.incident.scope}</p>
                        <p><strong>Detection Time:</strong> ${failoverData.incident.detectionTime}</p>
                    </div>

                    <div class="failover-timeline">
                        <h5>⏱️ Failover Timeline</h5>
                        <div class="timeline">
                            ${failoverData.timeline.map((step, index) => `
                                <div class="timeline-step ${step.status}">
                                    <div class="step-time">T+${step.time}</div>
                                    <div class="step-action">${step.action}</div>
                                    <div class="step-result">${step.result}</div>
                                    ${step.status === 'completed' ? '<span class="status-icon">✅</span>' :
                                      step.status === 'in-progress' ? '<span class="status-icon">🔄</span>' :
                                      '<span class="status-icon">⏳</span>'}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="performance-impact">
                        <h5>📊 Performance Impact Analysis</h5>
                        <div class="impact-metrics">
                            <div class="metric-comparison">
                                <div class="before-after">
                                    <h6>Before Incident</h6>
                                    <div class="metrics">
                                        <span>IOPS: ${failoverData.performance.before.iops.toLocaleString()}</span>
                                        <span>Latency: ${failoverData.performance.before.latency}μs</span>
                                        <span>Bandwidth: ${failoverData.performance.before.bandwidth}GB/s</span>
                                    </div>
                                </div>
                                <div class="before-after">
                                    <h6>During Failover</h6>
                                    <div class="metrics">
                                        <span>IOPS: ${failoverData.performance.during.iops.toLocaleString()}</span>
                                        <span>Latency: ${failoverData.performance.during.latency}μs</span>
                                        <span>Bandwidth: ${failoverData.performance.during.bandwidth}GB/s</span>
                                    </div>
                                </div>
                                <div class="before-after">
                                    <h6>After Recovery</h6>
                                    <div class="metrics">
                                        <span>IOPS: ${failoverData.performance.after.iops.toLocaleString()}</span>
                                        <span>Latency: ${failoverData.performance.after.latency}μs</span>
                                        <span>Bandwidth: ${failoverData.performance.after.bandwidth}GB/s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="recovery-actions">
                        <h5>🛠️ Automated Recovery Actions</h5>
                        <ul>
                            ${failoverData.recoveryActions.map(action =>
                                `<li><strong>${action.component}:</strong> ${action.action}</li>`
                            ).join('')}
                        </ul>
                    </div>

                    <div class="lessons-learned">
                        <h5>📝 Key Insights</h5>
                        <ul>
                            <li><strong>Detection:</strong> Health monitoring detected degradation ${failoverData.incident.detectionTime} before total failure</li>
                            <li><strong>Isolation:</strong> Fault domain isolation prevented cascade failure to adjacent racks</li>
                            <li><strong>Performance:</strong> Multi-path I/O maintained ${Math.round((failoverData.performance.during.iops / failoverData.performance.before.iops) * 100)}% performance during failover</li>
                            <li><strong>Recovery:</strong> Automated rebuilding restored full redundancy in ${failoverData.recoveryTime}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }, 2500);
}

function generateFailoverScenario() {
    const scenarios = [
        {
            type: "NVMe Drive Failure",
            affected: "2x Samsung PM9A3 7.68TB drives in Rack-02",
            scope: "Single fault domain, 15.36TB raw capacity",
            detectionTime: "3.2 seconds"
        },
        {
            type: "Network Fabric Interruption",
            affected: "Leaf switch leaf-02 uplink failure",
            scope: "12 storage servers, 50% bandwidth reduction",
            detectionTime: "0.8 seconds"
        },
        {
            type: "Storage Controller Failure",
            affected: "nvme-target-01 primary controller",
            scope: "256 namespaces, 800GB/s bandwidth",
            detectionTime: "1.5 seconds"
        }
    ];

    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    return {
        incident: scenario,
        timeline: [
            { time: "0.0s", action: "Health monitoring detects anomaly", result: "SMART warnings triggered", status: "completed" },
            { time: "0.5s", action: "Automated diagnostics initiated", result: "Component isolation confirmed", status: "completed" },
            { time: "1.2s", action: "Failover to secondary path", result: "I/O redirected successfully", status: "completed" },
            { time: "2.8s", action: "Load balancer reconfiguration", result: "Traffic distributed across remaining nodes", status: "completed" },
            { time: "5.1s", action: "Spare allocation and rebuild start", result: "Hot spare activated, rebuild 0%", status: "in-progress" },
            { time: "15m", action: "Data rebuilding completion", result: "Full redundancy restored", status: "pending" }
        ],
        performance: {
            before: { iops: 850000, latency: 85, bandwidth: 12.8 },
            during: { iops: 720000, latency: 95, bandwidth: 10.9 },
            after: { iops: 845000, latency: 87, bandwidth: 12.6 }
        },
        recoveryActions: [
            { component: "Multipath I/O", action: "Automatic path failover to healthy controllers" },
            { component: "Load Balancer", action: "Dynamic weight adjustment based on health status" },
            { component: "Spare Management", action: "Hot spare allocation and RAID rebuild initiation" },
            { component: "Monitoring", action: "Enhanced telemetry collection for affected subsystem" },
            { component: "Alerting", action: "Notifications sent to NOC and automated ticket creation" }
        ],
        recoveryTime: "12 minutes 34 seconds"
    };
}

function monitorHealth() {
    const outputDiv = document.getElementById('nvme-demo-output');

    outputDiv.innerHTML = `
        <div class="demo-loading">
            <div class="spinner"></div>
            <p>🏥 Collecting NVMe health telemetry...</p>
        </div>
    `;

    setTimeout(() => {
        const healthData = generateHealthData();

        outputDiv.innerHTML = `
            <div class="demo-output">
                <h4>🏥 NVMe Storage Health Monitoring</h4>

                <div class="health-dashboard">
                    <div class="health-overview">
                        <h5>📊 Fleet Health Overview</h5>
                        <div class="health-stats">
                            <div class="health-stat healthy">
                                <span class="stat-number">${healthData.overview.healthy}</span>
                                <span class="stat-label">Healthy Drives</span>
                            </div>
                            <div class="health-stat warning">
                                <span class="stat-number">${healthData.overview.warning}</span>
                                <span class="stat-label">Warning Status</span>
                            </div>
                            <div class="health-stat critical">
                                <span class="stat-number">${healthData.overview.critical}</span>
                                <span class="stat-label">Critical Issues</span>
                            </div>
                            <div class="health-stat total">
                                <span class="stat-number">${healthData.overview.total}</span>
                                <span class="stat-label">Total Drives</span>
                            </div>
                        </div>
                    </div>

                    <div class="drive-details">
                        <h5>🔍 Individual Drive Status</h5>
                        <div class="drives-table">
                            <div class="table-header">
                                <span>Drive ID</span>
                                <span>Model</span>
                                <span>Temperature</span>
                                <span>Spare %</span>
                                <span>Usage %</span>
                                <span>Status</span>
                            </div>
                            ${healthData.drives.map(drive => `
                                <div class="table-row ${drive.status}">
                                    <span>${drive.id}</span>
                                    <span>${drive.model}</span>
                                    <span>${drive.temperature}°C</span>
                                    <span>${drive.spare}%</span>
                                    <span>${drive.usage}%</span>
                                    <span class="status-badge ${drive.status}">${drive.statusText}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="predictive-analytics">
                        <h5>🔮 Predictive Analytics</h5>
                        <div class="predictions">
                            ${healthData.predictions.map(pred => `
                                <div class="prediction ${pred.severity}">
                                    <div class="pred-header">
                                        <span class="pred-drive">${pred.drive}</span>
                                        <span class="pred-confidence">${pred.confidence}% confidence</span>
                                    </div>
                                    <div class="pred-details">
                                        <strong>Prediction:</strong> ${pred.prediction}<br>
                                        <strong>Timeline:</strong> ${pred.timeline}<br>
                                        <strong>Recommendation:</strong> ${pred.recommendation}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="telemetry-data">
                        <h5>📡 Real-time Telemetry</h5>
                        <div class="telemetry-grid">
                            <div class="telemetry-metric">
                                <span class="metric-name">Total Data Written</span>
                                <span class="metric-value">${healthData.telemetry.dataWritten} PB</span>
                            </div>
                            <div class="telemetry-metric">
                                <span class="metric-name">Total Data Read</span>
                                <span class="metric-value">${healthData.telemetry.dataRead} PB</span>
                            </div>
                            <div class="telemetry-metric">
                                <span class="metric-name">Power Cycles</span>
                                <span class="metric-value">${healthData.telemetry.powerCycles.toLocaleString()}</span>
                            </div>
                            <div class="telemetry-metric">
                                <span class="metric-name">Unsafe Shutdowns</span>
                                <span class="metric-value">${healthData.telemetry.unsafeShutdowns}</span>
                            </div>
                            <div class="telemetry-metric">
                                <span class="metric-name">Average Temperature</span>
                                <span class="metric-value">${healthData.telemetry.avgTemp}°C</span>
                            </div>
                            <div class="telemetry-metric">
                                <span class="metric-name">Error Rate</span>
                                <span class="metric-value">${healthData.telemetry.errorRate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="monitoring-commands">
                    <h5>📝 Monitoring Commands</h5>
                    <pre>
# Real-time SMART monitoring
watch -n 5 'for dev in /dev/nvme*n1; do echo "=== $dev ==="; nvme smart-log $dev; done'

# Temperature monitoring with alerts
#!/bin/bash
for nvme in /dev/nvme*n1; do
    temp=$(nvme smart-log $nvme | grep "^temperature" | awk '{print $3}')
    if [ $temp -gt 70 ]; then
        echo "$(date): WARNING - $nvme temperature ${temp}°C" | logger
    fi
done

# Predictive failure detection
nvme telemetry-log /dev/nvme0n1 --output-format=json | jq '.predictive_failure_analysis'
                    </pre>
                </div>
            </div>
        `;
    }, 2200);
}

function generateHealthData() {
    const totalDrives = 896;
    const healthyCount = Math.floor(totalDrives * 0.92); // 92% healthy
    const warningCount = Math.floor(totalDrives * 0.06); // 6% warning
    const criticalCount = totalDrives - healthyCount - warningCount; // remainder critical

    const driveModels = ['Samsung PM9A3', 'Intel P5510', 'Micron 7450', 'WD SN840', 'Intel P4610'];
    const drives = [];

    for (let i = 0; i < 10; i++) { // Show first 10 drives
        const model = driveModels[Math.floor(Math.random() * driveModels.length)];
        const temp = Math.floor(Math.random() * 40) + 35; // 35-75°C
        const spare = Math.floor(Math.random() * 30) + 70; // 70-100%
        const usage = Math.floor(Math.random() * 80) + 5;  // 5-85%

        let status = 'healthy';
        let statusText = 'Healthy';

        if (temp > 65 || spare < 85 || usage > 70) {
            status = 'warning';
            statusText = 'Warning';
        }
        if (temp > 75 || spare < 75 || usage > 85) {
            status = 'critical';
            statusText = 'Critical';
        }

        drives.push({
            id: `nvme${i}n1`,
            model: model,
            temperature: temp,
            spare: spare,
            usage: usage,
            status: status,
            statusText: statusText
        });
    }

    return {
        overview: {
            healthy: healthyCount,
            warning: warningCount,
            critical: criticalCount,
            total: totalDrives
        },
        drives: drives,
        predictions: [
            {
                drive: "nvme7n1",
                confidence: 87,
                prediction: "Spare capacity depletion",
                timeline: "14-18 days",
                recommendation: "Schedule replacement during next maintenance window",
                severity: "warning"
            },
            {
                drive: "nvme23n1",
                confidence: 94,
                prediction: "Thermal throttling risk",
                timeline: "3-5 days",
                recommendation: "Check cooling system, consider workload migration",
                severity: "critical"
            }
        ],
        telemetry: {
            dataWritten: 847.3,
            dataRead: 1253.7,
            powerCycles: 12847,
            unsafeShutdowns: 23,
            avgTemp: 52,
            errorRate: "0.00012%"
        }
    };
}